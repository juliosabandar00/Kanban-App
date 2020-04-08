function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : 'POST',
        url: 'http://localhost:5000/loginGoogle',
        data : {
            token: id_token
        },
        statusCode: {
            200: function (response) {
                localStorage.setItem('accessToken', response.accessToken);
                checkLogIn();
            }
        }
    })
}  