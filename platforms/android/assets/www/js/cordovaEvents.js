var gblLatitude = '';
var gblLongitude = '';

/*
 * MABH20120404
 * Funcion callback del cordova
 * Iniciamos la app si se encuentra online
 */
function onOnline() {
	init();
}

/*
 * MABH20120404
 * Funcion callback del cordova
 * Iniciamos la app si se encuentra offline
 */
function onOffline() {
	init();
}

/*
 * MABH20120404
 * Funcion callback del cordova
 * Es comun que el usuario seleccione sin querer el boton de back (Android)
 * Por lo que se debe preguntar si en realidad quiere salir de la app
 */
function onBackKeyDown() {
	var msg='Do you want to exit the application?';
	navigator.notification.confirm(msg,function(answer) {
	if(answer==1) {
		device.exitApp();
	}});
}

/*
 * MABH20120404
 * Solo se llama si estamos en un dispositivo movil
 * Esta funcion inicializa el proceso para sacar la geolocalizacion del usuario
 * cada vez que esta cambie
 */
function doEnableGPSWatch() {
	
    //navigator.notification.alert('init geolocation');
    
	//Si elimina el watchid para inicializar uno nuevo
	//navigator.geolocation.clearWatch(gblGPSWatchID);
	
	//Sacamos el tiempo actual en milisegundos
	//gpsLastTime = new Date();
	//gpsLastTime = gpsLastTime.getTime();
	
	try {
		//watchPosition es una funcion asincrono del cordova
		//seteamos las opciones para el watcher
		var opts = { 
			maximumAge: 3000, 
			timeout: 30000, 
			enableHighAccuracy: true, 
			frequency: 3000 
		};
		//gblGPSWatchID = navigator.geolocation.watchPosition(geolocationSucces, geolocationError, opts);
        navigator.geolocation.watchPosition(geolocationSucces, geolocationError, opts);
	} catch (e) {
		setGeolocationPosition();
	}
}

function geolocationSucces(position) {
	setGeolocationPosition(position);
}
	
function geolocationError(error) {
	setGeolocationPosition();
}

function setGeolocationPosition(position) {
	//navigator.notification.alert('update geolocation');
	if(position) {
		//seteamos las variables de latitude y longitud
		gblLatitude = position.coords.latitude;
		gblLongitude = position.coords.longitude;
        //navigator.notification.alert('geolocation updated');
        //$('.geolocation').val(gblLatitude +', '+gblLongitude);
	} else {
        if(gblLatitude != '') {
            //$('.geolocation').val(gblLatitude +', '+gblLongitude);
			var position = {};
			position.coords = {};
			position.coords.latitude = gblLatitude;
			position.coords.longitude = gblLongitude;
			$('.geolocation').geolocation('setGeolocationPosition', position);
        } else {
            $('.geolocation').val('');
        }
	}
	
	//$('#settingsLatitude').text(gblLatitude);
	//$('#settingsLongitude').text(gblLongitude);
	
	// si el usuario tiene activado la opcion para guardar en el log
	// cada determinado tiempo la posicion geografica
	/*
	if(userGPSCheck > 0) {
		
		if(gpsLastTime == 0) {
			gpsLastTime = new Date();
			gpsLastTime = gpsLastTime.getTime();
		}
		
		var curTime = new Date();
		curTime = curTime.getTime();
		
		var diffTime = curTime - gpsLastTime;
		var gpsCheckTime = userGPSCheck*60*1000;
		
		if(diffTime > gpsCheckTime) {
			gpsLastTime = 0;
			Debugger.message('Geolocation updated');
		}
	}
	*/
}

function doDisableGPSWatch() {
	navigator.geolocation.clearWatch(gblGPSWatchID);
	gblGPSWatchID = null;
}