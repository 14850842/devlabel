/**
 * Author: Peder A. Nielsen
 * Created date: 05.12.13
 * Updated date: 15.01.14
 * Version: 0.1
 * Company: Making Waves
 * Licensed under the MIT license
 */
(function(e,t){if(typeof define==="function"&&define.amd){define(["jquery"],t)}else{t(e.jQuery)}})(this,function(e){"use strict";function g(e,t){return typeof e===t}function y(e,t){return!!~(""+e).indexOf(t)}function b(e,t){for(var n in e){var r=e[n];if(!y(r,"-")&&u[r]!==undefined){return t=="pfx"?r:true}}return false}function w(e,t,n){for(var r in e){var i=t[e[r]];if(i!==undefined){if(n===false)return e[r];if(g(i,"function")){return i.bind(n||t)}return i}}return false}function E(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),i=(e+" "+f.join(r+" ")+r).split(" ");if(g(t,"string")||g(t,"undefined")){return b(i,t)}else{i=(e+" "+l.join(r+" ")+r).split(" ");return w(i,t,n)}}var t,n={image:null,imageAttribute:"image",container:e("body"),speed:.2,coverRatio:.75,holderMinHeight:200,extraHeight:0,mediaWidth:1600,mediaHeight:900,parallax:true,touch:false},r={},i=document.documentElement,s="imageScrollModernizr",o=document.createElement(s),u=o.style,a="Webkit Moz O ms",f=a.split(" "),l=a.toLowerCase().split(" "),c={},h=e(window),p=0,d="",v,m=function(e,t,n,r){var o,u,a,f,l=document.createElement("div"),c=document.body,h=c||document.createElement("body");if(parseInt(n,10)){while(n--){a=document.createElement("div");a.id=r?r[n]:s+(n+1);l.appendChild(a)}}o=["&#173;",'<style id="s',s,'">',e,"</style>"].join("");l.id=s;(c?l:h).innerHTML+=o;h.appendChild(l);if(!c){h.style.background="";h.style.overflow="hidden";f=i.style.overflow;i.style.overflow="hidden";i.appendChild(h)}u=t(l,e);if(!c){h.parentNode.removeChild(h);i.style.overflow=f}else{l.parentNode.removeChild(l)}return!!u};c["csstransforms"]=function(){return!!E("transform")};c["csstransforms3d"]=function(){var e=!!E("perspective");if(e&&"webkitPerspective"in i.style){m("@media (transform-3d),(-webkit-transform-3d){#imageScrollModernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=t.offsetLeft===9&&t.offsetHeight===3})}return e};r.prefixed=function(e,t,n){if(!t){return E(e,"pfx")}else{return E(e,t,n)}};window.requestAnimationFrame=r.prefixed("requestAnimationFrame",window)||function(e,t){var n=(new Date).getTime();var r=Math.max(0,16-(n-p));var i=window.setTimeout(function(){e(n+r)},r);p=n+r;return i};if(c["csstransforms3d"]()){d="csstransforms3d"}else if(c["csstransforms"]()){d="csstransforms"}if(d!==""){v=r.prefixed("transform")}t=function(t,r){return{init:function(){this.$imageHolder=e(t);this.settings=e.extend({},n,r);this.image=this.$imageHolder.data(this.settings.imageAttribute)||this.settings.image;this.mediaWidth=this.$imageHolder.data("width")||this.settings.mediaWidth;this.mediaHeight=this.$imageHolder.data("height")||this.settings.mediaHeight;this.coverRatio=this.$imageHolder.data("cover-ratio")||this.settings.coverRatio;this.extraHeight=this.$imageHolder.data("extra-height")||this.settings.extraHeight;this.ticking=false;if(this.image){this.$scrollingElement=e("<img/>",{src:this.image})}else{throw new Error("You need to provide either a data-img attr or an image option")}if(this.settings.touch===true){this.$scrollingElement.css({maxWidth:"100%"}).prependTo(this.$imageHolder)}else if(this.settings.parallax===true){this.$scrollerHolder=e("<div/>",{html:this.$imageHolder.html()}).css(this._getCSSObject({transform:v,top:0,left:0,x:0,y:0,visibility:"hidden",position:"fixed",overflow:"hidden"})).prependTo(this.settings.container);this.$imageHolder.css("visibility","hidden").empty();this.$scrollingElement.css({position:"absolute",visibility:"hidden",maxWidth:"none"}).prependTo(this.$scrollerHolder)}else{this.$scrollerHolder=this.$imageHolder.css({overflow:"hidden"});this.$scrollingElement.css({position:"relative",overflow:"hidden"}).prependTo(this.$imageHolder)}if(this.settings.touch===false){this._adjustImgHolderHeights();if(this.settings.parallax===true){this._updatePositions()}else{this._updateFallbackPositions()}this._bindEvents()}},_adjustImgHolderHeights:function(){var e=h.height(),t=h.width(),n=this.coverRatio*e,r,i,s,o,u,a,f,l,c,p,d,v;n=(this.settings.holderMinHeight<n?Math.floor(n):this.settings.holderMinHeight)+this.extraHeight;c=Math.floor(e-(e-n)*this.settings.speed);f=Math.round(this.mediaWidth*(c/this.mediaHeight));if(f>=t){l=c}else{f=t;l=Math.round(this.mediaHeight*(f/this.mediaWidth))}p=(c-n)/2;d=(l-c)/2;v=(e-n)/2;s=-(e/v*p)-d;o=n/v*p-d;u=o-s;a=e+n;r=-(p+d);i=Math.round((f-t)*-.5);this.$scrollingElement.css({height:l,width:f});this.$imageHolder.height(n);this.$scrollerHolder.css({height:n,width:f});this.scrollingState={winHeight:e,fromY:s,imgTopPos:r,imgLeftPos:i,imgHolderHeight:n,imgScrollingDistance:u,travelDistance:a,holderDistanceFromTop:this.$imageHolder.offset().top-h.scrollTop()}},_bindEvents:function(){var e=this;h.on("resize",function(t){e._adjustImgHolderHeights();if(e.settings.parallax===true){e._requestTick()}else{e._updateFallbackPositions()}});if(this.settings.parallax===true){h.on("scroll",function(t){e.scrollingState.holderDistanceFromTop=e.$imageHolder.offset().top-h.scrollTop();e._requestTick()})}},_requestTick:function(){var e=this;if(!this.ticking){this.ticking=true;requestAnimationFrame(function(){e._updatePositions()})}},_updatePositions:function(){if(this.scrollingState.holderDistanceFromTop<=this.scrollingState.winHeight&&this.scrollingState.holderDistanceFromTop>=-this.scrollingState.imgHolderHeight){var e=this.scrollingState.holderDistanceFromTop+this.scrollingState.imgHolderHeight,t=e/this.scrollingState.travelDistance,n=Math.round(this.scrollingState.fromY+this.scrollingState.imgScrollingDistance*(1-t));this.$scrollerHolder.css(this._getCSSObject({transform:v,x:Math.ceil(this.scrollingState.imgLeftPos),y:Math.round(this.scrollingState.holderDistanceFromTop),visibility:"visible"}));this.$scrollingElement.css(this._getCSSObject({transform:v,x:0,y:n,visibility:"visible"}))}else{this.$scrollerHolder.css({visibility:"hidden"});this.$scrollingElement.css({visibility:"hidden"})}this.ticking=false},_updateFallbackPositions:function(){this.$scrollerHolder.css({width:"100%"});this.$scrollingElement.css({top:this.scrollingState.imgTopPos,left:this.scrollingState.imgLeftPos})},_getCSSObject:function(e){if(d==="csstransforms3d"){e.transform="translate3d("+e.x+"px, "+e.y+"px, 0)"}else if(d==="csstransforms"){e.transform="translate("+e.x+"px, "+e.y+"px)"}else{e.top=e.y;e.left=e.x}return e}}};t.defaults=n;e.fn.imageScroll=function(e){return this.each(function(){(new t(this,e)).init()})};return t});

// Sticky Plugin v1.0.0 for jQuery
// =============
// Author: Anthony Garand
// Improvements by German M. Bravo (Kronuz) and Ruud Kamphuis (ruudk)
// Improvements by Leonardo C. Daronco (daronco)
// Created: 2/14/2011
// Date: 2/12/2012
// Website: http://labs.anthonygarand.com/sticky
// Description: Makes an element on the page stick on the screen as you scroll
//       It will only set the 'top' and 'position' of your element, you
//       might need to adjust the width in some cases.

(function($) {
    var defaults = {
            topSpacing: 0,
            bottomSpacing: 0,
            className: 'is-sticky',
            wrapperClassName: 'sticky-wrapper',
            center: false,
            getWidthFrom: ''
        },
        $window = $(window),
        $document = $(document),
        sticked = [],
        windowHeight = $window.height(),
        scroller = function() {
            var scrollTop = $window.scrollTop(),
                documentHeight = $document.height(),
                dwh = documentHeight - windowHeight,
                extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

            for (var i = 0; i < sticked.length; i++) {
                var s = sticked[i],
                    elementTop = s.stickyWrapper.offset().top,
                    etse = elementTop - s.topSpacing - extra;

                if (scrollTop <= etse) {
                    if (s.currentTop !== null) {
                        s.stickyElement
                            .css('position', '')
                            .css('top', '');
                        s.stickyElement.parent().removeClass(s.className);
                        jQuery('body').removeClass('stuck');
                        s.currentTop = null;
                    }
                }
                else {
                    var newTop = documentHeight - s.stickyElement.outerHeight()
                        - s.topSpacing - s.bottomSpacing - scrollTop - extra;
                    if (newTop < 0) {
                        newTop = newTop + s.topSpacing;
                    } else {
                        newTop = s.topSpacing;
                    }
                    if (s.currentTop != newTop) {
                        s.stickyElement
                            .css('position', 'fixed')
                            .css('top', newTop)
                            .css('width','100%');

                        if (typeof s.getWidthFrom !== 'undefined') {
                            s.stickyElement.css('width', $(s.getWidthFrom).width());
                        }

                        s.stickyElement.parent().addClass(s.className);
                        jQuery('body').addClass('stuck');
                        s.currentTop = newTop;
                    }
                }
            }
        },
        resizer = function() {
            windowHeight = $window.height();
        },
        methods = {
            init: function(options) {
                var o = $.extend(defaults, options);
                return this.each(function() {
                    var stickyElement = $(this);

                    stickyId = stickyElement.attr('id');
                    wrapper = $('<div></div>')
                        .attr('id', stickyId + '-sticky-wrapper')
                        .addClass(o.wrapperClassName);
                    stickyElement.wrapAll(wrapper);

                    if (o.center) {
                        stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
                    }

                    if (stickyElement.css("float") == "right") {
                        stickyElement.css({"float":"none"}).parent().css({"float":"right"});
                    }

                    var stickyWrapper = stickyElement.parent();
                    //stickyWrapper.css('height', stickyElement.outerHeight());
                    sticked.push({
                        topSpacing: o.topSpacing,
                        bottomSpacing: o.bottomSpacing,
                        stickyElement: stickyElement,
                        currentTop: null,
                        stickyWrapper: stickyWrapper,
                        className: o.className,
                        getWidthFrom: o.getWidthFrom
                    });
                });
            },
            update: scroller
        };

    // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
    if (window.addEventListener) {
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', resizer, false);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scroller);
        window.attachEvent('onresize', resizer);
    }

    $.fn.sticky = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.sticky');
        }
    };
    $(function() {
        setTimeout(scroller, 0);
    });
})(jQuery);

/*
* Swiper 2.3 - Mobile Touch Slider
* http://www.idangero.us/sliders/swiper/
*
* Copyright 2012-2013, Vladimir Kharlampidi
* The iDangero.us
* http://www.idangero.us/
*
* Licensed under GPL & MIT
*
* Updated on: November 2, 2013
*/
var Swiper=function(f,b){function h(a,b){return document.querySelectorAll?(b||document).querySelectorAll(a):jQuery(a,b)}function g(){var c=A-l;b.freeMode&&(c=A-l);b.slidesPerView>a.slides.length&&(c=0);0>c&&(c=0);return c}function k(){function c(c){var d=new Image;d.onload=function(){a.imagesLoaded++;if(a.imagesLoaded==a.imagesToLoad.length&&(a.reInit(),b.onImagesReady))b.onImagesReady(a)};d.src=c}var d=a.h.addEventListener;a.browser.ie10?(d(a.wrapper,a.touchEvents.touchStart,B),d(document,a.touchEvents.touchMove,
C),d(document,a.touchEvents.touchEnd,D)):(a.support.touch&&(d(a.wrapper,"touchstart",B),d(a.wrapper,"touchmove",C),d(a.wrapper,"touchend",D)),b.simulateTouch&&(d(a.wrapper,"mousedown",B),d(document,"mousemove",C),d(document,"mouseup",D)));b.autoResize&&d(window,"resize",a.resizeFix);p();a._wheelEvent=!1;if(b.mousewheelControl){void 0!==document.onmousewheel&&(a._wheelEvent="mousewheel");try{WheelEvent("wheel"),a._wheelEvent="wheel"}catch(e){}a._wheelEvent||(a._wheelEvent="DOMMouseScroll");a._wheelEvent&&
d(a.container,a._wheelEvent,N)}b.keyboardControl&&d(document,"keydown",O);if(b.updateOnImagesReady)for(a.imagesToLoad=h("img",a.container),d=0;d<a.imagesToLoad.length;d++)c(a.imagesToLoad[d].getAttribute("src"))}function p(){var c=a.h.addEventListener,d;if(b.preventLinks){var e=h("a",a.container);for(d=0;d<e.length;d++)c(e[d],"click",P)}if(b.releaseFormElements)for(e=h("input, textarea, select",a.container),d=0;d<e.length;d++)c(e[d],a.touchEvents.touchStart,Q,!0);if(b.onSlideClick)for(d=0;d<a.slides.length;d++)c(a.slides[d],
"click",R);if(b.onSlideTouch)for(d=0;d<a.slides.length;d++)c(a.slides[d],a.touchEvents.touchStart,S)}function s(){var c=a.h.removeEventListener,d;if(b.onSlideClick)for(d=0;d<a.slides.length;d++)c(a.slides[d],"click",R);if(b.onSlideTouch)for(d=0;d<a.slides.length;d++)c(a.slides[d],a.touchEvents.touchStart,S);if(b.releaseFormElements){var e=h("input, textarea, select",a.container);for(d=0;d<e.length;d++)c(e[d],a.touchEvents.touchStart,Q,!0)}if(b.preventLinks)for(e=h("a",a.container),d=0;d<e.length;d++)c(e[d],
"click",P)}function O(c){var b=c.keyCode||c.charCode;if(37==b||39==b||38==b||40==b){for(var e=!1,f=a.h.getOffset(a.container),v=a.h.windowScroll().left,g=a.h.windowScroll().top,h=a.h.windowWidth(),k=a.h.windowHeight(),f=[[f.left,f.top],[f.left+a.width,f.top],[f.left,f.top+a.height],[f.left+a.width,f.top+a.height]],l=0;l<f.length;l++){var q=f[l];q[0]>=v&&q[0]<=v+h&&q[1]>=g&&q[1]<=g+k&&(e=!0)}if(!e)return}if(m){if(37==b||39==b)c.preventDefault?c.preventDefault():c.returnValue=!1;39==b&&a.swipeNext();
37==b&&a.swipePrev()}else{if(38==b||40==b)c.preventDefault?c.preventDefault():c.returnValue=!1;40==b&&a.swipeNext();38==b&&a.swipePrev()}}function N(c){var d=a._wheelEvent,e;c.detail?e=-c.detail:"mousewheel"==d?e=c.wheelDelta:"DOMMouseScroll"==d?e=-c.detail:"wheel"==d&&(e=Math.abs(c.deltaX)>Math.abs(c.deltaY)?-c.deltaX:-c.deltaY);b.freeMode?(d=a.getWrapperTranslate()+e,0<d&&(d=0),d<-g()&&(d=-g()),a.setWrapperTransition(0),a.setWrapperTranslate(d),a.updateActiveSlide(d)):0>e?a.swipeNext():a.swipePrev();
b.autoplay&&a.stopAutoplay(!0);c.preventDefault?c.preventDefault():c.returnValue=!1;return!1}function R(c){a.allowSlideClick&&(T(c),b.onSlideClick(a,c))}function S(c){T(c);b.onSlideTouch(a,c)}function T(c){if(c.currentTarget)a.clickedSlide=c.currentTarget;else{c=c.srcElement;do if(-1<c.className.indexOf(b.slideClass))break;while(c=c.parentNode);a.clickedSlide=c}a.clickedSlideIndex=a.slides.indexOf(a.clickedSlide);a.clickedSlideLoopIndex=a.clickedSlideIndex-(a.loopedSlides||0)}function P(c){if(!a.allowLinks)return c.preventDefault?
c.preventDefault():c.returnValue=!1,!1}function Q(a){a.stopPropagation?a.stopPropagation():a.returnValue=!1;return!1}function B(c){b.preventLinks&&(a.allowLinks=!0);if(a.isTouched||b.onlyExternal)return!1;var d;if(d=b.noSwiping)if(d=c.target||c.srcElement){d=c.target||c.srcElement;var e=!1;do-1<d.className.indexOf(b.noSwipingClass)&&(e=!0),d=d.parentElement;while(!e&&d.parentElement&&-1==d.className.indexOf(b.wrapperClass));!e&&-1<d.className.indexOf(b.wrapperClass)&&-1<d.className.indexOf(b.noSwipingClass)&&
(e=!0);d=e}if(d)return!1;H=!1;a.isTouched=!0;x="touchstart"==c.type;if(!x||1==c.targetTouches.length){a.callPlugins("onTouchStartBegin");x||(c.preventDefault?c.preventDefault():c.returnValue=!1);d=x?c.targetTouches[0].pageX:c.pageX||c.clientX;c=x?c.targetTouches[0].pageY:c.pageY||c.clientY;a.touches.startX=a.touches.currentX=d;a.touches.startY=a.touches.currentY=c;a.touches.start=a.touches.current=m?d:c;a.setWrapperTransition(0);a.positions.start=a.positions.current=a.getWrapperTranslate();a.setWrapperTranslate(a.positions.start);
a.times.start=(new Date).getTime();y=void 0;0<b.moveStartThreshold&&(M=!1);if(b.onTouchStart)b.onTouchStart(a);a.callPlugins("onTouchStartEnd")}}function C(c){if(a.isTouched&&!b.onlyExternal&&(!x||"mousemove"!=c.type)){var d=x?c.targetTouches[0].pageX:c.pageX||c.clientX,e=x?c.targetTouches[0].pageY:c.pageY||c.clientY;"undefined"===typeof y&&m&&(y=!!(y||Math.abs(e-a.touches.startY)>Math.abs(d-a.touches.startX)));"undefined"!==typeof y||m||(y=!!(y||Math.abs(e-a.touches.startY)<Math.abs(d-a.touches.startX)));
if(y)a.isTouched=!1;else if(c.assignedToSwiper)a.isTouched=!1;else if(c.assignedToSwiper=!0,b.preventLinks&&(a.allowLinks=!1),b.onSlideClick&&(a.allowSlideClick=!1),b.autoplay&&a.stopAutoplay(!0),!x||1==c.touches.length){if(!a.isMoved&&(a.callPlugins("onTouchMoveStart"),b.loop&&(a.fixLoop(),a.positions.start=a.getWrapperTranslate()),b.onTouchMoveStart))b.onTouchMoveStart(a);a.isMoved=!0;c.preventDefault?c.preventDefault():c.returnValue=!1;a.touches.current=m?d:e;a.positions.current=(a.touches.current-
a.touches.start)*b.touchRatio+a.positions.start;if(0<a.positions.current&&b.onResistanceBefore)b.onResistanceBefore(a,a.positions.current);if(a.positions.current<-g()&&b.onResistanceAfter)b.onResistanceAfter(a,Math.abs(a.positions.current+g()));b.resistance&&"100%"!=b.resistance&&(0<a.positions.current&&(c=1-a.positions.current/l/2,a.positions.current=0.5>c?l/2:a.positions.current*c),a.positions.current<-g()&&(d=(a.touches.current-a.touches.start)*b.touchRatio+(g()+a.positions.start),c=(l+d)/l,d=
a.positions.current-d*(1-c)/2,e=-g()-l/2,a.positions.current=d<e||0>=c?e:d));b.resistance&&"100%"==b.resistance&&(0<a.positions.current&&(!b.freeMode||b.freeModeFluid)&&(a.positions.current=0),a.positions.current<-g()&&(!b.freeMode||b.freeModeFluid)&&(a.positions.current=-g()));if(b.followFinger){b.moveStartThreshold?Math.abs(a.touches.current-a.touches.start)>b.moveStartThreshold||M?(M=!0,a.setWrapperTranslate(a.positions.current)):a.positions.current=a.positions.start:a.setWrapperTranslate(a.positions.current);
(b.freeMode||b.watchActiveIndex)&&a.updateActiveSlide(a.positions.current);b.grabCursor&&(a.container.style.cursor="move",a.container.style.cursor="grabbing",a.container.style.cursor="-moz-grabbin",a.container.style.cursor="-webkit-grabbing");F||(F=a.touches.current);I||(I=(new Date).getTime());a.velocity=(a.touches.current-F)/((new Date).getTime()-I)/2;2>Math.abs(a.touches.current-F)&&(a.velocity=0);F=a.touches.current;I=(new Date).getTime();a.callPlugins("onTouchMoveEnd");if(b.onTouchMove)b.onTouchMove(a);
return!1}}}}function D(c){y&&a.swipeReset();if(!b.onlyExternal&&a.isTouched){a.isTouched=!1;b.grabCursor&&(a.container.style.cursor="move",a.container.style.cursor="grab",a.container.style.cursor="-moz-grab",a.container.style.cursor="-webkit-grab");a.positions.current||0===a.positions.current||(a.positions.current=a.positions.start);b.followFinger&&a.setWrapperTranslate(a.positions.current);a.times.end=(new Date).getTime();a.touches.diff=a.touches.current-a.touches.start;a.touches.abs=Math.abs(a.touches.diff);
a.positions.diff=a.positions.current-a.positions.start;a.positions.abs=Math.abs(a.positions.diff);var d=a.positions.diff,e=a.positions.abs;c=a.times.end-a.times.start;5>e&&300>c&&!1==a.allowLinks&&(b.freeMode||0==e||a.swipeReset(),b.preventLinks&&(a.allowLinks=!0),b.onSlideClick&&(a.allowSlideClick=!0));setTimeout(function(){b.preventLinks&&(a.allowLinks=!0);b.onSlideClick&&(a.allowSlideClick=!0)},100);var f=g();if(!a.isMoved&&b.freeMode)a.isMoved=!1;else if(!a.isMoved||0<a.positions.current||a.positions.current<
-f)a.swipeReset();else if(a.isMoved=!1,b.freeMode){if(b.freeModeFluid){var e=1E3*b.momentumRatio,d=a.positions.current+a.velocity*e,v=!1,h,k=20*Math.abs(a.velocity)*b.momentumBounceRatio;d<-f&&(b.momentumBounce&&a.support.transitions?(d+f<-k&&(d=-f-k),h=-f,H=v=!0):d=-f);0<d&&(b.momentumBounce&&a.support.transitions?(d>k&&(d=k),h=0,H=v=!0):d=0);0!=a.velocity&&(e=Math.abs((d-a.positions.current)/a.velocity));a.setWrapperTranslate(d);a.setWrapperTransition(e);b.momentumBounce&&v&&a.wrapperTransitionEnd(function(){if(H){if(b.onMomentumBounce)b.onMomentumBounce(a);
a.setWrapperTranslate(h);a.setWrapperTransition(300)}});a.updateActiveSlide(d)}(!b.freeModeFluid||300<=c)&&a.updateActiveSlide(a.positions.current)}else{G=0>d?"toNext":"toPrev";"toNext"==G&&300>=c&&(30>e||!b.shortSwipes?a.swipeReset():a.swipeNext(!0));"toPrev"==G&&300>=c&&(30>e||!b.shortSwipes?a.swipeReset():a.swipePrev(!0));f=0;if("auto"==b.slidesPerView){for(var d=Math.abs(a.getWrapperTranslate()),n=v=0;n<a.slides.length;n++)if(k=m?a.slides[n].getWidth(!0):a.slides[n].getHeight(!0),v+=k,v>d){f=
k;break}f>l&&(f=l)}else f=r*b.slidesPerView;"toNext"==G&&300<c&&(e>=0.5*f?a.swipeNext(!0):a.swipeReset());"toPrev"==G&&300<c&&(e>=0.5*f?a.swipePrev(!0):a.swipeReset())}if(b.onTouchEnd)b.onTouchEnd(a);a.callPlugins("onTouchEnd")}}function J(c,d,e){function f(){g+=h;if(l="toNext"==k?g>c:g<c)a.setWrapperTranslate(Math.round(g)),a._DOMAnimating=!0,window.setTimeout(function(){f()},1E3/60);else{if(b.onSlideChangeEnd)b.onSlideChangeEnd(a);a.setWrapperTranslate(c);a._DOMAnimating=!1}}var v="to"==d&&0<=e.speed?
e.speed:b.speed;if(a.support.transitions||!b.DOMAnimation)a.setWrapperTranslate(c),a.setWrapperTransition(v);else{var g=a.getWrapperTranslate(),h=Math.ceil((c-g)/v*(1E3/60)),k=g>c?"toNext":"toPrev",l="toNext"==k?g>c:g<c;if(a._DOMAnimating)return;f()}a.updateActiveSlide(c);if(b.onSlideNext&&"next"==d)b.onSlideNext(a,c);if(b.onSlidePrev&&"prev"==d)b.onSlidePrev(a,c);if(b.onSlideReset&&"reset"==d)b.onSlideReset(a,c);("next"==d||"prev"==d||"to"==d&&!0==e.runCallbacks)&&W()}function W(){a.callPlugins("onSlideChangeStart");
if(b.onSlideChangeStart)if(b.queueStartCallbacks&&a.support.transitions){if(a._queueStartCallbacks)return;a._queueStartCallbacks=!0;b.onSlideChangeStart(a);a.wrapperTransitionEnd(function(){a._queueStartCallbacks=!1})}else b.onSlideChangeStart(a);b.onSlideChangeEnd&&(a.support.transitions?b.queueEndCallbacks?a._queueEndCallbacks||(a._queueEndCallbacks=!0,a.wrapperTransitionEnd(b.onSlideChangeEnd)):a.wrapperTransitionEnd(b.onSlideChangeEnd):b.DOMAnimation||setTimeout(function(){b.onSlideChangeEnd(a)},
10))}function U(){for(var c=a.paginationButtons,b=0;b<c.length;b++)a.h.removeEventListener(c[b],"click",V)}function V(b){var d;b=b.target||b.srcElement;for(var e=a.paginationButtons,f=0;f<e.length;f++)b===e[f]&&(d=f);a.swipeTo(d)}function X(){a.calcSlides();0<b.loader.slides.length&&0==a.slides.length&&a.loadSlides();b.loop&&a.createLoop();a.init();k();b.pagination&&a.createPagination(!0);b.loop||0<b.initialSlide?a.swipeTo(b.initialSlide,0,!1):a.updateActiveSlide(0);b.autoplay&&a.startAutoplay();
a.centerIndex=a.activeIndex;if(b.onSwiperCreated)b.onSwiperCreated(this);a.callPlugins("onSwiperCreated")}if(document.body.__defineGetter__&&HTMLElement){var t=HTMLElement.prototype;t.__defineGetter__&&t.__defineGetter__("outerHTML",function(){return(new XMLSerializer).serializeToString(this)})}window.getComputedStyle||(window.getComputedStyle=function(a,b){this.el=a;this.getPropertyValue=function(b){var d=/(\-([a-z]){1})/g;"float"===b&&(b="styleFloat");d.test(b)&&(b=b.replace(d,function(a,b,c){return c.toUpperCase()}));
return a.currentStyle[b]?a.currentStyle[b]:null};return this});Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var e=b||0,f=this.length;e<f;e++)if(this[e]===a)return e;return-1});if((document.querySelectorAll||window.jQuery)&&"undefined"!==typeof f&&(f.nodeType||0!==h(f).length)){var a=this;a.touches={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,diff:0,abs:0};a.positions={start:0,abs:0,diff:0,current:0};a.times={start:0,end:0};a.id=(new Date).getTime();a.container=
f.nodeType?f:h(f)[0];a.isTouched=!1;a.isMoved=!1;a.activeIndex=0;a.centerIndex=0;a.activeLoaderIndex=0;a.activeLoopIndex=0;a.previousIndex=null;a.velocity=0;a.snapGrid=[];a.slidesGrid=[];a.imagesToLoad=[];a.imagesLoaded=0;a.wrapperLeft=0;a.wrapperRight=0;a.wrapperTop=0;a.wrapperBottom=0;var K,r,A,G,y,l,t={mode:"horizontal",touchRatio:1,speed:300,freeMode:!1,freeModeFluid:!1,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,slidesPerView:1,slidesPerGroup:1,simulateTouch:!0,followFinger:!0,shortSwipes:!0,
moveStartThreshold:!1,autoplay:!1,onlyExternal:!1,createPagination:!0,pagination:!1,paginationElement:"span",paginationClickable:!1,paginationAsRange:!0,resistance:!0,scrollContainer:!1,preventLinks:!0,noSwiping:!1,noSwipingClass:"swiper-no-swiping",initialSlide:0,keyboardControl:!1,mousewheelControl:!1,mousewheelDebounce:600,useCSS3Transforms:!0,autoplay:!1,autoplayDisableOnInteraction:!1,loop:!1,loopAdditionalSlides:0,calculateHeight:!1,updateOnImagesReady:!0,releaseFormElements:!0,watchActiveIndex:!1,
visibilityFullFit:!1,offsetPxBefore:0,offsetPxAfter:0,offsetSlidesBefore:0,offsetSlidesAfter:0,centeredSlides:!1,queueStartCallbacks:!1,queueEndCallbacks:!1,autoResize:!0,resizeReInit:!1,DOMAnimation:!0,loader:{slides:[],slidesHTMLType:"inner",surroundGroups:1,logic:"reload",loadAllSlides:!1},slideElement:"div",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",wrapperClass:"swiper-wrapper",paginationElementClass:"swiper-pagination-switch",paginationActiveClass:"swiper-active-switch",
paginationVisibleClass:"swiper-visible-switch"};b=b||{};for(var n in t)if(n in b&&"object"===typeof b[n])for(var E in t[n])E in b[n]||(b[n][E]=t[n][E]);else n in b||(b[n]=t[n]);a.params=b;b.scrollContainer&&(b.freeMode=!0,b.freeModeFluid=!0);b.loop&&(b.resistance="100%");var m="horizontal"===b.mode;a.touchEvents={touchStart:a.support.touch||!b.simulateTouch?"touchstart":a.browser.ie10?"MSPointerDown":"mousedown",touchMove:a.support.touch||!b.simulateTouch?"touchmove":a.browser.ie10?"MSPointerMove":
"mousemove",touchEnd:a.support.touch||!b.simulateTouch?"touchend":a.browser.ie10?"MSPointerUp":"mouseup"};for(n=a.container.childNodes.length-1;0<=n;n--)if(a.container.childNodes[n].className)for(E=a.container.childNodes[n].className.split(" "),t=0;t<E.length;t++)E[t]===b.wrapperClass&&(K=a.container.childNodes[n]);a.wrapper=K;a._extendSwiperSlide=function(c){c.append=function(){b.loop?(c.insertAfter(a.slides.length-a.loopedSlides),a.removeLoopedSlides(),a.calcSlides(),a.createLoop()):a.wrapper.appendChild(c);
a.reInit();return c};c.prepend=function(){b.loop?(a.wrapper.insertBefore(c,a.slides[a.loopedSlides]),a.removeLoopedSlides(),a.calcSlides(),a.createLoop()):a.wrapper.insertBefore(c,a.wrapper.firstChild);a.reInit();return c};c.insertAfter=function(d){if("undefined"===typeof d)return!1;b.loop?(d=a.slides[d+1+a.loopedSlides],a.wrapper.insertBefore(c,d),a.removeLoopedSlides(),a.calcSlides(),a.createLoop()):(d=a.slides[d+1],a.wrapper.insertBefore(c,d));a.reInit();return c};c.clone=function(){return a._extendSwiperSlide(c.cloneNode(!0))};
c.remove=function(){a.wrapper.removeChild(c);a.reInit()};c.html=function(a){if("undefined"===typeof a)return c.innerHTML;c.innerHTML=a;return c};c.index=function(){for(var b,e=a.slides.length-1;0<=e;e--)c===a.slides[e]&&(b=e);return b};c.isActive=function(){return c.index()===a.activeIndex?!0:!1};c.swiperSlideDataStorage||(c.swiperSlideDataStorage={});c.getData=function(a){return c.swiperSlideDataStorage[a]};c.setData=function(a,b){c.swiperSlideDataStorage[a]=b;return c};c.data=function(a,b){return b?
(c.setAttribute("data-"+a,b),c):c.getAttribute("data-"+a)};c.getWidth=function(b){return a.h.getWidth(c,b)};c.getHeight=function(b){return a.h.getHeight(c,b)};c.getOffset=function(){return a.h.getOffset(c)};return c};a.calcSlides=function(c){var d=a.slides?a.slides.length:!1;a.slides=[];a.displaySlides=[];for(var e=0;e<a.wrapper.childNodes.length;e++)if(a.wrapper.childNodes[e].className)for(var f=a.wrapper.childNodes[e].className.split(" "),g=0;g<f.length;g++)f[g]===b.slideClass&&a.slides.push(a.wrapper.childNodes[e]);
for(e=a.slides.length-1;0<=e;e--)a._extendSwiperSlide(a.slides[e]);!1===d||d===a.slides.length&&!c||(s(),p(),a.updateActiveSlide(),a.params.pagination&&a.createPagination(),a.callPlugins("numberOfSlidesChanged"))};a.createSlide=function(c,d,e){d=d||a.params.slideClass;e=e||b.slideElement;e=document.createElement(e);e.innerHTML=c||"";e.className=d;return a._extendSwiperSlide(e)};a.appendSlide=function(b,d,e){if(b)return b.nodeType?a._extendSwiperSlide(b).append():a.createSlide(b,d,e).append()};a.prependSlide=
function(b,d,e){if(b)return b.nodeType?a._extendSwiperSlide(b).prepend():a.createSlide(b,d,e).prepend()};a.insertSlideAfter=function(b,d,e,f){return"undefined"===typeof b?!1:d.nodeType?a._extendSwiperSlide(d).insertAfter(b):a.createSlide(d,e,f).insertAfter(b)};a.removeSlide=function(c){if(a.slides[c]){if(b.loop){if(!a.slides[c+a.loopedSlides])return!1;a.slides[c+a.loopedSlides].remove();a.removeLoopedSlides();a.calcSlides();a.createLoop()}else a.slides[c].remove();return!0}return!1};a.removeLastSlide=
function(){return 0<a.slides.length?(b.loop?(a.slides[a.slides.length-1-a.loopedSlides].remove(),a.removeLoopedSlides(),a.calcSlides(),a.createLoop()):a.slides[a.slides.length-1].remove(),!0):!1};a.removeAllSlides=function(){for(var b=a.slides.length-1;0<=b;b--)a.slides[b].remove()};a.getSlide=function(b){return a.slides[b]};a.getLastSlide=function(){return a.slides[a.slides.length-1]};a.getFirstSlide=function(){return a.slides[0]};a.activeSlide=function(){return a.slides[a.activeIndex]};var L=[],
z;for(z in a.plugins)b[z]&&(n=a.plugins[z](a,b[z]))&&L.push(n);a.callPlugins=function(a,b){b||(b={});for(var e=0;e<L.length;e++)if(a in L[e])L[e][a](b)};a.browser.ie10&&!b.onlyExternal&&a.wrapper.classList.add("swiper-wp8-"+(m?"horizontal":"vertical"));b.freeMode&&(a.container.className+=" swiper-free-mode");a.initialized=!1;a.init=function(c,d){var e=a.h.getWidth(a.container),f=a.h.getHeight(a.container);if(e!==a.width||f!==a.height||c){a.width=e;a.height=f;l=m?e:f;e=a.wrapper;c&&a.calcSlides(d);
if("auto"===b.slidesPerView){var g=0,h=0;0<b.slidesOffset&&(e.style.paddingLeft="",e.style.paddingRight="",e.style.paddingTop="",e.style.paddingBottom="");e.style.width="";e.style.height="";0<b.offsetPxBefore&&(m?a.wrapperLeft=b.offsetPxBefore:a.wrapperTop=b.offsetPxBefore);0<b.offsetPxAfter&&(m?a.wrapperRight=b.offsetPxAfter:a.wrapperBottom=b.offsetPxAfter);b.centeredSlides&&(m?(a.wrapperLeft=(l-this.slides[0].getWidth(!0))/2,a.wrapperRight=(l-a.slides[a.slides.length-1].getWidth(!0))/2):(a.wrapperTop=
(l-a.slides[0].getHeight(!0))/2,a.wrapperBottom=(l-a.slides[a.slides.length-1].getHeight(!0))/2));m?(0<=a.wrapperLeft&&(e.style.paddingLeft=a.wrapperLeft+"px"),0<=a.wrapperRight&&(e.style.paddingRight=a.wrapperRight+"px")):(0<=a.wrapperTop&&(e.style.paddingTop=a.wrapperTop+"px"),0<=a.wrapperBottom&&(e.style.paddingBottom=a.wrapperBottom+"px"));var k=0,n=0;a.snapGrid=[];a.slidesGrid=[];for(var u=0,q=0;q<a.slides.length;q++){var f=a.slides[q].getWidth(!0),p=a.slides[q].getHeight(!0);b.calculateHeight&&
(u=Math.max(u,p));var s=m?f:p;if(b.centeredSlides){var t=q===a.slides.length-1?0:a.slides[q+1].getWidth(!0),w=q===a.slides.length-1?0:a.slides[q+1].getHeight(!0),t=m?t:w;if(s>l){for(w=0;w<=Math.floor(s/(l+a.wrapperLeft));w++)0===w?a.snapGrid.push(k+a.wrapperLeft):a.snapGrid.push(k+a.wrapperLeft+l*w);a.slidesGrid.push(k+a.wrapperLeft)}else a.snapGrid.push(n),a.slidesGrid.push(n);n+=s/2+t/2}else{if(s>l)for(w=0;w<=Math.floor(s/l);w++)a.snapGrid.push(k+l*w);else a.snapGrid.push(k);a.slidesGrid.push(k)}k+=
s;g+=f;h+=p}b.calculateHeight&&(a.height=u);m?(A=g+a.wrapperRight+a.wrapperLeft,e.style.width=g+"px",e.style.height=a.height+"px"):(A=h+a.wrapperTop+a.wrapperBottom,e.style.width=a.width+"px",e.style.height=h+"px")}else if(b.scrollContainer)e.style.width="",e.style.height="",u=a.slides[0].getWidth(!0),g=a.slides[0].getHeight(!0),A=m?u:g,e.style.width=u+"px",e.style.height=g+"px",r=m?u:g;else{if(b.calculateHeight){g=u=0;m||(a.container.style.height="");e.style.height="";for(q=0;q<a.slides.length;q++)a.slides[q].style.height=
"",u=Math.max(a.slides[q].getHeight(!0),u),m||(g+=a.slides[q].getHeight(!0));p=u;a.height=p;m?g=p:(l=p,a.container.style.height=l+"px")}else p=m?a.height:a.height/b.slidesPerView,g=m?a.height:a.slides.length*p;f=m?a.width/b.slidesPerView:a.width;u=m?a.slides.length*f:a.width;r=m?f:p;0<b.offsetSlidesBefore&&(m?a.wrapperLeft=r*b.offsetSlidesBefore:a.wrapperTop=r*b.offsetSlidesBefore);0<b.offsetSlidesAfter&&(m?a.wrapperRight=r*b.offsetSlidesAfter:a.wrapperBottom=r*b.offsetSlidesAfter);0<b.offsetPxBefore&&
(m?a.wrapperLeft=b.offsetPxBefore:a.wrapperTop=b.offsetPxBefore);0<b.offsetPxAfter&&(m?a.wrapperRight=b.offsetPxAfter:a.wrapperBottom=b.offsetPxAfter);b.centeredSlides&&(m?(a.wrapperLeft=(l-r)/2,a.wrapperRight=(l-r)/2):(a.wrapperTop=(l-r)/2,a.wrapperBottom=(l-r)/2));m?(0<a.wrapperLeft&&(e.style.paddingLeft=a.wrapperLeft+"px"),0<a.wrapperRight&&(e.style.paddingRight=a.wrapperRight+"px")):(0<a.wrapperTop&&(e.style.paddingTop=a.wrapperTop+"px"),0<a.wrapperBottom&&(e.style.paddingBottom=a.wrapperBottom+
"px"));A=m?u+a.wrapperRight+a.wrapperLeft:g+a.wrapperTop+a.wrapperBottom;e.style.width=u+"px";e.style.height=g+"px";k=0;a.snapGrid=[];a.slidesGrid=[];for(q=0;q<a.slides.length;q++)a.snapGrid.push(k),a.slidesGrid.push(k),k+=r,a.slides[q].style.width=f+"px",a.slides[q].style.height=p+"px"}if(a.initialized){if(a.callPlugins("onInit"),b.onInit)b.onInit(a)}else if(a.callPlugins("onFirstInit"),b.onFirstInit)b.onFirstInit(a);a.initialized=!0}};a.reInit=function(b){a.init(!0,b)};a.resizeFix=function(c){a.callPlugins("beforeResizeFix");
a.init(b.resizeReInit||c);b.freeMode?a.getWrapperTranslate()<-g()&&(a.setWrapperTransition(0),a.setWrapperTranslate(-g())):a.swipeTo(b.loop?a.activeLoopIndex:a.activeIndex,0,!1);a.callPlugins("afterResizeFix")};a.destroy=function(c){c=a.h.removeEventListener;a.browser.ie10?(c(a.wrapper,a.touchEvents.touchStart,B),c(document,a.touchEvents.touchMove,C),c(document,a.touchEvents.touchEnd,D)):(a.support.touch&&(c(a.wrapper,"touchstart",B),c(a.wrapper,"touchmove",C),c(a.wrapper,"touchend",D)),b.simulateTouch&&
(c(a.wrapper,"mousedown",B),c(document,"mousemove",C),c(document,"mouseup",D)));b.autoResize&&c(window,"resize",a.resizeFix);s();b.paginationClickable&&U();b.mousewheelControl&&a._wheelEvent&&c(a.container,a._wheelEvent,N);b.keyboardControl&&c(document,"keydown",O);b.autoplay&&a.stopAutoplay();a.callPlugins("onDestroy");a=null};b.grabCursor&&(z=a.container.style,z.cursor="move",z.cursor="grab",z.cursor="-moz-grab",z.cursor="-webkit-grab");a.allowSlideClick=!0;a.allowLinks=!0;var x=!1,M,H=!0,F,I;a.swipeNext=
function(c){!c&&b.loop&&a.fixLoop();!c&&b.autoplay&&a.stopAutoplay(!0);a.callPlugins("onSwipeNext");var d=c=a.getWrapperTranslate();if("auto"==b.slidesPerView)for(var e=0;e<a.snapGrid.length;e++){if(-c>=a.snapGrid[e]&&-c<a.snapGrid[e+1]){d=-a.snapGrid[e+1];break}}else d=r*b.slidesPerGroup,d=-(Math.floor(Math.abs(c)/Math.floor(d))*d+d);d<-g()&&(d=-g());if(d==c)return!1;J(d,"next");return!0};a.swipePrev=function(c){!c&&b.loop&&a.fixLoop();!c&&b.autoplay&&a.stopAutoplay(!0);a.callPlugins("onSwipePrev");
c=Math.ceil(a.getWrapperTranslate());var d;if("auto"==b.slidesPerView){d=0;for(var e=1;e<a.snapGrid.length;e++){if(-c==a.snapGrid[e]){d=-a.snapGrid[e-1];break}if(-c>a.snapGrid[e]&&-c<a.snapGrid[e+1]){d=-a.snapGrid[e];break}}}else d=r*b.slidesPerGroup,d*=-(Math.ceil(-c/d)-1);0<d&&(d=0);if(d==c)return!1;J(d,"prev");return!0};a.swipeReset=function(){a.callPlugins("onSwipeReset");var c=a.getWrapperTranslate(),d=r*b.slidesPerGroup;g();if("auto"==b.slidesPerView){for(var e=d=0;e<a.snapGrid.length;e++){if(-c===
a.snapGrid[e])return;if(-c>=a.snapGrid[e]&&-c<a.snapGrid[e+1]){d=0<a.positions.diff?-a.snapGrid[e+1]:-a.snapGrid[e];break}}-c>=a.snapGrid[a.snapGrid.length-1]&&(d=-a.snapGrid[a.snapGrid.length-1]);c<=-g()&&(d=-g())}else d=0>c?Math.round(c/d)*d:0;b.scrollContainer&&(d=0>c?c:0);d<-g()&&(d=-g());b.scrollContainer&&l>r&&(d=0);if(d==c)return!1;J(d,"reset");return!0};a.swipeTo=function(c,d,e){c=parseInt(c,10);a.callPlugins("onSwipeTo",{index:c,speed:d});b.loop&&(c+=a.loopedSlides);var f=a.getWrapperTranslate();
if(!(c>a.slides.length-1||0>c)){var h;h="auto"==b.slidesPerView?-a.slidesGrid[c]:-c*r;h<-g()&&(h=-g());if(h==f)return!1;J(h,"to",{index:c,speed:d,runCallbacks:!1===e?!1:!0});return!0}};a._queueStartCallbacks=!1;a._queueEndCallbacks=!1;a.updateActiveSlide=function(c){if(a.initialized&&0!=a.slides.length){a.previousIndex=a.activeIndex;"undefined"==typeof c&&(c=a.getWrapperTranslate());0<c&&(c=0);if("auto"==b.slidesPerView){if(a.activeIndex=a.slidesGrid.indexOf(-c),0>a.activeIndex){for(var d=0;d<a.slidesGrid.length-
1&&!(-c>a.slidesGrid[d]&&-c<a.slidesGrid[d+1]);d++);var e=Math.abs(a.slidesGrid[d]+c),f=Math.abs(a.slidesGrid[d+1]+c);a.activeIndex=e<=f?d:d+1}}else a.activeIndex=Math[b.visibilityFullFit?"ceil":"round"](-c/r);a.activeIndex==a.slides.length&&(a.activeIndex=a.slides.length-1);0>a.activeIndex&&(a.activeIndex=0);if(a.slides[a.activeIndex]){a.calcVisibleSlides(c);e=RegExp("\\s*"+b.slideActiveClass);f=RegExp("\\s*"+b.slideVisibleClass);for(d=0;d<a.slides.length;d++)a.slides[d].className=a.slides[d].className.replace(e,
"").replace(f,""),0<=a.visibleSlides.indexOf(a.slides[d])&&(a.slides[d].className+=" "+b.slideVisibleClass);a.slides[a.activeIndex].className+=" "+b.slideActiveClass;b.loop?(d=a.loopedSlides,a.activeLoopIndex=a.activeIndex-d,a.activeLoopIndex>=a.slides.length-2*d&&(a.activeLoopIndex=a.slides.length-2*d-a.activeLoopIndex),0>a.activeLoopIndex&&(a.activeLoopIndex=a.slides.length-2*d+a.activeLoopIndex)):a.activeLoopIndex=a.activeIndex;b.pagination&&a.updatePagination(c)}}};a.createPagination=function(c){b.paginationClickable&&
a.paginationButtons&&U();a.paginationContainer=b.pagination.nodeType?b.pagination:h(b.pagination)[0];if(b.createPagination){var d="",e=a.slides.length;b.loop&&(e-=2*a.loopedSlides);for(var f=0;f<e;f++)d+="<"+b.paginationElement+' class="'+b.paginationElementClass+'"></'+b.paginationElement+">";a.paginationContainer.innerHTML=d}a.paginationButtons=h("."+b.paginationElementClass,a.paginationContainer);c||a.updatePagination();a.callPlugins("onCreatePagination");if(b.paginationClickable)for(c=a.paginationButtons,
d=0;d<c.length;d++)a.h.addEventListener(c[d],"click",V)};a.updatePagination=function(c){if(b.pagination&&!(1>a.slides.length)&&h("."+b.paginationActiveClass,a.paginationContainer)){var d=a.paginationButtons;if(0!=d.length){for(var e=0;e<d.length;e++)d[e].className=b.paginationElementClass;var f=b.loop?a.loopedSlides:0;if(b.paginationAsRange){a.visibleSlides||a.calcVisibleSlides(c);c=[];for(e=0;e<a.visibleSlides.length;e++){var g=a.slides.indexOf(a.visibleSlides[e])-f;b.loop&&0>g&&(g=a.slides.length-
2*a.loopedSlides+g);b.loop&&g>=a.slides.length-2*a.loopedSlides&&(g=a.slides.length-2*a.loopedSlides-g,g=Math.abs(g));c.push(g)}for(e=0;e<c.length;e++)d[c[e]]&&(d[c[e]].className+=" "+b.paginationVisibleClass);b.loop?d[a.activeLoopIndex].className+=" "+b.paginationActiveClass:d[a.activeIndex].className+=" "+b.paginationActiveClass}else b.loop?d[a.activeLoopIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass:d[a.activeIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass}}};
a.calcVisibleSlides=function(c){var d=[],e=0,f=0,g=0;m&&0<a.wrapperLeft&&(c+=a.wrapperLeft);!m&&0<a.wrapperTop&&(c+=a.wrapperTop);for(var h=0;h<a.slides.length;h++){var e=e+f,f="auto"==b.slidesPerView?m?a.h.getWidth(a.slides[h],!0):a.h.getHeight(a.slides[h],!0):r,g=e+f,k=!1;b.visibilityFullFit?(e>=-c&&g<=-c+l&&(k=!0),e<=-c&&g>=-c+l&&(k=!0)):(g>-c&&g<=-c+l&&(k=!0),e>=-c&&e<-c+l&&(k=!0),e<-c&&g>-c+l&&(k=!0));k&&d.push(a.slides[h])}0==d.length&&(d=[a.slides[a.activeIndex]]);a.visibleSlides=d};a.autoPlayIntervalId=
void 0;a.startAutoplay=function(){if("undefined"!==typeof a.autoPlayIntervalId)return!1;b.autoplay&&(a.autoPlayIntervalId=setInterval(function(){b.loop?a.swipeNext():a.swipeNext(!0)||a.swipeTo(0)},b.autoplay),a.callPlugins("onAutoplayStart"))};a.stopAutoplay=function(){a.autoPlayIntervalId&&clearInterval(a.autoPlayIntervalId);a.autoPlayIntervalId=void 0;a.callPlugins("onAutoplayStop")};a.loopCreated=!1;a.removeLoopedSlides=function(){if(a.loopCreated)for(var b=0;b<a.slides.length;b++)!0===a.slides[b].getData("looped")&&
a.wrapper.removeChild(a.slides[b])};a.createLoop=function(){if(0!=a.slides.length){a.loopedSlides="auto"==b.slidesPerView?b.loopedSlides:b.slidesPerView+b.loopAdditionalSlides;a.loopedSlides>a.slides.length&&(a.loopedSlides=a.slides.length);var c="",d="",e,f="",g=a.slides.length,h=Math.floor(a.loopedSlides/g),k=a.loopedSlides%g;for(e=0;e<h*g;e++){var l=e;e>=g&&(l=e-g*Math.floor(e/g));f+=a.slides[l].outerHTML}for(e=0;e<k;e++)d+=a.slides[e].outerHTML;for(e=g-k;e<g;e++)c+=a.slides[e].outerHTML;K.innerHTML=
c+f+K.innerHTML+f+d;a.loopCreated=!0;a.calcSlides();for(e=0;e<a.slides.length;e++)(e<a.loopedSlides||e>=a.slides.length-a.loopedSlides)&&a.slides[e].setData("looped",!0);a.callPlugins("onCreateLoop")}};a.fixLoop=function(){var c;a.activeIndex<a.loopedSlides?(c=a.slides.length-3*a.loopedSlides+a.activeIndex,a.swipeTo(c,0,!1)):a.activeIndex>a.slides.length-2*b.slidesPerView&&(c=-a.slides.length+a.activeIndex+a.loopedSlides,a.swipeTo(c,0,!1))};a.loadSlides=function(){var c="";a.activeLoaderIndex=0;for(var d=
b.loader.slides,e=b.loader.loadAllSlides?d.length:b.slidesPerView*(1+b.loader.surroundGroups),f=0;f<e;f++)c="outer"==b.loader.slidesHTMLType?c+d[f]:c+("<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+f+'">'+d[f]+"</"+b.slideElement+">");a.wrapper.innerHTML=c;a.calcSlides(!0);b.loader.loadAllSlides||a.wrapperTransitionEnd(a.reloadSlides,!0)};a.reloadSlides=function(){var c=b.loader.slides,d=parseInt(a.activeSlide().data("swiperindex"),10);if(!(0>d||d>c.length-1)){a.activeLoaderIndex=
d;var e=Math.max(0,d-b.slidesPerView*b.loader.surroundGroups),f=Math.min(d+b.slidesPerView*(1+b.loader.surroundGroups)-1,c.length-1);0<d&&(a.setWrapperTranslate(-r*(d-e)),a.setWrapperTransition(0));if("reload"===b.loader.logic){for(var g=a.wrapper.innerHTML="",d=e;d<=f;d++)g+="outer"==b.loader.slidesHTMLType?c[d]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+d+'">'+c[d]+"</"+b.slideElement+">";a.wrapper.innerHTML=g}else{for(var g=1E3,h=0,d=0;d<a.slides.length;d++){var k=a.slides[d].data("swiperindex");
k<e||k>f?a.wrapper.removeChild(a.slides[d]):(g=Math.min(k,g),h=Math.max(k,h))}for(d=e;d<=f;d++)d<g&&(e=document.createElement(b.slideElement),e.className=b.slideClass,e.setAttribute("data-swiperindex",d),e.innerHTML=c[d],a.wrapper.insertBefore(e,a.wrapper.firstChild)),d>h&&(e=document.createElement(b.slideElement),e.className=b.slideClass,e.setAttribute("data-swiperindex",d),e.innerHTML=c[d],a.wrapper.appendChild(e))}a.reInit(!0)}};X()}};
Swiper.prototype={plugins:{},wrapperTransitionEnd:function(f,b){function h(){f(g);g.params.queueEndCallbacks&&(g._queueEndCallbacks=!1);if(!b)for(s=0;s<p.length;s++)g.h.removeEventListener(k,p[s],h)}var g=this,k=g.wrapper,p=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s;if(f)for(s=0;s<p.length;s++)g.h.addEventListener(k,p[s],h)},getWrapperTranslate:function(f){var b=this.wrapper,h,g,k;"undefined"==typeof f&&(f="horizontal"==this.params.mode?"x":"y");
k=window.getComputedStyle(b,null);window.WebKitCSSMatrix?k=new WebKitCSSMatrix(k.webkitTransform):(k=k.MozTransform||k.OTransform||k.MsTransform||k.msTransform||k.transform||k.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),h=k.toString().split(","));this.support.transforms&&this.params.useCSS3Transforms?("x"==f&&(g=window.WebKitCSSMatrix?k.m41:16==h.length?parseFloat(h[12]):parseFloat(h[4])),"y"==f&&(g=window.WebKitCSSMatrix?k.m42:16==h.length?parseFloat(h[13]):parseFloat(h[5]))):
("x"==f&&(g=parseFloat(b.style.left,10)||0),"y"==f&&(g=parseFloat(b.style.top,10)||0));return g||0},setWrapperTranslate:function(f,b,h){var g=this.wrapper.style,k={x:0,y:0,z:0},p;3==arguments.length?(k.x=f,k.y=b,k.z=h):("undefined"==typeof b&&(b="horizontal"==this.params.mode?"x":"y"),k[b]=f);this.support.transforms&&this.params.useCSS3Transforms?(p=this.support.transforms3d?"translate3d("+k.x+"px, "+k.y+"px, "+k.z+"px)":"translate("+k.x+"px, "+k.y+"px)",g.webkitTransform=g.MsTransform=g.msTransform=
g.MozTransform=g.OTransform=g.transform=p):(g.left=k.x+"px",g.top=k.y+"px");this.callPlugins("onSetWrapperTransform",k);if(this.params.onSetWrapperTransform)this.params.onSetWrapperTransform(this,k)},setWrapperTransition:function(f){var b=this.wrapper.style;b.webkitTransitionDuration=b.MsTransitionDuration=b.msTransitionDuration=b.MozTransitionDuration=b.OTransitionDuration=b.transitionDuration=f/1E3+"s";this.callPlugins("onSetWrapperTransition",{duration:f});if(this.params.onSetWrapperTransition)this.params.onSetWrapperTransition(this)},
h:{getWidth:function(f,b){var h=window.getComputedStyle(f,null).getPropertyValue("width"),g=parseFloat(h);if(isNaN(g)||0<h.indexOf("%"))g=f.offsetWidth-parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-left"))-parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-right"));b&&(g+=parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-left"))+parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-right")));return g},getHeight:function(f,
b){if(b)return f.offsetHeight;var h=window.getComputedStyle(f,null).getPropertyValue("height"),g=parseFloat(h);if(isNaN(g)||0<h.indexOf("%"))g=f.offsetHeight-parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-top"))-parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-bottom"));b&&(g+=parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-top"))+parseFloat(window.getComputedStyle(f,null).getPropertyValue("padding-bottom")));return g},getOffset:function(f){var b=
f.getBoundingClientRect(),h=document.body,g=f.clientTop||h.clientTop||0,h=f.clientLeft||h.clientLeft||0,k=window.pageYOffset||f.scrollTop;f=window.pageXOffset||f.scrollLeft;document.documentElement&&!window.pageYOffset&&(k=document.documentElement.scrollTop,f=document.documentElement.scrollLeft);return{top:b.top+k-g,left:b.left+f-h}},windowWidth:function(){if(window.innerWidth)return window.innerWidth;if(document.documentElement&&document.documentElement.clientWidth)return document.documentElement.clientWidth},
windowHeight:function(){if(window.innerHeight)return window.innerHeight;if(document.documentElement&&document.documentElement.clientHeight)return document.documentElement.clientHeight},windowScroll:function(){if("undefined"!=typeof pageYOffset)return{left:window.pageXOffset,top:window.pageYOffset};if(document.documentElement)return{left:document.documentElement.scrollLeft,top:document.documentElement.scrollTop}},addEventListener:function(f,b,h,g){"undefined"==typeof g&&(g=!1);f.addEventListener?f.addEventListener(b,
h,g):f.attachEvent&&f.attachEvent("on"+b,h)},removeEventListener:function(f,b,h,g){"undefined"==typeof g&&(g=!1);f.removeEventListener?f.removeEventListener(b,h,g):f.detachEvent&&f.detachEvent("on"+b,h)}},setTransform:function(f,b){var h=f.style;h.webkitTransform=h.MsTransform=h.msTransform=h.MozTransform=h.OTransform=h.transform=b},setTranslate:function(f,b){var h=f.style,g=b.x||0,k=b.y||0,p=b.z||0;h.webkitTransform=h.MsTransform=h.msTransform=h.MozTransform=h.OTransform=h.transform=this.support.transforms3d?
"translate3d("+g+"px,"+k+"px,"+p+"px)":"translate("+g+"px,"+k+"px)";this.support.transforms||(h.left=g+"px",h.top=k+"px")},setTransition:function(f,b){var h=f.style;h.webkitTransitionDuration=h.MsTransitionDuration=h.msTransitionDuration=h.MozTransitionDuration=h.OTransitionDuration=h.transitionDuration=b+"ms"},support:{touch:window.Modernizr&&!0===Modernizr.touch||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&
!0===Modernizr.csstransforms3d||function(){var f=document.createElement("div").style;return"webkitPerspective"in f||"MozPerspective"in f||"OPerspective"in f||"MsPerspective"in f||"perspective"in f}(),transforms:window.Modernizr&&!0===Modernizr.csstransforms||function(){var f=document.createElement("div").style;return"transform"in f||"WebkitTransform"in f||"MozTransform"in f||"msTransform"in f||"MsTransform"in f||"OTransform"in f}(),transitions:window.Modernizr&&!0===Modernizr.csstransitions||function(){var f=
document.createElement("div").style;return"transition"in f||"WebkitTransition"in f||"MozTransition"in f||"msTransition"in f||"MsTransition"in f||"OTransition"in f}()},browser:{ie8:function(){var f=-1;"Microsoft Internet Explorer"==navigator.appName&&null!=/MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent)&&(f=parseFloat(RegExp.$1));return-1!=f&&9>f}(),ie10:window.navigator.msPointerEnabled}};
(window.jQuery||window.Zepto)&&function(f){f.fn.swiper=function(b){b=new Swiper(f(this)[0],b);f(this).data("swiper",b);return b}}(window.jQuery||window.Zepto);"undefined"!==typeof module&&(module.exports=Swiper);


