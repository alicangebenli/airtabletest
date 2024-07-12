<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import {defineComponent} from "vue";
import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
  emits: ['onChange'],
  components: {
    VueDatePicker
  },
  props: {
    label: {
      type: String
    },
    defaultValue: {
      type: Date
    },
    error: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      date: this.defaultValue || null
    }
  },
  watch: {
    date() {
      this.$emit('onChange', this.date)
    }
  }
})
</script>

<template>
  <div>
    <label class="block text-gray-700 text-sm font-bold mb-2" v-if="label">
      {{ label }}
    </label>
    <VueDatePicker v-model="date"></VueDatePicker>
    <span v-if="error" class="mt-2 mb-2 text-xs text-red-500 dark:text-gray-400">* {{ error }}</span>
  </div>
</template>
