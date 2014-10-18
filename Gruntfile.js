
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        expand: true,
        flatten: true,
        cwd: 'src/',
        src: ['*.coffee'],
        dest: 'lib/',
        ext: '.js'
      }
    },
    browserify: {
      compile: {
        src: ['lib/index.js'],
        dest: 'dist/badge.js',
        options: {
          browserifyOptions: {
            standalone: 'badge'
          }
        }
      }
    },
    uglify: {
      compile: {
        files: {
          'dist/badge.min.js': ['dist/badge.js']
        },
        options: {
          sourceMap: true,
          sourceMapName: 'dist/badge.min.map'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', ['coffee', 'browserify']);
  grunt.registerTask('dist', ['build', 'uglify']);
};