<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  emits:['onClick'],
  props: {
    text: {
      default: '',
      type: String
    },
    className : {
      default : "",
      type: String
    },
    type: {
      type: String,
      default: "button"
    }
  }
})
</script>

<template>
  <button
          @click="$emit('onClick')"
          :type="type"
          :class="className"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
    {{ text }}
  </button>
</template>

<style scoped>

</style>