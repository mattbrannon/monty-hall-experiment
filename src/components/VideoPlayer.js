import styled from 'styled-components/macro';
import video from '../assets/gameshow.mp4'
export default function VideoPlayer ({children}) {
  return (
    <Wrapper>
      <Video>
        <source type="video/mp4" src={video}/>
      </Video>
      {children}
    </Wrapper>
  )
}


const Wrapper = styled.div`
  height: 100%;
  width: 100%;


`

const Video = styled.video.attrs({
  autoPlay: true,
  loop: true,
  muted: true
})`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;

`