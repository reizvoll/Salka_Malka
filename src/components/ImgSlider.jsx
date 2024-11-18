import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// 디테일 페이지에서 쓸 예정!!!!
const SliderContainer = styled.div`
  width: 85%;
  border-radius: 10px;
  margin: 0 auto;

  .slick-prev::before,
  .slick-next::before {
    color: #505050;
  }

  .slick-list {
    width: 100%;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

const Img = styled.img`
  height: 300px; // 이미지 높이를 부모에 맞게 조정
  object-fit: cover; // 이미지 비율을 유지하면서 크기에 맞게 잘라냄
`;

const SimpleSlider = ({ images }) => {
  const settings = {
    dots: images.length > 1,
    infinite: images.length > 1,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <SliderContainer className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Img src={image.image_url} alt={`image-${index}`} />
          </div>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default SimpleSlider;
