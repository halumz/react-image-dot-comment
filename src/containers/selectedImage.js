import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlankCenterDiv from '../components/blankCenterDiv';
import ImageHeader from '../components/imageHeader';
import ImagePreview from '../components/imagePreview';
import AllComments from '../components/allComments';
import actions from '../redux/actions';
import styles from '../styles';

const {
  setDimensions,
  editImage,
  deleteImage,
  setNewPoint,
  setSelectedPoint,
  toggleOptions
} = actions;
const style = styles.SelectedImage;

class SelectedImage extends Component {
  render() {
    const {
      dimensions,
      selectedImage,
      notSelected,
      points,
      selectedPoint,
      newPoint,
      showPoints,
      showAllComments,
      setDimensions,
      editImage,
      deleteImage,
      setNewPoint,
      setSelectedPoint,
      toggleOptions
    } = this.props;
    if (notSelected) {
      return <BlankCenterDiv text={notSelected} />;
    }
    const imagePreViewProps = {
      dimensions,
      selectedImage,
      points,
      selectedPoint,
      newPoint,
      showPoints,
      setDimensions,
      setNewPoint,
      setSelectedPoint
    };
    const paddingLeft = `${Math.round(
      (window.innerWidth - dimensions.width) / 2
    )}px`;
    console.log(paddingLeft);
    return (
      <div
        style={style.main}
        onClick={event => {
          event.stopPropagation();
          setSelectedPoint(null);
        }}
      >
        <div style={style.imageBody}>
          <ImageHeader
            image={selectedImage}
            editImage={editImage}
            deleteImage={deleteImage}
            setSelectedPoint={setSelectedPoint}
          />
          <div style={style.settingsWrapper}>
            <button
              className="simpleButton"
              onClick={() => {
                toggleOptions('showPoints', !showPoints);
              }}
            >
              {showPoints ? 'Hide Points' : 'Show Points'}
            </button>
            <button
              className="simpleButton"
              onClick={() => {
                toggleOptions('showAllComments', !showAllComments);
              }}
            >
              {showAllComments ? 'Hide Comments' : 'Show Comments'}
            </button>
          </div>
          <div
            style={{
              height: dimensions.height,
              ...style.imageWrapper,
              paddingLeft
            }}
          >
            <ImagePreview {...imagePreViewProps} />
          </div>
        </div>
        <AllComments />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    dimensions,
    images,
    selectedImage,
    points,
    selectedPoint,
    newPoint,
    showPoints,
    showAllComments
  } = state.reducers;
  if (images.length === 0) {
    return {
      notSelected: 'Please  upload a new Image'
    };
  }
  if (!selectedImage) {
    return {
      notSelected: 'Please Select a Picture or upload a new Image'
    };
  }
  const { id } = selectedImage;
  return {
    dimensions,
    selectedImage,
    points: points[id],
    selectedPoint,
    newPoint,
    showPoints,
    showAllComments
  };
}
export default connect(mapStateToProps, {
  setDimensions,
  editImage,
  deleteImage,
  setNewPoint,
  setSelectedPoint,
  toggleOptions
})(SelectedImage);
