<template>
    <div>
        <div class ="page" v-if="logIn">
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
                <button v-on:click.stop="showRegisterForm" type="button" class="btn btn-success btn-lg btn-block">Create A New Account</button>
                <center>
                    <br>
                    <h6>------- Or -------</h6>
                    <h6>Log In With Google</h6>
                    <div id="google-signin-button"></div>
                    <!-- <div class="g-signin2" data-onsuccess="onSignIn"> Sign In With Google </div> -->
                </center>
            </div>
        </div>
        <!-- Register -->
        <div class ="page" v-if="signUp">
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
            <div class ="header">
                <button type="button" v-on:click.stop="signOut" class="btn btn-danger">Sign Out</button>
            </div>

            <div class="main_container"  >
                <!-- catagories -->
                <div v-for="(category, index) in categories" class="card_container" id="backlog_container" >
                    <div class="category_div">
                        <h1>{{category}}</h1>
                    </div>
                    <div class="top_part" >
                        <div class="scroller"> 
                            <div data-spy="scroll" data-target="#navbar-example3" data-offset="0">
                                <transition-group name="fade">
                                    <div v-for="task in tasks" :key="task.id" v-if="task.category === category" class="card">
                                        <div v-if="updateId !== task.id">
                                            <div class="content">
                                                <h4> {{task.title}} </h4>
                                                <p> {{task.User.email}} </p>
                                            </div>
                                            <div class="actions">
                                                <div class="user_container">
                                                    <button v-on:click.prevent="updateTask(task.id, task.title, task.category)" type="button" class="btn btn-primary btn-sm action_button">Edit</button>
                                                    <button v-on:click.prevent="deleteTask(task.id)" type="button" class="btn btn-danger btn-sm action_button">Delete</button>
                                                </div>
                                            </div>    
                                        </div>
                                        <div v-if="updateId == task.id">
                                            <form v-on:submit.prevent="saveUpdate(task.id)">
                                                <div class="form-group">
                                                    <input v-model="updateTitle" value="updateTitle" type="text" class="form-control form-control-sm">
                                                </div>
                                                <select value="updateCategory" v-model="updateCategory" class="form-control form-control-sm">
                                                    <option v-for="category2 in categories" v-if="category2 === category" selected>{{category2}}</option>
                                                    <option v-for="category2 in categories" v-if="category2 !== category" >{{category2}}</option>
                                                </select>  
                                                <br>
                                                <button type="submit" class="btn btn-primary btn-sm">Save Changes</button>
                                            </form>
                                        </div>
                                    </div>
                                </transition-group>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="add_task_div">
                        <form @submit.prevent="createTask(index)">
                            <textarea v-if="index==0" v-model="inputTitle0" class="form-control" rows="2" placeholder="enter new task here"></textarea>
                            <textarea v-if="index==1" v-model="inputTitle1" class="form-control" rows="2" placeholder="enter new task here"></textarea>
                            <textarea v-if="index==2" v-model="inputTitle2" class="form-control" rows="2" placeholder="enter new task here"></textarea>
                            <textarea v-if="index==3" v-model="inputTitle3" class="form-control" rows="2" placeholder="enter new task here"></textarea>
                            <br>
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Add Task</button>
                        </form>                            
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const url = 'http://localhost:5000';
    export default{
        name:'App',
        data(){
            return{
                loggedIn: false,
                //pages
                logIn: null, signUp: null, kanban: null,
                //account data
                emailLog: null, passwordLog: null,
                emailReg: null, passwordReg: null,
                //kanban data  
                tasks : null,
                categories: ['Backlog', 'Todo', 'In Progress', 'Completed'],
                inputTitle0: null, inputTitle1: null, inputTitle2: null, inputTitle3: null,
                updateId: null,
                updateTitle: null,
                updateCategory: null
            }
        },
        mounted(){
            this.renderGoogleButton()
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
                    this.loadTasks()
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
            renderGoogleButton: function() {
                gapi.signin2.render('google-signin-button', {
                    'data-onsuccess': this.onSignIn
                });
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
                    console.log(this.loggedIn);
                    this.loggedIn = true;
                    this.checkLogin();
                })
                .catch(err =>{
                    swal({
                        title: "Error",
                        text: 'Invalid Username/Password', 
                        icon: "error"
                    });
                });
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
            signOut: function(){
                swal({
                    title: "Are you sure you want to sign out?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                .then(signout=>{
                    if(signout){
                        localStorage.clear();
                        this.loggedIn = false;
                        this.checkLogin();                    
                    }
                });
                // this.gSignOut()
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
            createTask: function(CatId){
                let title, category; 
                switch(CatId) {
                    case 0:
                        title = this.inputTitle0;
                        category = this.categories[0];
                        break;
                    case 1:
                        title = this.inputTitle1;
                        category = this.categories[1];
                        break;
                    case 2:
                        title = this.inputTitle2;
                        category = this.categories[2];
                        break;
                    case 3:
                        title = this.inputTitle3;
                        category = this.categories[3];
                        break;
                    default:
                        break;
                }
                axios({
                    url: url + '/task',
                    method: 'post',
                    data: {
                        title: title,
                        category: category
                    },
                    headers:{
                        access_token : localStorage.getItem('access_token'),
                    }
                })
                .then(response=>{
                    console.log(response.data.task)
                    this.loadTasks();
                    switch(CatId) {
                        case 0:
                            this.inputTitle0 = null;
                            break;
                        case 1:
                            this.inputTitle1 = null;
                            break;
                        case 2:
                            this.inputTitle2 = null;
                            break;
                        case 3:
                            this.inputTitle3 = null;
                            break;
                        default:
                            break;
                    }
                })
                .catch(err=>{
                    swal({
                        title: "Error",
                        text: 'Task Title Cannot Be Empty', 
                        icon: "error"
                    })            
                });
            },
            deleteTask: function(id){
                swal({
                    title: "Are you sure you want to delete this task?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                })
                .then(willDelete=>{
                    if(willDelete){
                        axios({
                            url: url + '/task/' + id,
                            method: 'delete',
                            headers:{
                                access_token : localStorage.getItem('access_token')
                            }
                        })
                        .then(response=>{
                            console.log(response)
                            swal("Task has been deleted!", {
                                icon: "success",
                            });
                            this.loadTasks();
                        })
                        .catch(()=>{
                            swal({
                                title: "Error",
                                text: "You do not have access to delete this task!", 
                                icon: "error",
                            });   
                        });
                    }
                });
            },
            updateTask: function(id, title, category){
                this.updateId = id;
                this.updateTitle = title;
                this.updateCategory = category;
                this.loadTasks();
                console.log(this.updateId)
                console.log(this.updateTitle)
            },
            saveUpdate: function(id){
                axios({
                    url: url + '/task/' + id,
                    method: 'put',
                    headers:{
                        access_token : localStorage.getItem('access_token'),
                    },
                    data:{
                        title : this.updateTitle,
                        category : this.updateCategory
                    }
                })
                .then(response=>{
                    console.log(response)
                    this.updateId = null;
                    this.updateTitle = null;    
                    this.updateCategory = null;
                    this.loadTasks();
                })
                .catch(err=>{
                    console.log(err.request.status)
                    if(err.request.status == 401){
                        swal({
                            title: "Error",
                            text: "Title of Task Cannot Be Empty!", 
                            icon: "error",
                        })             
                    }else{
                        swal({
                            title: "Error",
                            text: "You do not have access to edit this task!", 
                            icon: "error",
                        })                
                    }
                    this.updateId = null;
                    this.updateTitle = null;    
                    console.log(err);
                });
            },
            gSignOut: function(){
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    console.log('User signed out.');
                });        
            }
        }
    }
</script>