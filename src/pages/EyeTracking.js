import { useEffect, useState } from "react";
import Button from "../components/Button";
import Container from "../components/Container";

import styled from "@emotion/styled";

import interview from "../assets/eyetracking_Background.png";

function EyeTracking() {
  const [toggle, setToggle] = useState(true);
  const [hide, setHide] = useState(true);
  const [ing, setIng] = useState(true);
  const webgazer = window.webgazer;

  const startLookTime = Number.POSITIVE_INFINITY;

  const element = document.getElementById("background");
  console.log("other.top", element.getBoundingClientRect().top);
  // const elementTop = element.getBoundingClientRect();
  // const relativeTop = clientRect.top;
  const elementTop = 108.09375;

  useEffect(() => {
    alert(
      "시선학습이 필요합니다. \n 시선을 마우스 커서에 맞추시고 클릭을 통해 트랙킹을 진행해 주세요."
    );

    // "시선학습이 필요합니다. \n 시선을 마우스 커서에 맞추시고 클릭을 통해 트랙킹을 진행해 주세요."

    return () => {
      FiterButton("close");
      setToggle(true);
    };
  }, []);
  const FiterButton = (type) => {
    switch (type) {
      case "start": {
        setToggle(false);
        webgazer
          .setGazeListener((data, timestamp) => {
            if (data == null) return;

            // if (data.y >= elementTop &&  data.y <= elementTop+1200){
            //   //여기서  타임이 돌어야 합니다.요
            //   startLookTime = timestamp
            // }
            // if (data.x >= elementTop &&  data.x <= elementTop+500){
            //   //여기서  타임이 돌어야 합니다.요
            //   startLookTime = timestamp
            // }
          })
          .begin();

        break;
      }

      case "hide": {
        if (hide === true) {
          webgazer.showVideo(false);
          setHide(false);
        } else {
          webgazer.showVideo(true);
          setHide(true);
        }
        break;
      }

      case "stop": {
        if (ing === true) {
          webgazer.pause();
          setIng(false);
        } else {
          webgazer.resume();
          setIng(true);
        }
        break;
      }

      case "close": {
        webgazer.end();
        setToggle(true);

        break;
      }
    }
  };

  return (
    <ContainerCustom>
      <div id="background">
        <img id="background-img" src={interview} />
      </div>

      <div id="button-area">
        {toggle === true ? (
          <>
            <Button id="google" onClick={() => FiterButton("start")}>
              비디오 시작
            </Button>
          </>
        ) : (
          <div id="ing-button">
            <Button
              id="google"
              onClick={() => {
                FiterButton("hide");
              }}
            >
              비디오 숨기기
            </Button>

            <Button id="google" onClick={() => FiterButton("stop")}>
              일시 정지
            </Button>

            <Button id="google" onClick={() => FiterButton("close")}>
              녹화 종료
            </Button>
          </div>
        )}
      </div>
    </ContainerCustom>
  );
}

export default EyeTracking;

const ContainerCustom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;

  #background-img {
    width: 1200px;
    height: 800px;
    background-size: cover;
  }

  #button-area {
    display: flex;
    width: 100vw;
    margin-top: 20px;
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;

    #ing-button {
      display: flex;
      flex-direction: row;
      margin: 10px;

      #google {
        display: flex;
        margin: 10px;
      }
    }
  }
`;
