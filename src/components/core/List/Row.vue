<script lang="ts">
import {defineComponent, PropType} from "vue";
export default defineComponent({
  emits:['onClick'],
  props: {
    item: {
      type: Object as PropType<any>,
    },
    columns: {
      type: Array as PropType<any>
    },
    index: {
      type: Number,
      required: true
    }
  }
})
</script>
<template>
  <div @click="$emit('onClick', item)" class="cursor-pointer w-full flex justify-around mt-2 items-center" :class="index % 2 ? 'bg-gray-300 border-gray-400 border-2 rounded-xl py-4 px-2' : 'bg-white border-gray-400 border-2 rounded-xl py-4 px-2'">
    <div class="flex-1" v-for="column in columns">
      <slot :name="column.key" v-bind="item"/>
    </div>
  </div>
</template>