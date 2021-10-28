<template>
	<div class="home">
		<task-list v-if="$store.state.tasks.length"/>
		<no-tasks v-else />
		<button-done-sorting v-if="$store.state.sorting"/>
	</div>
</template>

<script>
export default {
  name: "Home",
    components: {
	'task-list': require('@/components/Todo/TaskList.vue').default,
	'no-tasks': require('@/components/Todo/NoTasks.vue').default,
	'button-done-sorting': require('@/components/Todo/ButtonDoneSorting.vue').default
	}
}
</script>

