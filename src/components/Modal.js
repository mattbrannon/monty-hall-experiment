import { useState } from 'react';
import styled from 'styled-components/macro';

export default function Modal({ showModal }) {
  const [isOpen, setIsOpen] = useState(showModal);

  const handleButtonClick = () => {
    document.cookie = Date.now().toString();
    document.querySelector('html').style.setProperty('--overflow', 'auto');
    setIsOpen(false);
  };

  const style = {
    '--zIndex': isOpen ? 5 : -5,
    '--modalWrapperBg': isOpen ? '#333' : 'transparent',
    '--modalContentBg': isOpen ? 'lightgoldenrodyellow' : 'transparent',
    '--scale': isOpen ? 1 : -1,
    '--opacity': isOpen ? '100%' : '0%',
  };

  return (
    <FixedWrapper style={style}>
      <ModalWrapper style={style}>
        <ModalContent style={style}>
          <h3>Rules of the game:</h3>
          <P>
            When the game starts, you will be shown 3 doors. Behind one of the
            doors is a brand new car. Behind the other two doors are goats. Once
            you have selected a door, Monty will reveal what's behind one of the
            other two doors. You will then have the option to switch doors or
            keep the door you've already chosen. Good luck!
          </P>
          <Button onClick={handleButtonClick}>Let's Play!</Button>
        </ModalContent>
      </ModalWrapper>
    </FixedWrapper>
  );
}

const FixedWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--zIndex);
  opacity: var(--opacity);

  transition: all 1s ease-out;

  display: grid;
  place-items: center;
`;

const ModalWrapper = styled.div`
  position: relative;
  width: inherit;
  height: inherit;

  background: var(--modalWrapperBg);
  opacity: var(--opacity);

  margin: 0 auto;
  overflow: auto;

  transition: all 1s ease-out;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 50%;
  height: 50%;

  min-height: 400px;
  min-width: 400px;

  background: var(--modalContentBg);
  transform: translate(50%, 50%);
  opacity: var(--opacity);

  padding: 32px;
  line-height: 1.6;
  font-size: 1.1rem;
  font-family: system-ui;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  transition: all 1s ease-out;
`;

const Button = styled.button`
  padding: 16px 32px;
  font-size: 1.5rem;
  font-family: system-ui;
  font-weight: 800;
  text-shadow: 1px 1px 2px black;

  background: var(--primaryBg);
  color: white;
  width: fit-content;

  letter-spacing: 0.02em;

  border-radius: 6px;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const P = styled.p`
  font-weight: 600;
`;
