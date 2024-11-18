import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// 디테일 페이지에서 쓸 예정!!!!
const SliderContainer = styled.div`
  width: 600px;
  margin: 0 auto; // 가운데 정렬

  .slick-prev::before,
  .slick-next::before {
    color: #ccc;
  }
`;

const SliderItem = styled.div`
  display: flex;
  justify-content: center; // 이미지가 가로로 길어지지 않도록 정렬
  align-items: center; // 수직 정렬
`;

const Image = styled.div`
  width: 100%; // 이미지가 들어갈 컨테이너의 너비

  overflow: hidden; // 이미지가 컨테이너 밖으로 넘치지 않게 설정
`;

const Img = styled.img`
  width: 100%; // 이미지 너비를 부모에 맞게 조정
  height: 300px; // 이미지 높이를 부모에 맞게 조정
  object-fit: cover; // 이미지 비율을 유지하면서 크기에 맞게 잘라냄
`;

function SimpleSlider({ images }) {
  const settings = {
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    centerPadding: "10px",
  };

  return (
    <SliderContainer className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <SliderItem key={index}>
            <Image>
              <Img src={image.image_url} alt={`image-${index}`} />
            </Image>
          </SliderItem>
        ))}
      </Slider>
    </SliderContainer>
  );
}

export default SimpleSlider;
