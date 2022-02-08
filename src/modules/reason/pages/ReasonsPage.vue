<template>
  <q-page padding>
    <q-chip color="teal-1" icon="las la-cogs" size="xl" text-color="teal-7">
      Razones
    </q-chip>

    <q-separator spaced inset />

    <div class="row q-px-sm q-pb-sm">
      <q-btn
        class="q-ma-xs my-btn"
        color="secondary"
        icon="las la-plus-circle"
        label=""
        @click="onNew()"
      />

      <q-space />

      <q-input type="buscar" label="Label" />
    </div>
    <reason-list
      :reason="reason"
      :reasons="reasons"
      :resetReason="resetReason"
      @reasonSelected="setReasonById"
    />

    <reason-form
      :openReasonForm="openReasonForm"
      :title="'Creando una nueva razón'"
      @closeReasonForm="toggleFormReasonOpen"
    ></reason-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

import useReasonMain from "../composables/useReasonMain";

import ReasonList from "../components/ReasonList.vue";
import ReasonForm from "../components/ReasonForm.vue";

// TODO:Importar componentes de manera asíncrona
export default defineComponent({
  name: "ReasonPage",
  setup() {
    // imports
    const { get, method } = useReasonMain();
    const { reasons, reason } = get;
    const { loadReasons, setReasonById, resetReason } = method;

    // own
    const openReasonForm = ref(false);

    const toggleFormReasonOpen = () => {
      openReasonForm.value = !openReasonForm.value;
    };

    //Llamado para cargar las razones del back
    onMounted(() => {
      loadReasons(reasons.value);
    });

    return {
      //get
      openReasonForm,
      reason,
      reasons,

      //method
      onNew: () => toggleFormReasonOpen(),
      resetReason,
      setReasonById,
      toggleFormReasonOpen,
    };
  },

  components: {
    ReasonList,
    ReasonForm,
  },
});
</script>

<style lang="sass" scoped>
.my-btn
  width: 300px
</style>
