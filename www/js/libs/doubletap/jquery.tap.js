/*!
    tap / double tap special event for jQuery
    v 1.0.0
    (c) 2014 Yair Even Or <http://dropthebit.com>
    MIT-style license.
*/

(function($){
    "use strict";

    var tapTimer,
        moved = false,   // flag to know if the finger had moved while touched the device
        wait = 250; // ms

    $.event.special.tap = {
        setup: function(data, namespaces) {
            $(this).bind('touchend.tap', $.event.special.tap.handler)
                   .bind('touchmove.tap', function(){
                        moved = true;
                   });
        },

        teardown: function(namespaces) {
            $(this).unbind('touchend.tap touchmove.tap');
        },

        handler: function(event){
            if( moved ){
                moved = false;
                return false;
            }

            var elem      = event.target,
                $elem     = $(elem),
                lastTouch = $elem.data('lastTouch') || 0,
                now       = new Date().getTime(),
                delta     = now - lastTouch,
                args      = [].slice.call( arguments, 1 ); // clone arguments array, remove original event from cloned array

            if( delta > 20 && delta < wait ){
                clearTimeout(tapTimer);
                return $elem.data('lastTouch', 0).trigger('doubleTap');
            }
            else
                $elem.data('lastTouch', now);

            // if double tapping never happened, fire single tap
            tapTimer = setTimeout(function(){
                $elem.trigger('tap');
                clearTimeout(tapTimer);
            }, wait);
        }
    };
})(jQuery);