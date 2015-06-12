$(document).ready(function(){
	navigator.geolocation.getCurrentPosition(function(position){
		//hier suchen wir die aktuellen koordinaten

			//ein Objekt
			var koordinaten = { 

				longitude: position.coords.longitude,
				latitude: position.coords.latitude

			};
		//in den Link meinen API Key einfügen, dieser sieht man, wenn man bei https://developer.forecast.io/ eingeloggt ist

			$.ajax({
				url: 'https://api.forecast.io/forecast/074dda45e7a36c5645570c91ba46be0f/'+ koordinaten.latitude +','+ koordinaten.longitude,
				data: {
					units: 'si',
					lang: 'de'
					},
			dataType: 'jsonp'

			}).done(function(data){
				console.log(data);
				$('.temperatur').text(data.currently.apparentTemperature);
				$('.description').text(data.currently.summary);

			});


	});
});

