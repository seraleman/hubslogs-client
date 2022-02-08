// export function someMutation(/* state */) {}

export function createReason(state, reason) {
  state.reasons = [reason, ...state.reasons];
}

export function deleteReason(state, id) {
  const idx = state.reasons.map((e) => e.id).indexOf(id);
  state.reasons.splice(idx, 1);
}

export function resetReason(state) {
  state.reason = {
    description: "",
    id: "",
    name: "",
  };
}

export function setReason(state, reason) {
  state.reason = reason;
}

export function setReasons(state, reasons) {
  state.reasons = reasons;
}

export function updateReason(state, args) {
  const { idx, reasonUpdated } = args;
  state.reasons[idx] = reasonUpdated;
}
