const gulp = require('gulp');
const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

gulp.task('swagger', () => {
    const doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'api/swagger/swagger.yaml')));
    fs.writeFileSync(
        path.join(__dirname, 'doc/swagger.json'),
        JSON.stringify(doc, null, ' ')
    );
});

gulp.task('watch', () => {
    gulp.watch(path.join(__dirname, 'api/swagger/swagger.yaml'), ['swagger']);
});
