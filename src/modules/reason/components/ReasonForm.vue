<template>
  <q-dialog v-model="isFormUserOpen" transition-show="scale">
    <q-card class="my-card q-pa-md">
      <q-card-section class="q-pa-md q-py-lg">
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-sm" tag="form">
        <q-form
          @submit="onSubmit(userForm, users)"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            filled
            lazy-rules
            hint="Nombres y apellidos"
            label="Nombre completo *"
            type="text"
            v-model="name"
            :rules="[
              (val) => isFieldNotNull(val, 'Debes ingresar el nombre completo'),
            ]"
          />

          <q-input
            filled
            lazy-rules
            label="Correo electrónico *"
            v-model="email1"
            :rules="[
              (val) =>
                isFieldNotNull(val, 'Debes ingresar un correo electrónico'),
              (val) => isValidEmail(val),
              (val) => isSameEmail(val, userForm, 'email1'),
            ]"
          />

          <q-input
            filled
            lazy-rules
            hint="Ingresa nuevamente el correo electrónico"
            label="Confirmación de correo electrónico *"
            v-model="email2"
            :rules="[
              (val) =>
                isFieldNotNull(
                  val,
                  'Debes ingresar de nuevo el correo electrónico'
                ),
              (val) => isSameEmail(val, userForm, 'email2'),
            ]"
          />
          <!-- isSameEmail, -->

          <q-input
            filled
            lazy-rules
            label="Número de teléfono celular *"
            v-model="phone"
            :rules="[
              (val) =>
                isFieldNotNull(val, 'Debes ingresar un teléfono celular'),
              (val) => isValidPhone(val),
            ]"
          />

          <q-select
            filled
            lazy-rules
            label="Elige el rol que tendrá el usuario *"
            v-model="role"
            :options="options"
            :rules="[(val) => isFieldNotNull(val, 'Debes elegir un rol')]"
          />

          <q-card-actions>
            <q-btn
              flat
              class="q-ma-sm"
              color="secondary"
              label="Cancelar"
              @click="onCancel(userForm)"
            />

            <q-btn
              flat
              class="q-ma-sm"
              color="secondary"
              label="Borrar campos"
              type="reset"
              v-if="!userForm.id"
            />

            <q-space />

            <q-btn
              class="q-ma-sm"
              color="secondary"
              type="submit"
              :label="!userForm.id ? 'Crear' : 'Actualizar'"
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

    const { options, title, userForm, users } = get;

    const {
      isFieldNotNull,
      isSameEmail,
      isValidEmail,
      isValidPhone,
      onCancel,
      onReset,
      onSubmit,
      twoWay,
    } = method;

    const { email1, email2, name, phone, role, isFormUserOpen } = twoWay;

    return {
      //get
      isFormUserOpen,
      options,
      title,
      userForm,
      users,

      //method
      isFieldNotNull,
      isSameEmail,
      isValidEmail,
      isValidPhone,
      onCancel,
      onReset,
      onSubmit,

      //twoWay
      email1,
      email2,
      name,
      phone,
      role,
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
