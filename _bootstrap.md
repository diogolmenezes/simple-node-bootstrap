# Visão Geral

O [bootstrap](http://dadhx01.interno/oidigital/easy-bootstrap) de projeto disponibiliza a estrutura padrão de diretórios e um conjunto mínimo de funcionalidades para construção de uma API em nodejs.

Esse bootstrap faz uso do [framework de desenvolvimento de APIs nodeJs](http://dadhx01.interno/oidigital/simple-node-framework) da Oi.

## Responsáveis

- Diogo Menezes <diogo.leitao@oi.net.br>

## Instalando

Para iniciar um novo projeto utilizando o bootstrap você precisará seguir os seguintes passos:

- Clone o projeto easy-bootstrap
- Remova o diretório .git
- Instale o nodemon sudo `npm install -g nodemon`
- Instale as dependências do projeto `npm install`

### Customizando

Uma vez instalado, você já pode começar a customizar os arquivos de acordo com as necessidades do seu projeto.

A aplicação exemplo se chama **my-application**, logo se você buscar nos arquivos por **my-application** você encontrará pontos que devem ser renomeados para o novo nome do seu projeto.

A porta utilizada como padrão desse bootstrap foi a 8094, portanto se você buscar nos arquivos por **8094** encontrá os pontos de alteração no número da porta.

Você pode utilizar o Wizard de customização para facilitar essas alterações.

### Wizard de customização

Este projeto acompanha um Wizard de customização que ajudará você a inicializar sua aplicação. Para executá-lo, digite no terminal na raiz do projeto `npm run wizard`.

O Wizard de customização apenas estará disponível na primeira execução e se destruirá em seguida.

**Importante:** se você não utilizar o Wizard de customização você deve mudar o repositório GIT antes de começar a enviar arquivos. Execute `git remote add origin <URL do repositório GIT>`

## Descrição das classes e diretórios

Cada diretório encontrado no clone inicial do bootstrap tem seu propósito descrito abaixo:

- **.vscode/** - Contém o arquivo de configuração da IDE VsCode. É esse arquivo que permite que você faça o debug separado por ambiente direto da IDE.
- **api/** - Contém toda a estrutura de configuração e implementação da API.
- **api/config** - Contém os arquivos que extendem funcionalidades do framework.
- **api/config/env** - Contém os arquivos de configuração da API separados por ambiente. Default (local), Production (produção), staging (homologação), testing (teste).
- **api/integration/rest** - Contém as classes que mapeiam os serviços REST que a aplicação irá consumir.
- **api/integration/soap** - Contém as classes que mapeiam os serviços SOAP que a aplicação irá consumir.
- **api/modules/** - Contém os módulos da API
- **api/modules/cliente/** - Contem um exemplo completo de módulo, bem como a estrutura de arquivos recomendada.
- **api/swagger/** - Contém o arquivo de documentação do swagger já com um exemplo de mapeamento de API. Esse arquivo deve ser alterado sempre que um endpoint for criado ou alterado.
- **api/util/** - Contém os arquivos de utilidade do projeto. Por exemplo uma classe de validação de cpf, criptografia etc.
- **bin/** - Contém os arquivos de configuração do docker, filebeat e scripts utilizados no deploy, separados por ambiente.
- **doc/** - Contém os arquivos que serão gerados automaticamente e disponibilizam a documentação gerada pelo swagger que ficará acessível através da rota http://localhost:porta/doc/index.htm
- **log/** - Contém os logs da aplicação. As configurações de log podem ser encontradas no arquivo de configuração da aplicação em /config/env
- **test/reports** - Contém os relatórios de teste gerados pelo ny.
- **.eslintrc.json** - Contém as definições de lint utilizadas pela Oi.
- **.gitignore** - Contém os arquivos ignorados do projeto.
- **app.js** - É o entrypoint da aplicação, tudo começa por esse arquivo.
- **changelog.md** - Arquivo recomendado para que sejam mapeadas todas as mudanças do projeto a cada release.
- **gulpfile.js** - É o arquivo de tarefas do gulp, utilizado para geração automatica do site de documentação.
- **jenkins.properties** - Arquivo que contém as variáveis necessárias para fazer deploy utilizando o jenkins. Esse arquivo deve ser ajustado para o seu projeto conforme os parâmetos sugeridos pela equipe de devops.
- **Jenkinfile** - Arquivo que de configurações do jenkins, não precisa ser alterado pois é mantido pela equipe de Devops.
- **package.json** - Arquivo de configuração do projeto node, contendo entre outas coisas as dependências do projeto.
- **README.md** - Arquivo de README com o formato padrão sugerido.
- **sonar-project.properties** - Arquivo que contém as variáveis necessárias para fazer a configuração do SONAR no projeto. Esse arquivo deve ser ajustado para o seu projeto conforme os parâmetos sugeridos pela equipe de devops.
