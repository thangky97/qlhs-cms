export const getLanguage = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_LANGUAGE",
      data,
    });
  };
};
