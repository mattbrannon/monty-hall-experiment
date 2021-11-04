import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import video from '../assets/gameshow.mp4';
export default function VideoPlayer({ children }) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const getWindowSize = () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const updateSize = () => {
      const size = getWindowSize();
      setSize(size);
    };
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  });

  return (
    <Wrapper>
      <Video width={size.width} height={size.height}>
        <source type="video/mp4" src={video} />
      </Video>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Video = styled.video.attrs({
  autoPlay: true,
  loop: true,
  muted: true,
})`
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
  overflow: hidden;
`;
