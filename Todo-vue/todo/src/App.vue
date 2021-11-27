<template>
  <div class="todos">
    <h2>TODO</h2>
    <div>
      <form @submit.prevent="addTodos()">
        <input v-model="newtodo">
        <button>ADD</button>
      </form>
    </div>
    {{newtodo}}
    <div class="todo" :class="todo.status?'bggreen':'bgorange'" v-for="todo in todos" :key="todo._id">
        <div>{{todo.name}}</div>
        <div>
          <button @click="todoUpdate(todo._id)">{{todo.status?"Not Complete":"Complete"}}</button>
          <button @click="tododelete(todo._id)">Delete</button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      newtodo:"",
      todos:[]
    }
  },
  mounted(){
    this.getTodos()
  },
  methods:{
    getTodos(){
      axios.get('http://127.0.0.1:9000/todo').then(res=>{

        this.todos=res.data
      }
      )
    },
    tododelete(a){
      axios.delete('http://127.0.0.1:9000/todo/'+a).then(res=>{
        this.todos=res.data
      })
    },
    todoUpdate(a){
      axios.patch('http://127.0.0.1:9000/todo/'+a).then(res=>{
        this.todos=res.data
      })
      
    },
    addTodos(){
      axios.post('http://127.0.0.1:9000/todo',{
        name:this.newtodo
      }).then(res=>{
        this.todos=res.data
        this.newtodo=""
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.todos{
  display: flex;
  align-items: center;
  flex-direction: column;
}
.todo{
  display: flex;
  background-color: #1bbe9b;
  color: aliceblue;
  width: 24rem;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
  padding: .4rem;
  margin: 1rem;
}
.todo button{
  height: 1.8rem;
  margin:.5rem;
  border-radius: 5px;
  border: none;
}
.bggreen{
  background-color: #1bbe9b;
}
.bgorange{
  background-color: #e4a828;
}
</style>
