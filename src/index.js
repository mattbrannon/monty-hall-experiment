import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import VideoPlayer  from './components/VideoPlayer'

ReactDOM.render(
  <React.StrictMode>
    <VideoPlayer>
      <App />

    </VideoPlayer>
  </React.StrictMode>,
  document.getElementById('root')
);
