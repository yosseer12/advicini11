import React from 'react';

function CommentButton({ onClick }) {
  return (
    <button onClick={onClick}>
      Commenter
    </button>
  );
}

export default CommentButton;
