<script setup lang="ts">

import Button from "@/components/core/Button/Button.vue";
import FormUpsertAppointment from "@/components/forms/FormUpsertAppointment.vue";
import Modal from "@/components/core/Modal/Modal.vue";
import useAppointment from "@/composable/useAppointment.ts";
import {ref} from "vue";
import {modalVisible} from "@/stores/appointment.ts";
import {agents, contacts} from "@/stores/appointment.ts";

const {totalAppointments,} = useAppointment();
const showedAppointment = ref();
</script>

<template>
  <div class="justify-center items-center">
    <div class="flex">
      <div>{{ totalAppointments }} Appoiments found.</div>
      <Button class-name="ml-auto bg-red-600 hover:bg-red-700" text="Create Appointment" @click="modalVisible = true"/>
    </div>
  </div>
  <Modal title="Create Appointment" v-if="modalVisible" @close="modalVisible = false; showedAppointment= null">
    <template v-slot:body>
      <FormUpsertAppointment
          :agents="agents"
          :contacts="contacts"
          :appointment="showedAppointment"
          @onSubmit="modalVisible = false"
      />
    </template>
  </Modal>
</template>

<style scoped lang="scss">

</style>