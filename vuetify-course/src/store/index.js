import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')
db.config.debug = false 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    search: null,
    sorting: false,
    snackbar: {
      show: false,
      text: ''
    },
    tasks: [],
  },
  //triggering mutation methods is called by "commiting"
  mutations: {
    setSearch(state, value) {
      state.search = value
    },
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
	  doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
      //filter return an array.
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    updateTaskTitle(state, payload){
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.title = payload.title
    },
    updateTaskDueDate(state, payload){
      console.log('mutation updatetaskduedate triggerd')
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.dueDate = payload.dueDate
    },
    setTasks(state, tasks) {
      state.tasks = tasks
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
          },
    hideSnackbar(state) {
      state.snackbar.show = false
    },
    toggleSorting(state) {
      state.sorting = !state.sorting 
    }
  },
  // triggering action methods is called by "despatching"
  actions: {
    addTask({commit}, newTaskTitle){ //'destructuring' in the context object (that have the vuex context)
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null
      };
      db.collection('tasks').add(newTask).then(() => {
      commit('addTask', newTask)
      commit('showSnackbar', 'Task added!')
      })
    },
    doneTask({state, commit}, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({id: id}).update({
        done: !task.done
      }).then( () => {
      commit('doneTask', id)
      } )
    },
    deleteTask({commit}, id){
      db.collection('tasks').doc({id: id}).delete().then(() => {
      commit('deleteTask', id)
      commit('showSnackbar', 'Task deleted!')
      })
    },
    updateTaskTitle({commit}, payload){
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
      commit('updateTaskTitle', payload)
      commit('showSnackbar', 'Title updated!')
      })
    },
    updateTaskDueDate({commit}, payload){
      db.collection('tasks').doc({ id: payload.id }).update({
        dueDate: payload.dueDate
      }).then(() => {
          commit('updateTaskDueDate', payload)
          commit('showSnackbar', 'Due date updated!')
        })
    },
    getTasks({ commit }){
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks)
      })
    },
    setTasks({ commit }, tasks){
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
      }
  },
  // Getters allow us to get data from state. We can change or filter data in some way 
  //before it's made available to all of our components.
  getters: {
    tasksFiltered(state) {
      if(!state.search){
        return state.tasks
      }
      //return state.tasks.filter(task => task.title.includes(state.search))
      return state.tasks.filter(task => task.title.toLowerCase().includes(state.search.toLowerCase()))
    }
  },
  //modules allows us to have multiple vuex stores.
  modules: {
  }
}) 
