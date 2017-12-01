import actions from './actions';
import { setLocalData, getLocalData } from '../utility';

const initState = getLocalData();
export default function todoReducer(state = initState, action) {
  switch (action.type) {
    case actions.ADD_IMAGE: {
      const { points, comments } = state;
      points[action.newImage.id] = [];
      comments[action.newImage.id] = [];
      const newState = {
        ...state,
        images: [action.newImage, ...state.images],
        points,
        comments,
        selectedImage: action.newImage,
        newPoint: null,
        selectedPoint: null
      };
      const error = setLocalData(newState);
      if (error) {
        alert(error);
        return state;
      }
      return newState;
    }
    case actions.CHANGE_SELECTED_IMAGE: {
      const newState = {
        ...state,
        selectedImage: action.id,
        newPoint: null,
        selectedPoint: null
      };
      setLocalData(newState);
      return newState;
    }
    case actions.EDIT_IMAGE: {
      const newImages = [];
      state.images.forEach(image => {
        if (image.id === action.image.id) {
          newImages.push(action.image);
        } else {
          newImages.push(image);
        }
      });
      const newState = {
        ...state,
        images: newImages
      };
      setLocalData(newState);
      return newState;
    }
    case actions.DELETE_IMAGE: {
      const newImages = [];
      state.images.forEach(image => {
        if (image.id !== action.image.id) {
          newImages.push(image);
        }
      });
      const { points, comments } = state;
      points[action.image.id] = [];
      comments[action.image.id] = [];
      const newState = {
        ...state,
        images: newImages,
        points,
        comments,
        selectedImage: ''
      };
      setLocalData(newState);
      return newState;
    }
    case actions.TOGGLE_OPTIONS: {
      return {
        ...state,
        [action.key]: action.value
      };
    }
    case actions.SET_DIMENSION: {
      return { ...state, dimensions: action.dimensions };
    }
    case actions.SET_NEW_POINT: {
      return {
        ...state,
        newPoint: action.newPoint,
        selectedPoint: action.newPoint
      };
    }
    case actions.SET_SELECTED_POINT: {
      return {
        ...state,
        selectedPoint: action.selectedPoint,
        newPoint: null
      };
    }
    case actions.SET_COMMENTS: {
      const id = action.selectedImage.id;
      const { points, comments } = state;
      points[id] = action.points;
      comments[id] = action.comments;
      const newState = {
        ...state,
        points,
        comments,
        newPoint: action.newPoint
      };
      setLocalData(newState);
      return newState;
    }
    default:
      return state;
  }
}
