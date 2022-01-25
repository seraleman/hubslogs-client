<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <q-toolbar class="bg-black">
        <q-btn
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="toggleSideMenu"
        />

        <q-btn no-caps stretch flat aria-label="HubsLogs">
          <q-toolbar-title> HubsLogs App </q-toolbar-title>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="sideMenuOpen" bordered>
      <q-list>
        <q-item-label header>Opciones</q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import EssentialLink from "../components/EssentialLink.vue";

import { linksList } from "../router/link-list";
import useUi from "../composables/useUi";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const { sideMenuOpen, toggleSideMenu } = useUi();
    return {
      linksList,

      //Menu options
      sideMenuOpen,
      toggleSideMenu,
    };
  },
});
</script>
