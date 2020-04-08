let url = 'http://localhost:5000';

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        tasks : null,
        loggedIn: false,
        logIn: false,
        signUp: false,
        kanban: true
    },
    created(){
        axios({
            url: url + '/task',
            method: 'get',
            headers:{
                access_token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoidXNlcjNAZ21haWwuY29tIiwiaWF0IjoxNTg2MzQ1Mjk1fQ.c1AsWQ4rm0lzFFB2mETlKzKl7C67stRQZHFFV5CedGc'
            }
        })
        .then(response=>{
            console.log(response)
            this.tasks = response.data.tasks;
        })
    }
  });
  
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
