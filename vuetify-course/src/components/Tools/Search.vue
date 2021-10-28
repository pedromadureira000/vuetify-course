<template>
   <v-text-field
      :value="$store.state.search"
      @input="$store.commit('setSearch', $event )"
      @focus="searchClosed = false"
      @blur="searchClosed = true"
      class="mt-1 expanding-search"
      :class="{'closed': searchClosed && !$store.state.search}"
      placeholder="Search"
      :disabled="$store.state.sorting"
      filled
      dense
      clearable
      prepend-inner-icon="mdi-magnify"
   ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      searchClosed: true,
    }
  },
  methods: {
    
    }
}
</script>

<styles lang="sass">
  .expanding-search
    transition: max-width 0.3s
    .v-input__slot
      cursor: pointer !important
      &:before, &:after
        display: none
        /**border-color: transparent !important **/
    &.closed 
      max-width: 45px
      .v-input__slot
        background: transparent !important
</styles>
