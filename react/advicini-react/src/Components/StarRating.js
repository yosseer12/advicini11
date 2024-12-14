import React, { useState } from 'react';

function StarRating({ planId }) {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    // Logique pour envoyer la note au backend
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map(value => (
        <span key={value} onClick={() => handleRating(value)}>
          {value <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default StarRating;
