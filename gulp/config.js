var util = require('gulp-util');
var dest = util.env.target || './build';
var src = './src';

module.exports = {
    browserSync: {
        server: {
            // We're serving the src folder as well
            // for less sourcemap linking
            baseDir: ['.']
        },
        files: [
            dest + '/**',
            // Exclude Map files
            '!' + dest + '/**.map'
        ]
    },
    concat: {
        src: src + '/*',
        dest: dest
    }
};
