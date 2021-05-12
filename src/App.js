import Button, { InvertedButton } from './components/Button';
import Door from './components/Door';
import Scoreboard from './components/Score';
import styled from 'styled-components/macro';
import {
  createDoors,
  getFirstGoat,
  getLastGoat,
  getOnlyGoat,
  getFinalDoor,
  random,
} from './utils';

function App() {
  return (
    <>
      <MaxWidthWrapper>
        <Scoreboard />
        <DoorSection>
          <Door>1</Door>
          <Door>2</Door>
          <Door>3</Door>
        </DoorSection>
        <ButtonSection>
          <Button>Stay</Button>
          <InvertedButton>Start Game</InvertedButton>
          <Button>Switch</Button>
        </ButtonSection>
      </MaxWidthWrapper>
    </>
  );
}

export default App;

const DoorSection = styled.section`
  display: flex;
  gap: 1rem;
`;

const ButtonSection = styled.section`
  display: flex;
  gap: 2rem;
  padding-top: 1rem;
`;

const MaxWidthWrapper = styled.div`
  max-width: 520px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
