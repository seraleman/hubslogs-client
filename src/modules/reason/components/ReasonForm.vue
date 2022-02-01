<template>
  <q-dialog
    v-model="isReasonFormOpen"
    transition-show="scale"
    @update:model-value="$emit('closeReasonForm')"
  >
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
              @click="onCancel(), $emit('closeReasonForm')"
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
              @click="$emit('closeReasonForm')"
              :label="!reasonForm.id ? 'Crear' : 'Editar'"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, watch, ref } from "vue";

import useReasonForm from "../composables/useReasonForm";
import useReasonMain from "../composables/useReasonMain";

export default defineComponent({
  name: "ReasonForm",
  emits: ["closeReasonForm", "reason"],
  props: {
    openReasonForm: {
      type: Boolean,
      require: true,
      default: false,
    },
    title: {
      type: String,
      require: true,
    },
    reason: {
      type: Object,
      require: false,
      default() {
        return {
          reason: {
            description: "",
            id: "",
            name: "",
          },
        };
      },
    },
  },
  setup(props) {
    //Desestructurando useReasonMain
    const { get: getReasonMain } = useReasonMain();
    const { reasons } = getReasonMain;

    //Desestructurando UseReasonForm
    const { get, method } = useReasonForm();
    const { reasonForm } = get;
    const {
      isFieldNotNull,
      onCancel,
      onReset,
      onSubmit,
      setReasonForm,
      toggleIsReasonFormOpen,
      twoWay,
    } = method;
    const { isReasonFormOpen, name, description } = twoWay;

    setReasonForm(props.reason);

    // own
    // open to ReasonForm
    watch(
      () => props.openReasonForm,
      (openReasonForm) => {
        toggleIsReasonFormOpen(openReasonForm);
      }
    );

    return {
      //get
      isReasonFormOpen,
      reasonForm,
      reasons,

      //method
      isFieldNotNull,
      onCancel,
      onReset,
      onSubmit,

      //twoWay
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
