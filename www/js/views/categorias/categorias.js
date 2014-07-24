define([
  'jquery',
  'lodash',
  'backbone',
  'bootstrap',
  'jqueryFlip',
  'text!templates/categoria/categorias.html'
], function($, _, Backbone,Bootstrap,jqueryFlip, categoriasPageTemplate){
  var CategoriasPage = Backbone.View.extend({
    el: '.page',
	initialize: function () {
		selff = this;
		selff.template =  _.template($(categoriasPageTemplate).filter('#categorias').html());
    },
    render: function () {
	$('.navbar-brand').html('Categorías');
	selff.$el.css("background-image", ""); 
		$.ajax({
				url: 'http://michellhdz.com/offerhunter/laravel/public/index.php/tipos',
				dataType: 'jsonp',
				data: ""/*,
				complete: function(objeto, exito){
					alert("Me acabo de completar")
					if(exito=="success"){
						alert("Y con �xito");
					}
				},
				success: function (res) {
					var ofertas = res.data;
					console.log("LOGGGGGGGGGGGGG");
					console.log(self.$el);
					for(var key in ofertas)
					{
						var oferta = ofertas[key];
						alert(oferta.descripcion);
						self.$el.append(
							self.template(
							{
								offerId:oferta.id_oferta,
								offerName:"Nombre de la oferta",
								offerDec:oferta.descripcion,
								offerVig:oferta.vigencia_cer
							})
						);
					}
				},
				error: function(objeto, quepaso, otroobj){
					alert("Estas viendo esto por que fall�");
					alert("Pas� lo siguiente: "+quepaso);
				}*/
			}).then(function(res){
				var tipos = res.data;
				selff.$el.empty();
				for(var key in tipos)
				{
					var tipo = tipos[key];
					selff.$el.append(
						selff.template(
							{
								catId:tipo.id,
								catName:tipo.nombre
							}
						)
					);
					//imagen
					var url= "./images/"+tipo.img+".png";
					$(".tipoId_"+tipo.id).find(".circleCat").css("background-image", "url("+url+")"); 
					//link
					$(".tipoId_"+tipo.id).click(function() {
						var idTipo = $(this).attr("data-idCat");
						window.location.href="#/categoria/"+idTipo;
					});
				}
		});
		$(".navbar-collapse").removeClass("in");
    }
  });
  return CategoriasPage;
});
