<template>
	<v-text-field
		@click:append="addTask"
		@keyup.enter="addTask"
		v-model="newTaskTitle"
		class="pa-3"
		outlined
		label="Add Task"
		append-icon="mdi-plus"
		hide-details
		clearable
	></v-text-field>
</template>
<script>
export default {
	data() {
    return {
      newTaskTitle: "",
    }
  },
	methods: {
	  addTask(){
		  this.$store.dispatch('addTask', this.newTaskTitle)
		  this.newTaskTitle = ""
	  }
  }
}	
</script>
