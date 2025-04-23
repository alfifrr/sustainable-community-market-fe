import React, { FC } from "react";
import { SectionContainer } from "./SectionContainer";
import Navbar from "./Navbar";

const HeroSection: FC = () => {
  return (
    <>
      <SectionContainer>
        <Navbar />
        Hero Section
      </SectionContainer>
    </>
  );
};

export default HeroSection;