/*
* Swiper Scrollbar 2.3
* Plugin for Swiper 2.0+
* http://www.idangero.us/sliders/swiper/
*
* Copyright 2012-2013, Vladimir Kharlampidi
* The iDangero.us
* http://www.idangero.us/
*
* Licensed under GPL & MIT
*
* Released on: November 2, 2013
*/

Swiper.prototype.plugins.scrollbar = function(swiper, params){
        
        var enabled = params && params.container;
        if(!enabled) return;
        
        /*=========================
         Default Parameters
         ===========================*/
        var defaults = {
                hide : true,
                draggable : true,
                snapOnRelease: false
        }
        params = params || {};        
        for (var prop in defaults) {
                if (! (prop in params)) {
                        params[prop] = defaults[prop]        
                }
        }

        /*=========================
         Container
         ===========================*/
        if (!document.querySelectorAll) {
        if (!window.jQuery) return;
    }
        function $$(s) {
        if (document.querySelectorAll)
            return document.querySelectorAll(s)
        else
            return jQuery(s)
    }
    if(!(params.container.nodeType)){
        if ($$(params.container).length==0) return;
    }
    var container = (params.container.nodeType) ? params.container : $$(params.container)[0];
        
        /*=========================
         Default Vars
         ===========================*/
        var isH = swiper.params.mode=='horizontal',
                track = container,
                trackWidth, trackHeight, divider, moveDivider, dragWidth, dragHeight;

        /*=========================
         Define Drag
         ===========================*/
        var drag = document.createElement('div')
        drag.className = 'swiper-scrollbar-drag';
        if (params.draggable) drag.className += ' swiper-scrollbar-cursor-drag';
        track.appendChild(drag);
        if (params.hide) track.style.opacity=0;

        var te = swiper.touchEvents
        /*=========================
         Draggable
         ===========================*/
        if (params.draggable) {
                var isTouched = false;
                function dragStart(e){
                        isTouched = true;
                        if(e.preventDefault) e.preventDefault();
            else e.returnValue = false;
                        setDragPosition(e);
                        clearTimeout(timeout);

                        swiper.setTransition(track,0)
                        track.style.opacity = 1;
                        swiper.setWrapperTransition(100);
                        swiper.setTransition(drag,100)
                        if(params.onScrollbarDrag) {
                                params.onScrollbarDrag(swiper)
                        }
                }
                function dragMove(e){
                        if(!isTouched) return;
                        if(e.preventDefault) e.preventDefault();
      else e.returnValue = false;
                        setDragPosition(e);
                        swiper.setWrapperTransition(0);
                        swiper.setTransition(track,0)
                        swiper.setTransition(drag,0)
                        if(params.onScrollbarDrag) {
                                params.onScrollbarDrag(swiper)
                        }
                }
                function dragEnd(e) {
                        isTouched = false;
                        if (params.hide) {
                                clearTimeout(timeout)
                                timeout = setTimeout(function(){
                                        track.style.opacity=0;
                                        swiper.setTransition(track,400)
                                },1000)
                                
                        }
                        if (params.snapOnRelease) {
                                swiper.swipeReset()
                        }
                }


                var lestenEl = swiper.support.touch ? track : document
                swiper.h.addEventListener(track, te.touchStart, dragStart, false)
                swiper.h.addEventListener(lestenEl, te.touchMove, dragMove, false)
                swiper.h.addEventListener(lestenEl, te.touchEnd, dragEnd, false)

                function setDragPosition(e){
                        var x = y = 0;
                        var position;
                        if (isH) {
                                var pageX = (e.type=='touchstart' || e.type=='touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX;
                                x = (pageX) - swiper.h.getOffset(track).left - dragWidth/2
                                if (x<0) x = 0;
                                else if ( (x+dragWidth) > trackWidth) {
                                        x = trackWidth - dragWidth;
                                }
                        }
                        else {
                                var pageY = (e.type=='touchstart' || e.type=='touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY;
                                y = (pageY) - swiper.h.getOffset(track).top - dragHeight/2;
                                
                                if (y<0) y = 0;
                                else if ( (y+dragHeight) > trackHeight) {
                                        y = trackHeight - dragHeight;
                                }
                        }
                        //Set Drag Position
                        swiper.setTranslate(drag,{x:x, y:y})

                        //Wrapper Offset
                        var wrapX = -x/moveDivider;
                        var wrapY = -y/moveDivider;
                        swiper.setWrapperTranslate(wrapX ,wrapY, 0)
                        swiper.updateActiveSlide(isH ? wrapX : wrapY);
                }
        }
        
        function setScrollBars() {
                drag.style.width = ''
                drag.style.height = ''
                if (isH) {
                        trackWidth = swiper.h.getWidth(track, true);
                        divider = swiper.width/swiper.h.getWidth(swiper.wrapper);
                        moveDivider = divider*(trackWidth/swiper.width);
                        dragWidth = trackWidth*divider;
                        drag.style.width = dragWidth+'px';
                }
                else {
                        trackHeight = swiper.h.getHeight(track, true);
                        divider = swiper.height/swiper.h.getHeight(swiper.wrapper);
                        moveDivider = divider*(trackHeight/swiper.height);
                        dragHeight = trackHeight*divider;
                        if (dragHeight>trackHeight) dragHeight = trackHeight
                        drag.style.height = dragHeight+'px';
                }
                if(divider>=1) {
                        container.style.display='none'
                }
                else {
                        container.style.display=''
                }

        }
        var timeout;

        var hooks = {
                onFirstInit : function(args){
                        setScrollBars()
                },
                onInit : function(args) {
                        setScrollBars()
                },
                
                onTouchMoveEnd : function(args) {
                        if (params.hide) {
                                clearTimeout(timeout)
                                track.style.opacity=1;
                                swiper.setTransition(track,200)
                        }
                },
                
                onTouchEnd : function(args) {
                        if (params.hide) {
                                clearTimeout(timeout)
                                timeout = setTimeout(function(){
                                        track.style.opacity=0;
                                        swiper.setTransition(track,400)
                                },1000)
                        }
                },
                
                onSetWrapperTransform: function(pos){
                        
                        if (isH) {
                                var newLeft = pos.x*moveDivider;
                                var newWidth = dragWidth;
                                if (newLeft > 0) {
                                        var diff = newLeft;
                                        newLeft = 0;
                                        newWidth = dragWidth-diff;
                                }
                                else if ( (-newLeft+dragWidth) > trackWidth) {
                                        newWidth = trackWidth + newLeft;
                                }

                                swiper.setTranslate(drag,{x:-newLeft})
                                drag.style.width = newWidth+'px';
                        }
                        else {
                                var newTop = pos.y*moveDivider;
                                var newHeight = dragHeight;
                                if (newTop > 0) {
                                        var diff = newTop;
                                        newTop = 0;
                                        newHeight = dragHeight-diff;
                                }
                                else if ( (-newTop+dragHeight) > trackHeight) {
                                        newHeight = trackHeight + newTop;
                                }
                                swiper.setTranslate(drag,{y:-newTop})
                                drag.style.height = newHeight+'px';
                        }
                        if (swiper.params.freeMode && params.hide) {
                                clearTimeout(timeout)
                                track.style.opacity=1;
                                timeout = setTimeout(function(){
                                        track.style.opacity=0;
                                        swiper.setTransition(track,400)
                                },1000)
                        }
                        
                },
                onSetWrapperTransition: function(args){
                        swiper.setTransition(drag,args.duration)
                },
                onDestroy: function(){
                        var lestenEl = swiper.support.touch ? track : document
                        swiper.h.removeEventListener(track, te.touchStart, dragStart, false)
                        swiper.h.removeEventListener(lestenEl, te.touchMove, dragMove, false)
                        swiper.h.removeEventListener(lestenEl, te.touchEnd, dragEnd, false)
                }
        }
        return hooks;
}
