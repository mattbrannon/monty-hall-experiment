import styled from 'styled-components/macro';
import { useScore } from '../hooks/useScore';

/**
 * There is a bug that causes the values of the `score` object to increment by 2 for every round of game play
 * Even stranger is that this only occurs when running the development server.
 * When running the app through the node/express server, the values are counted normally.
 */


export default function Scoreboard({ playerWins }) {
  const score = useScore(playerWins);

  return (
    <Container className="container">
      <Wrapper className="wrapper">
        <Box id="won" className="box">
          <Strong>Win</Strong>
          <Wins className="content">{score.wins}</Wins>
        </Box>
        <Box id="total" className="box">
          <Strong>Total</Strong>
          <Content className="content">{score.total}</Content>
        </Box>
        <Box id="lost" className="box">
          <Strong>Lose</Strong>
          <Loss className="content">{score.losses}</Loss>
        </Box>
      </Wrapper>
    </Container>
  );
}

const Container = styled.section`
  padding-top: clamp(0px, 17vh, 144px);
  /* padding-top: clamp(128px, 10vh, 164px); */
  /* padding-top: clamp(128px, 1vh, 1000px); */
`;

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
`;

const Box = styled.div`
  min-height: 50px;
  min-width: 40px;
  display: grid;
  place-items: center;
  font-family: system-ui;
  font-size: 0.975;
  position: relative;
  color: #191919;
`;

const Content = styled.div`
  position: absolute;
  font-weight: 700;
  font-size: ${21 / 16}rem;
`;

const Wins = styled(Content)`
  color: green;
`;

const Loss = styled(Content)`
  color: firebrick;
`;

const Strong = styled.strong`
  transform: translate(0, -28px);
  font-size: 1rem;
  color: #191919;
  border-bottom: 1px solid black;
`;

