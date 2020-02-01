 $(document).ready(function() {
	 
		history.pushState(null, null, location.href);
	    window.onpopstate = function () {
	        history.go(1);
	    };
		
		
		function ispisProfil(){
			$.get('KorisnikProjekcijeServlet', function(data){
				
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
					$('#adminInterfejs').append('<a href="DodavanjeProjekcije.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Dodavanje projekcije</a><br/>');
					$('#adminInterfejs').append('<a href="UpravljanjeKorisnicima.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Upravljanje korisnicima</a><br/>');
					$('#adminInterfejs').append('<a href="Izvestavanje.html" style="text-decoration: none; font-weight: bold; color: dodgerblue;">Izvestavanje</a>');
					
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
												'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
												'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
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
						
						nazivFilmaPretraga.keyup(function(event) {
						    
							var nazivFilmaPretragaValue = nazivFilmaPretraga.val();
							
							var params = {
									'nazivFilmaPretraga': nazivFilmaPretragaValue, 
							}
										
							$.get('ProjekcijeServlet',params, function(data){

								if (data.status == 'success') {
									
									projekcijeTabela.find('tr:gt(0)').remove();
									
									if (nazivFilmaPretragaValue == ''){
										
										var projekcije = data.projekcije;
										var tipovi = data.tipovi;
										var sale = data.sale;
										var filmovi = data.filmovi;
										
										for (p in projekcije) {
											projekcijeTabela.append(
													
												
													'<tr>' + 
														'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
														'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
														'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
														'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
														'<td>' + projekcije[p].cenaKarte + '</td>' +  
													'</tr>' 
											);
										}
										
								}else{
														
									var projekcije = data.nazivFilmovaPretraga;
									var tipovi = data.tipovi;
									var sale = data.sale;
									var filmovi = data.filmovi;
									
									for (p in projekcije) {
										projekcijeTabela.append(
												
											
												'<tr>' + 
													'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
													'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
													'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
													'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
													'<td>' + projekcije[p].cenaKarte + '</td>' +  
												'</tr>' 
										);
									}
								}
								}
							});
						    
						});
						
						tipProjekcijePretraga.change(function(){
							
							var tipProjekcijePretragaValue = $('#tipProjekcijePretragaInput option:selected').text();
							
							console.log(tipProjekcijePretragaValue);
							
							var params = {
									'tipProjekcijePretraga': tipProjekcijePretragaValue, 
							}
										
							$.get('ProjekcijeServlet',params, function(data){

								if (data.status == 'success') {
									
									projekcijeTabela.find('tr:gt(0)').remove();
									
									if (tipProjekcijePretragaValue == 'Izaberi tip projekcije'){
										
										var projekcije = data.projekcije;
										var tipovi = data.tipovi;
										var sale = data.sale;
										var filmovi = data.filmovi;
										
										for (p in projekcije) {
											projekcijeTabela.append(
													
												
													'<tr>' + 
														'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
														'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
														'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
														'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
														'<td>' + projekcije[p].cenaKarte + '</td>' +  
													'</tr>' 
											);
										}
										
								}else{
														
									var projekcije = data.tipoviProjekcijePretraga;
									var tipovi = data.tipovi;
									var sale = data.sale;
									var filmovi = data.filmovi;
									
									for (p in projekcije) {
										projekcijeTabela.append(
												
											
												'<tr>' + 
													'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
													'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
													'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
													'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
													'<td>' + projekcije[p].cenaKarte + '</td>' +  
												'</tr>' 
										);
									}
								}
								}
							});
							
						});
						
						salaPretraga.change(function(){
							
							var salaPretragaValue = $('#salaPretragaInput option:selected').text();
							
							console.log(salaPretragaValue);
							
							var params = {
									'salaPretraga': salaPretragaValue, 
							}
										
							$.get('ProjekcijeServlet',params, function(data){

								if (data.status == 'success') {
									
									projekcijeTabela.find('tr:gt(0)').remove();
									
									if (salaPretragaValue == 'Izaberi salu'){
										
										var projekcije = data.projekcije;
										var tipovi = data.tipovi;
										var sale = data.sale;
										var filmovi = data.filmovi;
										
										for (p in projekcije) {
											projekcijeTabela.append(
													
												
													'<tr>' + 
														'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
														'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
														'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
														'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
														'<td>' + projekcije[p].cenaKarte + '</td>' +  
													'</tr>' 
											);
										}
										
								}else{
														
									var projekcije = data.salePretraga;
									var tipovi = data.tipovi;
									var sale = data.sale;
									var filmovi = data.filmovi;
									
									for (p in projekcije) {
										projekcijeTabela.append(
												
											
												'<tr>' + 
													'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
													'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
													'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
													'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
													'<td>' + projekcije[p].cenaKarte + '</td>' +  
												'</tr>' 
										);
									}
								}
								}
							});
							
						});
						
						cenaButton.on('click', function(event) {
							
							var cenaOdValue = cenaOd.val();
							var cenaDoValue = cenaDo.val();
							
							if(cenaOdValue=='' || cenaDoValue=='' || Number(cenaOdValue)>Number(cenaDoValue)){
						    	alert("Oba polja moraju biti popunjena i vrednost 'Od' mora biti manja od vrednosti 'Do'");
						    }else if(isNaN(cenaOdValue) | isNaN(cenaDoValue)){
						    	alert("Oba polja moraju biti brojevi!");
						    }else{
						    	
						    	var cenaOdValue = cenaOd.val();
								var cenaDoValue = cenaDo.val();
							
							var params = {
									'cena1': cenaOdValue, 
									'cena2': cenaDoValue,
							}
										
							$.get('ProjekcijeServlet',params, function(data){

								if (data.status == 'success') {
									
									projekcijeTabela.find('tr:gt(0)').remove();
														
									var projekcije = data.opsegCenaPretraga;
									var tipovi = data.tipovi;
									var sale = data.sale;
									var filmovi = data.filmovi;
									
									for (p in projekcije) {
										projekcijeTabela.append(
												
											
												'<tr>' + 
													'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
													'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
													'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
													'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
													'<td>' + projekcije[p].cenaKarte + '</td>' +  
												'</tr>' 
										);
									}
								}
							});
						    }
						    
						});
						
						vremePrikazivanjaButton.on('click', function(event) {
							
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
										
							$.get('ProjekcijeServlet',params, function(data){

								if (data.status == 'success') {
									
									projekcijeTabela.find('tr:gt(0)').remove();
														
									var projekcije = data.opsegDatumaPretraga;
									var tipovi = data.tipovi;
									var sale = data.sale;
									var filmovi = data.filmovi;
									
									for (p in projekcije) {
										projekcijeTabela.append(
												
											
												'<tr>' + 
													'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
													'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
													'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
													'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
													'<td>' + projekcije[p].cenaKarte + '</td>' +  
												'</tr>' 
										);
									}
								}
							});
						    }
						    
						});
				} else if(data.ulogaPrijavljenogKorisnika == 'KORISNIK'){
					
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
												'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
												'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
												'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
												'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
												'<td>' + projekcije[p].cenaKarte + '</td>' +  
												'<td><a href="KupovinaKarteFaza2.html?id=' + projekcije[p].id + '">' + 'Kupi kartu' + '</td>' +
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
						
						nazivFilmaPretraga.keyup(function(event) {
						    
							var nazivFilmaPretragaValue = nazivFilmaPretraga.val();
							
							var params = {
									'nazivFilmaPretraga': nazivFilmaPretragaValue, 
							}
										
							$.get('ProjekcijeServlet',params, function(data){

								if (data.status == 'success') {
									
									projekcijeTabela.find('tr:gt(0)').remove();
									
									if (nazivFilmaPretragaValue == ''){
										
										var projekcije = data.projekcije;
										var tipovi = data.tipovi;
										var sale = data.sale;
										var filmovi = data.filmovi;
										
										for (p in projekcije) {
											projekcijeTabela.append(
													
												
													'<tr>' + 
														'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
														'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
														'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
														'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
														'<td>' + projekcije[p].cenaKarte + '</td>' +  
														'<td><a href="KupovinaKarteFaza2.html?id=' + projekcije[p].id + '">' + 'Kupi kartu' + '</td>' +
													'</tr>' 
											);
										}
										
								}else{
														
									var projekcije = data.nazivFilmovaPretraga;
									var tipovi = data.tipovi;
									var sale = data.sale;
									var filmovi = data.filmovi;
									
									for (p in projekcije) {
										projekcijeTabela.append(
												
											
												'<tr>' + 
													'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
													'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
													'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
													'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
													'<td>' + projekcije[p].cenaKarte + '</td>' +  
													'<td><a href="KupovinaKarteFaza2.html?id=' + projekcije[p].id + '">' + 'Kupi kartu' + '</td>' +
												'</tr>' 
										);
									}
								}
								}
							});
						    
						});
						
						tipProjekcijePretraga.change(function(){
							
							var tipProjekcijePretragaValue = $('#tipProjekcijePretragaInput option:selected').text();
							
							console.log(tipProjekcijePretragaValue);
							
							var params = {
									'tipProjekcijePretraga': tipProjekcijePretragaValue, 
							}
										
							$.get('ProjekcijeServlet',params, function(data){

								if (data.status == 'success') {
									
									projekcijeTabela.find('tr:gt(0)').remove();
									
									if (tipProjekcijePretragaValue == 'Izaberi tip projekcije'){
										
										var projekcije = data.projekcije;
										var tipovi = data.tipovi;
										var sale = data.sale;
										var filmovi = data.filmovi;
										
										for (p in projekcije) {
											projekcijeTabela.append(
													
												
													'<tr>' + 
														'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
														'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
														'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
														'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
														'<td>' + projekcije[p].cenaKarte + '</td>' +  
														'<td><a href="KupovinaKarteFaza2.html?id=' + projekcije[p].id + '">' + 'Kupi kartu' + '</td>' +
													'</tr>' 
											);
										}
										
								}else{
														
									var projekcije = data.tipoviProjekcijePretraga;
									var tipovi = data.tipovi;
									var sale = data.sale;
									var filmovi = data.filmovi;
									
									for (p in projekcije) {
										projekcijeTabela.append(
												
											
												'<tr>' + 
													'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
													'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' +  
													'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
													'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
													'<td>' + projekcije[p].cenaKarte + '</td>' +  
													'<td><a href="KupovinaKarteFaza2.html?id=' + projekcije[p].id + '">' + 'Kupi kartu' + '</td>' +
												'</tr>' 
										);
									}
								}
								}
							});
							
						});
						
						salaPretraga.change(function(){
							
							var salaPretragaValue = $('#salaPretragaInput option:selected').text();
							
							console.log(salaPretragaValue);
							
							var params = {
									'salaPretraga': salaPretragaValue, 
							}
										
							$.get('ProjekcijeServlet',params, function(data){

								if (data.status == 'success') {
									
									projekcijeTabela.find('tr:gt(0)').remove();
									
									if (salaPretragaValue == 'Izaberi salu'){
										
										var projekcije = data.projekcije;
										var tipovi = data.tipovi;
										var sale = data.sale;
										var filmovi = data.filmovi;
										
										for (p in projekcije) {
											projekcijeTabela.append(
													
												
													'<tr>' + 
														'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
														'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
														'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
														'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
														'<td>' + projekcije[p].cenaKarte + '</td>' +  
														'<td><a href="KupovinaKarteFaza2.html?id=' + projekcije[p].id + '">' + 'Kupi kartu' + '</td>' +
													'</tr>' 
											);
										}
										
								}else{
														
									var projekcije = data.salePretraga;
									var tipovi = data.tipovi;
									var sale = data.sale;
									var filmovi = data.filmovi;
									
									for (p in projekcije) {
										projekcijeTabela.append(
												
											
												'<tr>' + 
													'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
													'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
													'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
													'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
													'<td>' + projekcije[p].cenaKarte + '</td>' +  
													'<td><a href="KupovinaKarteFaza2.html?id=' + projekcije[p].id + '">' + 'Kupi kartu' + '</td>' +
												'</tr>' 
										);
									}
								}
								}
							});
							
						});
						
						cenaButton.on('click', function(event) {
							
							var cenaOdValue = cenaOd.val();
							var cenaDoValue = cenaDo.val();
							
							if(cenaOdValue=='' || cenaDoValue=='' || Number(cenaOdValue)>Number(cenaDoValue)){
						    	alert("Oba polja moraju biti popunjena i vrednost 'Od' mora biti manja od vrednosti 'Do'");
						    }else if(isNaN(cenaOdValue) | isNaN(cenaDoValue)){
						    	alert("Oba polja moraju biti brojevi!");
						    }else{
						    	
						    	var cenaOdValue = cenaOd.val();
								var cenaDoValue = cenaDo.val();
							
							var params = {
									'cena1': cenaOdValue, 
									'cena2': cenaDoValue,
							}
										
							$.get('ProjekcijeServlet',params, function(data){

								if (data.status == 'success') {
									
									projekcijeTabela.find('tr:gt(0)').remove();
														
									var projekcije = data.opsegCenaPretraga;
									var tipovi = data.tipovi;
									var sale = data.sale;
									var filmovi = data.filmovi;
									
									for (p in projekcije) {
										projekcijeTabela.append(
												
											
												'<tr>' + 
													'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
													'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
													'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
													'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
													'<td>' + projekcije[p].cenaKarte + '</td>' +  
													'<td><a href="KupovinaKarteFaza2.html?id=' + projekcije[p].id + '">' + 'Kupi kartu' + '</td>' +
												'</tr>' 
										);
									}
								}
							});
						    }
						    
						});
						
						vremePrikazivanjaButton.on('click', function(event) {
							
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
										
							$.get('ProjekcijeServlet',params, function(data){

								if (data.status == 'success') {
									
									projekcijeTabela.find('tr:gt(0)').remove();
														
									var projekcije = data.opsegDatumaPretraga;
									var tipovi = data.tipovi;
									var sale = data.sale;
									var filmovi = data.filmovi;
									
									for (p in projekcije) {
										projekcijeTabela.append(
												
											
												'<tr>' + 
													'<td><a href="Film.html?id=' + projekcije[p].film + '">' + filmovi.find(x => x.id === projekcije[p].film).naziv + '</a></td>' + 
													'<td><a href="Projekcija.html?id=' + projekcije[p].id + '">' + projekcije[p].datumVreme + '</a></td>' + 
													'<td>' + tipovi.find(x => x.id === projekcije[p].tip).naziv + '</td>' + 
													'<td>' + sale.find(x => x.id === projekcije[p].sala).naziv + '</td>' + 
													'<td>' + projekcije[p].cenaKarte + '</td>' +  
													'<td><a href="KupovinaKarteFaza2.html?id=' + projekcije[p].id + '">' + 'Kupi kartu' + '</td>' +
												'</tr>' 
										);
									}
								}
							});
						    }
						    
						});
				}
					
				
			}
		});
	}
	
	ispisAdminInterfejsa();
	 
 });