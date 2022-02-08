<template>
  <q-page padding>
    <div class="row q-px-sm q-pb-sm">
      <q-btn
        flat
        class="q-ma-xs"
        color="secondary"
        icon="las la-arrow-circle-left"
        @click="$emit('goBack')"
      />

      <q-space />

      <q-btn
        outline
        class="q-ma-xs"
        color="secondary"
        icon="las la-pen"
        @click="onEdit()"
      />

      <q-btn
        outline
        class="q-ma-xs"
        color="negative"
        icon="las la-trash-alt"
        @click="onDelete(reason)"
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

  <reason-form
    :openReasonForm="openReasonForm"
    :reason="reason"
    :title="'Editando la razón'"
    @closeReasonForm="toggleFormReasonOpen()"
  />

  <confirmation
    :nameObj="reason.name"
    :openConfirmation="openConfirmation"
    :text="'Confirma que desea eliminar la razón'"
    @closeConfirmation="toggleConfirmationOpen()"
    @delete="deleteConfirmedReason(reason.id)"
  />
</template>

<script>
import { defineComponent, ref } from "vue";

import useReasonMain from "../composables/useReasonMain";

import ReasonForm from "./ReasonForm.vue";
import Confirmation from "./Confirmation.vue";

export default defineComponent({
  name: "Reason",
  emits: ["goBack"],
  props: {
    reason: {
      required: true,
      type: Object,
    },
  },

  setup(_, { emit }) {
    //import
    const { method } = useReasonMain();
    const { deleteReason } = method;

    // own
    const openConfirmation = ref(false);
    const openReasonForm = ref(false);

    const toggleConfirmationOpen = () => {
      openConfirmation.value = !openConfirmation.value;
    };

    const toggleFormReasonOpen = () => {
      openReasonForm.value = !openReasonForm.value;
    };

    const deleteConfirmedReason = async (id) => {
      const resp = await deleteReason(id);
      if (resp) {
        emit("goBack");
      }
    };

    return {
      //get
      openConfirmation,
      openReasonForm,

      //method
      deleteConfirmedReason,
      onDelete: () => toggleConfirmationOpen(),
      onEdit: () => toggleFormReasonOpen(),
      toggleConfirmationOpen,
      toggleFormReasonOpen,
    };
  },

  components: {
    ReasonForm,
    Confirmation,
  },
});
</script>

<style lang="sass" scoped>

.my-card
  //  max-width: 850px
</style>
