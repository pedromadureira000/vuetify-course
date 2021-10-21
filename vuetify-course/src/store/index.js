import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      text: ''
    },
    tasks: [
      {
       id: 1,
       title: "wake up",
       done: false,
         },
      {
      id: 2,
      title: "Get bananas",
      done: false,
         },
         {
         id: 3,
         title: "Eat bananas",
         done: false,
         },
      ],
  },
  //triggering mutation methods is called by "commiting"
  mutations: {
    addTask(state, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
      };
      state.tasks.push(newTask);
    },
	  doneTask(state, id) {
      console.log("id", id);
      let task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
      //filter return an array.
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    showSnackbar(state, text){
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
          }
  },
  // triggering action methods is called by "despatching"
  actions: {
    addTask({commit}, newTaskTitle){ //'destructuring' in the context object (that have the vuex context)
      commit('addTask', newTaskTitle)
      commit('showSnackbar', 'Task added!')
    },
    deleteTask({commit}, id){
      commit('deleteTask', id)
      commit('showSnackbar', 'Task deleted!')
    }
  },
  // Getters allow us to get data from state. We can change or filter data in some way 
  //before it's made available to all of our components.
  getters: {

  },
  //modules allows us to have multiple vuex stores.
  modules: {
  }
})
