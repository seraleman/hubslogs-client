<template>
  <q-dialog v-model="isReasonFormOpen" transition-show="scale">
    <q-card class="my-card q-pa-md">
      <q-card-section class="q-pa-md q-py-lg">
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-sm" tag="form">
        <q-form
          @submit="onSubmit(reasonForm, reasons)"
          @reset="onReset()"
          class="q-gutter-md"
        >
          <q-input
            filled
            lazy-rules
            hint="Ingresa el nombre de la nueva razón"
            label="Razón *"
            type="text"
            v-model="name"
            :rules="[
              (val) =>
                isFieldNotNull(val, 'Debes ingresar el nombre de la razón'),
            ]"
          />

          <q-input
            filled
            hint="Haz una descripción de la razón"
            label="Descripción"
            v-model="description"
          />

          <q-card-actions>
            <q-btn
              flat
              class="q-ma-sm"
              color="secondary"
              label="Cancelar"
              @click="onCancel()"
            />

            <q-btn
              flat
              class="q-ma-sm"
              color="secondary"
              label="Borrar campos"
              type="reset"
              v-if="!reasonForm.id"
            />

            <q-space />

            <q-btn
              class="q-ma-sm"
              color="secondary"
              type="submit"
              :label="!reasonForm.id ? 'Crear' : 'Editar'"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, watch } from "vue";

import useuser from "../composables/useReason";

export default defineComponent({
  name: "ReasonForm",
  setup() {
    const { get, method } = useuser();

    const { reasonForm, reasons, title } = get;

    const {
      isFieldNotNull,
      onCancel,
      onReset,
      onSubmit,
      setReasonForm,
      twoWay,
    } = method;

    const { isReasonFormOpen, name, description } = twoWay;

    watch(
      () => isReasonFormOpen.value,
      (isReasonFormOpen) => {
        setReasonForm(isReasonFormOpen, reasonForm.value);
      }
    );

    return {
      //get
      reasonForm,
      reasons,
      title,

      //method
      isFieldNotNull,
      onCancel,
      onReset,
      onSubmit,

      //twoWay
      isReasonFormOpen,
      name,
      description,
    };
  },
});
</script>

<style lang="sass" scoped>
.col
  height: 50px

.square-box
  height: 50px
  width: 50px

.my-card
  width: 100%
  max-width: 500px
</style>
