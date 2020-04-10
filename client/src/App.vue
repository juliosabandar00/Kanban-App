<template>
    <div>
        <div class ="page" v-if="logIn">
            <nav class="navbar navbar-dark bg-primary">
                <div class="title" >
                    <h2 class="app_name"> KANBAN </h2>
                </div>
            </nav>
            <div class ="login_container">
                <h2>Log In to Your Account</h2>
                <form v-on:submit.prevent="login">
                    <div class="form-group">
                        <label for="email_login">Email address</label>
                        <input v-model="emailLog" type="email" class="form-control" id="email_login" aria-describedby="emailHelp" placeholder="ex: john.doe@email.com">
                    </div>
                    <div class="form-group">
                        <label for="password_login">Password</label>
                        <input v-model="passwordLog" type="password" class="form-control" id="password_login" placeholder="xxxxxxxxxx">
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg btn-block">Log In</button>
                </form>      
                <br>
                <button v-on:click.stop="showRegisterForm" type="button" class="btn btn-danger btn-lg btn-block">Create A New Account</button>
                <center>
                    <br>
                    <h6>------- Or -------</h6>
                    <br>
                    <button v-on:click="loginWithGoogle" type="button" class="btn btn-primary btn-lg btn-block">Login With Google</button>

                </center>
            </div>
        </div>
        <!-- Register -->
        <div class ="page" v-if="signUp">
                <nav class="navbar navbar-dark bg-primary">
                    <div class="title" >
                        <h2 class="app_name"> KANBAN </h2>
                    </div>
                </nav>
                <div class ="register_container">
                    <a v-on:click.prevent="showLoginForm" class="previous round">&#8249;</a>
                    <br>
                    <br>
                    <h2>Create a New Account</h2>
                    <form v-on:submit.prevent="register">
                        <div class="form-group">
                            <label for="email_register">Email address</label>
                            <input v-model="emailReg" type="email" class="form-control" id="email_register" aria-describedby="emailHelp" placeholder="ex: john.doe@email.com">
                        </div>
                        <div class="form-group">
                            <label for="password_register">Password</label>
                            <input v-model="passwordReg" type="password" class="form-control" id="password_register" placeholder="xxxxxxxxxx">
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg btn-block">Sign Up</button>
                    </form>              
                </div>
        </div>
        <!-- Kanban -->
        <div class ="page" v-if="kanban">
            <Navbar
            :loggedWithGoogle="loggedWithGoogle"
            @signOutFromChild="signOut">
            </Navbar>
            <div class="main_container"  >
                <!-- catagories -->
                <TaskList v-for="category in categories" 
                :key="category.id"
                :catId = "category.id"
                :category="category.name"
                :categories="categories"
                :tasks="tasks"
                @createTaskFromChild="createTask"
                @deleteTaskFromChild="deleteTask"
                @updateTaskFromChild="updateTask"
                class="card_container" id="backlog_container" >
                </TaskList>
            </div>
        </div>
    </div>
</template>

