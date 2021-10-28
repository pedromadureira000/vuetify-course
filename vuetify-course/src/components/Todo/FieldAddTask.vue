<template>
	<v-text-field
		@keyup.enter="addTask"
		v-model="newTaskTitle"
		class="pa-3"
		outlined
		label="Add Task"
		hide-details
		clearable
	>
		<template v-slot:append>
			<v-icon @click="addTask" :disabled="!newTaskTitleValid">
				mdi-plus
			</v-icon >
		</template>


	</v-text-field>
</template>
<script>
export default {
	data() {
    return {
      newTaskTitle: "",
    }
  },
	computed: {
		newTaskTitleValid(){
			return this.newTaskTitle
		}
	},
	methods: {
	  addTask(){
			if (this.newTaskTitleValid) {
		  this.$store.dispatch('addTask', this.newTaskTitle)
		  this.newTaskTitle = ""
			}
	  }
  }
}	
</script>
