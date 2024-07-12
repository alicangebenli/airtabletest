<script lang="ts">
import {defineComponent} from "vue";
import formattedDate from "@/shared/utils/formattedDate";
import {calculateTimeDifferenceFromNowToNext} from "@/shared/utils/calculateTimeDifferenceFromNowToNext";

export default defineComponent({
  methods: {
    calculateTimeDifferenceFromNowToNext,
    formattedDate
  },
  props: {
    date: {
      type: String,
      requrired: true
    },
    isCancelled: {
      type: Boolean,
    }
  },
  computed: {
    remainingTime() {
      if (!this.date) {
        return false;
      }
      return this.calculateTimeDifferenceFromNowToNext(this.date);
    }
  }
})
</script>

<template>
  <div class="bg-red-600 px-1 py-1 border-0 rounded-xl text-white flex gap-x-2  h-[50px] items-center">
    <div class="bg-white basis-1/2 rounded-xl text-amber-800 flex items-center justify-center h-full flex-col">
      <div v-if="isCancelled">
        Cancelled
      </div>
      <div v-else-if="!isCancelled && remainingTime">
        Upcoming
      </div>
      <div v-else>
        Completed
      </div>
      <div v-if="remainingTime">{{ remainingTime.value }} {{ remainingTime.type }}</div>
    </div>
    <div>
      {{ formattedDate(date) }}
    </div>
  </div>
</template>