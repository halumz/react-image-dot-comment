const actions = {
  ADD_IMAGE: 'ADD_IMAGE',
  CHANGE_SELECTED_IMAGE: 'CHANGE_SELECTED_IMAGE',
  EDIT_IMAGE: 'EDIT_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
  TOGGLE_OPTIONS: 'TOGGLE_OPTIONS',
  SET_DIMENSION: 'SET_DIMENSION',
  SET_NEW_POINT: 'SET_NEW_POINT',
  SET_SELECTED_POINT: 'SET_SELECTED_POINT',
  SET_COMMENTS: 'SET_COMMENTS',
  addImage: file => {
    return (dispatch, getState) => {
      dispatch({
        type: actions.ADD_IMAGE,
        newImage: {
          id: new Date().getTime(),
          file
        }
      });
    };
  },
  changSelectedeImage: id => ({
    type: actions.CHANGE_SELECTED_IMAGE,
    id
  }),
  editImage: image => ({
    type: actions.EDIT_IMAGE,
    image
  }),
  deleteImage: image => ({
    type: actions.DELETE_IMAGE,
    image
  }),
  toggleOptions: (key, value) => ({
    type: actions.TOGGLE_OPTIONS,
    key,
    value
  }),
  setDimensions: dimensions => ({
    type: actions.SET_DIMENSION,
    dimensions
  }),
  setNewPoint: newPoint => ({
    type: actions.SET_NEW_POINT,
    newPoint
  }),
  setSelectedPoint: selectedPoint => ({
    type: actions.SET_SELECTED_POINT,
    selectedPoint
  }),
  setComments: (selectedImage, points, comments, newPoint) => ({
    type: actions.SET_COMMENTS,
    selectedImage,
    points,
    comments,
    newPoint
  })
};
export default actions;
