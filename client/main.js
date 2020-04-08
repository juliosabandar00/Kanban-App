let url = 'http://localhost:5000';

var app = new Vue({
    el: '#app',
    data: {
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
    },
    created(){
        this.checkLogin();
    },
    methods: {
        checkLogin: function(){
            if(this.loggedIn == true){
                console.log('loggedInnnnn')
                this.loadTasks()
                this.kanban = true;
                this.logIn = false;
                this.signUp = false;
            }else{
                console.log('aaa')
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
                console.log(response)
                this.loggedIn = true;
                return localStorage.setItem("access_token", response.data.access_token);
            })
            .then(()=>{
                console.log(localStorage.getItem('access_token'));
                this.emailLog = null;
                this.passwordLog = null;
                this.checkLogin();
            })
            .catch(err=>{
                console.log(err)
            })
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
                console.log(response);
                this.emailReg = null;
                this.passwordReg = null;
                this.checkLogin();
            });
        },
        signOut: function(){
            localStorage.setItem("access_token", null);
            this.loggedIn = false;
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
                console.log(err)
            })
        },
        createTask: function(CatId){
            let title, category; 
            switch(CatId) {
                case 0:
                    title = this.inputTitle0
                    category = this.categories[0]
                    break;
                case 1:
                    title = this.inputTitle1
                    category = this.categories[1]
                    break;
                case 2:
                    title = this.inputTitle2
                    category = this.categories[2]
                    break;
                case 3:
                    title = this.inputTitle3
                    category = this.categories[3]
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
                console.log(err);
            });
        },
        deleteTask: function(id){
            console.log(id)
            axios({
                url: url + '/task/' + id,
                method: 'delete',
                headers:{
                    access_token : localStorage.getItem('access_token'),
                }
            })
            .then(response=>{
                console.log(response)
                this.loadTasks();
            })
            .catch(err=>{
                console.log(err);
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
                this.updateId = null;
                this.updateTitle = null;    
                console.log(err);
            });
        }
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
    axios({
        method : 'POST',
        url: 'http://localhost:5000/loginGoogle',
        data : {
            token: id_token
        }
    })
    .then( response =>{
         console.log(response)
         localStorage.setItem('access_token', response.access_token);
         console.log(app.loggedIn);
         app.loggedIn = true;
         app.checkLogIn;
    })
    .catch(err =>{
        console.log(err)
    })
}  
