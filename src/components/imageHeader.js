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
    if (this.props.image.name !== nextProps.image.name) {
      this.setState({ editable: false, name: nextProps.image.name });
    }
  }
  render() {
    const { image, editImage, deleteImage, setSelectedPoint } = this.props;
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
        {/* <button
          className="simpleButton"
          style={style.cancelButton}
          onClick={event => {
            console.log(22);
            event.stopPropagation();
            this.setState({ editable: false });
            setSelectedPoint(null);
          }}
        >
          Cancel
        </button> */}
      </div>
    ) : (
      <div style={style.main}>
        <span style={style.name}>{name || 'No Name'}</span>
        <button
          className="simpleButton"
          style={style.editButton}
          onClick={event => {
            event.stopPropagation();
            this.setState({ editable: true });
            setSelectedPoint(null);
          }}
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
