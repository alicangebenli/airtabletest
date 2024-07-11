<script>
import Multiselect from 'vue-multiselect'

export default {
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
    }
  },
  data() {
    return {
      value: null,
    }
  },
}
</script>
<template>
  <div>
    <label class="typo__label">{{ label }}</label>
    <multiselect v-model="value"
                 :options="options"
                 :placeholder="placeholder"
                 :custom-label="customLabel"
                 :label="selectLabel"
                 :track-by="trackBy">
      <template v-slot:singleLabel="props" v-if="$slots['singleLabel']">
        <template v-if="value">
          <slot name="singleLabel" v-bind="props"/>
        </template>
      </template>

      <template v-slot:option="props" v-if="$slots['option']">
        <slot name="option" v-bind="props"/>
      </template>
    </multiselect>
  </div>
</template>
<style lang="scss">
@import "vue-multiselect/dist/vue-multiselect.css";
</style>