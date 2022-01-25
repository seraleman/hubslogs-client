<template>
  <q-page padding>
    <q-chip color="teal-1" icon="las la-cogs" size="xl" text-color="teal-7">
      Razones
    </q-chip>

    <q-separator spaced inset />

    <div class="row q-px-sm q-pb-sm">
      <q-btn
        outline
        style
        class="q-ma-xs"
        color="secondary"
        icon="las la-user-plus"
        label="Nuevo"
        @click="onNew(selection)"
      />

      <q-space />

      <q-btn
        outline
        style
        class="q-ma-xs"
        color="secondary"
        icon="las la-user-edit"
        label="Editar"
        @click="onEdit(selection, title)"
      />

      <q-btn
        outline
        style
        class="q-ma-xs"
        color="negative"
        icon="las la-user-minus"
        label="Eliminar"
        @click="onDelete(selection)"
      />
    </div>
    <ReasonList />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import ReasonList from "../components/ReasonList.vue";

import useReason from "../composables/useReason";

// TODO:Importar componentes de manera asíncrona
export default defineComponent({
  name: "ReasonPage",
  setup() {
    const { get, method } = useReason();

    const { quantityInSelection, selection, title } = get;

    const { onDelete, onEdit, onNew } = method;

    return {
      //get
      quantityInSelection,
      selection,
      title,

      //method
      onDelete,
      onEdit,
      onNew,
    };
  },
  components: {
    ReasonList,
  },
});
</script>
