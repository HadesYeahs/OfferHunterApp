define([
  'jquery',
  'lodash',
  'backbone',
  'text!templates/ofertas/ofertas.html'
], function($, _, Backbone, ofertasPageTemplate){
  var OfertaPage = Backbone.View.extend({
    el: '.page',
	initialize: function () {
		selff = this;
		selff.template =  _.template($(ofertasPageTemplate).filter('#oferta').html());
    },
    render: function (id) {
		selff.$el.empty();
		selff.$el.empty();
		$.ajax({
				url: 'http://michellhdz.com/offerhunter/laravel/public/index.php/oferta/'+id,
				dataType: 'jsonp',
				data: ""/*,
				complete: function(objeto, exito){
					alert("Me acabo de completar")
					if(exito=="success"){
						alert("Y con exito");
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
					alert("Estas viendo esto por que fallo");
					alert("Paso lo siguiente: "+quepaso);
				}*/
		}).then(function(res){
			var oferta = res.data;
			 var imagenes = oferta.imagofer.split(',');
			//var horario = cliente.horario_aper + cliente.horario_cierre;
			selff.$el.empty();
			selff.$el.append(
				selff.template(
					{
						horarioCli:oferta.horario
					})
			);
			debugger;
			for(var key in imagenes)
			{
				$("#flipRoot").append(
						$("<div/>").append(
							$("<div/>", {"class":"ofertaImg",id:"idImage"+key})
						)
				);
				var url= "http://michellhdz.com/offerhunter/laravel/app/uploads/oferimg/"+imagenes[key];
				$("#idImage"+key).css("background-image", "url("+url+")");
			}
			$(document).ready(function() {
				$("#flipRoot").flip();
				$("#flipRoot").css("height"," 80%;");
			});
		});
    }
  });
  return OfertaPage;
});
