$(document).ready(function(){
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
				$('.description').text(data.currently.summary);
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
				});

			});


	});
});

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyDgYh-UffzCV54XCcReML4WSqyb0_zv8x8