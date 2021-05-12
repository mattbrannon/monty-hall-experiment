import { useState } from 'react';
import styled from 'styled-components/macro';

export default function FancyDoor({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DoorWrapper>
      <Door isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <DoorNumber>{children}</DoorNumber>
      </Door>
    </DoorWrapper>
  );
}

const DoorNumber = styled.div`
  position: absolute;
  color: gold;
  font-size: 64px;
  text-shadow: 0 0 5px black;
  display: grid;
  place-items: center;
  width: 100%;
  height: 50%;
  font-weight: 700;
`;

const DoorWrapper = styled.div`
  background-color: #333;
  position: relative;
  width: 200px;
  height: 300px;
`;

const Door = styled.div`
  background: #654321;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 200px;
  height: 300px;
  box-shadow: 0 0 0 2px black;

  transform-origin: left;

  transition: all 0.5s ease-in-out;

  /* https://codepen.io/am_eu/pen/EgZdaQ */
  transform: ${(p) =>
    p.isOpen
      ? ` perspective(1200px) translateZ(0px) translateX(0px)
    translateY(0px) rotateY(-105deg)`
      : `perspective(0px) translateZ(0px) translateX(0px)
    translateY(0px) rotateY(0px)`};
`;
