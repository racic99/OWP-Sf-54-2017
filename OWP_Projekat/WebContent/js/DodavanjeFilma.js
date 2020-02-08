 $(document).ready(function() {
	 
	    function ispisProfil(){
			$.get('DodavanjeFilmaServlet', function(data){
				
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
	    
		var nazivInput = $('#nazivInput');
		var reziserInput = $('#reziserInput');
		var glumciInput = $('#glumciInput');
		var zanroviInput = $('#zanroviInput');
		var trajanjeInput = $('#trajanjeInput');
		var distributerInput = $('#distributerInput');
		var zemljaPoreklaInput = $('#zemljaPoreklaInput');
		var godinaProizvodnjeInput = $('#godinaProizvodnjeInput');
		var opisInput = $('#opisInput');
		
		$('#dodajFilmSubmit').on('click', function(event) {
			
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
			
			$.post('DodavanjeFilmaServlet', params, function(data) {

				if (data.status == 'unauthenticated') {
					window.location.replace('Login.html');
					return;
				}
				if (data.status == 'success') {
					window.location.replace('KorisnikProjekcije.html');
				}
			});

			event.preventDefault();
			return false;
			
			
			
		});
	 
 });