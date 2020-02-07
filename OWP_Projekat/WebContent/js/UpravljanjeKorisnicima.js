 $(document).ready(function() {
	 
		history.pushState(null, null, location.href);
	    window.onpopstate = function () {
	        history.go(1);
	    };

function ispisProfil(){
			$.get('UpravljanjeKorisnicimaServlet', function(data){
				
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

var korimePretraga = $('#korimePretragaInput');
var ulogaKorisnikaPretraga = $('#ulogaKorisnikaInput');

korimePretraga.hide();
ulogaKorisnikaPretraga.hide();

var nacinPretrage = $('#nacinPretrage');

var korisniciTabela = $('#korisniciTabela');

$.get('UpravljanjeKorisnicimaServlet', function(data){

	if (data.status == 'success') {
		
		var korisnici = data.korisnici;
		
		for (k in korisnici) {
			korisniciTabela.append(
					
					'<tr>' + 
						'<td><a href="Nalog.html?id=' + korisnici[k].korime + '">' + korisnici[k].korime + '</a></td>' + 
						'<td>' + korisnici[k].uloga + '</td>' + 
						'<td>' + korisnici[k].datumRegistracije + '</td>' +  
					'</tr>' 
			);
		}
	}
});

nacinPretrage.change(function(){
	if($(this).val() == '1'){
		korimePretraga.show();
		ulogaKorisnikaPretraga.hide();
		
		korimePretraga.focus();
	} else 	if($(this).val() == '2'){
		korimePretraga.hide();
		ulogaKorisnikaPretraga.show();
	} else 	if($(this).val() == '3'){
		korimePretraga.hide();
		ulogaKorisnikaPretraga.hide();
		
		location.reload();
	} 

});

korimePretraga.keyup(function(event) {
    
	var korimePretragaValue = korimePretraga.val();
	
	var params = {
			'korimePretraga': korimePretragaValue, 
	}
				
	$.get('UpravljanjeKorisnicimaServlet',params, function(data){

		if (data.status == 'success') {
			
			korisniciTabela.find('tr:gt(0)').remove();
			
			if (korimePretragaValue == ''){
				
				var korisnici = data.korisnici;
				
				for (k in korisnici) {
					korisniciTabela.append(
							
							'<tr>' + 
								'<td><a href="Nalog.html?id=' + korisnici[k].korime + '">' + korisnici[k].korime + '</a></td>' + 
								'<td>' + korisnici[k].uloga + '</td>' + 
								'<td>' + korisnici[k].datumRegistracije + '</td>' +  
							'</tr>' 
					);
				}
				
		}else{
								
			var korisnici = data.korimenaPretraga;
			
			for (k in korisnici) {
				korisniciTabela.append(
						
						'<tr>' + 
							'<td><a href="Nalog.html?id=' + korisnici[k].korime + '">' + korisnici[k].korime + '</a></td>' + 
							'<td>' + korisnici[k].uloga + '</td>' + 
							'<td>' + korisnici[k].datumRegistracije + '</td>' +  
						'</tr>' 
				);
			}
		}
		}
	});
    
});

ulogaKorisnikaPretraga.change(function(){
	
	var ulogaKorisnikaPretragaValue = $('#ulogaKorisnikaInput option:selected').text();
	
	console.log(ulogaKorisnikaPretragaValue);
	
	var params = {
			'ulogaKorisnikaPretraga': ulogaKorisnikaPretragaValue, 
	}
				
	$.get('UpravljanjeKorisnicimaServlet',params, function(data){

		if (data.status == 'success') {
			
			korisniciTabela.find('tr:gt(0)').remove();
			
			if (ulogaKorisnikaPretragaValue == 'Izaberi ulogu'){
				
				var korisnici = data.korisnici;
				
				for (k in korisnici) {
					korisniciTabela.append(
							
							'<tr>' + 
								'<td><a href="Nalog.html?id=' + korisnici[k].korime + '">' + korisnici[k].korime + '</a></td>' + 
								'<td>' + korisnici[k].uloga + '</td>' + 
								'<td>' + korisnici[k].datumRegistracije + '</td>' +  
							'</tr>' 
					);
				}
				
		}else{
								
			var korisnici = data.ulogaKorisnikaPretraga;
			
			for (k in korisnici) {
				korisniciTabela.append(
						
						'<tr>' + 
							'<td><a href="Nalog.html?id=' + korisnici[k].korime + '">' + korisnici[k].korime + '</a></td>' + 
							'<td>' + korisnici[k].uloga + '</td>' + 
							'<td>' + korisnici[k].datumRegistracije + '</td>' +  
						'</tr>' 
				);
			}
		}
		}
	});
	
});

});