<script>
    import TaskList from './components/TaskList.vue';
    import Navbar from './components/Navbar.vue';
    const url = 'https://kanbansakti.herokuapp.com';
    export default {
        name:'App',
        components: {
            TaskList,
            Navbar
        },
        data(){
            return{
                loggedIn: false,
                loggedWithGoogle: false,
                //pages
                logIn: null, signUp: null, kanban: null,
                //account data
                emailLog: null, passwordLog: null,
                emailReg: null, passwordReg: null,
                userEmail: null,
                //kanban data  
                tasks : [],
                categories: [
                    {id: 0,
                    name: 'Backlog'},
                    {id: 1,
                    name: 'Todo'},
                    {id: 2,
                    name: 'In Progress'},
                    {id: 3,
                    name: 'Completed'}
                ],
                inputTitle0: null, inputTitle1: null, inputTitle2: null, inputTitle3: null,
                updateId: null,
                updateTitle: null,
                updateCategory: null
            }
        },
        created(){
            this.checkLogin();
        },
        methods: {
            checkLogin: function(){
                if(localStorage.getItem('access_token') != null && localStorage.getItem('access_token') != '' && localStorage.getItem('access_token') && 'undefined'){
                    this.loggedIn = true;
                }
                if(this.loggedIn == true){
                    this.loadTasks();
                    this.kanban = true;
                    this.logIn = false;
                    this.signUp = false;
                }else{
                    this.kanban = false;
                    this.logIn = true;
                    this.signUp = false;
                }
            },
            showLoginForm: function(){
                this.logIn = true;
                this.signUp = false;
            },
            login: function(){
                console.log(this.emailLog);
                console.log(this.passwordLog);
                axios({
                    url: url + '/login',
                    method: 'post',
                    data: {
                        email: this.emailLog,
                        password: this.passwordLog
                    }
                })
                .then(response =>{
                    swal("Success!", "You are logged in!", "success");
                    console.log(response)
                    localStorage.setItem("access_token", response.data.access_token);
                    this.loggedIn = true;
                })
                .then(()=>{
                    console.log(localStorage.getItem('access_token'));
                    this.userEmail = this.emailLog;
                    this.emailLog = null;
                    this.passwordLog = null;
                    this.checkLogin();
                })
                .catch(err=>{
                    console.log(err)
                    swal({
                        title: "Error",
                        text: 'Invalid Username/Password', 
                        icon: "error"
                    });         
                });
            },
            loginWithGoogle: function (){
                this.$gAuth.signIn()
                .then(GoogleUser => {
                    let id_token = GoogleUser.getAuthResponse().id_token;
                    axios({
                        url: url + '/loginGoogle',
                        method: 'post',
                        data: {
                            token: id_token
                        }
                    })
                    .then((response)=>{
                        console.log(response);
                        localStorage.setItem('access_token', response.data.access_token);
                        swal("Success!", "You are logged in!", "success");
                        this.checkLogin();
                    })
                    .catch(err=>{
                        swal({
                            title: "Error",
                            text: err.message, 
                            icon: "error"
                        });
                    });
                })
                .catch(error  => {
                //on fail do something
                    swal({
                        title: "Error",
                        text: err.message, 
                        icon: "error"
                    });
                })
            },
            onSignIn: function(payload){
                console.log(payload)
                this.loggedIn = true;
                this.loggedWithGoogle = true;
                this.checkLogin();
            },
            showRegisterForm: function(){
                this.logIn = false;
                this.signUp = true;
            },
            register: function(){
                axios({
                    url: url + '/register',
                    method: 'post',
                    data: {
                        email: this.emailReg,
                        password: this.passwordReg
                    }
                })
                .then(response =>{
                    swal("Success!", "You can now Log In!", "success");
                    console.log(response);
                    this.emailReg = null;
                    this.passwordReg = null;
                    this.checkLogin();
                }).catch(err => {
                    console.log(err)
                    swal({
                        title: "Error",
                        text: 'Invalid Username/Password', 
                        icon: "error"
                    });
                })
            },
            signOut: function(payload){
                console.log(payload);
                this.loggedWithGoogle = null;
                this.userEmail = null;
                this.loggedIn = false;
                localStorage.clear();
                this.checkLogin();
            },
            loadTasks: function(){
                console.log(localStorage.getItem('access_token'));
                axios({
                    url: url + '/task',
                    method: 'GET',
                    headers:{
                        access_token : localStorage.getItem('access_token')
                    }
                })
                .then(response=>{
                    this.tasks = response.data.tasks;
                })
                .catch(err=>{
                    swal({
                        title: "Error",
                        text: err.message, 
                        icon: "error"
                    });
                })
            },           
            createTask: function(payload){
                console.log(payload);
                this.loadTasks();
            },
            updateTask: function(payload){
                console.log(payload);
                this.loadTasks();
            },
            deleteTask: function(payload){
                console.log(payload);
                this.loadTasks();
            }
        }
    }
</script>