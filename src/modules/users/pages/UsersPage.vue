<template>
  <q-page padding>
    <q-chip
      color="teal-1"
      icon="las la-user-friends"
      size="xl"
      text-color="teal-7"
    >
      Usuarios
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
        v-if="quantityInSelection === 0"
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
        v-if="quantityInSelection === 1"
        @click="onEdit(selection, title)"
      />

      <q-btn
        outline
        style
        class="q-ma-xs"
        color="negative"
        icon="las la-user-minus"
        label="Eliminar"
        v-if="quantityInSelection >= 1"
        @click="onDelete(selection)"
      />
    </div>
    <create-user-form></create-user-form>
    <users-list></users-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import CreateUserForm from "../components/CreateUserForm.vue";
import UsersList from "../components/UsersList.vue";

import useUsers from "../composables/useUsers";

// TODO:Importar componentes de manera asíncrona
export default defineComponent({
  name: "UsersPage",
  setup() {
    const { get, method } = useUsers();

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
    CreateUserForm,
    UsersList,
  },
});
</script>
