define([
  'jquery',
  'lodash',
  'backbone',
  'bootstrap',
  'jqueryFlip',
  'text!templates/ofertas/ofertas.html'
], function($, _, Backbone,Bootstrap,JqueryFlip, ofertasPageTemplate){
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
			 var horario = oferta.horario.split(' a ')
			 //actual
			 var horaactual = new Date().getHours();		 
			 var minutoactual = new Date().getMinutes();
			var a=horaactual+":"+minutoactual+":00";
			var b=horario[0]+":00";
			var c=horario[1]+":00";
			var aa1=a.split(":");
			var aa2=b.split(":");
			var aa3=c.split(":");
			var d1=new Date(parseInt("2001",10),(parseInt("01",10))-1,parseInt("01",10),parseInt(aa1[0],10),parseInt(aa1[1],10),parseInt(aa1[2],10));
			var d2=new Date(parseInt("2001",10),(parseInt("01",10))-1,parseInt("01",10),parseInt(aa2[0],10),parseInt(aa2[1],10),parseInt(aa2[2],10));
			var d3=new Date(parseInt("2001",10),(parseInt("01",10))-1,parseInt("01",10),parseInt(aa3[0],10),parseInt(aa3[1],10),parseInt(aa3[2],10));
			var dd1=d1.valueOf();
			var dd2=d2.valueOf();
			var dd3=d3.valueOf();
			if(dd1>dd2 && dd1<dd3)
			{
				var switchh = true;
			}else
			{
				var switchh = true;
			}
			selff.$el.empty();
			selff.$el.append(
				selff.template(
					{
						horarioCli:oferta.horario
					})
			);
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
			if(switchh)
				$(".switch").css("color","#58DA90");
			//compartir
			$(".comp").click(function() {
				var Imgcom = $(".flipCurrent").find(".ofertaImg").css("background-image");
				Imgcom = Imgcom.replace('url(','').replace(')','');
				window.plugins.socialsharing.share('Compartido desde OfferHunter', null, Imgcom, 'http://offerhunter.com.mx')
			});
			$(document).ready(function() {
				$("#flipRoot").flip();
				$("#flipRoot").css("height"," 80%;");
			});
		});
    }
  });
  return OfertaPage;
});
