import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import HomePage from "./pages/HomePage";
import GossipMeasure from "./pages/GossipMeasure";
import EyeTracking from "./pages/EyeTracking";
import SpeechFunction from "./pages/SpeechFunction";
import Mypage from "./pages/Mypage";

export default function Main() {
  return (
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/GossipMeasure" element={<GossipMeasure />} />
          <Route path="/EyeTracking" element={<EyeTracking />} />
          <Route path="/SpeechFunction" element={<SpeechFunction />} />
          <Route path="/Mypage" element={<Mypage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}
