export const showDialogAddMovie = show => {
  return {
    type: 'SHOW_DIALOG_ADD_MOVIE',
    show
  };
};

export const updateAutoComplete = data => {
  return {
    type: 'UPDATE_AUTO_COMPLETE_DIALOG_ADD_MOVIE',
    data
  }
};