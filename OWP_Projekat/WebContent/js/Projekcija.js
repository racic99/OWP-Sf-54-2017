$(document).ready(function() {	
	
	var idProjekcije = window.location.search.slice(1).split('&')[0].split('=')[1];
	
	$('#karteTabela').hide();
	$('#karteZaProjekciju').hide();
	
    function ispisProfil(){
		$.get('ProjekcijaServlet', function(data){
			
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
	
	function getProjekcija(){
		$.get('ProjekcijaServlet', {'idProjekcije': idProjekcije}, function(data) {
			if (data.status == 'unauthenticated') {
				window.location.replace('Login.html');
				return;
			}
			
			if (data.status == 'success') {
				var projekcija = data.projekcija;
				
				var filmovi = data.filmovi;
				var sale = data.sale;
				var tipovi = data.tipoviProjekcije;
				
				$('#pocetna').append('<a href="KorisnikProjekcije.html">Pocetna stranica</a>');
				document.title = "Projekcija - " + projekcija.datumVreme;
				$('#imeProjekcije').append('Pregled projekcije - ' + projekcija.datumVreme);
				
				if (data.ulogaPrijavljenogKorisnika == 'KORISNIK') {
					
					$('#korisnikPrikaz').append(
							'<form>' +
							'<table>' +
								'<tr id="nazivFilma"></tr>' +
								'<tr><td align="left">Datum i vreme prikazivanja:</td><td align="left">'+ projekcija.datumVreme +'</td></tr>' +
								'<tr id="nazivTipaProjekcije"></tr>' +
								'<tr id="nazivSale"></tr>' +
								'<tr><td align="left">Cena karte:</td><td align="left">'+ projekcija.cenaKarte +'</td></tr>' +
							'</table>' +
						'</form>'			
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
					
					if(Date.parse(projekcija.datumVreme) > new Date() && projekcija.aktivan){
						$('#korisnikPrikaz').append(
								'</br>' +
								'<p><a style="text-decoration: none; font-weight: bold; color: dodgerblue;" href="KupovinaKarteFaza2.html?id='+ idProjekcije +'">Kupi kartu</a></p>'
						);
					}
					

				
				}else if (data.ulogaPrijavljenogKorisnika == 'ADMIN') {

					$('#adminInterfejs').append('<a href="UpravljanjeKorisnicima.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Upravljanje korisnicima</a><br/>');
					$('#adminInterfejs').append('<a href="Izvestavanje.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Izvestavanje</a>');

					$('#adminPrikaz').append(
							'<form>' +
							'<table>' +
								'<tr id="nazivFilma"></tr>' +
								'<tr><td align="left">Datum i vreme prikazivanja:</td><td align="left">'+ projekcija.datumVreme +'</td></tr>' +
								'<tr id="nazivTipaProjekcije"></tr>' +
								'<tr id="nazivSale"></tr>' +
								'<tr><td align="left">Cena karte:</td><td align="left">'+ projekcija.cenaKarte +'</td></tr>' +
								'<tr><td/><td align="left"; id="dugmeTd"></td></tr>' +
							'</table>' +
						'</form>'			
					);
					
					$('#karteZaProjekciju').show();
					
					var karte = data.karteZaProjekciju;
					var projekcije = data.projekcije;
					for (k in karte) {
						$('#karteTabela').append(
							'<tr>' + 
								'<td style="background-color : lightblue;"><a href="Karta.html?id=' + karte[k].id + '">' + karte[k].datumVreme + '</a></td>' + 
								'<td style="background-color : lightblue;"><a href="Nalog.html?username=' + karte[k].korisnik + '">' + karte[k].korisnik +'</a></td>' +
							'</tr>' 
						);
					
					}
					
					$('#karteTabela').show();
					
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
					
					if(projekcija.aktivan){
						$('#dugmeTd').append(
								'<input style="background-color: dodgerblue; color: white;" type="submit" value="Obrisi" id="brisanjeSubmit">'
						);
					}
					
					}
					
					$('#brisanjeSubmit').on('click', function(event) {
							$.post('ProjekcijaServlet', {'idProjekcije': idProjekcije}, function(data) {
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
	getProjekcija();
	
});