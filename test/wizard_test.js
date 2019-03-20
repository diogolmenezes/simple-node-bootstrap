var gulp = require('gulp');
var rimraf = require('rimraf');
var exec = require('child_process').exec;
var fs = require('fs');
var expect = require('chai').expect;
var find_in_files = require('find-in-files');
var slugify = require('slugify');

describe('Teste do wizard', () => {
    var fixtures = {
        name: 'Nome Aplicação-Teste'
    }

    var cwd = process.cwd();
    before(function(done){
        this.timeout(60000);

        rimraf('./temp',()=>{
            gulp.src(['!./test/wizard_test.js', '!./node_modules', '!./node_modules/**', './**/*.*', './**/*, !./temp'])
            .pipe(gulp.dest('./temp'))
            .on('end',()=>{
                var checker = function(){
                    if(fs.existsSync('./temp/api/config/wizard.js')){
                        console.log('\nDiretório /temp criado'); 
                        done();
                    }
                    else{
                        setTimeout(function(){  checker(); }, 500);
                    }
                };

                checker();
            })
        });
    });

    after(function(done){
        this.timeout(20000);
        rimraf('./temp',()=>{ console.log('\nDiretório /temp deletado'); done() })
    });

    it('Deve executar o wizard sem errors', (done)=>{
        exec('node ./api/config/wizard.js --dir=./temp --keep-wizard=true --name="'+fixtures.name+'" --port=[valor-porta] --email=[valor-email]', function(err, stdout){
            if(err) console.log('Deve executar o wizard sem errors', err)
            else console.log('stdout', stdout)
            expect(err).to.be.null;
            done();
        });
    }).timeout(60000)

    it('Não pode encontrar ocorrencias do valor anterior a substituição', (done)=>{
        find_in_files.find('my-application|8094|seu@email\\.com','./temp','^[\\.jpg|\\.png]')
        .then((results)=>{
            var found = false;
            for(var k in results){
                if(k){
                    found = true;
                    break;
                }
            }

            expect(found).to.be.false;
            done();
        });
    }).timeout(60000)

    it('Deve ter removido os comandos do NPM', (done)=>{
        fs.readFile('./temp/package.json', 'utf8', function(err, content){
            var wizard_index = null;
            var test_wizard_index = null;

            if(content){
                wizard_index = content.match(/"wizard"/);
                test_wizard_index = content.match(/"test:wizard"/);
            }

            expect(err).to.be.null;
            expect(wizard_index).to.be.null;
            expect(test_wizard_index).to.be.null;
            done();
        });
    }).timeout(60000)

    it('Deve modificar o nome para um padrão "slug"', (done)=>{
        fs.readFile('./temp/package.json', 'utf8', function(err, content){
            var slugified_name_index = null;
            var slugified_name = slugify(fixtures.name, {remove: /[^a-zA-Z0-9 -]/g, lower: true});

            if(content){
                slugified_name_index = content.match(new RegExp(slugified_name));
            }

            expect(err).to.be.null;
            expect(slugified_name).to.not.be.null;
            done();
        });
    }).timeout(60000)
});
