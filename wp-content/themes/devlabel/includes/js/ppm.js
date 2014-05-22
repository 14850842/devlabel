jQuery(document).ready(function(){
	var touch = Modernizr.touch;
	jQuery('.home-image,.single-image').imageScroll({
        imageAttribute: (touch === true) ? 'image-mobile' : 'image',
        touch: touch,
        coverRatio:0.9,
        parallax:true
    });

    jQuery('.swiper-scrollbar-drag').append('adssad');

	jQuery('body').scrollspy({ target: '.navbar-collapse' })

    jQuery('.menu-item-type-custom a,.scrollit').bind('click',function(event){
        var jQueryanchor = jQuery(this);
       /* $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500,'easeInOutExpo');*/
        
        
        jQuery('html, body').stop().animate({
            scrollTop: jQuery(jQueryanchor.attr('href')).offset().top-125
        }, 1500);
        
        event.preventDefault();
    });

    jQuery(window).scroll(function() {    
	    var scroll = jQuery(window).scrollTop();
	     //>=, not <=
	    if (scroll >= 300) {
	        //clearHeader, not clearheader - caps H
	        jQuery("body").addClass("stuck");
	    }
	    if (scroll <= 0) {
	        //clearHeader, not clearheader - caps H
	        jQuery("body").removeClass("stuck");
	    }
	});

    var swiper = new Swiper('.swiper-container', {
        calculateHeight:true,
        //Scrollbar:
        scrollbar: {
            container : '.swiper-scrollbar',
            draggable : true,
            hide: false,
            snapOnRelease: true,
        }
    });

});

jQuery(window).load(function(){

    jQuery('.swiper-scrollbar-drag').append('<span class="fa fa-caret-left"></span> <span class="fa fa-caret-right"></span>');
});
