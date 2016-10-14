module.exports = function(grunt) {

  // Configs.
  grunt.initConfig({
    watch: {
      angular: {
          files: ['public/src/js/Module.js','public/src/js/services/*.js','public/src/js/filters/*.js','public/src/js/directives/*.js','public/src/js/controllers/*.js'],
          tasks: ['concat:dist'],
          options: {
              spawn: false,
              interrupt: true
          },
      },
      sass: {
          files: ['public/src/scss/style.scss'],
          tasks: ['sass:dist'],
          options: {
              spawn: false,
              interrupt: true
          },
      },
      angularDash: {
          files: ['public/srcDash/js/module.js','public/srcDash/js/services/*.js','public/srcDash/js/filters/*.js','public/srcDash/js/directives/*.js','public/srcDash/js/controllers/*.js'],
          tasks: ['concat:dash'],
          options: {
              spawn: false,
              interrupt: true
          },
      },
      sassDash: {
          files: ['public/srcDash/scss/style.scss'],
          tasks: ['sass:dash'],
          options: {
              spawn: false,
              interrupt: true
        },
      },
    },
    concat: {
        options: {
            separator: '',
        },
        dist: {
            src: ['public/src/js/Module.js','public/src/js/services/*.js','public/src/js/filters/*.js','public/src/js/directives/*.js','public/src/js/controllers/*.js'],
            dest: 'public/dest/js/App.js',
        },
        dash: {
            src: ['public/srcDash/js/module.js','public/srcDash/js/services/*.js','public/srcDash/js/filters/*.js','public/srcDash/js/directives/*.js','public/srcDash/js/controllers/*.js'],
            dest: 'public/dest/js/AppDash.js',
        }
    },
    sass: {
        options: {
            sourceMap: false
        },
        dist: {
            files: {
                'public/dest/css/style.css': 'public/src/scss/style.scss'
            }
        },
        dash: {
            files: {
                'public/dest/css/styleDash.css': 'public/srcDash/scss/style.scss'
            }
        }
    },
    nodemon: {
      dev: {
        script: 'server.js',
      },
      options: {
        watch: ['routes/*.js','server.js']
      }
    }


  });

  // Modules.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-nodemon');

  // Default task(s).
  grunt.registerTask('view', ['watch']);
  grunt.registerTask('server', ['nodemon']);

};
