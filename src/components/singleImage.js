import React, { Component } from 'react';
import styles from '../styles';

const style = styles.SingleImage;

export default class extends Component {
  render() {
    const { image, changSelectedeImage } = this.props;
    return (
      <button
        type="button"
        style={style.button}
        onClick={event => {
          event.preventDefault();
          changSelectedeImage(image);
        }}
      >
        <img alt="#" style={style.image} src={image.file} />
        <span style={style.name}>{image.name || 'No Name'}</span>
      </button>
    );
  }
}
