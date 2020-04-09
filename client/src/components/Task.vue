<template>
    <div>
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
                    <option v-for="category in categories" v-if="category === task.category" selected>{{category.name}}</option>
                    <option v-for="category in categories" v-if="category !== task.category" >{{category.name}}</option>
                </select>  
                <br>
                <button type="submit" class="btn btn-primary btn-sm">Save Changes</button>
            </form>
        </div>
    </div>
</template>

<script>
    const url = 'http://localhost:5000';
    export default {
        name: 'Task',
        data(){
            return{
                updateId: null,
                updateTitle: null,
                updateCategory: null
            }
        },
        props: ['taskId', 'task', 'categories'],
        methods: {
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
                            this.$emit('deleteTaskFromChild', response.data);
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
                    this.$emit('updateTaskFromChild', response.data);
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
            }
        }
    }
</script>