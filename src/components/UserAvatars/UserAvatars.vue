<script lang="ts">
import {defineComponent} from "vue";
import Avatar from "../core/Avatar/Avatar.vue";
export default defineComponent({
  components: {Avatar},
  props: {
    users: {
      default: [
          "test",
          "test",
          "test",
          "test",
          "test"
      ]
    }
  },
  methods: {
    getStyle(index: number) {
      return {
        zIndex: index + 1,
        left: `${index * 30}px`,
      };
    },
  }
})
</script>

<template>
  <div class="flex relative">
    <Avatar v-for="(user, index) in users" :custom-style="getStyle(index)" :text="user" :custom-class="'absolute'"/>
  </div>
</template>