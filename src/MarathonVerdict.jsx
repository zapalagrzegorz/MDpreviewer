
import React from 'react';

export default function BoilingVerdict(props) {
    if (props.length >= 100) {
      return <p>Trasa przekracza maraton</p>;
    }
    return <p>Trasa nie przekracza maratonu</p>;
  }
  
  