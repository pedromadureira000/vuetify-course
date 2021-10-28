<template>
	<v-dialog
      :value="true"
      persistent
      max-width="290"
  >
      <v-card>
        <v-card-title class="text-h5">
          Edit task
        </v-card-title>
        <v-card-text>
          To edit the task, just type bellow.
          <v-text-field
            v-model='taskTitle'
            @keyup.enter="saveTask"
            />

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
           CANCEL 
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="saveTask"
            :disabled='taskTitleInvalid'
          >
           SAVE 
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
    taskTitle: null
    }
  },
  computed: {
    taskTitleInvalid(){
     return !this.taskTitle || this.taskTitle === this.task.title 
    }
  },
  methods: {
      saveTask(){
        if (!this.taskTitleInvalid) {
        let payload = {id: this.task.id, title: this.taskTitle}
        this.$store.dispatch('updateTaskTitle', payload)
        this.$emit('close')	
          }
        }
      },
  props: ['task'],
  mounted(){
    this.taskTitle = this.task.title
   }
	}
  
</script>

<styles>

</styles>

