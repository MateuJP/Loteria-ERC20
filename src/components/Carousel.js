import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Cronometro from './Cronometro';
import Bote from './Bote';
import Ganador from './Ganador';
import '../css/carousel.css'


class MyCarousel extends Component {
  render() {
    return (
      <div className="carousel-container">
        <Carousel>
   
          <Carousel.Item>
             <div className='cronometro-container'>
              <Bote/>
             </div>
          </Carousel.Item>
          
          <Carousel.Item>
            <div className="cronometro-container">
              <Cronometro />
            </div>
          </Carousel.Item>
          <Carousel.Item>
             <div className='cronometro-container'>
              <Ganador/>
             </div>
          </Carousel.Item>
          
        </Carousel>
      </div>
    );
  }
}

export default MyCarousel;
