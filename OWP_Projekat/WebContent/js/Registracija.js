$(document).ready(function() {
	var usernameInput = $('#usernameInput');
	var passwordInput = $('#passwordInput');
	var passwordInput2 = $('#passwordInput2');

	$('#registerSubmit').on('click', function(event) {
		var username = usernameInput.val().trim();
		var password = passwordInput.val().trim();
		var password2 = passwordInput2.val().trim();

		if(username == ""){
			alert('Morate uneti korisnicko ime!');
			event.preventDefault();
			return false;
		}
		else if(password == ""){
			alert('Morate uneti lozinku!');
			event.preventDefault();
			return false;
		}
		else if (!username.match(/^[0-9a-z]+$/i)){
			alert('Korisnicko ime moze sadrzati samo slova i brojeve bez razmaka!');
			event.preventDefault();
			return false;
		}
		else if (!password.match(/^[0-9a-z]+$/i)){
			alert('Lozinka moze sadrzati samo slova i brojeve bez razmaka!');
			event.preventDefault();
			return false;
		}
		else if (password != password2) {
			alert('Lozinke se ne podudaraju!');
			usernameInput.val('');
			passwordInput.val('');
			passwordInput2.val('');
			event.preventDefault();
			return false;
		}

		
		var params = {
			'username': username, 
			'password': password
		}
		$.post('RegisterServlet', params, function(data) {

			if (data.status == 'fail') {
				alert('Korisnicko ime je zauzeto!');
				usernameInput.val('');
				passwordInput.val('');
				passwordInput2.val('');
				return;
			}
			if (data.status == 'success') {
				window.location.replace('Login.html');
			}
		});

		event.preventDefault();
		return false;
	});
});