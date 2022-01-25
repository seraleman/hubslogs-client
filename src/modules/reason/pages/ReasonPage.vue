<template>
  <q-page padding>
    <h1>Esta es la pagina para Reason</h1>
    <h3>Id: {{ id }}</h3>
    <pre>{{ reason }}</pre>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import useReason from "../composables/useReason";

// TODO:Importar componentes de manera asíncrona
export default defineComponent({
  name: "ReasonPage",
  props: {},
  setup() {
    const route = useRoute();

    const { id } = route.params;

    const { get, method } = useReason();

    const { reasonById } = get;

    const {} = method;

    const reason = reasonById(id);

    return {
      //get
      id,
      reason,
      //method
    };
  },
  components: {},
});
</script>
