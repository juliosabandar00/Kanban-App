<template>
    <div>
        <div class="category_div">
            <h1>{{category}}</h1>
        </div>
        <div class="top_part" >
            <div class="scroller"> 
                <div data-spy="scroll" data-target="#navbar-example3" data-offset="0">
                    <transition-group name="fade">
                        <Task v-for="task in tasks"
                        v-if="task.category === category"
                        :key="task.id"
                        :taskId="task.id"
                        :task="task"
                        :categories="categories"
                        @deleteTaskFromChild="deleteTask"
                        @updateTaskFromChild="updateTask"
                        class="card"> 
                        </Task>
                    </transition-group>
                </div>
            </div>
        </div>
        <br>
        <div class="add_task_div">
            <form @submit.prevent="createTask(catId)">
                <textarea v-if="catId==0" v-model="inputTitle0" class="form-control" rows="2" placeholder="enter new task here"></textarea>
                <textarea v-if="catId==1" v-model="inputTitle1" class="form-control" rows="2" placeholder="enter new task here"></textarea>
                <textarea v-if="catId==2" v-model="inputTitle2" class="form-control" rows="2" placeholder="enter new task here"></textarea>
                <textarea v-if="catId==3" v-model="inputTitle3" class="form-control" rows="2" placeholder="enter new task here"></textarea>
                <br>
                <button type="submit" class="btn btn-primary btn-lg btn-block">Add Task</button>
            </form>                            
        </div>
    </div>
</template>

<script>
    import Task from './Task.vue';
    const url = 'http://localhost:5000';
    export default {
        name: 'TaskList',
        components: {
            Task
        },
        data(){
            return{
                inputTitle0: null,
                inputTitle1: null,
                inputTitle2: null,
                inputTitle3: null
            }
        },
        props: ['catId','category', 'categories', 'tasks'],
        methods: {
            deleteTask: function(payload){
                this.$emit('deleteTaskFromChild', payload);
            },
            updateTask: function(payload){
                this.$emit('updateTaskFromChild', payload);
            },
            createTask: function(CatId){
                let title, category; 
                switch(CatId) {
                    case 0:
                        title = this.inputTitle0;
                        category = this.categories[0].name;
                        break;
                    case 1:
                        title = this.inputTitle1;
                        category = this.categories[1].name;
                        break;
                    case 2:
                        title = this.inputTitle2;
                        category = this.categories[2].name;
                        break;
                    case 3:
                        title = this.inputTitle3;
                        category = this.categories[3].name;
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
                    this.$emit('createTaskFromChild', response.data);
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
            }
        }
    }
</script>