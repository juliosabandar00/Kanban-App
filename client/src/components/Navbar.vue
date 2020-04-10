<template>
    <nav class="navbar navbar-dark bg-primary">
        <div class="title" >
            <h2 class="app_name"> KANBAN </h2>
        </div>
        <div class="signout">
            <button type="button" v-on:click.stop="signOut" class="btn btn-danger">Sign Out</button>
        </div>
    </nav>
</template>
<script>
    const url = 'https://kanbansakti.herokuapp.com';
    export default {
        name: 'GoogleButton',
        props: ['loggedWithGoogle'],
        methods: {
            signOut: function(){
                swal({
                    title: "Are you sure you want to sign out?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                .then(signout=>{
                    if(signout){
                        this.$gAuth.signOut()
                        .then(() => {
                            this.$emit('signOutFromChild', this.loggedWithGoogle);
                        })
                        .catch(error  => {
                            swal({
                                title: "Error",
                                text: err.message, 
                                icon: "error"
                            });
                        });
                    }
                }).catch(err => {
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