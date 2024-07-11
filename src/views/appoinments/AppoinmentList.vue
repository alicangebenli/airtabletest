<script setup lang="ts">

import List from "@/components/core/List/List.vue";
import TimeDuration from "@/components/shared/TimeDuration/TimeDuration.vue";
import Pagination from "@/components/core/Pagination/Pagination.vue";
import AgentAvatars from "@/components/shared/AgentAvatars/AgentAvatars.vue";
import Button from "@/components/core/Button/Button.vue";
import Modal from "@/components/core/Modal/Modal.vue";
import useAppointment from "@/composable/useAppointment.ts";
import {ref} from "vue";
import FormUpsertAppointment from "@/components/forms/FormUpsertAppointment.vue";

const {appointments, agents, totalPage, currentPage, contacts} = useAppointment();
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
const modalVisible = ref(false);
const showedAppointment = ref();
</script>

<template>
  <div>
    <div></div>
    <div class="flex">
      <Button class-name="ml-auto bg-red-600 hover:bg-red-700" text="Create Appointment" @click="modalVisible = true"/>
    </div>
  </div>
  <List :headers="headers" :items="appointments" @onClickRow="(e) => { showedAppointment = e; modalVisible=true}">
    <template v-slot:contact="item">
      <div class="flex flex-col gap-y-2">
        <div>{{ item.contact.fullName }}</div>
        <div>{{ item.contact.email }}</div>
        <div>{{ item.contact.phone }}</div>
      </div>
    </template>
    <template v-slot:adress="item">
      <div class="flex flex-col gap-y-2">
        <div>{{ item.appointment.address }}</div>
      </div>
    </template>
    <template v-slot:date="item">
      <TimeDuration :date="item.appointment.date" :is-cancelled="item.appointment.isCancelled"/>
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
  <Pagination class-name="mt-2 ml-auto" :total-page="totalPage" @onChange="currentPage = $event"/>
  <Modal title="Create Appointment" v-if="modalVisible" @close="modalVisible = false; showedAppointment= null">
    <template v-slot:body>
      <FormUpsertAppointment
          :agents="agents"
          :contacts="contacts"
          :appointment="showedAppointment"
      />
    </template>
  </Modal>
</template>