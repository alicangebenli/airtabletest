<script setup lang="ts">
import AppoinmentList from "@/views/appoinments/AppoinmentList.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import ApooinmentFilters from "@/views/appoinments/ApooinmentFilters.vue";
</script>

<template>
  <AppLayout>
    <ApooinmentFilters/>
    <AppoinmentList />
  </AppLayout>
</template>