<script lang="ts">
import {defineComponent, PropType} from "vue";
import Avatar from "../../core/Avatar/Avatar.vue";
import {Agents} from "@/components/shared/AgentAvatars/types.ts";

export default defineComponent({
  components: {Avatar},
  props: {
    agents: {
      type: Array as PropType<Agents>,
      default: [
        {
          name: "",
          surname: "",
          color: ""
        }
      ]
    },
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
  <div class="flex relative h-[40px]">
    <Avatar v-for="(user, index) in agents.slice(0,4)"
            :custom-style="getStyle(index)"
            :text="(user?.name?.[0] || '') + (user?.surname?.[0] || '')"
            :custom-class="'absolute text-white'"
            :bg-color="user.color"
    />
    <Avatar text="+4" :custom-style="getStyle(4)" :custom-class="'absolute'" bg-color="#ddd" />
  </div>
</template>