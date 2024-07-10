<script setup lang="ts">
import List from "./components/core/List/List.vue";
import Pagination from "./components/core/Pagination/Pagination.vue";
import UserAvatars from "./components/UserAvatars/UserAvatars.vue";
import Datepicker from "./components/core/Datepicker/Datepicker.vue";
import http from "@/shared/helpers/http.ts";
import {AppoinmentService} from "@/services/Appoinment.ts";
AppoinmentService.getAppointments()
</script>

<template>
<!--  <Datepicker />-->
<!--  <UserAvatars />-->
<!--  <List />-->
<!--  <Pagination :total-page="5" />-->
</template>