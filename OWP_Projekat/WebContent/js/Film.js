$(document).ready(function() {	
	
	var idFilma = window.location.search.slice(1).split('&')[0].split('=')[1];
	
    function ispisProfil(){
		$.get('FilmServlet', function(data){
			
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
	
	function getFilm(){
		$.get('FilmServlet', {'idFilma': idFilma}, function(data) {
			if (data.status == 'unauthenticated') {
				window.location.replace('Login.html');
				return;
			}
			
			if (data.status == 'success') {
				var film = data.film;
				var projekcije = data.projekcije;
				
				$('#pocetna').append('<a href="KorisnikProjekcije.html">Pocetna stranica</a>');
				document.title = "Film - " + film.naziv;
				$('#imeFilma').append('Pregled filma - ' + film.naziv);
				
				if (data.ulogaPrijavljenogKorisnika == 'KORISNIK') {
					
					$('#korisnikPrikaz').append(
							'<form>' +
							'<table>' +
								'<tr><td align="left">Naziv:</td><td align="left">' + film.naziv + '</td></tr>' +
								'<tr><td align="left">Reziser:</td><td align="left">'+ film.reziser +'</td></tr>' +
								'<tr><td align="left">Glumci:</td><td align="left">'+ film.glumci +'</td></tr>' +
								'<tr><td align="left">Zanrovi:</td><td align="left">' + film.zanrovi + '</td></tr>' +
								'<tr><td align="left">Trajanje:</td><td align="left">'+ film.trajanje +'</td></tr>' +
								'<tr><td align="left">Distributer:</td><td align="left">'+ film.distributer +'</td></tr>' +
								'<tr><td align="left">Zemlja porekla:</td><td align="left">' + film.zemljaPorekla + '</td></tr>' +
								'<tr><td align="left">Godina proizvodnje:</td><td align="left">'+ film.godinaProizvodnje +'</td></tr>' +
								'<tr><td align="left">Opis:</td><td align="left">'+ film.opis +'</td></tr>' +
							'</table>' +
						'</form>'			
					);
					
					for(p in projekcije){
						if(projekcije[p].film == idFilma){
							if(Date.parse(projekcije[p].datumVreme) > new Date()){
								$('#korisnikPrikaz').append(
										'</br>' +
										'<p><a style="text-decoration: none; font-weight: bold; color: dodgerblue;" href="KupovinaKarteFaza1.html?id='+ idFilma +'">Kupi kartu</a></p>'								);
								break;
							}
						}
						
					}
				
				}else if (data.ulogaPrijavljenogKorisnika == 'ADMIN') {

					$('#adminInterfejs').append('<a href="UpravljanjeKorisnicima.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Upravljanje korisnicima</a><br/>');
					$('#adminInterfejs').append('<a href="Izvestavanje.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Izvestavanje</a>');

					$('#adminPrikaz').append(
							'<form>' +
							'<table>' +
								'<tr><td align="left">Naziv:</td><td align="left">' + film.naziv + '</td></tr>' +
								'<tr><td align="left">Reziser:</td><td align="left">'+ film.reziser +'</td></tr>' +
								'<tr><td align="left">Glumci:</td><td align="left">'+ film.glumci +'</td></tr>' +
								'<tr><td align="left">Zanrovi:</td><td align="left">' + film.zanrovi + '</td></tr>' +
								'<tr><td align="left">Trajanje:</td><td align="left">'+ film.trajanje +'</td></tr>' +
								'<tr><td align="left">Distributer:</td><td align="left">'+ film.distributer +'</td></tr>' +
								'<tr><td align="left">Zemlja porekla:</td><td align="left">' + film.zemljaPorekla + '</td></tr>' +
								'<tr><td align="left">Godina proizvodnje:</td><td align="left">'+ film.godinaProizvodnje +'</td></tr>' +
								'<tr><td align="left">Opis:</td><td align="left">'+ film.opis +'</td></tr>' +
								'<tr><td/><td align="left"; id="dugmeTd"><button style="background-color: dodgerblue; color: white;" type="button" id="izmenaButtonAdmin">Izmeni</button></td></tr>' +
							'</table>' +
						'</form>'			
					);
					
					if(film.aktivan){
						$('#dugmeTd').append(
								'<input style="background-color: dodgerblue; color: white;" type="submit" value="Obrisi" id="brisanjeSubmit">'
						);
					}
					
					}
					
					$('#izmenaButtonAdmin').on('click', function(event) {
						$('#adminIzmena').append(
								'<form>' +
								'<p>Izmena filma</p>' +
									'<table>' +
										'<tr><td>Naziv:</td><td><input type="text" name="naziv" id="nazivInput"/></td></tr>' +
										'<tr><td>Reziser:</td><td><input type="text" name="reziser" id="reziserInput"/>(Opciono)</td></tr>' +
										'<tr><td>Glumci:</td><td><input type="text" name="glumci" id="glumciInput"/>(Opciono)</td></tr>' +
										'<tr><td>Zanrovi:</td><td><input type="text" name="zanrovi" id="zanroviInput"/>(Opciono)</td></tr>' +
										'<tr><td>Trajanje:</td><td><input type="text" name="trajanje" id="trajanjeInput"/></td></tr>' +
										'<tr><td>Distributer:</td><td><input type="text" name="distributer" id="distributerInput"/></td></tr>' +
										'<tr><td>Zemlja porekla:</td><td><input type="text" name="zemljaPorekla" id="zemljaPoreklaInput"/></td></tr>' +
										'<tr><td>Godina proizvodnje:</td><td><input type="text" name="godinaProizvodnje" id="godinaProizvodnjeInput"/></td></tr>' +
										'<tr><td>Opis:</td><td><input type="text" name="opis" id="opisInput"/>(Opciono)</td></tr>' +
										'<tr><td/><td align="left"><input style="background-color: dodgerblue; color: white;" type="submit" value="Potvrdi" id="izmenaPotvrdaSubmitAdmin"></td></tr>' +
									'</table>' +
								'</form>'
						
						);
						
						var nazivInput = $('#nazivInput');
						var reziserInput = $('#reziserInput');
						var glumciInput = $('#glumciInput');
						var zanroviInput = $('#zanroviInput');
						var trajanjeInput = $('#trajanjeInput');
						var distributerInput = $('#distributerInput');
						var zemljaPoreklaInput = $('#zemljaPoreklaInput');
						var godinaProizvodnjeInput = $('#godinaProizvodnjeInput');
						var opisInput = $('#opisInput');
						
						nazivInput.val(film.naziv);
						reziserInput.val(film.reziser);
						glumciInput.val(film.glumci);
						zanroviInput.val(film.zanrovi);
						trajanjeInput.val(film.trajanje);
						distributerInput.val(film.distributer);
						zemljaPoreklaInput.val(film.zemljaPorekla);
						godinaProizvodnjeInput.val(film.godinaProizvodnje);
						opisInput.val(film.opis);
						
						
						$('#izmenaPotvrdaSubmitAdmin').on('click', function(event) {
							
							var nazivInputValue = nazivInput.val().trim();
							var reziserInputValue = reziserInput.val().trim();
							var glumciInputValue = glumciInput.val().trim();
							var zanroviInputValue = zanroviInput.val().trim();
							var trajanjeInputValue = trajanjeInput.val().trim();
							var distributerInputValue = distributerInput.val().trim();
							var zemljaPoreklaInputValue = zemljaPoreklaInput.val().trim();
							var godinaProizvodnjeInputValue = godinaProizvodnjeInput.val().trim();
							var opisInputValue = opisInput.val().trim();
							
							if(nazivInputValue == ""){
								alert('Morate uneti naziv filma!');
								event.preventDefault();
								return false;
							}
							else if(trajanjeInputValue == ""){
								alert('Morate uneti duzinu trajanja filma!');
								event.preventDefault();
								return false;
							}
							else if(distributerInputValue == ""){
								alert('Morate uneti distributera filma!');
								event.preventDefault();
								return false;
							}
							else if(zemljaPoreklaInputValue == ""){
								alert('Morate uneti zemlju porekla!');
								event.preventDefault();
								return false;
							}
							else if(godinaProizvodnjeInputValue == ""){
								alert('Morate uneti godinu proizvodnje!');
								event.preventDefault();
								return false;
							}
							else if(isNaN(trajanjeInputValue)){
								alert('Duzina trajanja filma mora biti broj!');
								event.preventDefault();
								return false;
							}
							else if(isNaN(godinaProizvodnjeInputValue)){
								alert('Godina proizvodnje filma mora biti broj!');
								event.preventDefault();
								return false;
							}
							else if(trajanjeInputValue < 0 || trajanjeInputValue > 300){
								alert('Duzina trajanja filma mora biti veca od 0 i manja od 300 minuta!');
								event.preventDefault();
								return false;
							}
							else if(godinaProizvodnjeInputValue < 1900 || godinaProizvodnjeInputValue > 2020){
								alert('Godina proizvodnje mora biti izmedju 1900 i 2020!');
								event.preventDefault();
								return false;
							}
							
							var params = {
									'action': 'izmenaFilma',
									'idFilma': idFilma,
									'naziv': nazivInputValue, 
									'reziser': reziserInputValue,
									'glumci': glumciInputValue, 
									'zanrovi': zanroviInputValue,
									'trajanje': trajanjeInputValue, 
									'distributer': distributerInputValue,
									'zemljaPorekla': zemljaPoreklaInputValue, 
									'godinaProizvodnje': godinaProizvodnjeInputValue,
									'opis': opisInputValue, 
								}
							
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
						
						
						
					});
					
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
	getFilm();
	
});