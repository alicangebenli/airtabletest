<script lang="ts">

import Datepicker from "@/components/core/Datepicker/Datepicker.vue";
import Button from "@/components/core/Button/Button.vue";
import Input from "@/components/core/Input/Input.vue";
import MultiSelect from "@/components/core/MultiSelect/MultiSelect.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {Datepicker, Button, Input, MultiSelect},
  props: {
    agents: {},
    contacts: {},
    adress: {},
    agent: {},
    date: {}
  }
})
</script>

<template>
  <MultiSelect
      :options="contacts"
      track-by="id"
      :custom-label="({agent_name, agent_surname}) => agent_name + ' ' + agent_surname">
    <template v-slot:singleLabel>
      <div>test</div>
    </template>
  </MultiSelect>
  <Input label="Address"/>
  <Input label="Agent"/>
  <Datepicker label="Appoinment Date"/>
  <Button text="Create"/>
</template>

<style scoped>

</style>