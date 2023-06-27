import React, { useEffect, useRef } from 'react';
// import { annotation } from 'rough-notation';

export default function Annotation({text, type}) {
  const elementRef = useRef();

  useEffect(() => {
    if (elementRef.current) {
      const annotation = annotate(elementRef.current, {
        type, 
        color: 'red', 
        // fillStyle: 'solid', 
        // fillColor: 'transparent' 
      });
      annotation.show();
    }
  }, []);

  return <h1 ref={elementRef}>{text}</h1>;
};