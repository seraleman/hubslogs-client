export function someGetter(/* state */) {}

//state
export function getReasons(state) {
  return state.reasons;
}

// export function getReasonById(state) {
//   return (id) => {
//     console.log("Llamando al getters");
//     const reason = state.reasons.find((reason) => reason.id === id);
//     if (!reason) return;
//     return { ...entry };
//   };
// }

export const getReasonById =
  (state) =>
  (id = "") => {
    const reason = state.reasons.find((reason) => reason.id === id);
    if (!reason) return;
    return { ...reason };
  };
//others
