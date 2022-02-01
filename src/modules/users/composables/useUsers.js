import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

const useUsers = () => {
  const store = useStore();
  const $q = useQuasar();

  /*---getters---*/
  const get = {
    //state
    columns: computed(() => store.getters["users/getColumns"]),
    isFormUserOpen: computed(() => store.getters["users/getIsFormUserOpen"]),
    quantityInSelection: computed(
      () => store.getters["users/getQuantityInSelection"]
    ),
    myCols: computed(() => store.getters["users/getMyCols"]),
    options: computed(() => store.getters["users/getOptions"]),
    pagination: computed(() => store.getters["users/getPagination"]),
    selection: computed(() => store.getters["users/getSelection"]),
    title: computed(() => store.getters["users/getTitle"]),
    userForm: computed(() => store.getters["users/getUserForm"]),
    users: computed(() => store.getters["users/getUsers"]),
    //other
  };

  /**---methods---*/
  const method = {
    getSelectedString: (numberOfRows) => {
      return numberOfRows === 1
        ? `${numberOfRows} usuario seleccionado`
        : `${numberOfRows} usuarios seleccionados`;
    },

    isFieldNotNull: (val, message) => {
      return (val !== null && val !== "") || message;
    },

    isSameEmail: (val, userForm, field) => {
      if (field === "email1") {
        if (userForm.email2)
          return (
            val === userForm.email2 || "Los correos electrónicos no coinciden"
          );
      } else
        return (
          val === userForm.email1 || "Los correos electrónicos no coinciden"
        );
    },

    isValidEmail: (val) => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "El correo no parece ser válido";
    },

    isValidPhone: (val) => {
      const phonePattern =
        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
      return phonePattern.test(val) || "El teléfono debe de tener 10 dígitos";
    },

    onCancel: (userForm) => {
      mutation.toggleFormUserOpen();
      if (!userForm.id) mutation.resetUserForm();
      mutation.setTitle(""); //Para mantener lógico el título del formulario.
    },

    onDelete: (selection) => {
      $q.dialog({
        title: "Confirmar",
        message:
          selection.length === 1 //Prueba selection
            ? "¿Desea eliminar el usuario seleccionado?"
            : `¿Desea eliminar los usuarios seleccionados (${selection.length})?`,
        ok: {
          color: "secondary",
          label: "Sí",
        },
        cancel: {
          color: "secondary",
          label: "Cancelar",
          outline: true,
        },
        persistent: true,
      })
        .onOk(() => {
          deleteUsers();
        })
        .onCancel(() => {
          return;
        });

      const deleteUsers = () => {
        mutation.deleteUsers(selection);
        $q.notify({
          color: "green-4",
          icon: "cloud_done",
          message:
            selection.length === 1
              ? "Usuario eliminado"
              : `Usuarios eliminados`,
          textColor: "white",
        });
        mutation.resetSelection();
      };
    },

    onEdit: (selection, title) => {
      if (!title) method.setTitleBySelection(selection);
      mutation.toggleFormUserOpen();
    },

    onNew: (selection) => {
      if (!selection.length) mutation.setTitle("Creando un nuevo usuario");
      mutation.toggleFormUserOpen();
    },

    onReset: () => {
      mutation.resetUserForm();
    },

    onSubmit: (userForm, users) => {
      if (!userForm.id) {
        //Hallando el id de mayor valor
        let idMax = 0;
        users.forEach((user) => {
          if (Number(user.id) > idMax) idMax = Number(user.id);
        });

        const user = {
          email: userForm.email1,
          id: String(idMax + 1),
          name: userForm.name,
          phone: userForm.phone,
          role: userForm.role,
        };

        mutation.createUser(user);
        mutation.toggleFormUserOpen();
        $q.notify({
          color: "secondary",
          icon: "cloud_done",
          message: `${userForm.name} ha sido creada/o`,
          textColor: "white",
        });
        mutation.resetSelection();
        mutation.resetUserForm();
      } else {
        const { id, name, email1, phone, role } = userForm;
        const idx = users.map((e) => e.id).indexOf(id);
        const userCurrent = users[idx];

        const user = {
          email: email1,
          id,
          name,
          phone,
          role,
        };

        let equal = true;
        for (let [key, val] of Object.entries(userCurrent)) {
          if (user[key] !== val) equal = false;
          if (!equal) break;
        }

        if (equal) {
          $q.notify({
            color: "warning",
            icon: "las la-exclamation-circle",
            message: `No hubo cambios en la información de ${user.name}`,
            textColor: "white",
          });
          mutation.toggleFormUserOpen();
          mutation.resetSelection();
        } else {
          mutation.updateUser(user);
          $q.notify({
            color: "secondary",
            icon: "cloud_done",
            message: `La información de ${user.name} ha sido actualizada`,
            textColor: "white",
          });
          mutation.toggleFormUserOpen();
          mutation.resetSelection();
        }
      }
    },

    setQuantityInSelection: (selection) => {
      const number = selection.length;

      mutation.setQuantityInSelection(number);

      if (number === 1) mutation.setUserForm(selection[0]);
      else mutation.resetUserForm();
    },

    setTitleBySelection: (selection) => {
      console.log("escuchando setTitleBySelection");
      if (selection.length === 1)
        mutation.setTitle(
          `Actualizando la información de ${selection[0].name}`
        );
      else mutation.setTitle("");
    },

    twoWay: {
      email1: computed({
        get() {
          return get.userForm.value.email1;
        },
        set(value) {
          store.commit("users/twoWayUserForm", { key: "email1", value });
        },
      }),

      email2: computed({
        get() {
          return get.userForm.value.email2;
        },
        set(value) {
          store.commit("users/twoWayUserForm", { key: "email2", value });
        },
      }),

      name: computed({
        get() {
          return get.userForm.value.name;
        },
        set(value) {
          store.commit("users/twoWayUserForm", { key: "name", value });
        },
      }),

      phone: computed({
        get() {
          return get.userForm.value.phone;
        },
        set(value) {
          store.commit("users/twoWayUserForm", { key: "phone", value });
        },
      }),

      role: computed({
        get() {
          return get.userForm.value.role;
        },
        set(value) {
          store.commit("users/twoWayUserForm", { key: "role", value });
        },
      }),

      selected: computed({
        get() {
          return get.selection.value;
        },
        set(selected) {
          store.commit("users/twoWaySelection", selected);
        },
      }),

      isFormUserOpen: computed({
        get() {
          return get.isFormUserOpen.value;
        },
        set() {
          store.commit("users/toggleFormUserOpen");
        },
      }),
    },
  };

  //*---mutations---*/
  const mutation = {
    createUser: (user) => {
      store.commit("users/createUser", user);
    },

    deleteUsers: (users) => {
      store.commit("users/deleteUsers", users);
    },

    resetSelection: () => {
      store.commit("users/resetSelection");
    },

    resetUserForm: () => {
      store.commit("users/resetUserForm");
    },

    setQuantityInSelection: (number) => {
      store.commit("users/setQuantityInSelection", number);
    },

    setTitle: (title) => {
      store.commit("users/setTitle", title);
    },

    setUserForm: (user) => {
      store.commit("users/setUserForm", user);
    },

    toggleFormUserOpen: () => {
      store.commit("users/toggleFormUserOpen");
    },

    updateUser: (user) => {
      store.commit("users/updateUser", user);
    },
  };

  return {
    get,
    method,
    mutation,
  };
};

export default useUsers;
