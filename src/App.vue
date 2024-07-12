<script setup lang="ts">

import AppLayout from "@/layouts/AppLayout.vue";
import {onMounted} from "vue";
import useAppointment from "@/composable/useAppointment.ts";
import AppointmentFilter from "@/views/appoinments/AppointmentFilter.vue";
import AppointmentSummary from "@/views/appoinments/AppointmentSummary.vue";
import AppointmentList from "@/views/appoinments/AppointmentList.vue";
import {isReady} from "@/stores/appointment.ts";

const {updateData} = useAppointment()
onMounted(async () => {
  await updateData();
  isReady.value = true
})
</script>

<template>
  <AppLayout>
    <template v-if="isReady">
      <AppointmentFilter/>
      <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10"/>
      <AppointmentSummary/>
      <AppointmentList/>
    </template>
    <template v-else>
      Loading
    </template>
  </AppLayout>
</template>