/**
 * WP Viewport
 * Written by William G. Rivera
 *
 * Icon by Yusuke Kamiyamane - http://p.yusukekamiyamane.com/
 */


jQuery(window).ready(function ($) {

	$('body').append('<div id="viewport-size"></div>');

    $(window).resize(function() {
      var pluginUrl = wpviewport_vars.iconurl;
      var relative_mq = wpviewport_vars.relative_mq;
      var the_width = $(window).width();
      var the_height = $(window).height();

      if (relative_mq == 1) {
        var vp_fontsize = wpviewport_vars.fontsize;
        var the_width = (the_width / vp_fontsize).toFixed(2);
        var the_height = (the_height / vp_fontsize).toFixed(2);
      }

      $('#viewport-size').html('<ul><li class="px">WIDTH</li><li class="width"><span class="width">' + the_width + '</span></li> <li class="x"><span class="x">&times;</span></li> <li class="height"><span class="height">' + the_height + '</span><div class="px">HEIGHT</div></li></ul>');

    }).trigger('resize');

});
