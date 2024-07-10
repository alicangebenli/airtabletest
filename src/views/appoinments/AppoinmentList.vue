<script setup lang="ts">
import useAppointment from "@/composable/useAppointment.ts";
import List from "@/components/core/List/List.vue";
import TimeDuration from "@/components/TimeDuration/TimeDuration.vue";
import Pagination from "@/components/core/Pagination/Pagination.vue";
import AgentAvatars from "@/components/AgentAvatars/AgentAvatars.vue";

const {appointments} = useAppointment();
const headers = [
  {
    key: 'contact',
    scopedSlot: true
  },
  {
    key: 'adress',
    scopedSlot: true
  },
  {
    key: 'date',
    scopedSlot: true
  },
  {
    key: 'agents',
    scopedSlot: true
  }
]
</script>

<template>
  <List :headers="headers" :items="appointments">
    <template v-slot:contact="item">
      <div class="flex flex-col gap-y-2">
        <div>{{ item.contact_name }}</div>
        <div>{{ item.contact_email }}</div>
        <div>{{ item.contact_phone }}</div>
      </div>
    </template>
    <template v-slot:adress="item">
      <div class="flex flex-col gap-y-2">
        <div>{{ item.appointment_address }}</div>
      </div>
    </template>
    <template v-slot:date="item">
      <TimeDuration :date="item.appointment_date" :is-cancelled="item['is-callelled']"/>
    </template>
    <template v-slot:agents="item">
      <div class="flex justify-center my-auto">
        <AgentAvatars v-if="item.agents.length>0" :agents="item.agents"/>
        <template v-else>
          There is no agent.
        </template>
      </div>
    </template>
  </List>
  <Pagination />
</template>

<style scoped>

</style>