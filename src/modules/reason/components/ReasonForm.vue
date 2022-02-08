<template>
  <q-dialog
    v-model="isReasonFormOpen"
    transition-show="scale"
    @hide="$emit('closeReasonForm')"
  >
    <q-card class="my-card q-pa-md">
      <q-card-section class="q-pa-md q-py-lg" v-if="!reason.id">
        <span class="text-body1">{{ title }}</span>
      </q-card-section>

      <q-card-section class="q-pa-md q-py-lg" v-else>
        <span class="text-body1"
          >{{ title }}
          <span class="text-weight-medium"> {{ reason.name }}</span>
        </span>
      </q-card-section>

      <q-card-section class="q-pt-sm">
        <q-form
          @submit="onSubmit(reasonForm, reasons)"
          @reset="onReset()"
          class="q-gutter-md"
        >
          <q-input
            filled
            lazy-rules
            color="secondary"
            hint="Ingresa el nombre de la nueva razón"
            label="Razón *"
            type="text"
            v-model="name"
            :rules="[(val) => isFieldNotNull(val, 'Debes ingresar')]"
          />

          <q-input
            autogrow
            filled
            color="secondary"
            hint="Haz una descripción de la razón"
            label="Descripción"
            type="textarea"
            v-model="description"
          />

          <q-card-actions tag="form">
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

import useReasonForm from "../composables/useReasonForm";
import useReasonMain from "../composables/useReasonMain";

export default defineComponent({
  name: "ReasonForm",
  emits: ["closeReasonForm", "reason", "reasonUpdated"],
  props: {
    openReasonForm: {
      default: false,
      require: true,
      type: Boolean,
    },
    reason: {
      default() {
        return {
          reason: {
            description: "",
            id: "",
            name: "",
          },
        };
      },
      require: false,
      type: Object,
    },
    title: {
      require: true,
      type: String,
    },
  },
  setup(props) {
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

    //Desestructurando useReasonMain
    const { get: getReasonMain } = useReasonMain();
    const { reasons } = getReasonMain;

    setReasonForm(props.reason);

    // own
    // open to ReasonForm
    watch(
      () => props.openReasonForm,
      (openReasonForm) => {
        if (openReasonForm) toggleIsReasonFormOpen();
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
