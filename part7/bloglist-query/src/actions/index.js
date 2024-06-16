import login from "../services/login";

export const createErrorMsg = (message) => {
  return {
    type: "NOTIFY",
    payload: {
      message,
      type: "error",
    },
  };
};
export const createSuccessMsg = (message) => {
  return {
    type: "NOTIFY",
    payload: {
      message,
      type: "success",
    },
  };
};

export const userLogIn = (user) => {
  return {
    type: "LOGIN",
    payload: user,
  };
};
export const userLogOut = async () => {

  return {
    type: "LOGOUT",
    payload: null,
  };
};
