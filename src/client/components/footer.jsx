import React from 'react';

export default props => {
  const style = {
    color: '#555555',
    fontSize: '10px',
    fontWeight: 'bold',
    lineHeight: '3px'
  };

  return (
    <div id="foot" className="container center" style={style}>
      <p>Sean R.</p>
      <p>All rights reserved to author</p>
      <p>©Copyright 2016</p>
    </div>
  );
};
