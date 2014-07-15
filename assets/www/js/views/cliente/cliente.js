define([
  'jquery',
  'lodash',
  'backbone',
  'bootstrap',
  'jqueryFlip',
  'share',
  'text!templates/cliente/cliente.html'
], function($, _, Backbone, Bootstrap,jqueryFlip,share,clientePageTemplate){
  var ClientePage = Backbone.View.extend({
    el: '.page',
	initialize: function () {
		selff = this;
		selff.template =  _.template($(clientePageTemplate).filter('#cliente').html());
    },
    render: function (id) {
		selff.$el.empty();
		$.ajax({
				url: 'http://michellhdz.com/offerhunter/laravel/public/index.php/cliente/'+id,
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
			var cliente = res.data;
			var horario = cliente.horario_apert +" a "+ cliente.horario_cierre;
			//actual
			var horaactual = new Date().getHours();		 
			var minutoactual = new Date().getMinutes();
			var a=horaactual+":"+minutoactual+":00";
			var b=cliente.horario_apert+":00";
			var c=cliente.horario_cierre+":00";
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
				var switchh = false;
			}
			var direcciones = "";
			var ubicaciones = [];
			for(var key in cliente.sucursales)
			{
				if(direcciones == "")
					direcciones = cliente.sucursales[key].direccion;
				else
					direcciones = direcciones +"<br/>"+ cliente.sucursales[key].direccion;
				
				ubicaciones.push(cliente.sucursales[key].ubicacion);
			}
			selff.$el.empty();
			selff.$el.append(
				selff.template(
					{
						idCli:cliente.id,
						nomCli:cliente.nombre,
						esloganCli:cliente.eslogan,
						horarioCli:horario,
						resenaCli:cliente.resena,
						dirCli:direcciones
					})
			);
			//logo
			var url= "http://michellhdz.com/offerhunter/laravel/app/uploads/clilogo/"+cliente.logo;
			$(".logo").css("background-image", "url("+url+")"); 
			//llamadas
			$(".contacto").click(function() {
				window.location.href="tel://"+cliente.telefono;
			});
			//compartir
			$(".comp").click(function() {
				window.plugins.socialsharing.share('Compartido desde OfferHunter', null, 'http://michellhdz.com/offerhunter/laravel/app/uploads/oferimg/bft3dcf.walmart18oct.jpg', 'http://offerhunter.com.mx')
			});
			//ofertas	
			/*$(".ofertas").click(function() {
				window.location.href="#/ofertas/"+idoferta;
			});*/
			//led
			if(switchh)
				$(".switch").css("color","#58DA90");
			//mapas
			/*google.maps.event.addDomListener($(".mapa"), "load", function(){
				var mapOptions = {
				  center: new google.maps.LatLng(22.216035, -97.857869),
				  zoom: 10,
				  mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				var map = new google.maps.Map($(".mapa")[0],mapOptions);
				//marker
				for(var key in ubicaciones)
				{
					ubicacion = ubicaciones[key].split(',');
					var place = new google.maps.LatLng(ubicacion[0],ubicacion[1]);
					var marker = new google.maps.Marker({
						position: place, 
						map: map 
					});
				}
			});*/
		});
    }
  });
  return ClientePage;
});
