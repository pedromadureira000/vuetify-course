<template>
	<div>	
		<v-list-item
		  @click="$store.commit('doneTask', task.id)"
		  :class="{ 'blue lighten-5': task.done }"
		>
		  <template v-slot:default>
			<v-list-item-action>
			  <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
			</v-list-item-action>

			<v-list-item-content
			  :class="{ 'text-decoration-line-through': task.done }"
			>
			  <v-list-item-title>{{ task.title }}</v-list-item-title>
			</v-list-item-content>
			<v-list-item-action>
			  <v-btn @click.stop="$store.dispatch('deleteTask', task.id)" icon>
				<!-- 'stop' will stop propagation, and will not trigger the 'doneTask' event
			  from <v-list-item/> -->
				<v-icon color="primary lighten-1">mdi-delete</v-icon>
			  </v-btn>
			</v-list-item-action>
		  </template>
		</v-list-item>
		<v-divider></v-divider>
	</div>
</template>

<script>
export default {
	props: ['task'],
}
</script>

<styles>

</styles>
