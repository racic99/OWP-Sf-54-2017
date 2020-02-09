$(document).ready(function() {	
	
	var idFilma = window.location.search.slice(1).split('&')[0].split('=')[1];
	
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
		$.get('KupovinaKarteServlet', function(data) {
			if (data.status == 'unauthenticated') {
				window.location.replace('Login.html');
				return;
			}
			
			if (data.status == 'success') {
				
				var projekcije = data.projekcije;
				var filmovi = data.filmovi;
				var sale = data.sale;
				var tipovi = data.tipoviProjekcije;
				
				for(f in filmovi){
					if(filmovi[f].id == idFilma){
						$('#imeFilma').append('Projekcije za film - ' + filmovi[f].naziv);
						break;
					}
				}
				
				$('#pocetna').append('<a href="KorisnikProjekcije.html">Pocetna stranica</a>');
				
				for (p in projekcije) {
					$('#projekcijeTabela').append(
						
							'<tr>' + 
								'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
								'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
								'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
								'<td>' + projekcije[p].cenaKarte + '</td>' +  
								'<td><a href="KupovinaKarteFaza2.html?id=' + projekcije[p].id + '">' + 'Kupi kartu' + '</td>' +
							'</tr>' 
					);
				}
				
			}
			
			
		});
	}
	
	getProjekcije();
	
});