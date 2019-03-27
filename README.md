# my-application

This is my-application that uses [simple-node-framework](https://github.com/diogolmenezes/simple-node-framework), [write your application description here]

## Tasks

Task | Description
------------ | -------------
npm start | starts the application
npm test  | run unit tests
npm run test:dev | run unit tests without execute nyc report
npm run integration | run integration tests
npm run lint | run eslint
npm run doc:edit | open user interface to edit swagger.yaml file
npm run doc:update | build and update the documentation, do this after change the swagger.yaml and your http://localhost:8090/doc/ will be updated

## Output

The initial simple-node-framework project structure:

File | Description
------------ | -------------
.vscode/launch.json | This file sets up the launch configuration for vscode debuger. By default you can debug appplication using default, staging or production envs ( located at /api/config/env ). And debug unit and integrated tests.
api/ | This is your api main folder
api/config/ | This is your api main folder
api/config/custom-server.js | Simple node framework server
api/config/env | All configuration files
api/config/env/default.json | Configuration file for the default environment (localhost)
api/config/env/testing.json | Configuration file for the testing environment
api/config/env/staging.json | Configuration file for the staging environment
api/config/env/production.json | Configuration file for the production environment
api/modules/ | This is your module folder, create your modules here (Ex.: customer, account, profile)
api/modules/sample-module/ | Sample module to make learning easy
api/modules/sample-module/module/ | Models folder, like moongoose model
api/modules/sample-module/module/customer.js | Sample of customer mongoose model
api/modules/sample-module/repository/ | Repository folder, here you do the database logic
api/modules/sample-module/repository/customer-repository.js | Sample of customer repository
api/modules/sample-module/service/ | Service folder, here you do all your business logic here
api/modules/sample-module/service/customer-service.js | Sample of customer service
api/modules/sample-module/test/ | Unit and integration tests
api/modules/sample-module/test/unit/ | Unit tests
api/modules/sample-module/test/unit/controller.unit.js | Sample of controller unit test
api/modules/sample-module/test/integration/ | Integration tests
api/modules/sample-module/test/integration/controller.integration.js | Sample of integration test
api/modules/sample-module/controller.js | Sample of controller
api/modules/sample-module/route.js | Sample of route mapping
api/doc/ | Documentation folder. This folder is served by framework at http://localhost:8090/doc/
api/doc/swagger.yaml | Change your api documentation. After change, execute *npm run doc:update* task
api/logs/ | Your application logs will be saved here
api/.eslintrc.json | Eslint suggestion file
api/index.json | Entry point of application