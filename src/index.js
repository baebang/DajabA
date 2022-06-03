import ReactDOM from 'react-dom';
import Main from './Main';
import SpeechFunction_WebVital from './pages/SpeechFunction_WebVital';

import { RecoilRoot } from 'recoil';
ReactDOM.render(
  <RecoilRoot>
    <Main />
  </RecoilRoot>
  , document.getElementById('root'));
  SpeechFunction_WebVital();
