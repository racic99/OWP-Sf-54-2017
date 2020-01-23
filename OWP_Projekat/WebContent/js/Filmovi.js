 $(document).ready(function() {
	 
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