define([
  'jquery',
  'lodash',
  'backbone',
  'bootstrap',
  'jqueryFlip',
  'text!templates/inicio/index.html'
], function($, _, Backbone,Bootstrap,jqueryFlip, inicioPageTemplate){
  var InicioPage = Backbone.View.extend({
    el: '.page',
	initialize: function () {
		selff = this;
		selff.template =  _.template($(inicioPageTemplate).filter('#offerIniTemplate').html());
    },
    render: function () {
		
			$.ajax({
				url: 'http://michellhdz.com/offerhunter/laravel/public/index.php/oferta',
				dataType: 'jsonp',
				data: ""/*,
				complete: function(objeto, exito){
					alert("Me acabo de completar")
					if(exito=="success"){
						alert("Y con éxito");
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
					alert("Estas viendo esto por que fallé");
					alert("Pasó lo siguiente: "+quepaso);
				}*/
			}).then(function(res){
				var ofertas = res.data;
				selff.$el.empty();
				for(var key in ofertas)
				{
					var oferta = ofertas[key];
					selff.$el.append(
						selff.template(
						{
							offerId:oferta.id,
							offerName:oferta.nomCliente,
							offerDec:oferta.descripcion,
							offerVig:oferta.vigencia_cer
						})
					);
					$(".ofertaId_"+oferta.id).click(function() {
						var idoferta = $(this).attr("data-idOferta");
						window.location.href="#/ofertas/"+idoferta;
					});
					var url= "http://michellhdz.com/offerhunter/laravel/app/uploads/oferimg/"+oferta.imagportada;
					$(".ofertaId_"+oferta.id).css("background-image", "url("+url+")");
				}
		});
    }
  });
  return InicioPage;
});
