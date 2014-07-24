// Filename: router.js
define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'jqueryFlip',
	'vm'
], function($, _, Backbone,Bootstrap,jqueryFlip, Vm) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Pages
			'inicio': 'inicio',
			'ofertas/:id': 'ofertas',
			'categorias': 'categorias',
			'cliente/:id': 'cliente',
			'categoria/:id': 'categoria',
			'favoritos':'favoritos',
			'inicio/:id':'inicio',
			'search/:id':'search',
			// Default - catch all
			//'*actions': 'defaultAction'
			'*actions': 'inicio'
		}
	});

	var initialize = function(options) {
		var appView = options.appView;
		var router = new AppRouter(options);

		router.on('route:defaultAction', function(actions) {
			require(['views/dashboard/page'], function(DashboardPage) {
				var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage);
				dashboardPage.render();
			});
		});
		//MIS ROUTERS
		router.on('route:inicio', function(id) {
			require(['views/inicio/inicio'], function(InicioPage) {
				var inicioPage = Vm.create(appView, 'InicioPage', InicioPage);
				inicioPage.render(id);
			});
		});
		router.on('route:ofertas', function(id) {
			require(['views/ofertas/ofertas'], function(OfertasPage) {
				var ofertasPage = Vm.create(appView, 'OfertasPage', OfertasPage);
				ofertasPage.render(id);
			});
		});
		router.on('route:categoria', function(id) {
			require(['views/categorias/categoria'], function(CategoriaPage) {
				var categoriaPage = Vm.create(appView, 'CategoriaPage', CategoriaPage);
				categoriaPage.render(id);
			});
		});
		router.on('route:categorias', function() {
			require(['views/categorias/categorias'], function(CategoriasPage) {
				var categoriasPage = Vm.create(appView, 'CategoriasPage', CategoriasPage);
				categoriasPage.render();
			});
		});
		router.on('route:cliente', function(id) {
			require(['views/cliente/cliente'], function(ClientePage) {
				var clientePage = Vm.create(appView, 'ClientePage', ClientePage);
				clientePage.render(id);
			});
		});
		router.on('route:favoritos', function() {
			require(['views/favoritos/favoritos'], function(FavoritosPage) {
				var favoritosPage = Vm.create(appView, 'FavoritosPage', FavoritosPage);
				favoritosPage.render();
			});
		});
		router.on('route:search', function(id) {
			require(['views/search/search'], function(SearchPage) {
				var searchPage = Vm.create(appView, 'SearchPage', SearchPage);
				searchPage.render(id);
			});
		});
		////
		Backbone.history.start();
	};
	return {
		initialize: initialize
	};
});
