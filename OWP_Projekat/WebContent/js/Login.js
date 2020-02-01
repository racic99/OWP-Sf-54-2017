$(document).ready(function() { 
	var usernameInput = $('#usernameInput');
	var passwordInput = $('#passwordInput');
	var greskaLogin = $('#greskaLogin');
	greskaLogin.hide();

	$('#loginSubmit').on('click', function(event) {
		var username = usernameInput.val();
		var password = passwordInput.val();
		console.log('username: ' + username);
		console.log('password: ' + password);		

		var params = {
			'username': username, 
			'password': password
		}
		$.post('LoginServlet', params, function(data) { 
			console.log('response')
			console.log(data);

			if (data.status == 'fail') {
				greskaLogin.show();
				usernameInput.val('');
				passwordInput.val('');

				return;
			}
			if (data.status == 'success') {
				console.log('Djelji');
				window.location.replace('KorisnikProjekcije.html');
			}
		});
		
		event.preventDefault();
		return false;
	});
});