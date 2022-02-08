<template>
  <q-dialog v-model="isConfirmationOpen" @hide="$emit('closeConfirmation')">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Confirmación</div>
      </q-card-section>

      <q-card-section style="max-height: 50vh" class="scroll">
        <span class="text-body1">
          {{ text }}
          <span class="text-weight-medium"> {{ nameObj }}</span>
        </span>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat color="secondary" label="Cancelar" v-close-popup />
        <q-btn
          color="secondary"
          label="Eliminar"
          v-close-popup
          @click="$emit('delete')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Confirmation",
  emits: ["closeConfirmation", "delete"],
  props: {
    nameObj: {
      required: true,
      type: String,
    },
    openConfirmation: {
      required: true,
      type: Boolean,
    },
    text: {
      required: true,
      type: String,
    },
  },

  setup(props) {
    const isConfirmationOpen = ref(false);

    const toggleIsConfirmationOpen = () => {
      isConfirmationOpen.value = !isConfirmationOpen.value;
    };

    watch(
      () => props.openConfirmation,
      (openConfirmation) => {
        if (openConfirmation) toggleIsConfirmationOpen();
      }
    );

    return {
      isConfirmationOpen,
    };
  },
});
</script>

<style lang="sass" scope>
.my-card
    max-width: 500px
    min-width: 350px
</style>
