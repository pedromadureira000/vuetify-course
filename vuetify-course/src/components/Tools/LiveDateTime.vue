<template>
    <div class="text-subtitle-1 ml-4">
       {{ date }}
    </div>
</template>

<script>
const { DateTime } = require("luxon")
export default {
   data() {
      return {
         date: ''
      }
   },
   methods: {
      getDate(){
         //this.date = DateTime.now().toFormat('MMMM d, H:mm:ss')
         this.date = DateTime.now().toFormat('MMMM d, H:mm')
         setTimeout(this.getDate, 1000)
		}
      },
   mounted() {
      this.getDate()
   }
}
</script>

<styles>

</styles>
