// Filename: router.js
define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'jqueryFlip',
	'share',
	'vm'
], function($, _, Backbone,Bootstrap,jqueryFlip,Share, Vm) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Pages
			'modules': 'modules',
			'optimize': 'optimize',
			'backbone/:section': 'backbone',
			'backbone': 'backbone',
			'manager': 'manager',
			'inicio': 'inicio',
			'ofertas': 'ofertas',
			'ofertas/:id': 'ofertas',
			'categorias': 'categorias',
			'cliente/:id': 'cliente',
			'categoria/:id': 'categoria',
			// Default - catch all
			//'*actions': 'defaultAction'
			'*actions': 'inicio'
		}
	});

	var initialize = function(options) {
		var appView = options.appView;
		var router = new AppRouter(options);
		router.on('route:optimize', function() {
			require(['views/optimize/page'], function(OptimizePage) {
				var optimizePage = Vm.create(appView, 'OptimizePage', OptimizePage);
				optimizePage.render();
			});
		});
		router.on('route:defaultAction', function(actions) {
			require(['views/dashboard/page'], function(DashboardPage) {
				var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage);
				dashboardPage.render();
			});
		});
		router.on('route:modules', function() {
			require(['views/modules/page'], function(ModulePage) {
				var modulePage = Vm.create(appView, 'ModulesPage', ModulePage);
				modulePage.render();
			});
		});
		//MIS ROUTERS
		router.on('route:inicio', function() {
			require(['views/inicio/inicio'], function(InicioPage) {
				var inicioPage = Vm.create(appView, 'InicioPage', InicioPage);
				inicioPage.render();
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
		////
		router.on('route:backbone', function(section) {
			require(['views/backbone/page'], function(BackbonePage) {
				var backbonePage = Vm.create(appView, 'BackbonePage', BackbonePage, {section: section});
				backbonePage.render();
			});
		});
		router.on('route:manager', function() {
			require(['views/manager/page'], function(ManagerPage) {
				var managerPage = Vm.create(appView, 'ManagerPage', ManagerPage);
				managerPage.render();
			});
		});
		Backbone.history.start();
	};
	return {
		initialize: initialize
	};
});
