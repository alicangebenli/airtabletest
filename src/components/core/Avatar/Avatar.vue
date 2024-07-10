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
    },
    bgColor: {
      type: String,
      default: ""
    }
  }
})
</script>

<template>
  <div :style="customStyle" :class="customClass" class="cursor-pointer h-[40px] w-[40px] avatar flex border-2 border-gray-400 bg-gray-200 w-max items-center justify-center p-2">
    {{ text }}
  </div>
</template>

<style scoped lang="scss">
.avatar {
  border-radius: 50%;
  background: v-bind(bgColor);
}
</style>