 $(document).ready(function() {
	 
	 var nazivFilmaPretraga = $('#nazivFilmaPretragaInput');
	 var datumOd = $('#datumOdInput');
	 var vremeOd = $('#vremeOdInput');
	 var datumDo = $('#datumDoInput');
	 var vremeDo = $('#vremeDoInput');
	 var vremePrikazivanjaButton = $('#pretragaVremePrikazivanja');
	 var tipProjekcijePretraga = $('#tipProjekcijePretragaInput');
	 var salaPretraga = $('#salaPretragaInput');
	 var cenaOd = $('#cenaOdInput');
	 var cenaDo = $('#cenaDoInput');
	 var cenaButton = $('#pretragaCena');
	 
	 nazivFilmaPretraga.hide();
	 datumOd.hide();
	 vremeOd.hide();
	 datumDo.hide();
	 vremeDo.hide();
	 vremePrikazivanjaButton.hide();
	 tipProjekcijePretraga.hide();
	 salaPretraga.hide();
	 cenaOd.hide();
	 cenaDo.hide();
	 cenaButton.hide();
	 
	 var nacinPretragePr = $('#nacinPretragePr');
	 
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
		
		nacinPretragePr.change(function(){
			  if($(this).val() == '1'){
				  
					 nazivFilmaPretraga.show();
					 datumOd.hide();
					 vremeOd.hide();
					 datumDo.hide();
					 vremeDo.hide();
					 vremePrikazivanjaButton.hide();
					 tipProjekcijePretraga.hide();
					 salaPretraga.hide();
					 cenaOd.hide();
					 cenaDo.hide();
					 cenaButton.hide();
					 
					 nazivFilmaPretraga.focus();
				  
			  }else if($(this).val() == '2'){

					 nazivFilmaPretraga.hide();
					 datumOd.show();
					 vremeOd.show();
					 datumDo.show();
					 vremeDo.show();
					 vremePrikazivanjaButton.show();
					 tipProjekcijePretraga.hide();
					 salaPretraga.hide();
					 cenaOd.hide();
					 cenaDo.hide();
					 cenaButton.hide();

			  }else if($(this).val() == '3'){

					 nazivFilmaPretraga.hide();
					 datumOd.hide();
					 vremeOd.hide();
					 datumDo.hide();
					 vremeDo.hide();
					 vremePrikazivanjaButton.hide();
					 tipProjekcijePretraga.show();
					 salaPretraga.hide();
					 cenaOd.hide();
					 cenaDo.hide();
					 cenaButton.hide();
					 
					 tipProjekcijePretraga.focus();
				  
			  }else if($(this).val() == '4'){
		
					 nazivFilmaPretraga.hide();
					 datumOd.hide();
					 vremeOd.hide();
					 datumDo.hide();
					 vremeDo.hide();
					 vremePrikazivanjaButton.hide();
					 tipProjekcijePretraga.hide();
					 salaPretraga.show();
					 cenaOd.hide();
					 cenaDo.hide();
					 cenaButton.hide();
					 
					 salaPretraga.focus();
					
			  }else if($(this).val() == '5'){

					 nazivFilmaPretraga.hide();
					 datumOd.hide();
					 vremeOd.hide();
					 datumDo.hide();
					 vremeDo.hide();
					 vremePrikazivanjaButton.hide();
					 tipProjekcijePretraga.hide();
					 salaPretraga.hide();
					 cenaOd.show();
					 cenaDo.show();
					 cenaButton.show();
					 
					 cenaOd.focus();
					
			  }else if($(this).val() == '6'){

					 nazivFilmaPretraga.hide();
					 datumOd.hide();
					 vremeOd.hide();
					 datumDo.hide();
					 vremeDo.hide();
					 vremePrikazivanjaButton.hide();
					 tipProjekcijePretraga.hide();
					 salaPretraga.hide();
					 cenaOd.hide();
					 cenaDo.hide();
					 cenaButton.hide();
					 
					 location.reload();

			  }
			});
	 
 });