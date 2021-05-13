import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

export default function FancyDoor({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const {
      index,
      hostChoice,
      playerChoiceIndex,
      count,
      isEndGame,
      finalPrize,
      finalPrizeIndex,
    } = props;

    if (index === hostChoice && hostChoice !== null) {
      setIsOpen(true);
    }

    if (index === playerChoiceIndex && count < 2) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }

    if (finalPrize) {
      if (index === finalPrizeIndex) {
        setIsSelected(true);
        setIsOpen(true);
      } else {
        setIsSelected(false);
        setIsOpen(false);
      }
    }

    if (isEndGame) {
      setIsOpen(false);
      setIsSelected(false);
    }
  }, [isOpen, props]);

  return (
    <DoorWrapper>
      <Door {...props} isSelected={isSelected} isOpen={isOpen}>
        <DoorNumber>{children}</DoorNumber>
        {props.door}
      </Door>
    </DoorWrapper>
  );
}

const DoorNumber = styled.div`
  position: absolute;
  color: gold;
  font-size: ${64 / 16}rem;
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

// const doorOpen = styled

const Door = styled.div`
  background: ${(p) =>
    p.isSelected ? ' hsl(30, 70%, 40%)' : '#654321'};
  position: absolute;
  top: 0px;
  left: 0px;
  width: 200px;
  height: 300px;
  outline: 2px solid hsl(30, 44%, 14%);
  box-shadow: ${(p) =>
    p.isSelected ? null : 'inset 0 0 3px 6px #543210'};

  transform-origin: left;

  transition: transform 0.5s ease-in-out;

  /* https://codepen.io/am_eu/pen/EgZdaQ */
  transform: ${(p) =>
    p.isOpen
      ? ` perspective(1200px) translateZ(0px) translateX(0px)
    translateY(0px) rotateY(-105deg)`
      : `perspective(0px) translateZ(0px) translateX(0px)
    translateY(0px) rotateY(0px)`};
`;
