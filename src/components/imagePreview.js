import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import Measure from 'react-measure';
import Point from './point';
import { setPoint } from '../utility';
import styles from '../styles';

const style = styles.ImagePreview;

export default class extends Component {
  setComment = event => {
    event.stopPropagation();
    const { dimensions, setNewPoint } = this.props;
    const newPoint = setPoint(dimensions, this.currentPosition);
    if (newPoint) {
      setNewPoint(newPoint);
    }
  };
  render() {
    const {
      dimensions,
      selectedImage,
      points,
      selectedPoint,
      showPoints,
      newPoint,
      setDimensions,
      setSelectedPoint
    } = this.props;

    return (
      <div style={style.main}>
        <Measure bounds onResize={measure => setDimensions(measure.bounds)}>
          {({ measureRef }) => (
            <div>
              <ReactCursorPosition
                onPositionChanged={currentPosition =>
                  (this.currentPosition = currentPosition)}
              >
                <div onClick={this.setComment}>
                  <div style={style.commentDiv}>
                    <img
                      style={style.mainImage}
                      alt="#"
                      ref={measureRef}
                      src={selectedImage.file}
                    />
                  </div>
                  <div style={style.commentDiv}>
                    {points.map(point => (
                      <Point
                        id={point}
                        key={point}
                        dimensions={dimensions}
                        showPoints={showPoints}
                        selectedPoint={selectedPoint}
                        setSelectedPoint={setSelectedPoint}
                      />
                    ))}
                    {newPoint ? (
                      <Point
                        id={newPoint}
                        key={newPoint}
                        dimensions={dimensions}
                        showPoints={showPoints}
                        newPoint
                        selectedPoint={selectedPoint}
                        setSelectedPoint={setSelectedPoint}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </ReactCursorPosition>
            </div>
          )}
        </Measure>
      </div>
    );
  }
}
