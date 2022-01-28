<template>
  <q-page padding>
    <div class="row q-px-sm q-pb-sm">
      <q-btn
        flat
        class="q-ma-xs"
        color="secondary"
        icon="las la-arrow-circle-left"
        @click="$router.push({ name: 'reasons-admon' })"
      />

      <q-space />

      <q-btn
        outline
        class="q-ma-xs"
        color="secondary"
        icon="las la-pen"
        @click="onEdit(reason)"
      />

      <q-btn
        outline
        class="q-ma-xs"
        color="negative"
        icon="las la-trash-alt"
        @click="onDelete()"
      />
    </div>

    <q-card class="my-card">
      <q-card-section class="text-h6">
        {{ reason.name }}
      </q-card-section>
      <q-card-section>
        {{ reason.description }}
      </q-card-section>

      <!-- <q-table
        title="Table Title"
        :data="data"
        :columns="columns"
        row-key="name"
      /> -->
    </q-card>
  </q-page>
  <reason-form></reason-form>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import ReasonForm from "../components/ReasonForm.vue";

import useReason from "../composables/useReason";

// TODO:Importar componentes de manera asíncrona
export default defineComponent({
  name: "ReasonPage",
  setup() {
    const route = useRoute();

    const { id } = route.params;

    const { get, method } = useReason();

    const { reasonById: reason, reasons } = get;

    const { onEdit, onDelete, setReasonById } = method;

    setReasonById(reasons.value, id);

    onMounted(() => {
      console.log("onMounted");
    });

    return {
      //get
      id,
      reason,

      //method
      onEdit,
      onDelete,
    };
  },
  components: {
    ReasonForm,
  },
});
</script>
