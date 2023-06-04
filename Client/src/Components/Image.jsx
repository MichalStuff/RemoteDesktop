import React from "react";
import styled from "styled-components";

const StyedImg = styled.img`
  max-width: 100%;
  height: auto;
`;

const Image = ({ src, alt }) => {
  return (
    <>
      <StyedImg src={src} alt={alt} />
    </>
  );
};

export default Image;
