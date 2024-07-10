<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    text: {
      type: String,
      default: ""
    },
    customStyle: {
      type: Object,
      default: {}
    },
    customClass: {
      type: String,
      default: ""
    }
  }
})
</script>

<template>
  <div :style="customStyle" :class="customClass" class="cursor-pointer avatar flex border-2 border-gray-400 bg-gray-200 w-max items-center justify-center p-2">
    {{ text }}
  </div>
</template>

<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>