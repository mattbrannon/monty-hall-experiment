import styled from 'styled-components/macro';

export default function Button({ children, ...props }) {
  return (
    <>
      <Wrapper {...props}>
        <InnerButton {...props}>{children}</InnerButton>
      </Wrapper>
    </>
  );
}

export function StartButton({ children, ...props }) {
  return (
    <InvertedWrapper {...props}>
      <InvertedInnerButton {...props}>{children}</InvertedInnerButton>
    </InvertedWrapper>
  );
}

export function PlayAgainButton({ children, ...props }) {
  return (
    <InvertedWrapper {...props}>
      <InvertedInnerButton>{children}</InvertedInnerButton>
    </InvertedWrapper>
  );
}

// outer_radius = inner_radius + gap_between_elements / 2;
const Wrapper = styled.button`
  padding: 3px 3px;
  border-radius: 10px; //calc((8px + 12px) / 2);
  border: none;
  min-width: 140px;

  font-family: system-ui;
  color: white;
  background: transparent;
  outline: none;
  text-shadow: 1px 1px 2px black;

  &:focus,
  &:active {
    box-shadow: 0 0 0 1px var(--buttonBg);
    background: var(--primaryBgFocus);
  }
  &:hover {
    cursor: pointer;
  }
`;

const InnerButton = styled.span`
  display: block;
  padding: 12px 24px;
  font-size: ${21 / 16}rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 0 1px var(--pinkShadow);
  background: var(--buttonBg);

  &:hover {
    background: var(--buttonBgHover);
  }
  &:focus,
  &:active {
    background: var(--buttonBgFocus);
  }
`;

const InvertedWrapper = styled(Wrapper)`
  &:focus,
  &:active {
    box-shadow: 0 0 0 1px var(--tealShadow);
    background: var(--primaryBg);
  }
  opacity: ${(p) => (p.isNewGame ? '100%' : 0)};
  transition: opacity 0.15s ease-in-out;
`;

const InvertedInnerButton = styled(InnerButton)`
  box-shadow: 0 0 0 1px var(--primaryShadow);
  /* background: orange; */

  background: var(--primaryBg);

  &:hover {
    background: var(--primaryBgHover);
  }
  &:focus,
  &:active {
    background: var(--primaryBgFocus);
  }
`;
