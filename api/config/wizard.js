const readline = require('readline');
const gulp = require('gulp');
const replace = require('gulp-replace');
const uuid = require('uuid/v1');
const cp = require('child_process');
const fs = require('fs');
const slugify = require('slugify');
const rimraf = require('rimraf');

var ANSWERS = {}, DIR='.';

for(var i=2, parts=[];i<process.argv.length;i++){
    parts = process.argv[i].split('=');

    if(parts[0] == '--port') ANSWERS.port = parts[1];
    else if(parts[0] == '--name') ANSWERS.name = parts[1];
    else if(parts[0] == '--email') ANSWERS.email = parts[1];
    else if(parts[0] == '--git') ANSWERS.git = parts[1];
    else if(parts[0] == '--keep-wizard') ANSWERS.keep = parts[1];
    else if(parts[0] == '--dir') DIR = parts[1];
}

var GLOB_PATTERN = ['!'+DIR+'/node_modules','!'+DIR+'/**/*.png','!'+DIR+'/**/*.jpg', '!'+DIR+'/node_modules/**', '!'+DIR+'/api/config/wizard.js', '!'+DIR+'/_bootstrap.md', '!'+DIR+'/**/wizard_test.js', DIR+'/**/*',DIR+'/**/*.*'];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function readlineQuestion(question_text){
    return new Promise((resolve, reject)=>{
        try{
            rl.question(question_text+' ', function(answer){
                resolve(answer);
            });
        }catch(err){
            reject(err);
        }
    });
}

// getJSONFileContents e setJSONFileContents são para alterar o JWT Secret
function getJSONFileContents(filename){
    return new Promise((resolve, reject)=>{
        fs.readFile(filename, 'utf8', function(err, content){
            if(err) reject(err);
            else{
                try{
                    resolve(JSON.parse(content));
                }catch(e){
                    reject(e);
                }
            }
        });
    });
}

function setJSONFileContents(filename, content, set_as_object=false){
    return new Promise((resolve, reject)=>{
        content = JSON.stringify(content, null, "\t");
        fs.writeFile(filename, content, 'utf8', function(err, data){
            if(err) reject(err);
            else resolve(data);
        });
    });
}

// Executa um comando e retorna uma Promise
function exec(command){
    return new Promise((resolve, reject)=>{
        cp.exec(command, {maxBuffer: 1024 * 4000},(error, stdout, stderr) => {
            if (error) reject({message: 'Erro ao executar comando', error: error});
            else resolve({stdout: stdout, stderr: stderr});
        });
    });
}

// Remove uma pasta e retorna uma Promise
function rm(path){
    return new Promise((resolve, reject)=>{
        try{
            rimraf(path, (result)=>{ resolve(result); });
        }catch(error){
            reject({message: 'Erro ao remover pasta '+path, error: error});
        }
    });
}

// Remove um arquivo e retorna uma Promise
function unlink(path){
    return new Promise((resolve, reject)=>{
        fs.unlink(path, (err)=>{
            if(err) reject(err);
            else resolve();
        })
    });
}

// Executa as tarefas
function run(){
    console.log('\nO wizard está trabalhando...');
    ANSWERS.jwt_secret = uuid();
    ANSWERS.slugified_name = slugify(ANSWERS.name, {remove: /[^a-zA-Z0-9 -]/g, lower: true});

    gulp.src(GLOB_PATTERN)
    //Nome do projeto
    .pipe(replace('my-application', ANSWERS.slugified_name))
    //Porta do projeto
    .pipe(replace('8094', ANSWERS.port))
    //JWT secret
    .pipe(replace('seu@email.com', ANSWERS.email))
    //JWT secret
    .pipe(replace('JWTSecret', ANSWERS.jwt_secret))
    .pipe(gulp.dest(DIR+'/'))
    .on('end', ()=>{
        //Apaga o GIT
        rm(DIR+'/.git')
        .then((result)=>{
            // Inicia um novo projeto com os arquivos atuais
            var git_commands = ['git init','git add --all','git commit -m "Iniciando o projeto" --no-verify'];

            if(ANSWERS.git) git_commands.push('git remote add origin '+ANSWERS.git);
            else console.log('Você deve adicionar um repositório ao GIT manualmente: git remote add origin <URL do repositório GIT>');

            return exec(git_commands.join(' && '));
        })
        .then((result)=>{
            // Remove os comandos do NPM
            return getJSONFileContents(DIR+'/package.json')
            .then((content)=>{
                delete content.scripts['test:wizard'];
                delete content.scripts['wizard'];
                return setJSONFileContents(DIR+'/package.json', content, true);
            })
            .catch((err)=>{
                console.log('Erro ao remover comandos do NPM', err);
            })
        })
        .then((result)=>{
            if(ANSWERS.keep) return true;
            return unlink(DIR+'/api/config/wizard.js')
            .then(()=>{
                return unlink(DIR+'/test/wizard_test.js');;
            })
        })
        .then((result)=>{
            console.log('Lembre de editar os arquivos jenkins.properties e sonar-project.properties.');
            console.log('\nO wizard terminou de alterar o projeto.');
            console.log('Esta tarefa não estará mais disponível a partir de agora.')
            process.exit();
        })
        .catch((err)=>{
            console.log('Err: ', err);
            process.exit();
        });
    });
}

if(ANSWERS.port && ANSWERS.name && ANSWERS.email){
    run();
}else{
    Promise.resolve()
    .then(()=>{
        if(!ANSWERS.name) return readlineQuestion('Qual o nome do projeto?')
        else return false;
    })
    .then((answer)=>{
        if(answer != false) ANSWERS.name = answer.trim();
        if(!ANSWERS.port) return readlineQuestion('Em qual porta deve funcionar?');
        else return false;
    })
    .then((answer)=>{
        if(answer != false) ANSWERS.port = answer.trim();
        if(!ANSWERS.email) return readlineQuestion('Qual o seu e-mail?');
        else return false;
    })
    .then((answer)=>{
        if(answer != false) ANSWERS.email = answer.trim();
        if(!ANSWERS.git) return readlineQuestion('Qual a URL do repositório GIT [opcional] ?');
        else return false;
    })
    .then((answer)=>{
        if(answer != false) ANSWERS.git = answer.trim();

        run();
    })
    .catch((err)=>{
        console.log('err', err);
    });
}
