<template>
  <div>
    <v-menu
      bottom
      left
     >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in menu_items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-delete v-if="dialogs.delete" :task="task" @close='dialogs.delete = false'/> 
    <dialog-edit v-if="dialogs.edit" :task="task" @close='dialogs.edit = false'/> 
    <dialog-duedate v-if="dialogs.date" :task="task" @close='dialogs.date = false'/> 
  </div>
</template>
<script>
export default {
    data: () => ({
			dialogs: {
				delete: false,
        edit: false,
        date: false,
			},
      menu_items: [
        { 
          title: 'Edit',
          icon: 'mdi-pencil',
          click(){
            this.dialogs.edit = true
          }
        },
        { 
          title: 'Due date',
          icon: 'mdi-calendar',
          click(){
            this.dialogs.date= true
          }
        },
        { 
          title: 'Delete',
          icon: 'mdi-delete',
          click(){
            this.dialogs.delete = true
          }
        },
        { 
          title: 'Drag',
          icon: 'mdi-drag-horizontal-variant',
          click(){
            if (!this.$store.state.search) {
            this.$store.commit('toggleSorting')
            }
            else {
              this.$store.commit('showSnackbar', "you can't try to sort while searching")
            }
          }
        },
      ]
    }),
    methods: {
      handleClick(index){
        //this.menu_items[id].click()  #will get erros, because of function click will no can access propertie with it's own 'this'
        this.menu_items[index].click.call(this) // will call the function but the function will use the vue instance 'this' context.
      }
  },
  components: {
    'dialog-delete': require('@/components/Todo/Dialogs/DialogDelete.vue').default,
    'dialog-duedate': require('@/components/Todo/Dialogs/DialogDueDate.vue').default,
    'dialog-edit': require('@/components/Todo/Dialogs/DialogEdit.vue').default
  },
  props: ['task']
}
</script>

