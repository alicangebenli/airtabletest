<script lang="ts">
import {defineComponent, PropType} from "vue";
import Avatar from "../../core/Avatar/Avatar.vue";
import Agent from "@/domain/Agent.ts";

export default defineComponent({
  emits:['onUpdate'],
  components: {Avatar},
  props: {
    agents: {
      type: Array as PropType<Agent[]>,
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
    getStyle(index: number, transform?: string) {
      return {
        zIndex: index + 1,
        transform: transform || `translateX(${(index % 4) * -10}px)`,
      };
    },
    onUpdateSelectedAgents(agent: Agent) {
      const isFind = this.selectedAgents.find(x => x.id === agent.id);
      if (isFind) {
        return this.selectedAgents = this.selectedAgents.filter(x => x.id !== agent.id);
      }
      this.selectedAgents.push(agent);
    }
  },
  data() {
    return {
      allVisible: false,
      selectedAgents: [] as Agent[]
    }
  },
  watch:{
    "selectedAgents"(){
      this.$emit('onUpdate', this.selectedAgents);
    }
  }
})
</script>
<template>
  <div class="flex flex-wrap relative"
       :class="allVisible ? 'w-[190px] w-min-[190px] w-max-[190px]' : 'w-[200px] w-min-[200px] w-max-[200px]'">
    <Avatar v-for="(user, index) in agents.slice(0, allVisible ? agents.length : 4)"
            :custom-style="getStyle(index)"
            :text="(user?.name?.[0] || '') + (user?.surname?.[0] || '')"
            :custom-class="`text-white ${selectedAgents.some(x=>x.id === user.id) ? 'border-red-800 border-4' : ''}`"
            :bg-color="user.color"
            @onClick="onUpdateSelectedAgents(user)"
    />
    <Avatar @onClick="allVisible = true" v-if="agents.length>4 && !allVisible" text="+4"
            :custom-style="getStyle(4, 'translateX(-40px)')" bg-color="#ddd"/>
  </div>
</template>