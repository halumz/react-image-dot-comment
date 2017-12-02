import React from 'react';

const style = {
  width: '100%',
  height: '500px',
  color: 'white',
  marginTop: '20px',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2em'
};
export default ({ text }) => <div style={style}>{text}</div>;
