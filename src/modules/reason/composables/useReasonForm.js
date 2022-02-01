import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const useReasonForm = () => {
  const store = useStore();
  const $q = useQuasar();

  const isReasonFormOpen = ref(false);
  const reasonForm = ref({
    description: "",
    id: "",
    name: "",
  });

  const get = {
    isReasonFormOpen: computed(() => isReasonFormOpen.value),
    reasonForm: computed(() => reasonForm.value),
  };

  const method = {
    isFieldNotNull: (val, message) => {
      return (val !== null && val !== "") || message;
    },

    onCancel: (reason) => {
      mutation.toggleIsReasonFormOpen();
      if (!reason === null) mutation.resetReasonForm();
    },

    onReset: () => {
      mutation.resetReasonForm();
    },

    onSubmit: (reasonForm, reasons) => {
      if (!reasonForm.id) {
        // creating a reason
        let idMax = 0;
        reasons.forEach((reason) => {
          if (Number(reason.id) > idMax) idMax = Number(reason.id);
        });

        const reason = {
          description: reasonForm.description,
          id: String(idMax + 1),
          name: reasonForm.name,
        };

        mutation.createReason(reason);
        mutation.toggleIsReasonFormOpen();
        $q.notify({
          color: "secondary",
          icon: "cloud_done",
          message: `La razón '${reasonForm.name}' ha sido creada`,
          textColor: "white",
        });
        mutation.resetReasonForm();
      } else {
        // updating a reason
        const { description, id, name } = reasonForm;
        const idx = reasons.map((e) => e.id).indexOf(id);
        const reasonCurrent = reasons[idx];

        const reasonUpdated = {
          description,
          id,
          name,
        };

        let equal = true;
        for (let [key, val] of Object.entries(reasonCurrent)) {
          if (reasonUpdated[key] !== val) equal = false;
          if (!equal) break;
        }

        if (equal) {
          $q.notify({
            color: "warning",
            icon: "las la-exclamation-circle",
            message: `No hubo cambios en la información de ${reasonCurrent.name}`,
            textColor: "white",
          });
          mutation.toggleIsReasonFormOpen();
        } else {
          const args = {
            idx,
            reasonUpdated,
          };

          mutation.updateReason(args);

          $q.notify({
            color: "secondary",
            icon: "cloud_done",
            message: `La información de ${reasonUpdated.name} ha sido actualizada`,
            textColor: "white",
          });
          mutation.toggleIsReasonFormOpen();
        }
      }
    },

    resetReasonForm: () => {
      mutation.resetReasonForm();
    },

    setReasonForm: (reason) => {
      mutation.setReasonForm(reason);
    },

    toggleIsReasonFormOpen: (openReasonForm) => {
      if (openReasonForm) mutation.toggleIsReasonFormOpen();
    },

    twoWayReasonForm: (arg) => {
      const { key, value } = arg;
      switch (key) {
        case "name":
          reasonForm.value.name = value;
          break;
        case "description":
          reasonForm.value.description = value;
          break;
      }
    },

    twoWay: {
      isReasonFormOpen: computed({
        get() {
          return get.isReasonFormOpen.value;
        },
        set() {
          isReasonFormOpen.value = !isReasonFormOpen.value;
        },
      }),

      description: computed({
        get() {
          return get.reasonForm.value.description;
        },
        set(value) {
          method.twoWayReasonForm({
            key: "description",
            value,
          });
        },
      }),

      name: computed({
        get() {
          return get.reasonForm.value.name;
        },
        set(value) {
          method.twoWayReasonForm({
            key: "name",
            value,
          });
        },
      }),
    },
  };

  const mutation = {
    createReason: (reason) => {
      store.commit("reason/createReason", reason);
    },

    resetReasonForm: () => {
      reasonForm.value = {
        description: "",
        id: "",
        name: "",
      };
    },

    setReasonForm: (reason) => {
      const { description, id, name } = reason;

      reasonForm.value = {
        description,
        id,
        name,
      };
    },

    toggleIsReasonFormOpen: () => {
      isReasonFormOpen.value = !isReasonFormOpen.value;
    },

    updateReason: (args) => {
      store.commit("reason/updateReason", args);
    },
  };

  return {
    get,
    method,
    mutation,
  };
};

export default useReasonForm;
