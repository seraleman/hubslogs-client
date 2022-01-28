export function someGetter(/* state */) {}

//state
export function getIsLoadingReasons(state) {
  return state.isLoadingReasons;
}

export function getLabelNewBtn(state) {
  return state.labelNewBtn;
}

export function getReasonById(state) {
  return state.reasonById;
}

export function getReasonForm(state) {
  return state.reasonForm;
}

export function getReasons(state) {
  return state.reasons;
}

export function getIsReasonFormOpen(state) {
  return state.isReasonFormOpen;
}

export function getTitle(state) {
  return state.title;
}
//others

//Simulando Backend
// export const getReasonByIdProvisional =
//   (state) =>
//   (id = "") => {
//     const reason = state.reasons.find((reason) => reason.id === id);
//     state.reasonsById = reason;
//   };
