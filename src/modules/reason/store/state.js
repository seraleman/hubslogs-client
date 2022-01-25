import { ref, reactive } from "vue";

export default function () {
  const reasons = [
    {
      id: "1",
      name: "Taller de HTML",
      description: "Clase impartida por Sergio Manrique el martes 22-06-22",
    },
    {
      id: "2",
      name: "Taller de CSS",
      description:
        "Sunt in ad non voluptate officia nostrud nisi anim aliqua consectetur aute eu officia. Eiusmod enim ad cillum elit quis aliqua est laborum non amet incididunt in aliqua. Fugiat quis eu exercitation consequat irure nostrud minim est sint ad in elit ad exercitation.",
    },
    {
      id: "3",
      name: "Visita general",
      description: "",
    },
    {
      id: "4",
      name: "Taller de emprendimiento",
      description: "La dicta Paul Tamayo",
    },
    {
      id: "5",
      name: "Taller de emprendimiento",
      description:
        "Aliquip ea dolor exercitation ea fugiat cupidatat occaecat reprehenderit officia aliquip.",
    },
    {
      id: "6",
      name: "Et laboris esse dolore velit.",
      description:
        "Exercitation non eu cupidatat dolore dolore duis deserunt. Consectetur ut dolor adipisicing cillum laborum ea. Non exercitation quis incididunt ea esse labore tempor. Cillum deserunt ex laborum exercitation sit sint incididunt amet excepteur. Culpa eiusmod et elit minim consectetur est occaecat. Ipsum incididunt reprehenderit incididunt amet. Elit consequat nulla voluptate eu incididunt magna est sit. Commodo commodo mollit et officia. Esse elit labore dolore dolore. Proident anim ad id ex ipsum occaecat esse amet in do cillum. Tempor adipisicing ad commodo nisi laboris. Ullamco consectetur aliquip et non aliqua incididunt incididunt voluptate amet non velit ad eu sint.",
    },
  ];

  const logs = [
    {
      id: "101",
      reason: {},
    },
  ];

  return {
    reasons,
  };
}
