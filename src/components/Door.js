import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import goat from '../assets/goat.webp';
import car from '../assets/car.webp';

export default function FancyDoor({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const prize = props.door === 'goat' ? goat : car;
  let PrizeComponent;
  if (prize === goat) {
    PrizeComponent = Prize;
  } else {
    PrizeComponent = CarPrize;
  }

  useEffect(() => {
    const {
      index,
      hostChoice,
      playerChoiceIndex,
      round1,
      finalPrize,
      finalPrizeIndex,
      reset,
    } = props;

    const openDoor = (bool) => {
      setIsSelected(bool);
      setIsOpen(bool);
    };

    if (index === hostChoice && hostChoice !== null) {
      setIsOpen(true);
    }

    const selected = index === playerChoiceIndex;
    setIsSelected(selected);

    if (finalPrize) {
      index === finalPrizeIndex ? openDoor(true) : openDoor(false);
    }

    if (round1) {
      openDoor(false);
    }

    if (reset) {
      setIsOpen(false);
    }
  }, [isOpen, props]);

  return (
    <DoorWrapper>
      <GreyBackground>
        <PrizeComponent>{prize}</PrizeComponent>
        <Door {...props} isSelected={isSelected} isOpen={isOpen}>
          <DoorNumber>{children}</DoorNumber>
        </Door>
      </GreyBackground>
    </DoorWrapper>
  );
}

const Prize = ({ children }) => {
  const width = children === goat ? 150 : 200;
  const height = width === 150 ? 170 : 200;
  return (
    <PrizeWrapper>
      <img
        src={children}
        width={width}
        height={height}
        alt={children === goat ? 'goat' : 'car'}
      />
    </PrizeWrapper>
  );
};

const CarPrize = () => {
  return (
    <CarWrapper>
      <img src={car} alt="a shiny red car" width={200} height={200} />
    </CarWrapper>
  );
};

const DoorWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  isolation: isolate;
`;

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

const PrizeWrapper = styled.div`
  position: absolute;
  top: 130px;
  left: 50px;
`;

const CarWrapper = styled(PrizeWrapper)`
  top: 130px;
  left: 0;
`;

const GreyBackground = styled.div`
  background-color: #333;
  position: absolute;
  width: inherit;
  height: inherit;
`;

// const GreyBackground = styled

const Door = styled.div`
  background: ${(p) => (p.isSelected ? ' hsl(30, 70%, 40%)' : '#654321')};
  position: absolute;
  top: 0px;
  left: 0px;
  width: 200px;
  height: 300px;
  outline: 2px solid hsl(30, 44%, 14%);
  box-shadow: ${(p) => (p.isSelected ? null : 'inset 0 0 3px 6px #543210')};

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
