$(document).ready(function() {	
	
	var idProjekcije = window.location.search.slice(1).split('&')[0].split('=')[1];
	
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
				
				//var projekcije = data.projekcije;
				
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
					
					if(Date.parse(projekcija.datumVreme) > new Date()){
						$('#korisnikPrikaz').append(
								'</br>' +
							'<button style="background-color: dodgerblue; color: white;" type="button" id="kupiKartuButton">Kupi kartu</button>' 
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
						params = {
								'action': 'delete',
								'idFilma': idFilma, 
							};
							$.post('FilmServlet', params, function(data) {
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