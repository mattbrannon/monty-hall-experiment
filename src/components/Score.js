import styled from 'styled-components/macro';

export default function Scoreboard() {
  return (
    <Container className="container">
      <Wrapper className="wrapper">
        <Box id="won" className="box">
          <Strong>Win</Strong>
          <Content className="content">0</Content>
        </Box>
        <Total id="total" className="box">
          <Strong>Total</Strong>
          <Content className="content">0</Content>
        </Total>
        <Box id="lost" className="box">
          <Strong>Lose</Strong>
          <Content className="content">0</Content>
        </Box>
      </Wrapper>
    </Container>
  );
}

const Container = styled.section`
  padding-top: 4rem;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const Box = styled.div`
  min-height: 50px;
  min-width: 40px;
  /* box-shadow: 0 0 0 1px #191919; */
  /* outline: 1px dashed black; */
  display: grid;
  place-items: center;
  font-family: system-ui;
  font-size: 0.975;
  position: relative;
  /* background: hsl(0deg, 0%, 92%); */
  color: #191919;
  /* border-bottom: 1px solid black; */
`;

const Content = styled.div`
  position: absolute;
`;

const Strong = styled.strong`
  transform: translate(0, -28px);
  font-size: 1rem;
  color: #191919;
  border-bottom: 1px solid black;
`;

const Total = styled(Box)`
  /* margin-top: -80px;
  margin-bottom: 80px; */
`;

// .wrapper div {
//   flex: 1;
// }
