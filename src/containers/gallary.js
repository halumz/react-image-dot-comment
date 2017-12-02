import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImagePicker from '../components/imagePicker';
import SingleImage from '../components/singleImage';
import actions from '../redux/actions';
import styles from '../styles';

const { addImage, changSelectedeImage, setSelectedPoint } = actions;
const style = styles.Gallary;

class Gallary extends Component {
  handleSubmit = event => {
    event.preventDefault();
  };

  handleImageChange = event => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      if (reader.result) {
        this.props.addImage(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };
  render() {
    const { images, changSelectedeImage, setSelectedPoint } = this.props;
    return (
      <div
        style={style.main}
        onClick={() => {
          setSelectedPoint(null);
        }}
      >
        <ImagePicker addImage={this.props.addImage} />
        <div style={style.images}>
          {images.map(image => (
            <SingleImage
              key={image.id}
              image={image}
              changSelectedeImage={changSelectedeImage}
            />
          ))}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const images = state.reducers.images;
  return { images };
}
export default connect(mapStateToProps, {
  addImage,
  changSelectedeImage,
  setSelectedPoint
})(Gallary);
