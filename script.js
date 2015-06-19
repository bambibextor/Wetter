$(document).ready(function(){
	var skycons = new Skycons({
		color: "#ffb90f",
		resizeClear: true
	});

	navigator.geolocation.getCurrentPosition(function(position){
		//hier suchen wir die aktuellen koordinaten

			//ein Objekt
			var koordinaten = { 

				longitude: position.coords.longitude,
				latitude: position.coords.latitude

			};
		//in den Link meinen API Key einfügen, dieser sieht man, wenn man bei https://developer.forecast.io/ eingeloggt ist
		//forecast.io Anfrage
			$.ajax({
				url: 'https://api.forecast.io/forecast/074dda45e7a36c5645570c91ba46be0f/'+ koordinaten.latitude +','+ koordinaten.longitude,
				data: {
					units: 'si',
					lang: 'de'
				},
			dataType: 'jsonp'

			}).done(function(data){
				console.log(data);
				$('.temperatur').text(data.currently.apparentTemperature+ ' °C');
				$('.summary-currently').text(data.currently.summary);
				$('.summary-daily').text(data.daily.summary);
				skycons.add($('.js-icon')[0], data.currently.icon);
				skycons.play();
				skycons.add($('.js-icon-daily')[0], data.daily.icon);
				skycons.play();
				//google geocoding anfrage
				$.ajax({
					url: 'https:maps.googleapis.com/maps/api/geocode/json',
					data: {
						latlng: koordinaten.latitude +','+ koordinaten.longitude,
						key: 'AIzaSyDgYh-UffzCV54XCcReML4WSqyb0_zv8x8',
						language: 'de'
					}
				}).done(function(data){
					console.log(data);
					$('.address').text(data.results[0].formatted_address);
					$('.street').text(data.results[0].address_components[1].long_name);
				});

			});


	});

	
	//skycons.add($('.js-icon')[0], Skycons.RAIN);
	//skycons.play();

	//setTimeout (function(){
	//	skycons.set($('.js-icon')[0], Skycons.PARTLY_CLOUDY_DAY);
	//}, 5000);
});

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyDgYh-UffzCV54XCcReML4WSqyb0_zv8x8