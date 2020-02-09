$(document).ready(function() {	
	
	var idProjekcije = window.location.search.slice(1).split('&')[0].split('=')[1].split('?')[0];
	console.log(idProjekcije);
	var brojSedista = window.location.search.slice(1).split('&')[0].split('=')[2];
	console.log(brojSedista);
	
    function ispisProfil(){
		$.get('KupovinaKarteServlet', function(data){
			
			if (data.status == 'unauthenticated') {
				window.location.replace('Login.html');
				return;
			}

			if (data.status == 'success') {
				var username = data.prijavljenKorisnikKorime;
				$('#profilLink').append('<a style="text-decoration: none; font-weight: bold; color: dodgerblue;" href="Nalog.html?username='+ username +'">Profil</a>');
			}
			
		});
	}

ispisProfil();
	
	$('#odjavaLink').on('click', function(event) {
		$.get('LogoutServlet', function(data) {

			if (data.status == 'unauthenticated') {
				window.location.replace('Projekcije.html');
				return;
			}
		});

		event.preventDefault();
		return false;
	});
	
	function getProjekcije(){
		$.get('KupovinaKarteServlet', {'idProjekcije': idProjekcije}, function(data) {
			if (data.status == 'unauthenticated') {
				window.location.replace('Login.html');
				return;
			}
			
			if (data.status == 'success') {
				
				var projekcije = data.projekcije;
				var filmovi = data.filmovi;
				var sale = data.sale;
				var tipovi = data.tipoviProjekcije;
				
				var projekcija = data.projekcija;
				
				for(f in filmovi){
					if(filmovi[f].id == projekcija.film){
						$('#imeFilma').append('Kupovina karte za film - ' + filmovi[f].naziv);
						break;
					}			
				}
				
				$('#pocetna').append('<a href="KorisnikProjekcije.html">Pocetna stranica</a>');
				
					$('#prikazPodataka').append(
														
							'<form>' +
							'<table id="prikazKarte">' +
								'<tr id="nazivFilma"></tr>' +
								'<tr><td align="left">Datum i vreme prikazivanja:</td><td align="left"><a href="Projekcija.html?id=' + idProjekcije + '">' + projekcija.datumVreme +'</td></tr>' +
								'<tr id="nazivTipaProjekcije"></tr>' +
								'<tr id="nazivSale"></tr>' +
								'<tr><td align="left">Cena karte:</td><td align="left">'+ projekcija.cenaKarte +'</td></tr>' +
								'<tr><td align="left">Broj odabranog sedista:</td><td align="left">'+ brojSedista +'</td></tr>' +
								'</table>' +
						'</form>'		
					);
					
					$('#prikazPodataka').append(
							'<p><button style="background-color: dodgerblue; color: white;" type="button" id="kupiKartuButton">Kupi kartu</button></p>'
					);
									
					for(f in filmovi){
						if(filmovi[f].id == projekcija.film){
							$('#nazivFilma').append(
							'<td align="left">Film:</td><td align="left"><a href="Film.html?id=' + projekcija.film + '">' + filmovi[f].naziv + '</td>'
							);
							break;
						}			
					}
					
					for(t in tipovi){
						if(tipovi[t].id == projekcija.tip){
							$('#nazivTipaProjekcije').append(
							'<td align="left">Tip projekcije:</td><td align="left">'+ tipovi[t].naziv +'</td>'
							);
							break;
						}			
					}
					
					for(s in sale){
						if(sale[s].id == projekcija.sala){
							$('#nazivSale').append(
							'<td align="left">Sala:</td><td align="left">' + sale[s].naziv + '</td>'
							);
							break;
						}			
					}
					
					$('#kupiKartuButton').on('click', function(event) {
						
						var params = {
								'idProjekcije': idProjekcije, 
								'sediste': brojSedista
							}
							$.post('KupovinaKarteServlet', params, function(data) {

								if (data.status == 'unauthenticated') {
									window.location.replace('Login.html');
									return;
								}
								if (data.status == 'success') {
									window.location.replace('KorisnikProjekcije.html');
								}
							});
						
					});
				
			}
			
			
		});
	}
	
	getProjekcije();
	
});