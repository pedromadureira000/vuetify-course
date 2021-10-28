<template>
	<v-list class="pt-0" flat>
		<!--<draggable tag="ul" :list="list" class="list-group" handle=".handle">  
		'tag' define what tag will subistitute draggable, default is div
		'handle' is the class what will trigger the drag
		':list' this atribute shoud be set to the array of data that it's going to sorted
		-->
		<draggable v-model="tasks" handle=".handle">
			<task v-for="task in tasks" :key="task.id" :task='task' />
		</draggable>
	</v-list>
</template>

<script>
//import draggable from "@/vuedraggable"
import draggable from "vuedraggable"
export default {
	components: {
		'task': require('@/components/Todo/Task.vue').default,
		draggable
	},
	computed: {
			tasks: {
					get() {
							return this.$store.getters.tasksFiltered
					},
					set(value) {
							this.$store.dispatch('setTasks', value)
					}
			}
	}
}
</script>
