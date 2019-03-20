# Change Log

## v1.0.0

- Versão inicial

## v1.0.1

- Inclusão do arquivo de development

## v1.0.2

- Ajustes na configuração do Sonar
- Atualizacao da versao do Framework

## v1.0.3

- Inclusao do wizard de configuração do projeto

## v1.0.4

- Remoção dos comentários de secret nos arquivos de configuração de ambiente

## v1.0.5

- Inclusão do ignore de orign nos arquivos de conriguração de ambiente production, staging e testing

## v1.0.6

- Ajuste das portas utilizadas para rodar os containers
- Alteração da permição do arquivo composeup e dow para 777 (chmod 777)
- Inclusão do parâmetro -strict.perms=false no docker-compose de staging
- Removendo o mapeamento da porta 1938:1936 do docker-compose de homologação
- Ajustes no sonar-project.properties
- Ajuste no nome do log no filebeat.yml e no docker-compose.yml de hml e prd, renomeando logs para log
- Ajuste na versão do filebeat de produção para 5.6.3 no DockerFile de prd

## v1.0.7

- Aplicando o nome do filesystem
- Colocando --build no composeup de hml

## v1.0.8

- Colocando o TestHelper.after() nos testes integrados
- Ajustando o código de finalização da aplicação

## v1.0.9

- Colocando --no-timeouts no launch.json para poder debugar os testes sem dar timeout

## v1.0.10

- Voltando a função que finaliza as conexões caso o restify seja finalizado manualmente

## v1.0.11

- Incluindo recomendação para o formato dos endpoints rest e soap nos arquivos de configuracao

## v1.0.12

- Incluindo configuração do cors e atualizando a versão do FW