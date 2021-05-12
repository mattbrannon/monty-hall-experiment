import styled from 'styled-components/macro';

export default function Button({ children, ...props }) {
  return (
    <>
      <Wrapper>
        <InnerButton>{children}</InnerButton>
      </Wrapper>
    </>
  );
}

export function InvertedButton({ children, ...props }) {
  return (
    <InvertedWrapper>
      <InvertedInnerButton>{children}</InvertedInnerButton>
    </InvertedWrapper>
  );
}

// outer_radius = inner_radius + gap_between_elements / 2;
const Wrapper = styled.button`
  padding: 3px 3px;
  border-radius: calc((8px + 12px) / 2);
  border: none;
  min-width: 140px;

  font-family: system-ui;
  color: aliceblue;
  background: transparent;
  outline: none;

  &:focus,
  &:active {
    box-shadow: 0 0 0 1px var(--buttonBg);
    background: var(--primaryBgFocus);
  }
`;

const InnerButton = styled.span`
  display: block;
  padding: 12px 24px;
  font-size: ${21 / 16}rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  /* box-shadow: 0 0 0 1px darkorange; */
  /* background: orange; */
  box-shadow: 0 0 0 1px var(--buttonShadow);
  background: deeppink;

  &:hover {
    /* background: var(--primaryBgHover); */
    background: var(--buttonBgHover);
  }
  &:focus,
  &:active {
    /* background: var(--primaryBgFocus); */
    background: var(--buttonBgFocus);
  }
`;

const InvertedWrapper = styled(Wrapper)`
  &:focus,
  &:active {
    /* box-shadow: 0 0 0 1px var(--buttonBg);
    background: var(--primaryBgFocus); */
    box-shadow: 0 0 0 1px var(--buttonShadow);
    background: deeppink;
  }
`;

const InvertedInnerButton = styled(InnerButton)`
  box-shadow: 0 0 0 1px darkorange;
  background: orange;
  /* box-shadow: 0 0 0 1px var(--buttonShadow);
  background: deeppink; */

  &:hover {
    background: var(--primaryBgHover);
    /* background: var(--buttonBgHover); */
  }
  &:focus,
  &:active {
    background: var(--primaryBgFocus);
    /* background: var(--buttonBgFocus); */
  }
`;
