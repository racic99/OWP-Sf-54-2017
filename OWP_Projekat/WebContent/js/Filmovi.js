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
	 
	 var nacinPretrage = $('#nacinPretrage');
	 
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
		
		
		nacinPretrage.change(function(){
			  if($(this).val() == '1'){
				  
					 nazivPretraga.show();
					 zanrPretraga.hide();
					 trajanjeOdPretraga.hide();
					 trajanjeDoPretraga.hide();
					 trajanjeButton.hide();
					 distributerPretraga.hide();
					 zemljaPoreklaPretraga.hide();
					 godinaOdPretraga.hide();
					 godinaDoPretraga.hide();
					 godinaButton.hide();
				  
			  }else if($(this).val() == '2'){

					 nazivPretraga.hide();
					 zanrPretraga.show();
					 trajanjeOdPretraga.hide();
					 trajanjeDoPretraga.hide();
					 trajanjeButton.hide();
					 distributerPretraga.hide();
					 zemljaPoreklaPretraga.hide();
					 godinaOdPretraga.hide();
					 godinaDoPretraga.hide();
					 godinaButton.hide();

			  }else if($(this).val() == '3'){

					 nazivPretraga.hide();
					 zanrPretraga.hide();
					 trajanjeOdPretraga.show();
					 trajanjeDoPretraga.show();
					 trajanjeButton.show();
					 distributerPretraga.hide();
					 zemljaPoreklaPretraga.hide();
					 godinaOdPretraga.hide();
					 godinaDoPretraga.hide();
					 godinaButton.hide();
				  
			  }else if($(this).val() == '4'){
		
					 nazivPretraga.hide();
					 zanrPretraga.hide();
					 trajanjeOdPretraga.hide();
					 trajanjeDoPretraga.hide();
					 trajanjeButton.hide();
					 distributerPretraga.show();
					 zemljaPoreklaPretraga.hide();
					 godinaOdPretraga.hide();
					 godinaDoPretraga.hide();
					 godinaButton.hide();
					
			  }else if($(this).val() == '5'){

					 nazivPretraga.hide();
					 zanrPretraga.hide();
					 trajanjeOdPretraga.hide();
					 trajanjeDoPretraga.hide();
					 trajanjeButton.hide();
					 distributerPretraga.hide();
					 zemljaPoreklaPretraga.show();
					 godinaOdPretraga.hide();
					 godinaDoPretraga.hide();
					 godinaButton.hide();
					
			  }
			  else if($(this).val() == '6'){

					 nazivPretraga.hide();
					 zanrPretraga.hide();
					 trajanjeOdPretraga.hide();
					 trajanjeDoPretraga.hide();
					 trajanjeButton.hide();
					 distributerPretraga.hide();
					 zemljaPoreklaPretraga.hide();
					 godinaOdPretraga.show();
					 godinaDoPretraga.show();
					 godinaButton.show();

			  }  else if($(this).val() == '7'){

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
					 
					 location.reload();

			  }
			});
		
		$('#nazivPretragaInput').keyup(function(event) {
		    
			var nazivPretragaValue = nazivPretraga.val();
			
			var params = {
					'nazivPretraga': nazivPretragaValue, 
			}
						
			$.get('FilmoviServlet',params, function(data){

				if (data.status == 'success') {
					
					filmoviTabela.find('tr:gt(0)').remove();
					
					if (nazivPretragaValue == ''){
						
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
						
				}else{
										
					var filmovi = data.nazivPretrage;						
					for (f in filmovi) {
						console.log(filmovi[f].naziv);
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
				}
			});
		    
		});
	 
 });