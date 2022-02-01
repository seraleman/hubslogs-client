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
    :title="`Editando la razón ${reason.name}`"
    @closeReasonForm="toggleFormUserOpen"
  ></reason-form>
</template>

<script>
import { defineComponent, ref } from "vue";

import useReasonMain from "../composables/useReasonMain";

import ReasonForm from "./ReasonForm.vue";

export default defineComponent({
  name: "Reason",
  emits: ["goBack"],
  props: {
    reason: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    //import
    const { method } = useReasonMain();
    const { deleteReason } = method;
    // own
    const openReasonForm = ref(false);

    const toggleFormUserOpen = () => {
      openReasonForm.value = !openReasonForm.value;
    };

    return {
      //get
      openReasonForm,

      //method
      onDelete: () => deleteReason(props.reason),
      onEdit: () => toggleFormUserOpen(),
      toggleFormUserOpen,
    };
  },
  components: {
    ReasonForm,
  },
});
</script>
