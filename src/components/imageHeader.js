import React, { Component } from 'react';
import InputSearch from './inputSearch';
import styles from '../styles';

const style = styles.ImageHeader;

export default class extends Component {
  state = {
    editable: false,
    name: this.props.image.name
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ editable: false, name: nextProps.image.name });
  }
  render() {
    const { image, editImage, deleteImage } = this.props;
    const { name } = this.state;
    return this.state.editable ? (
      <div style={style.main}>
        <InputSearch
          defaultValue={name || ''}
          placeholder="Select Name"
          onSearch={name => {
            editImage({ ...image, name });
            this.setState({ editable: false, name });
          }}
          autoFocus
        />
        <button
          className="simpleButton"
          onClick={() => this.setState({ editable: false })}
        >
          Cancel
        </button>
      </div>
    ) : (
      <div style={style.main}>
        <span style={style.name}>{name || 'No Name'}</span>
        <button
          className="simpleButton"
          style={style.editButton}
          onClick={() => this.setState({ editable: true })}
        >
          Edit
        </button>
        <button
          className="simpleButton"
          style={style.deleteButton}
          onClick={() => deleteImage(image)}
        >
          Delete
        </button>
      </div>
    );
  }
}
