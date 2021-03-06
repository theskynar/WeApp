module.exports = function(grunt) {

  grunt.initConfig({

      nodemon: {
        dev: {
            script: 'server.js',
            options: {
                ignore: ['node_modules/**','public/**','Gruntfile.js']
            }
        }
      },

      watch: {

        concat: {
          files: ['public/**/app/**/*.js'],
          tasks: ['concat'],
          options: {
            spawn: false,
            interrupt: true
          }
        },

        sass: {
          files: ['public/**/assets/scss/*.scss'],
          tasks: ['sass'],
          options: {
            spawn: false,
            interrupt: true
          }
        }

      },

      sass: {
        options: {
            sourceMap: true
        },
        manager: {
            files: {
                'public/manager/assets/css/style.css': 'public/manager/assets/scss/style.scss'
            }
        },
        parceiros: {
            files: {
                'public/parceiros/assets/css/style.css': 'public/manager/assets/scss/style.scss'
            }
        }
      },

      concat: {
        options: {
          separator: ''
        },
        manager: {
          src: ['public/manager/app/modules.js','public/manager/app/services/*.js','public/manager/app/filters/*.js','public/manager/app/directives/*.js','public/manager/app/controllers/*.js'],
          dest: 'public/manager/app/app.concat.js'
        },
        parceiros: {
            src: ['public/parceiros/app/modules.js','public/parceiros/app/services/*.js','public/parceiros/app/filters/*.js','public/parceiros/app/directives/*.js','public/parceiros/app/controllers/*.js'],
            dest: 'public/parceiros/app/app.concat.js'
        }
      }

  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('node', ['nodemon']);
  grunt.registerTask('view', ['watch']);

};
