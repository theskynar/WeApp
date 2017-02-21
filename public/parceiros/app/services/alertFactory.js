angular.module('dash')
  .factory('alert', function(){

    var alert = {};

    alert.send = function(msg, type, delay, pos, align, icon){

      if(!icon && !!type){
        if(type == 'danger') icon = 'ti-na';
        else if(type == 'success') icon = 'ti-check';
      }
      $.notify({
          icon: icon,
          message: msg
        },{
            type: type ? type : 'warning',
            timer: (!!delay) ? delay : 2000,
            placement: {
                from: (!!pos) ? pos : 'bottom',
                align: (!!align) ? align : 'center'
            }
        });

    }

    return alert;
  });
