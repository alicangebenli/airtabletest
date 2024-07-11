<script lang="ts">

import Datepicker from "@/components/core/Datepicker/Datepicker.vue";
import Button from "@/components/core/Button/Button.vue";
import Input from "@/components/core/Input/Input.vue";
import MultiSelect from "@/components/core/MultiSelect/MultiSelect.vue";
import {defineComponent, PropType} from "vue";
import Select from "@/components/core/Select/Select.vue";
import {GetAgentsResponse, GetContactsResponse} from "@/services/ports.ts";
import Appointment from "@/domain/Appointment.ts";
import Agent from "@/domain/Agent.ts";
import Contact from "@/domain/Contact.ts";

export default defineComponent({
  components: {Select, Datepicker, Button, Input, MultiSelect},
  props: {
    agents: {
      type: [] as PropType<GetAgentsResponse>,
      required: true
    },
    contacts: {
      type: [] as PropType<GetContactsResponse>
    },
    appointment: {
      type: {} as PropType<{ id: number, agents: Agent[], appointment: Appointment, contact: Contact }>
    },
  },
  computed: {
    isCancelled() {
      return this.appointment?.appointment?.isCancelled;
    },
    isTimePassed() {
      return this.appointment?.appointment?.isTimePassed;
    },
    getAddress() {
      return this.appointment?.appointment?.address;
    },
    getSelectedAgents() {
      return this.agents.filter(agent => this.appointment?.agents.some((x) => {
        return x.id === agent.agent.id
      }));
    },
    getDate() {
      const date = this.appointment?.appointment?.date;
      if (date) {
        return new Date(date)
      }
      return null;
    },
    getStatusOptions() {
      return [
        {
          value: this.isTimePassed ? '' : '',
          text: this.isTimePassed ? 'Completed' : 'Upcoming', selected: !this.isCancelled
        },
        {value: '', text: 'Cancelled', selected: this.isCancelled}
      ]
    }
  }
})
</script>

<template>
  <MultiSelect
      :options="contacts"
      track-by="id"
      label="Contact"
      select-label="name"
      :custom-label="(item) => item.contact.fullName"
      :default-value="appointment"
  >
    <template v-slot:singleLabel="{ option }">
      <div>{{ option.contact.fullName }}</div>
      <div>{{ option.contact.email }}</div>
      <div>{{ option.contact.phone }}</div>
    </template>
  </MultiSelect>
  <Input label="Address" :default-value="getAddress"/>
  <MultiSelect
      label="Agents"
      track-by="id"
      :options="agents"
      :custom-label="(item) => item.agent.fullName"
      multiple
      :default-value="getSelectedAgents"
  >
  </MultiSelect>
  <Datepicker label="Appoinment Date" :default-value="getDate"/>
  <Select :options="getStatusOptions"/>
  <Button text="Create"/>
</template>