 $(document).ready(function() {
	 var nazivPretraga = $('#nazivPretragaInput');
	 var zanrPretraga = $('#zanrPretragaInput');
	 var trajanjeOdPretraga = $('#trajanjeOdInput');
	 var trajanjeDoPretraga = $('#trajanjeDoInput');
	 var trajanjeButton = $('#pretragaTrajanje');
	 var distributerPretraga = $('#distributerPretragaInput');
	 var zemljaPoreklaPretraga = $('#zemljaPoreklaPretragaInput');
	 var godinaOdPretraga = $('#godinaOdInput');
	 var godinaDoPretraga = $('#godinaDoInput');
	 var godinaButton = $('#pretragaGodina');
	 
	 nazivPretraga.hide();
	 zanrPretraga.hide();
	 trajanjeOdPretraga.hide();
	 trajanjeDoPretraga.hide();
	 trajanjeButton.hide();
	 distributerPretraga.hide();
	 zemljaPoreklaPretraga.hide();
	 godinaOdPretraga.hide();
	 godinaDoPretraga.hide();
	 godinaButton.hide();
	 
		var filmoviTabela = $('#filmoviTabela');
		
		$.get('FilmoviServlet', function(data){

			if (data.status == 'success') {
				
				var filmovi = data.filmovi;			
				for (f in filmovi) {
					filmoviTabela.append(
						
							'<tr>' + 
								'<td>' + filmovi[f].naziv + '</td>' + 
								'<td>' + filmovi[f].zanrovi + '</td>' + 
								'<td>' + filmovi[f].trajanje + '</td>' + 
								'<td>' + filmovi[f].distributer + '</td>' + 
								'<td>' + filmovi[f].zemljaPorekla + '</td>' + 
								'<td>' + filmovi[f].godinaProizvodnje + '</td>' + 
							'</tr>' 
					);
				}
			}
		});
	 
 });