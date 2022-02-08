// export function someGetter(/* state */) {}

//state

export function getReasons(state) {
  return state.reasons;
}

export function getReason(state) {
  return state.reason;
}

export const getReasonById =
  (state) =>
  (id = "") => {
    const reason = state.reasons.find((reason) => reason.id === id);
    if (!reason) return;

    return { ...reason };
  };
