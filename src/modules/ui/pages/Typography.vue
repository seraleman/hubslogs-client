<template>
  <q-page class="flex column q-pa-md">
    <span class="text-h1 text-weight-bolder">Typography</span>
    <span class="text-h2 text-weight-bolder">Typography</span>
    <span class="text-h3 text-weight-bolder">Typography</span>
    <span class="text-h4 text-weight-bolder">Typography</span>
    <q-separator />
    <span class="text-h5 text-weight-bolder">Typography</span>
    <span class="text-h6 text-weight-bolder">Typography</span>

    <q-btn
      color="primary"
      :label="sideMenuOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'"
      @click="toggleSideMenu"
    ></q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useUi from "../composables/useUi";

export default defineComponent({
  name: "Typography",
  setup() {
    const { sideMenuOpen, toggleSideMenu } = useUi();
    return {
      sideMenuOpen,
      toggleSideMenu,
    };
  },
});
</script>
