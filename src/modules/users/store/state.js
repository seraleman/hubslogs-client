import { ref } from "vue";

export default function () {
  const columns = ref([
    {
      align: "center",
      // field: "id",
      field: (user) => user.id,
      label: "Id",
      name: "id",
      sortable: false,
    },
    {
      align: "center",
      field: "name",
      label: "Nombre",
      name: "name",
      sortable: true,
    },
    {
      align: "center",
      field: "email",
      label: "Email",
      name: "email",
      sortable: true,
    },
    {
      align: "center",
      field: "phone",
      label: "Teléfono",
      name: "phone",
      sortable: false,
    },
    {
      align: "center",
      field: "role",
      label: "Rol",
      name: "role",
      sortable: true,
    },
  ]);
  const isFormUserOpen = ref(false);
  const myCols = ref(["name", "email", "phone", "role"]);
  const options = ref(["Administrador", "Usuario", "Público"]);
  const pagination = {
    page: 1,
    rowsPerPage: 10,
  };
  const quantityInSelection = ref(0);
  const selection = ref([]);
  const title = ref("");
  const userForm = ref({
    email1: "",
    email2: "",
    id: "",
    name: "",
    phone: "",
    role: "",
  });
  const users = ref([
    {
      email: "shannelfranco@gmail.com",
      id: "3",
      name: "Shannel Franco",
      phone: "3002547878",
      role: "Público",
    },
    {
      email: "hannarivera@gmail.com",
      id: "2",
      name: "Hanna Rivera",
      phone: "3016524697",
      role: "Usuario",
    },
    {
      email: "seraleman1204@gmail.com",
      id: "1",
      name: "Sergio Manrique",
      phone: "3004526135",
      role: "Administrador",
    },
  ]);

  return {
    columns,
    isFormUserOpen,
    myCols,
    options,
    pagination,
    quantityInSelection,
    selection,
    title,
    userForm,
    users,
  };
}
