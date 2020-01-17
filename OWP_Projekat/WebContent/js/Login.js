$(document).ready(function() { 
	var usernameInput = $('#usernameInput');
	var passwordInput = $('#passwordInput');

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
				usernameInput.val('');
				passwordInput.val('');

				return;
			}
			if (data.status == 'success') {
				window.location.replace('Filmovi.html');
			}
		});
		
		event.preventDefault();
		return false;
	});
});