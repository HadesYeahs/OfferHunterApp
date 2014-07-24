define([
  'jquery',
  'lodash',
  'backbone',
  'bootstrap',
  'text!templates/header/menu.html'
], function($, _, Backbone,Bootstrap,headerMenuTemplate){
  var HeaderMenuView = Backbone.View.extend({
    el: '.main-menu-container',
    initialize: function () {
    },
    render: function () {
      $(this.el).html(headerMenuTemplate);
      $('a[href="' + window.location.hash + '"]').addClass('active');
	  $('.navbar-form').submit(function( event ) {
		var seach = $('.form-control').val();
		window.location.href="#/search/"+seach;
	  });
    },
    events: {
      'click a': 'highlightMenuItem'
    },
    highlightMenuItem: function (ev) {
      $('.active').removeClass('active');
      $(ev.currentTarget).addClass('active');
    }
  })

  return HeaderMenuView;
});
