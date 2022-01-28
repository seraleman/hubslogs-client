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
        :label="labelNewBtn"
        @click="onNew()"
      />
      <q-space />

      <q-input type="buscar" label="Label" />
    </div>
    <reason-list></reason-list>
    <reason-form></reason-form>
  </q-page>
</template>

<script>
import {
  defineComponent,
  watch,
  loadReasons,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated,
} from "vue";

import ReasonList from "../components/ReasonList.vue";
import ReasonForm from "../components/ReasonForm.vue";

import useReason from "../composables/useReason";

// TODO:Importar componentes de manera asíncrona
export default defineComponent({
  name: "ReasonPage",
  setup() {
    const { get, method } = useReason();

    const { isReasonFormOpen, labelNewBtn, reasonForm } = get;

    const { loadReasons, onNew, setLabelNewBtn } = method;

    loadReasons();

    // const create = () => {
    //   console.log("create");
    // };

    // onMounted(() => {
    //   console.log("onMounted");
    // });
    // onBeforeMount(() => {
    //   console.log("onBeforeMount");
    // });
    // onBeforeUpdate(() => {
    //   console.log("onBeforeUpdate");
    // });
    // onUpdated(() => {
    //   console.log("onUpdated");
    // });
    // onBeforeUnmount(() => {
    //   console.log("onBeforeUnmount");
    // });
    // onUnmounted(() => {
    //   console.log("onUnmounted");
    // });
    // onErrorCaptured(() => {
    //   console.log("onErrorCaptured");
    // });
    // onRenderTracked(() => {
    //   console.log("onRenderTracked");
    // });
    // onRenderTriggered(() => {
    //   console.log("onRenderTriggered");
    // });
    // onActivated(() => {
    //   console.log("onActivated");
    // });
    // onDeactivated(() => {
    //   console.log("onDeactivated");
    // });

    // create();

    watch(
      () => isReasonFormOpen.value,
      () => {
        setLabelNewBtn(reasonForm.value);
      }
    );

    return {
      //get
      labelNewBtn,

      //method
      onNew,
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
