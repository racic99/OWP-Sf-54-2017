 $(document).ready(function() {
		
		function ispisProfil(){
			$.get('KorisnikFilmoviServlet', function(data){
				
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
	

	
	
	var adminInterfejs = $('#adminInterfejs');
	
	function ispisAdminInterfejsa() {
		$.get('UlogaPrijavljenogKorisnikaServlet', {'uloga': 'ulogaPrijavljenogKorisnika'}, function(data) {

			if (data.status == 'unauthenticated') {
				window.location.replace('Login.html');
				return;
			}

			adminInterfejs.empty();
			if (data.status == 'success') {
				adminInterfejs.empty();
				if (data.ulogaPrijavljenogKorisnika == 'ADMIN') {
					
					$('#adminInterfejs').append('<a href="DodavanjeFilma.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Dodavanje filma</a><br/>');
					$('#adminInterfejs').append('<a href="UpravljanjeKorisnicima.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Upravljanje korisnicima</a><br/>');
					$('#adminInterfejs').append('<a href="Izvestavanje.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Izvestavanje</a>');
				
				}
			}
		});
		}
	
	ispisAdminInterfejsa();
	
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
								'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' + 
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
					 
					 nazivPretraga.focus();
				  
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
					 
					 zanrPretraga.focus();

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
					 
					 trajanjeOdPretraga.focus();
				  
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
					 
					 distributerPretraga.focus();
					
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
					
					 zemljaPoreklaPretraga.focus();
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
					 
					 godinaOdPretraga.focus();

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
		
			nazivPretraga.keyup(function(event) {
		    
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
										'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' + 
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
						filmoviTabela.append(
							
								'<tr>' + 
									'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' + 
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
			
			zanrPretraga.keyup(function(event) {
			    
				var zanrPretragaValue = zanrPretraga.val();
				
				var params = {
						'zanrPretraga': zanrPretragaValue, 
				}
							
				$.get('FilmoviServlet',params, function(data){

					if (data.status == 'success') {
						
						filmoviTabela.find('tr:gt(0)').remove();
						
						if (zanrPretragaValue == ''){
							
							var filmovi = data.filmovi;			
							for (f in filmovi) {
								filmoviTabela.append(
									
										'<tr>' + 
											'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' + 
											'<td>' + filmovi[f].zanrovi + '</td>' + 
											'<td>' + filmovi[f].trajanje + '</td>' + 
											'<td>' + filmovi[f].distributer + '</td>' + 
											'<td>' + filmovi[f].zemljaPorekla + '</td>' + 
											'<td>' + filmovi[f].godinaProizvodnje + '</td>' + 
										'</tr>' 
								);
							}
							
					}else{
											
						var filmovi = data.zanroviPretraga;						
						for (f in filmovi) {
							filmoviTabela.append(
								
									'<tr>' + 
										'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' + 
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
			
			trajanjeButton.on('click', function(event) {
			    
				
				var trajanjeOdValue = trajanjeOdPretraga.val();
				var trajanjeDoValue = trajanjeDoPretraga.val();
				
				if(trajanjeOdValue=='' || trajanjeDoValue=='' || Number(trajanjeOdValue)>Number(trajanjeDoValue)){
			    	alert("Oba polja moraju biti popunjena i vrednost 'Od' mora biti manja od vrednosti 'Do'");
			    }else if(isNaN(trajanjeOdValue) | isNaN(trajanjeDoValue)){
			    	alert("Oba polja moraju biti brojevi!");
			    }else{
			    	
					var trajanjeOdValue = trajanjeOdPretraga.val();
					var trajanjeDoValue = trajanjeDoPretraga.val();
				
				var params = {
						'trajanje1': trajanjeOdValue, 
						'trajanje2': trajanjeDoValue,
				}
							
				$.get('FilmoviServlet',params, function(data){

					if (data.status == 'success') {
						
						filmoviTabela.find('tr:gt(0)').remove();
											
						var filmovi = data.trajanjeOpseg;						
						for (f in filmovi) {
							console.log(filmovi[f].trajanje);
							filmoviTabela.append(
								
									'<tr>' + 
										'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' +
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
			    }
			    
			});
			
			distributerPretraga.keyup(function(event) {
			    
				var distributerPretragaValue = distributerPretraga.val();
				
				var params = {
						'distributerPretraga': distributerPretragaValue, 
				}
							
				$.get('FilmoviServlet',params, function(data){

					if (data.status == 'success') {
						
						filmoviTabela.find('tr:gt(0)').remove();
						
						if (distributerPretragaValue == ''){
							
							var filmovi = data.filmovi;			
							for (f in filmovi) {
								filmoviTabela.append(
									
										'<tr>' + 
											'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' + 
											'<td>' + filmovi[f].zanrovi + '</td>' + 
											'<td>' + filmovi[f].trajanje + '</td>' + 
											'<td>' + filmovi[f].distributer + '</td>' + 
											'<td>' + filmovi[f].zemljaPorekla + '</td>' + 
											'<td>' + filmovi[f].godinaProizvodnje + '</td>' + 
										'</tr>' 
								);
							}
							
					}else{
											
						var filmovi = data.distributeriPretraga;						
						for (f in filmovi) {
							filmoviTabela.append(
								
									'<tr>' + 
										'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' + 
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
			
			zemljaPoreklaPretraga.keyup(function(event) {
			    
				var zemljaPoreklaPretragaValue = zemljaPoreklaPretraga.val();
				
				var params = {
						'zemljaPoreklaPretraga': zemljaPoreklaPretragaValue, 
				}
							
				$.get('FilmoviServlet',params, function(data){

					if (data.status == 'success') {
						
						filmoviTabela.find('tr:gt(0)').remove();
						
						if (zemljaPoreklaPretragaValue == ''){
							
							var filmovi = data.filmovi;			
							for (f in filmovi) {
								filmoviTabela.append(
									
										'<tr>' + 
											'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' +
											'<td>' + filmovi[f].zanrovi + '</td>' + 
											'<td>' + filmovi[f].trajanje + '</td>' + 
											'<td>' + filmovi[f].distributer + '</td>' + 
											'<td>' + filmovi[f].zemljaPorekla + '</td>' + 
											'<td>' + filmovi[f].godinaProizvodnje + '</td>' + 
										'</tr>' 
								);
							}
							
					}else{
											
						var filmovi = data.zemljaPoreklaPretraga;						
						for (f in filmovi) {
							filmoviTabela.append(
								
									'<tr>' + 
										'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' + 
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
			
			godinaButton.on('click', function(event) {
			    
				var godinaOdValue = godinaOdPretraga.val();
				var godinaDoValue = godinaDoPretraga.val();
				
				if(godinaOdValue=='' || godinaDoValue=='' || Number(godinaOdValue)>Number(godinaDoValue)){
			    	alert("Oba polja moraju biti popunjena i vrednost 'Od' mora biti manja od vrednosti 'Do'");
			    }else if(isNaN(godinaOdValue) | isNaN(godinaDoValue)){
			    	alert("Oba polja moraju biti brojevi!");
			    }else if(godinaOdValue < 1900 | godinaDoValue > 2020){
			    	alert("Prihvata se samo opseg od 1900. godine do 2020. godine");
			}else{
			    	
				var godinaOdValue = godinaOdPretraga.val();
				var godinaDoValue = godinaDoPretraga.val();
				
				var params = {
						'godina1': godinaOdValue, 
						'godina2': godinaDoValue,
				}
							
				$.get('FilmoviServlet',params, function(data){

					if (data.status == 'success') {
						
						filmoviTabela.find('tr:gt(0)').remove();
											
						var filmovi = data.godinaOpseg;						
						for (f in filmovi) {
							console.log(filmovi[f].trajanje);
							filmoviTabela.append(
								
									'<tr>' + 
										'<td><a href="Film.html?id=' + filmovi[f].id + '">' + filmovi[f].naziv + '</a></td>' +
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
			    }
			    
			});
	
	});