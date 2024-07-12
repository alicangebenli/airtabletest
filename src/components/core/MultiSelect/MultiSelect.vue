<script>
import Multiselect from 'vue-multiselect'

export default {
  emits: ['onChange'],
  components: {
    Multiselect
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    customLabel: {
      type: Function,
      default: ({name}) => name
    },
    selectLabel: {
      type: String,
    },
    placeholder: {
      type: String
    },
    options: {
      type: Array,
      required: true
    },
    trackBy: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    defaultValue: {},
    error: {}
  },
  data() {
    return {
      value: this.defaultValue || null,
    }
  },
  watch: {
    value: {
      handler() {
        if (this.value) {
          this.$emit('onChange', this.value)
        }
      }
    }
  }
}
</script>
<template>
  <div>
    <label class="block text-gray-700 text-sm font-bold mb-2">
      {{ label }}
    </label>
    <multiselect v-model="value"
                 :options="options"
                 :placeholder="placeholder"
                 :custom-label="customLabel"
                 :label="selectLabel"
                 :track-by="trackBy"
                 :multiple="multiple"
    >
      <template v-slot:singleLabel="props" v-if="$slots['singleLabel']">
        <template v-if="value">
          <slot name="singleLabel" v-bind="props"/>
        </template>
      </template>

      <template v-slot:option="props" v-if="$slots['option']">
        <slot name="option" v-bind="props"/>
      </template>
    </multiselect>
    <span v-if="error" class="mt-2 mb-2 text-xs text-red-500 dark:text-gray-400">* {{ error }}</span>
  </div>
</template>
<style lang="scss">
@import "vue-multiselect/dist/vue-multiselect.css";
</style>