angular.module('dash')
  .factory('notification', function($window, $http){

    return {

      send: function(titulo, subtitulo, texto, descricao){

        return new Promise(function(resolve, reject){

          if(!titulo) return reject('Titulo não foi informado');
          if(!subtitulo) subtitulo = 'Não informado';
          if(!texto) return reject('Texto não foi informado');
          if(!descricao) descricao = 'Não informado';

          var data = {};
          data.titulo = titulo;
          data.subtitulo = subtitulo;
          data.texto = texto;
          data.descricao = descricao;
          data.adminId = JSON.parse($window.localStorage.user).id;

          $http.post('/manager/notificacao', data)
            .success(function(data){

              resolve(data);

            })
            .error(function(err){

              reject(err);

            })


        })

      },

      sendbyJson: function(json){

        return new Promise(function(resolve, reject){

          if(!json.titulo) return reject('Titulo não foi informado');
          if(!json.subtitulo) json.subtitulo = 'Não informado';
          if(!json.texto) return reject('Texto não foi informado');
          if(!json.descricao) json.descricao = 'Não informado';

          $http.post('/manager/notificacao', json)
            .success(function(data){

              resolve(data);

            })
            .error(function(err){

              reject(err);

            })


        })

      }


    }


  })
