import styled from 'styled-components/macro';
import { ModalWrapper } from './Modal';

export default function Button({ children, ...props }) {
  return (
    <>
      <Wrapper {...props}>
        <InnerButton {...props}>{children}</InnerButton>
      </Wrapper>
    </>
  );
}

export function InvertedButton({ children, ...props }) {
  return (
    <InvertedWrapper {...props}>
      <InnerButton>{children}</InnerButton>
    </InvertedWrapper>
  );
}

const Wrapper = styled.button`
  --innerBg: var(--pinkBg);
  --innerHover: var(--pinkHover);
  --innerFocus: var(--pinkFocus);
  --innerShadow: var(--pinkShadow);
  --outerShadow: var(--pinkBg);
  --outline: white;

  padding: 3px 3px;
  border-radius: 10px;
  border: none;
  min-width: 140px;

  font-family: system-ui, sans-serif;
  color: white;
  background: transparent;
  outline: none;
  text-shadow: 1px 1px 2px black;

  &:focus,
  &:active {
    box-shadow: 0 0 0 1px var(--outerShadow);
    background: var(--outline);
  }
  &:hover {
    cursor: pointer;
  }

  ${ModalWrapper} & {
    --innerBg: var(--tealBg);
    --innerHover: var(--tealHover);
    --innerFocus: var(--tealFocus);
    --innerShadow: var(--tealShadow);
    --outerShadow: var(--tealBg);
  }
`;

const InnerButton = styled.span`
  display: block;
  padding: 12px 24px;
  font-size: ${21 / 16}rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  box-shadow: 0 0 0 1px var(--innerShadow);
  background: var(--innerBg);

  &:hover {
    background: var(--innerHover);
  }
  &:focus,
  &:active {
    background: var(--innerFocus);
  }
`;

const InvertedWrapper = styled(Wrapper)`
  --innerBg: var(--tealBg);
  --innerHover: var(--tealHover);
  --innerFocus: var(--tealFocus);
  --innerShadow: var(--tealShadow);
  --outerShadow: var(--tealBg);

  opacity: ${(p) => (p.isNewGame ? '100%' : 0)};
  transition: opacity 0.15s ease-in-out;
`;
