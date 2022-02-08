const data = {
  reasons: [
    {
      id: "7",
      name: "Deserunt aute voluptate velit laborum mollit aliqua officia pariatur nisi incididunt irure nisi. Fugiat esse ex occaecat culpa nostrud excepteur. Do magna eu laboris culpa. Culpa esse elit officia laboris et do aliquip voluptate ut labore sint aliquip. Aliquip anim dolor aute id consectetur tempor ex. Sunt enim quis id consequat voluptate est labore tempor veniam dolore est.",
      description:
        "Laboris qui ea eu sit esse quis ad ex anim est. Esse esse sunt do aliqua ipsum. Cillum tempor ea pariatur ut duis quis veniam esse cillum anim nostrud ut id. Duis laborum culpa do nulla fugiat fugiat officia anim est nostrud.",
    },
    {
      id: "6",
      name: "Et laboris esse dolore velit.",
      description:
        "Exercitation non eu cupidatat dolore dolore duis deserunt. Consectetur ut dolor adipisicing cillum laborum ea. Non exercitation quis incididunt ea esse labore tempor. Cillum deserunt ex laborum exercitation sit sint incididunt amet excepteur. Culpa eiusmod et elit minim consectetur est occaecat. Ipsum incididunt reprehenderit incididunt amet. Elit consequat nulla voluptate eu incididunt magna est sit. Commodo commodo mollit et officia. Esse elit labore dolore dolore. Proident anim ad id ex ipsum occaecat esse amet in do cillum. Tempor adipisicing ad commodo nisi laboris. Ullamco consectetur aliquip et non aliqua incididunt incididunt voluptate amet non velit ad eu sint.",
    },
    {
      id: "5",
      name: "Taller de emprendimiento",
      description:
        "Aliquip ea dolor exercitation ea fugiat cupidatat occaecat reprehenderit officia aliquip.",
    },
    {
      id: "4",
      name: "Taller de emprendimiento",
      description: "La dicta Paul Tamayo",
    },
    {
      id: "3",
      name: "Visita general",
      description: "",
    },
    {
      id: "2",
      name: "Taller de CSS",
      description:
        "Sunt in ad non voluptate officia nostrud nisi anim aliqua consectetur aute eu officia. Eiusmod enim ad cillum elit quis aliqua est laborum non amet incididunt in aliqua. Fugiat quis eu exercitation consequat irure nostrud minim est sint ad in elit ad exercitation.",
    },
    {
      id: "1",
      name: "Taller de HTML",
      description: "Clase impartida por Sergio Manrique el martes 22-06-22",
    },
  ],
};

const backendEmulator = {
  reasons: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data });
      }, 1500);
    }).then(data);
  },

  // TODO:
  reasonsById: () => {},

  createReason: async (reason) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = {
          reason,
          status: 200,
        };
        resolve({ data });
      }, 2500);
    }).then(data);
  },

  updateReason: async (args) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = {
          args,
          status: 200,
        };
        resolve({ data });
      }, 1500);
    }).then(data);
  },

  deleteReason: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = {
          message: "objeto eliminado",
          status: 200,
        };
        resolve({ data });
      }, 1500);
    }).then(data);
  },
};

export default backendEmulator;
