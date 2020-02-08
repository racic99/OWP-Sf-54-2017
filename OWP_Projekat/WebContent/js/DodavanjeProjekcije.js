$(document).ready(function() {
	
    function ispisProfil(){
		$.get('DodavanjeProjekcijeServlet', function(data){
			
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
    
	var tipProjekcijeInput = $('#tipProjekcijeInput');
	var salaInput = $('#salaInput');
	var datumInput = $('#datumInput');
	var vremeInput = $('#vremeInput');
	var cenaKarteInput = $('#cenaKarteInput');
	
	function cbFilm(){
		filmCB = document.getElementById('filmInput');
		$.get('DodavanjeProjekcijeServlet', function(data){
			var filmovi = data.filmovi;
			for (var i = 0; i<filmovi.length; i++) { 
				filmCB.options[filmCB.options.length] = new Option(filmovi[i].id + '|' + filmovi[i].naziv);
			}	
			
		});
	}
	cbFilm();
	
	$('#dodajProjekcijuSubmit').on('click', function(event) {
		
		var filmValue = $('#filmInput option:selected').text();
		var idFilmaValue = filmValue.split("|", 1);
		var idFilma = idFilmaValue[0];
		var tipProjekcijeValue = $('#tipProjekcijeInput option:selected').text();
		var salaValue = $('#salaInput option:selected').text();
		var datumValue = datumInput.val();
		var vremeValue = vremeInput.val();
		var cenaKarteValue = cenaKarteInput.val().trim();
		
		if(filmValue == 'Izaberi film'){
			alert('Morate izabrati film!');
			event.preventDefault();
			return false;
		}
		else if(tipProjekcijeValue == 'Izaberi tip projekcije'){
			alert('Morate izabrati tip projekcije!');
			event.preventDefault();
			return false;
		}
		else if(salaValue == 'Izaberi salu'){
			alert('Morate izabrati salu!');
			event.preventDefault();
			return false;
		}
		else if(datumValue == "" || vremeValue == ""){
			alert('Morate uneti datum i vreme!');
			event.preventDefault();
			return false;
		}
		else if(Date.parse(datumValue + " " + vremeValue + ":" + "00") < new Date()){
			alert('Datum i vreme ne smeju biti u proslosti!');
			event.preventDefault();
			return false;
		}
		else if(cenaKarteValue == ""){
			alert('Morate uneti cenu karte!');
			event.preventDefault();
			return false;
		}
		else if(isNaN(cenaKarteValue)){
			alert('Cena karte mora biti broj!');
			event.preventDefault();
			return false;
		}
		else if(tipProjekcijeValue == "3D" && (salaValue == "Srednja sala" || salaValue == "Mala sala")){
			alert('Samo "Velika sala" ima mogucnost prikazivanja 3D filma!');
			event.preventDefault();
			return false;
		}
		else if(tipProjekcijeValue == "4D" && (salaValue == "Velika sala" || salaValue == "Mala sala")){
			alert('Samo "Srednja sala" ima mogucnost prikazivanja 3D filma!');
			event.preventDefault();
			return false;
		}
		
		if(tipProjekcijeValue == "2D"){
			tipProjekcijeValue = 1;
		}
		else if(tipProjekcijeValue == "3D"){
			tipProjekcijeValue = 2;
		}
		else if(tipProjekcijeValue == "4D"){
			tipProjekcijeValue = 3;
		}
		
		if(salaValue == "Velika sala"){
			salaValue = 1;
		}
		else if(salaValue == "Srednja sala"){
			salaValue = 2;
		}
		else if(salaValue == "Mala sala"){
			salaValue = 3;
		}
		
		var params = {
				'idFilma': idFilma, 
				'tipProjekcijeValue': tipProjekcijeValue,
				'salaValue': salaValue, 
				'datumVreme': datumValue + " " + vremeValue + ":" + "00",
				'cenaKarteValue': cenaKarteValue, 	
			}
		
		$.post('DodavanjeProjekcijeServlet', params, function(data) {

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