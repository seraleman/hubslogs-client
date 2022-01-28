<template>
  <q-card
    bordered
    class="my-card q-ma-sm cursor-pointer"
    @click="$router.push({ name: 'reasons-reason', params: { id } })"
  >
    <q-card-section>
      <div class="text-h6">{{ trimmedName }}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      {{ trimmedDescription }}
      <template v-if="!trimmedDescription">
        <span><i>(agrega una descripción)</i></span>
      </template>
    </q-card-section>

    <q-card-section class="row justify-end q-pa-sm card-section-footer">
      <q-chip color="teal-4" text-color="white" dense square class="glossy">
        34 visitas
      </q-chip>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

import useReason from "../composables/useReason";

export default defineComponent({
  name: "Reason",
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "(sin descripción)",
    },
  },
  setup(props) {
    const { get, method } = useReason();

    const { trimText } = method;

    const trimmedName = trimText(props.name, "small");

    const trimmedDescription = trimText(props.description, "medium");

    return { trimmedDescription, trimmedName };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 250px
  background-color: #fff
  transition: 0.3s
  &:hover
    background-color: $teal-1
    .card-section-footer
      background-color: $grey-3

.card-section-footer
  background-color: $grey-2
  transition: 0.3s
</style>
