<template>
	<div class="home">
		<field-add-task />
		<task-list v-if="$store.state.tasks.length"/>
		<no-tasks v-else />
	</div>
</template>

<script>
export default {
  name: "Home",
    components: {
	'field-add-task': require('@/components/Todo/FieldAddTask.vue').default,
	'task-list': require('@/components/Todo/TaskList.vue').default,
	'no-tasks': require('@/components/Todo/NoTasks.vue').default
	}
}
</script>

