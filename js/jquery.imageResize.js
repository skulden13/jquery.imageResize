// plugin for resing images by ratio

(function($) {
  $.fn.imageResizer = function(o) {
    return this.each(function() {
      var object = $(this),
        data = object.data('imageResizer'),
        options = {
          method: 'fit',
          ratioWidth: 320,
          ratioHeight: 180,

          constructor: function(params) {
            var imageProportions = object.width() / object.height(),
              ratioProportions = options.ratioWidth / options.ratioHeight,
              css,
              autoHeight = function(width) {
                return {
                  width: width,
                  height: 'auto'
                };
              },
              autoWidth = function(height) {
                return {
                  height: height,
                  width: 'auto'
                };
              },
              marginLeft = function(css) {
                return $.extend(css, {
                  marginLeft: (options.ratioWidth - css.height * imageProportions) * .5
                });
              },
              marginTop = function(css) {
                return $.extend(css, {
                  marginTop: (options.ratioHeight - css.width / imageProportions) * .5
                });
              };

            if (options.method == 'fit') {
              if (ratioProportions >= imageProportions) {
                css = autoWidth(options.ratioHeight);
              } else {
                css = autoHeight(options.ratioWidth);
              }
            } else if (options.method == 'fill') {
              if (ratioProportions >= imageProportions) {
                css = autoHeight(options.ratioWidth);
              } else {
                css = autoWidth(options.ratioHeight);
              }
            }

            css = marginTop(css);
            css = marginLeft(css);

            object.css(css);
          }
        }

      data ? object = data : object.data({
        imageResizer: options
      });
      typeof o == 'object' && $.extend(options, o);
      options.me || options.constructor(options.me = object);
    });
  }
})(jQuery);