var util = require('gulp-util');
var dest = util.env.target || './build';
var src = './src';

module.exports = {
    browserSync: {
        server: {
            // We're serving the src folder as well
            // for less sourcemap linking
            baseDir: [dest, src]
        },
        files: [
            dest + '/**',
            // Exclude Map files
            '!' + dest + '/**.map'
        ]
    },
    browserify: {
        src: src + '/js/',
        dest: dest + '/js',
        // Enable source maps
        debug: true
    }
};
