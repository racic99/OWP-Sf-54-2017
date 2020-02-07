$(document).ready(function() {
    
    function ispisProfil(){
		$.get('IzvestavanjeServlet', function(data){
			
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

var datumOd = $('#datumOdInput');
var vremeOd = $('#vremeOdInput');
var datumDo = $('#datumDoInput');
var vremeDo = $('#vremeDoInput');
var pretragaOpsegVremenaButton = $('#pretragaOpsegVremena');
var izvestavanjeTabela = $('#izvestavanjeTabela');

pretragaOpsegVremenaButton.on('click', function(event) {
	
	var datumOdValue = datumOd.val();
	var vremeOdValue = vremeOd.val();
	
	var datumDoValue = datumDo.val();
	var vremeDoValue = vremeDo.val();
	
	if(datumOdValue=='' || vremeOdValue=='' || datumDoValue=='' || vremeDoValue=='' || (datumOdValue+" "+vremeOdValue)>(datumDoValue+" "+vremeDoValue)){
    	alert("Oba polja moraju biti popunjena i datum 'Od' mora biti manji od datuma 'Do'");
	}else{
    	
		var datumOdValue = datumOd.val();
		var vremeOdValue = vremeOd.val();
		
		var datumDoValue = datumDo.val();
		var vremeDoValue = vremeDo.val();
	
	var params = {
			'datum1': datumOdValue + " " + vremeOdValue + ":" + "00", 
			'datum2': datumDoValue + " " + vremeDoValue + ":" + "00",
	}
				
	$.get('IzvestavanjeServlet',params, function(data){

		if (data.status == 'success') {
			
			izvestavanjeTabela.find('tr:gt(0)').remove();
								
			var izvestavanje = data.izvestavanje;	
			var ukupnoProjekcija = 0;
			var ukupnoProdatihKarata = 0;
			var ukupnaCenaSvihProdatihKarata = 0;
			
			for (i in izvestavanje) {
				ukupnoProjekcija += izvestavanje[i].brojProjekcija;
				ukupnoProdatihKarata += izvestavanje[i].brojProdatihKarata;
				ukupnaCenaSvihProdatihKarata += izvestavanje[i].ukupnaCena;
				izvestavanjeTabela.append(
						'<tr>' + 
						'<td>' + izvestavanje[i].nazivFilma + '</a></td>' + 
							'<td>' + izvestavanje[i].brojProjekcija + '</td>' + 
							'<td>' + izvestavanje[i].brojProdatihKarata + '</td>' + 
							'<td>' + izvestavanje[i].ukupnaCena + '</td>' + 
						'</tr>'
					);
			}
			
			izvestavanjeTabela.append(
					'<tr>' +
						'<td>Ukupno:</td>' +
						'<td>'+ ukupnoProjekcija +'</td>' +
						'<td>'+ ukupnoProdatihKarata +'</td>' +
						'<td>'+ ukupnaCenaSvihProdatihKarata +'</td>' +
					'</tr>'

				);
			
		}
	});
    }
    
});
	
});