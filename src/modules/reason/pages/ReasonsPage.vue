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
    <reason-list :reasons="reasons" />
    <reason-form
      :openReasonForm="openReasonForm"
      :title="'Creando un nuevo usuario'"
      @closeReasonForm="toggleFormUserOpen"
    ></reason-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

import useReasonMain from "../composables/useReasonMain";

import ReasonList from "../components/ReasonList.vue";
import ReasonForm from "../components/ReasonForm.vue";

// TODO:Importar componentes de manera asíncrona
export default defineComponent({
  name: "ReasonPage",
  setup() {
    // imports
    const { get } = useReasonMain();
    const { reasons } = get;
    console.log(reasons.value, "desde ReasonPage");

    // own
    const openReasonForm = ref(false);

    const toggleFormUserOpen = () => {
      openReasonForm.value = !openReasonForm.value;
    };

    return {
      //get
      openReasonForm,
      reasons,

      //method
      onNew: () => toggleFormUserOpen(),
      toggleFormUserOpen,
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
