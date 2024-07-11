<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import {defineComponent} from "vue";
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
  components: {
    VueDatePicker
  },
  props: {
    label: {
      type: String
    },
    defaultValue: {
      type: Date
    }
  },
  data() {
    return {
      date: this.defaultValue || null
    }
  },
  watch: {
    date() {
      console.log(this.date);
    }
  }
})
</script>

<template>
  <label class="block text-gray-700 text-sm font-bold mb-2" v-if="label">
    {{ label }}
  </label>
  <VueDatePicker v-model="date"></VueDatePicker>
</template>
