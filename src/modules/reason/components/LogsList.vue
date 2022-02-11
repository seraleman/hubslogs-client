<template>
  <q-table title="Table Title" :data="data" :columns="columns" row-key="name" />
</template>

<script setup>
const props = defineProps({});
const emit = defineEmits({});

const columns = [
  {
    align: "center",
    // field: "id",
    field: (user) => user.id,
    label: "Id",
    name: "id",
    sortable: false,
  },
];
</script>

<style></style>
