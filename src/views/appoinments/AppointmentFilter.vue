<script setup lang="ts">

import Datepicker from "@/components/core/Datepicker/Datepicker.vue";
import Select from "@/components/core/Select/Select.vue";
import Input from "@/components/core/Input/Input.vue";
import AgentAvatars from "@/components/shared/AgentAvatars/AgentAvatars.vue";
import {agents, filters} from "@/stores/appointment.ts";

</script>

<template>
  <div class="flex items-center gap-2 mb-4">
    <div class="w-[180px]">
      <AgentAvatars :agents="agents.map(x=>x.agent)" @onUpdate="filters.agents = $event"/>
    </div>
    <div>
      <Select
          :options="[
            {text: 'All Statuses', value: 'allStatuses', selected: true},
            {text: 'Cancelled', value: 'cancelled', selected: false},
            {text: 'Upcoming', value: 'upcoming', selected: false},
            {text: 'Completed', value: 'completed', selected: false},
          ]"
          @onSelect="filters.status = $event"
      />
    </div>
    <div>
      <Datepicker @onChange="filters.fromDate = $event.getTime()"/>
    </div>
    <div>
      <Datepicker @onChange="filters.endDate = $event.getTime()"/>
    </div>
    <div class="ml-auto">
      <Input placeholder="Search" @onChange="filters.searchText = $event.target.value"/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>