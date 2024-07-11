<script lang="ts">
import Row from "./Row.vue";
import {defineComponent, PropType} from "vue";
import {Header} from "./types.ts";

export default defineComponent({
  components: {Row},
  emits: ['onClickRow'],
  props: {
    headers: {
      type: Array as PropType<Header[]>,
      default: [
        {
          key: 'sku',
          text: 'Sku',
          scopedSlot: false
        },
        {
          key: 'productName',
          text: 'Product Name',
          scopedSlot: false
        }
      ]
    },
    items: {
      type: Array as PropType<any[]>,
      default: [
        {
          sku: 123123,
          productName: 'test test test'
        },
        {
          sku: 123123,
          productName: 'test test test'
        },
      ]
    }
  },
  methods: {
    onClickRow() {
      this.$emit('onClickRow', ...arguments)
    }
  }
})
</script>

<template>
  <div>
    <Row v-for="(item, index) in items" :item="item" :columns="headers" :index="index" @onClick="onClickRow">
      <template v-slot:[column.key]="scopedSlot" v-for="column in headers">
        <slot :name="column.key" v-bind="scopedSlot" v-if="column.scopedSlot"/>
        <template v-else>
          {{ item[column.key] }}
        </template>
      </template>
    </Row>
  </div>
</template>