export function someMutation(/* state */) {}

export function createUser(state, user) {
  state.users = [user, ...state.users];
}

export function deleteUsers(state, users) {
  users.forEach((user) => {
    const idx = state.users.map((e) => e.id).indexOf(user.id);
    state.users.splice(idx, 1);
  });
}

export function resetSelection(state) {
  state.selection = [];
}

export function resetUserForm(state) {
  state.userForm = {
    email1: "",
    email2: "",
    id: "",
    name: "",
    phone: "",
    role: "",
  };
}

export function setQuantityInSelection(state, number) {
  state.quantityInSelection = number;
}

export function setTitle(state, title) {
  state.title = title;
}

export function setUserForm(state, user) {
  const { email, id, name, phone, role } = user;
  state.userForm = {
    email1: email,
    email2: email,
    id,
    name,
    phone,
    role,
  };
}

export function toggleFormUserOpen(state) {
  state.isFormUserOpen = !state.isFormUserOpen;
}

export function updateUser(state, user) {
  const idx = state.users.map((e) => e.id).indexOf(user.id);

  state.users[idx] = user;
}

//twoWay

export function twoWaySelection(state, selected) {
  state.selection = [...selected];
}

export function twoWayUserForm(state, args) {
  const { key, value } = args;

  switch (key) {
    case "email1":
      state.userForm.email1 = value;
      break;
    case "email2":
      state.userForm.email2 = value;
      break;
    case "name":
      state.userForm.name = value;
      break;
    case "phone":
      state.userForm.phone = value;
      break;
    case "role":
      state.userForm.role = value;
      break;
  }
}
