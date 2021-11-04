import { useState } from 'react';
import styled from 'styled-components/macro';
import Button from './Button';

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
    '--opacity': isOpen ? '1' : '0',
  };

  return (
    <FixedWrapper style={style}>
      <ModalWrapper>
        <ModalContent>
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

export const ModalWrapper = styled.div`
  position: relative;
  width: inherit;
  height: inherit;

  background: var(--modalWrapperBg);
  opacity: var(--opacity);

  overflow: auto;
  padding: 32px;

  transition: all 1s ease-out;

  display: grid;
  place-items: center;
`;

const ModalContent = styled.div`
  background: var(--modalContentBg);
  opacity: var(--opacity);

  min-height: 400px;
  max-width: 500px;
  margin: 0 auto;

  padding: 32px;
  line-height: 1.6;
  font-size: 1.1rem;
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  align-items: center;

  transition: all 1s ease-out;
`;

const P = styled.p`
  font-weight: 600;
`;
