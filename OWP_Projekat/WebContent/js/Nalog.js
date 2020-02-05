$(document).ready(function() {	
	
var korime = window.location.search.slice(1).split('&')[0].split('=')[1];

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

function getKorisnik(){
	$.get('NalogServlet', {'korime': korime}, function(data) {
		if (data.status == 'unauthenticated') {
			window.location.replace('Login.html');
			return;
		}
		
		if (data.status == 'success') {
			var korisnik = data.korisnik;
			
			$('#pocetna').append('<a href="KorisnikProjekcije.html">Pocetna stranica</a>');
			document.title = "Nalog - " + korime;
			$('#imeNaloga').append('Pregled profila - ' + korime);
			
			if (data.ulogaPrijavljenogKorisnika == 'KORISNIK') {
				
				$('#korisnikPrikaz').append(
						'<form>' +
						'<table>' +
							'<tr><td align="left">Korisnicko ime:</td><td align="left">' + korime + '</td></tr>' +
							'<tr><td align="left">Datum i vreme registracije:</td><td align="left">'+ korisnik.datumRegistracije +'</td></tr>' +
							'<tr><td align="left">Uloga:</td><td align="left">'+ korisnik.uloga +'</td></tr>' +
							'<tr><td/><td align="left"><button style="background-color: dodgerblue; color: white;" type="button" id="izmenaButton">Izmeni</button></td></tr>' +
						'</table>' +
					'</form>'			
				);
				
				$('#izmenaButton').on('click', function(event) {
					$('#korisnikIzmena').append(
							'<form>' +
							'<p>Izmena lozinke</p>' +
								'<table>' +
									'<tr><td>Trenutna lozinka:</td><td><input type="text" name="currentPassword" id="currentPasswordInput"/></td></tr>' +
									'<tr><td>Lozinka:</td><td><input type="password" name="password" id="passwordInput"/></td></tr>' +
									'<tr><td/><td align="left"><input style="background-color: dodgerblue; color: white;" type="submit" value="Potvrdi" id="izmenaPotvrdaSubmitKorisnik"></td></tr>' +
								'</table>' +
							'</form>'
					
					);
				});
				

			
			}else if (data.ulogaPrijavljenogKorisnika == 'ADMIN') {
				var prijavljenKorisnik = data.prijavljenKorisnik;
				console.log(prijavljenKorisnik.korime);
				if(prijavljenKorisnik.korime == korime){
				$('#adminPrikaz').append(
						'<form>' +
						'<table>' +
							'<tr><td align="left">Korisnicko ime:</td><td align="left">' + korime + '</td></tr>' +
							'<tr><td align="left">Datum i vreme registracije:</td><td align="left">'+ korisnik.datumRegistracije +'</td></tr>' +
							'<tr><td align="left">Uloga:</td><td align="left">'+ korisnik.uloga +'</td></tr>' +
							'<tr><td/><td align="left"><button style="background-color: dodgerblue; color: white;" type="button" id="izmenaButtonAdmin">Izmeni</button></td></tr>' +
						'</table>' +
					'</form>'			
				);
				}else{
					$('#adminPrikaz').append(
							'<form>' +
							'<table>' +
								'<tr><td align="left">Korisnicko ime:</td><td align="left">' + korime + '</td></tr>' +
								'<tr><td align="left">Datum i vreme registracije:</td><td align="left">'+ korisnik.datumRegistracije +'</td></tr>' +
								'<tr><td align="left">Uloga:</td><td align="left">'+ korisnik.uloga +'</td></tr>' +
								'<tr><td/><td align="left"><button style="background-color: dodgerblue; color: white;" type="button" id="izmenaButtonAdmin">Izmeni</button><input style="background-color: dodgerblue; color: white;" type="submit" value="Obrisi" id="brisanjeSubmit"></td></tr>' +
							'</table>' +
						'</form>'			
					);
				}
				
				$('#izmenaButtonAdmin').on('click', function(event) {
					$('#adminIzmena').append(
							'<form>' +
							'<p>Izmena lozinke i tipa korisnika</p>' +
								'<table>' +
									'<tr><td>Trenutna lozinka:</td><td><input type="text" name="currentPassword" id="currentPasswordInputAdmin"/></td></tr>' +
									'<tr><td>Lozinka:</td><td><input type="password" name="password" id="passwordInputAdmin"/></td></tr>' +
									'<tr><td>Tip Korisnika:</td><td><select id="tipKorisnika" name="comboBoxTipKorisnika">' +
										'<option value="7" selected="selected">Izaberi zeljeni tip</option>' +
										'<option value="1">KORISNIK</option>' +
										'<option value="2">ADMIN</option>' +		
									'</select></td></tr>' +
									'<tr><td/><td align="left"><input style="background-color: dodgerblue; color: white;" type="submit" value="Potvrdi" id="izmenaPotvrdaSubmitAdmin"></td></tr>' +
								'</table>' +
							'</form>'
					
					);
				});
				
			}
		}
	});
}
getKorisnik();

});