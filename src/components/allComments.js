import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlankCenterDiv from './blankCenterDiv';
import actions from '../redux/actions';
import { timeDifference } from '../utility';
import styles from '../styles';

const { setSelectedPoint } = actions;
const style = styles.AllComments;

class AllComments extends Component {
  render() {
    const {
      dimensions,
      selectedPoint,
      showAllComments,
      comments,
      setSelectedPoint
    } = this.props;
    const commentComponent = comment => (
      <div
        key={comment.id}
        style={
          comment.pointId === selectedPoint ? (
            style.selecteCommentComponent
          ) : (
            style.commentComponent
          )
        }
        onClick={event => {
          event.stopPropagation();
          setSelectedPoint(comment.pointId);
        }}
      >
        <div style={style.commentBody}>
          <span style={style.commentUser}>{comment.user}</span>
          <span style={style.commentTime}>{timeDifference(comment.time)}</span>
        </div>
        <span>{comment.comment}</span>
      </div>
    );
    const bodyStyle = showAllComments ? style.main : style.mainHidden;
    return (
      <div style={{ ...bodyStyle, minHeight: dimensions.height }}>
        <span style={style.header}>All Comments</span>
        {comments.length === 0 ? (
          <BlankCenterDiv text="No Comments" />
        ) : (
          comments.map(commentComponent)
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    dimensions,
    selectedImage,
    selectedPoint,
    comments,
    showAllComments
  } = state.reducers;
  const { id } = selectedImage;
  return {
    dimensions,
    selectedImage,
    selectedPoint,
    showAllComments,
    comments: comments[id]
  };
}
export default connect(mapStateToProps, { setSelectedPoint })(AllComments);
