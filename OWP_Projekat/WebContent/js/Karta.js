$(document).ready(function() {	
	
	var idKarte = window.location.search.slice(1).split('&')[0].split('=')[1];
	
    function ispisProfil(){
		$.get('KartaServlet', function(data){
			
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
	
	function getKarta(){
		$.get('KartaServlet', {'idKarte': idKarte}, function(data) {
			if (data.status == 'unauthenticated') {
				window.location.replace('Login.html');
				return;
			}
			
			if (data.status == 'success') {
				var karta = data.karta;
				
				var karte = data.karte;		
				var projekcije = data.projekcije;
				var filmovi = data.filmovi;
				var sale = data.sale;
				var tipovi = data.tipoviProjekcije;
				
				$('#pocetna').append('<a href="KorisnikProjekcije.html">Pocetna stranica</a>');
				for(p in projekcije){
					if(projekcije[p].id == karta.projekcija){
						document.title = "Sediste " + karta.sediste + " | " + projekcije[p].datumVreme;
						$('#imeKarte').append("Karta za sediste " + karta.sediste + " pocetak u " + projekcije[p].datumVreme);
						break;
					}
				}
				
				if (data.ulogaPrijavljenogKorisnika == 'KORISNIK') {
					
					$('#korisnikPrikaz').append(
							'<form>' +
							'<table>' +
								'<tr id="nazivFilma"></tr>' +
								'<tr id="datumVreme"></tr>' +
								'<tr id="nazivTipaProjekcije"></tr>' +
								'<tr id="nazivSale"></tr>' +
								'<tr><td align="left">Sediste:</td><td align="left">'+ karta.sediste +'</td></tr>' +
								'<tr id="cenaKarte"></tr>' +
							'</table>' +
						'</form>'			
					);
					
					for(k in karte){
						if(karte[k].id == idKarte){
						$('#nazivFilma').append(
								'<td align="left">Film:</td><td align="left"><a href="Film.html?id=' + filmovi.find(x => x.id === projekcije.find(x => x.id === karte[k].projekcija).film).id + '">' + filmovi.find(x => x.id === projekcije.find(x => x.id === karte[k].projekcija).film).naziv + '</td>'
								);
						}
					}
					
					for(p in projekcije){
						if(projekcije[p].id == karta.projekcija){
							$('#datumVreme').append(
							'<td align="left">Datum i vreme prikazivanja:</td><td align="left"><a href="Projekcija.html?id=' + karta.projekcija + '">'+ projekcije[p].datumVreme +'</td>'
							);
							break;
						}			
					}
					
					for(k in karte){
						if(karte[k].id == idKarte){
						$('#nazivTipaProjekcije').append(
								'<td align="left">Tip projekcije:</td><td align="left">' + tipovi.find(x => x.id === projekcije.find(x => x.id === karte[k].projekcija).tip).naziv + '</td>'
								);
						}
					}
					
					for(k in karte){
						if(karte[k].id == idKarte){
						$('#nazivSale').append(
								'<td align="left">Sala:</td><td align="left">' + sale.find(x => x.id === projekcije.find(x => x.id === karte[k].projekcija).sala).naziv + '</td>'
								);
						}
					}
					
					for(p in projekcije){
						if(projekcije[p].id == karta.projekcija){
							$('#cenaKarte').append(
							'<td align="left">Cena karte:</td><td align="left">'+ projekcije[p].cenaKarte +'</td>'
							);
							break;
						}			
					}
				
				}else if (data.ulogaPrijavljenogKorisnika == 'ADMIN') {

					$('#adminInterfejs').append('<a href="UpravljanjeKorisnicima.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Upravljanje korisnicima</a><br/>');
					$('#adminInterfejs').append('<a href="Izvestavanje.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Izvestavanje</a>');

					$('#adminPrikaz').append(
						'<form>' +
							'<table>' +
								'<tr id="nazivFilma"></tr>' +
								'<tr id="datumVreme"></tr>' +
								'<tr id="nazivTipaProjekcije"></tr>' +
								'<tr id="nazivSale"></tr>' +
								'<tr><td align="left">Sediste:</td><td align="left">'+ karta.sediste +'</td></tr>' +
								'<tr id="cenaKarte"></tr>' +
								'<tr id="kupac"><td align="left">Kupac:</td><td align="left"><a href="Nalog.html?username=' + karta.korisnik + '">'+ karta.korisnik +'</td></tr>' +
								'<tr><td/><td align="left"; id="dugmeTd"></td></tr>' +
							'</table>' +
						'</form>'			
					);
					
					for(k in karte){
						if(karte[k].id == idKarte){
						$('#nazivFilma').append(
								'<td align="left">Film:</td><td align="left"><a href="Film.html?id=' + filmovi.find(x => x.id === projekcije.find(x => x.id === karte[k].projekcija).film).id + '">' + filmovi.find(x => x.id === projekcije.find(x => x.id === karte[k].projekcija).film).naziv + '</td>'
								);
						}
					}
					
					for(p in projekcije){
						if(projekcije[p].id == karta.projekcija){
							$('#datumVreme').append(
							'<td align="left">Datum i vreme prikazivanja:</td><td align="left"><a href="Projekcija.html?id=' + karta.projekcija + '">'+ projekcije[p].datumVreme +'</td>'
							);
							break;
						}			
					}
					
					for(k in karte){
						if(karte[k].id == idKarte){
						$('#nazivTipaProjekcije').append(
								'<td align="left">Tip projekcije:</td><td align="left">' + tipovi.find(x => x.id === projekcije.find(x => x.id === karte[k].projekcija).tip).naziv + '</td>'
								);
						}
					}
					
					for(k in karte){
						if(karte[k].id == idKarte){
						$('#nazivSale').append(
								'<td align="left">Sala:</td><td align="left">' + sale.find(x => x.id === projekcije.find(x => x.id === karte[k].projekcija).sala).naziv + '</td>'
								);
						}
					}
					
					for(p in projekcije){
						if(projekcije[p].id == karta.projekcija){
							$('#cenaKarte').append(
							'<td align="left">Cena karte:</td><td align="left">'+ projekcije[p].cenaKarte +'</td>'
							);
							break;
						}			
					}
					
					for(k in karte){
						if(karte[k].id == idKarte){
							if(Date.parse(projekcije.find(x => x.id === karte[k].projekcija).datumVreme) > new Date()){
								$('#dugmeTd').append(
										'<input style="background-color: dodgerblue; color: white;" type="submit" value="Obrisi" id="brisanjeSubmit">'
								);
							}
						}
					}
					}
					
					$('#brisanjeSubmit').on('click', function(event) {
							$.post('KartaServlet', {'idKarte': idKarte}, function(data) {
								if (data.status == 'unauthenticated') {
									window.location.replace('Login.html');
									return;
								}

								if (data.status == 'success') {
									window.location.replace('KorisnikProjekcije.html');
									return;
								}
							});

							event.preventDefault();
							return false;
						});
					
				}
			
		});
}
	getKarta();
	
});