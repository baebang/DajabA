// import { useEffect } from "react";
import Button from "../components/Button";

function EyeTracking() {
  alert(
    "시선학습이 필요합니다. \n 시선을 마우스 커서에 맞추시고 클릭을 통해 트랙킹을 진행해 주세요."
  );

  const MainContent = () => {
    const webgazer = window.webgazer;
    // webgazer.showVideoPreview(false);
    webgazer
      .setGazeListener((date, clock) => {
        console.log(date);
      })
      .begin();
  };

  return (
    <>
      <br />
      <Button name="google" onClick={MainContent}>
        비디오 시작
      </Button>
    </>
  );
}

export default EyeTracking;
