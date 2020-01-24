 $(document).ready(function() {
	 
		var projekcijeTabela = $('#projekcijeTabela');
		
		$.get('ProjekcijeServlet', function(data){

			if (data.status == 'success') {
				
				var projekcije = data.projekcije;
				var tipovi = data.tipovi;
				var sale = data.sale;
				var filmovi = data.filmovi;
				
				for (p in projekcije) {
					projekcijeTabela.append(
							
						
							'<tr>' + 
								'<td>' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</td>' + 
								'<td>' + projekcije[p].datumVreme + '</td>' + 
								'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
								'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
								'<td>' + projekcije[p].cenaKarte + '</td>' +  
							'</tr>' 
					);
				}
			}
		});
	 
 });