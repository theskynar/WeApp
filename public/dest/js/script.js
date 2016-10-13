(function(){
  $(document).ready(function(){
    //Modal open.
    $('.modal-open').click(function(){
      $('.signup-modal').modal('show');
    });
    //Configura largura do item.
    itemWidth();
    $(window).resize(itemWidth);
    // end.
    // Carrousel slider.
    $('.content').mCustomScrollbar({
      axis: 'x',
      theme: 'minimal-dark',
      snapAmount: itemWidth()
    });
    $('.arrow-r').click(function(e){
      var slider = $('.content');
      slider.mCustomScrollbar("scrollTo",'+= -' + (itemWidth() + 1) + 'px');
    });
    $('.arrow-l').click(function(e){
      var slider = $('.content');
      slider.mCustomScrollbar("scrollTo",'+=' + (itemWidth() + 1) + 'px');
    });
    // end.
    // Menu Toggle.
    $('.menu-toogle').click(function(){
      $('.menu-toogle').toggleClass('active');
    });
    // end.
    // on click in menu link, close this.
    $('.sidemenu ul li a').click(function(e){
      $('.menu-toogle').toggleClass('active');
    });
    // end.
    // Smoth scroll!
    $('a.scroll').click(function(event){
      event.preventDefault();
      var target = $(event.target).attr('href');
      if(target != 'top'){
        $('html, body').animate({
          scrollTop: $(target).offset().top - 70
        }, 800);
      }else {
        $('html, body').animate({
          scrollTop: 0
        }, 800);
      }
    });
    // end.
    // Change header style on scroll > 0;
    $(window).scroll(function(){
      if($("body").scrollTop() != 0){
        $('nav.navbar.navbar-default').css({
          'height':'70px',
          'background':'rgba(0,0,0, 0.7)'
        });
        $('nav.navbar.navbar-default a.navbar-brand').css({
          'font-size':'20px',
          'height':'50px',
          'line-height':'50px',
          'margin':'10px',
          'border':'none'
        });
        $('nav.navbar.navbar-default li a').css({
          'height':'70px',
          'line-height':'70px'
        });
        $('.menu-toogle').css({
          'margin': '23px 15px'
        });
      }else {
        $('nav.navbar.navbar-default').css({
          'height':'100px',
          'background':'transparent'
        });
        if(!$('a.navbar-brand').hasClass('noborder'))
          $('nav.navbar.navbar-default a.navbar-brand').css({
            'font-size':'36px',
            'height':'60px',
            'line-height':'60px',
            'margin':'20px',
            'border':'1px solid #eee'
          });
        else
          $('nav.navbar.navbar-default a.navbar-brand').css({
            'font-size':'36px',
            'height':'60px',
            'line-height':'60px',
            'margin':'20px'
          });
        $('nav.navbar.navbar-default li a').css({
          'height':'100px',
          'line-height':'100px'
        });
        $('.menu-toogle').css({
          'margin': '38px 15px'
        });
      }
    });
    // end.
  });
})();

// Function reload slider item width.
function itemWidth(){
  if($(window).width() <= 600){
    $('.slider .item').css({
      'width': $('.content').outerWidth() + 'px'
    });
    return ($('.content').outerWidth());
  }else if($(window).width() > 600 && $(window).width() <= 992){
    $('.slider .item').css({
      'width': ($('.content').outerWidth()/2) + 'px'
    });
    return ($('.content').outerWidth()/2);
  }else {
    $('.slider .item').css({
      'width': ($('.content').outerWidth()/3) + 'px'
    });
    return ($('.content').outerWidth()/3);
  }
}
// end.
