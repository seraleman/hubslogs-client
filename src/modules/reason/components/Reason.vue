<template>
  <q-card
    bordered
    class="my-card q-ma-sm cursor-pointer my-selectionable-div"
    @click="$router.push({ name: 'reasons-reason', params: { id } })"
  >
    <q-card-section>
      <div class="text-h6">{{ name }}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      {{ shortedDescription }}
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
    const { get, method, mutation } = useReason();

    const { shortDescription } = method;

    const shortedDescription = shortDescription(props.description);

    const probando = (id) => {
      console.log("Escuchando el click en el id: ", id);
    };

    return { shortedDescription, probando };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 250px
  max-height: 250px
  background-color: $grey-1
  transition: 0.3s
  &:hover
    background-color: $teal-1
</style>
