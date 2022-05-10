import React from 'react';

import 'antd/dist/antd.css';
import lake from '../../assets/img/lake.jpg';
import swiss from '../../assets/img/swiss.jpg';
import volcano from '../../assets/img/volcano.jpg';

import { Carousel } from 'antd';

const contentStyle = {
  marginLeft: '28%',
  marginTop: '50px',
};

export const Slider = () => (
  <Carousel autoplay>
    <div>
      <img style={contentStyle} src={lake} alt="" />
    </div>
    <div>
      <img style={contentStyle} src={swiss} alt="" />
    </div>
    <div>
      <img style={contentStyle} src={volcano} alt="" />
    </div>
  </Carousel>
);
