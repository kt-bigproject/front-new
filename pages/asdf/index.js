import React from 'react';
import CylindricalCarousel from '../../src/components/Carousel/CylindricalCarousel';
const MainPage = () => {
  const items = [
    {
      content: 'Content 1',
      style: {
        backgroundColor: 'red',
        color: 'white',
        fontWeight: 'bold',
      },
    },
    {
      content: 'Content 2',
      style: {
        backgroundColor: 'blue',
        color: 'white',
        fontWeight: 'bold',
      },
    },
    {
      content: 'Content 3',
      style: {
        backgroundColor: 'green',
        color: 'white',
        fontWeight: 'bold',
      },
    },
    {
      content: 'Content 4',
      style: {
        backgroundColor: 'purple',
        color: 'white',
        fontWeight: 'bold',
      },
    },
  ];

  return (
    <div>
      <h1>Cylindrical Carousel Example with Divs</h1>
      <CylindricalCarousel items={items} />
    </div>
  );
};

export default MainPage;
