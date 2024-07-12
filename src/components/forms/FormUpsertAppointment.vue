<script setup lang="ts">

import Datepicker from "@/components/core/Datepicker/Datepicker.vue";
import Button from "@/components/core/Button/Button.vue";
import Input from "@/components/core/Input/Input.vue";
import MultiSelect from "@/components/core/MultiSelect/MultiSelect.vue";
import Select from "@/components/core/Select/Select.vue";
import {GetAgentsResponse, GetContactsResponse} from "@/services/ports.ts";
import Appointment from "@/domain/Appointment.ts";
import Agent from "@/domain/Agent.ts";
import Contact from "@/domain/Contact.ts";
import {computed} from "@vue/reactivity";
import * as yup from "yup";
import {useForm, useField, useIsFormValid, useFieldValue} from "vee-validate";
import {ref} from "vue";
import {agents} from "@/stores/appointment";
import useAppointment from "@/composable/useAppointment.ts";

interface Props {
  agents: GetAgentsResponse,
  contacts: GetContactsResponse,
  appointment: { id: string, agents: Agent[], appointment: Appointment, contact: Contact }
}

const props = defineProps<Props>()
const emits = defineEmits(['onSubmit'])

const isCancelled = computed(() => props.appointment?.appointment?.isCancelled);
const isTimePassed = computed(() => props.appointment?.appointment?.isTimePassed);
const getAddress = computed(() => props.appointment?.appointment?.address);
const getSelectedAgents = computed(() => props.agents.filter(agent => props.appointment?.agents.some((x) => {
  return x.id === agent.agent.id
})));
const getDate = computed(() => {
  const date = props.appointment?.appointment?.date;
  if (date) {
    return new Date(date)
  }
  return null;
});
const getStatusOptions = computed(() => {
  return [
    {
      value: isTimePassed ? '' : '',
      text: isTimePassed ? 'Completed' : 'Upcoming', selected: !isCancelled
    },
    {value: '', text: 'Cancelled', selected: isCancelled}
  ]
});
const isFormUpdate = props.appointment?.appointment || false;

const schema = yup.object({
  contact: yup.object().required(),
  address: yup.string().required(),
  date: yup.date().required(),
});

const {errors, handleSubmit} = useForm({
  validationSchema: schema,
  initialValues: {
    contact: Object.freeze(props.appointment?.contact),
    address: Object.freeze(props.appointment?.appointment?.address),
    date: Object.freeze(props.appointment?.appointment?.date),
  }
});
const {value: contact} = useField('contact');
const {value: address} = useField('address');
const {value: agent} = useField('agent');
const {value: date} = useField('date');
const status = ref();

const {create, update} = useAppointment()
const onSubmit = handleSubmit(async () => {
  try {
    if (isFormUpdate) {
      await update({
        contact_id: contact.value?.id || "",
        appointment_address: address.value,
        appointment_date: date.value
      }, props.appointment.id)
    } else {
      await create({
        contact_id: contact.value?.id || "",
        appointment_address: address.value,
        appointment_date: date.value
      })
    }
  } catch (e) {
  }
  emits('onSubmit')
});
</script>

<template>
  {{ date }}
  <form @submit.prevent="onSubmit">
    <MultiSelect
        :options="contacts"
        track-by="id"
        label="Contact"
        select-label="name"
        :custom-label="(item) => item.contact.fullName"
        :default-value="appointment"
        @onChange="contact = $event"
        :error="errors.contact"
    >
      <template v-slot:singleLabel="{ option }">
        <div>{{ option.contact.fullName }}</div>
        <div>{{ option.contact.email }}</div>
        <div>{{ option.contact.phone }}</div>
      </template>
    </MultiSelect>
    <Input
        label="Address"
        :default-value="getAddress"
        @onChange="address = $event.target.value"
        :error="errors.address"
    />
    <MultiSelect
        label="Agents"
        track-by="id"
        :options="agents"
        :custom-label="(item) => item.agent.fullName"
        multiple
        :default-value="getSelectedAgents"
        @onChange="agent = $event"
    >
    </MultiSelect>
    <Datepicker
        label="Appoinment Date"
        :default-value="getDate"
        @onChange="date = $event"
        :error="errors.date"
    />
    <Select v-if="false"
            :options="getStatusOptions"
            @onSelect="status = $event"
    />
    <Button type="submit" text="Create" class-name="mt-4"/>
  </form>
</template>