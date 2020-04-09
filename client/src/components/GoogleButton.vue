<template>
    <div id="google-signin-button">Refresh To Login With Google</div>
</template>
<script>
    const url = 'http://localhost:5000';
    export default {
        name: 'GoogleButton',
        mounted(){
            this.renderGoogleButton();
        },
        methods: {
            renderGoogleButton: function() {
                gapi.signin2.render('google-signin-button', {
                    onsuccess : this.onSignIn
                });
            },
            onSignIn: function(googleUser){
                console.log('test')
                var id_token = googleUser.getAuthResponse().id_token;
                axios({
                    method : 'POST',
                    url: 'http://localhost:5000/loginGoogle',
                    data : {
                        token: id_token
                    }
                })
                .then( response =>{
                    console.log(response)
                    localStorage.setItem('access_token', response.data.access_token);
                    swal("Success!", "You are logged in!", "success");
                    this.$emit('loginWithGoogle', response.data);
                })
                .catch(err =>{
                    swal({
                        title: "Error",
                        text: err.message, 
                        icon: "error"
                    });
                });
            }
        }
    }
</script>