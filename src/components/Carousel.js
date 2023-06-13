import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Cronometro from './Cronometro';
import '../css/carousel.css'
import img1 from '../img/1.png';
import img2 from '../img/2.png';
import img3 from '../img/3.png';

class MyCarousel extends Component {
  render() {
    return (
      <div className="carousel-container">
        <Carousel>
        <Carousel.Item>
                    <a href='https://blockstellart.com'>
                        <img
                            className="d-block img-fluid"
                            src={img1}
                            alt=''
                        />
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href='https://blockstellart.com'>
                        <img
                            className="d-block img-fluid"
                            src={img2}
                            alt=''
                        />
                    </a>
                </Carousel.Item>
                <Carousel.Item>
                    <a href='https://blockstellart.com'>
                        <img
                            className="d-block img-fluid"
                            src={img3}
                            alt=''
                        />
                    </a>
                </Carousel.Item>
          
          <Carousel.Item>
            <div className="cronometro-container">
              <Cronometro />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default MyCarousel;
