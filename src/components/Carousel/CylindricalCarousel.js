import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
const CarouselWrapper = styled.div`
  perspective: 1200px;
`;

const CarouselInner = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  position: relative;
  transform-style: preserve-3d;
`;

const CarouselItem = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s all;
`;

const CylindricalCarousel = ({ items }) => {
  const carouselInnerRef = useRef(null);
  const angleDegree = 240 / items.length;

  useEffect(() => {
    setItemPositions();
  }, []);

  const setItemPositions = () => {
    const carousel = carouselInnerRef.current;
    const halfCylinderLength = 50;
    const radialDistance = (halfCylinderLength) / 10;

    items.forEach((item, index) => {
      const angle = angleDegree * index;
      const transformValue = `rotateY(${angle}deg) translateZ(${radialDistance}px)`;
      carousel.children[index].style.transform = transformValue;
      carousel.children[index].style.fontSize = '20px';
    });
  };

  return (
    <CarouselWrapper>
      <CarouselInner ref={carouselInnerRef}>
        {items.map((item, index) => (
          <CarouselItem key={index} style={item.style}>
            {item.content}
          </CarouselItem>
        ))}
      </CarouselInner>
    </CarouselWrapper>
  );
};

export default CylindricalCarousel;
