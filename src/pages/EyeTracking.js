import { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import styled from "@emotion/styled";
import interview from "../assets/eyetracking_Background.png";

import { useRecoilValue } from "recoil";
import { setUid } from "../recoil/loginCheck";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function EyeTracking() {
  const [toggle, setToggle] = useState(true);
  const [hide, setHide] = useState(true);
  const [ing, setIng] = useState(true);
  const webgazer = window.webgazer;
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const TOP_CUTOFF1 = window.innerHeight / 4;
  const TOP_CUTOFF2 = window.innerHeight / 8;

  // const UidCheck = useRecoilValue(setUid);
  // console.log("사용자 UID 확인하쇼" + UidCheck);
  // 확인용

  // const WIDTH_CUTOFF1 = window.innerWidth / 4;
  // const WIDTH_CUTOFF2 = window.innerWidth / 12;

  useEffect(() => {
    alert(
      "시선학습이 필요합니다. \n 시선을 마우스 커서에 맞추시고 클릭을 통해 트랙킹을 진행해 주세요."
    );

    return () => {
      FiterButton("close");
      setToggle(true);
    };
  }, []);

  useInterval(
    () => {
      // 내가 원하는 좌표에 시선이 들어오면 카운트 처리되는 부분
      setCount(count + 1);
    },
    isRunning ? 1000 : null
  );

  const FiterButton = (type) => {
    switch (type) {
      case "start": {
        setToggle(false);
        webgazer
          .setGazeListener((data, timestamp) => {
            if (data == null) return;

            if (TOP_CUTOFF2 < data.y && data.y < TOP_CUTOFF1) {
              //여기서  타임이 돌어야 합니다.요
              console.log(data.y);
              setIsRunning(true);
            } else {
              //멈춰야함
              setIsRunning(false);
            }
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
        //uid셀에 저장할거임
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
      <div
        style={{
          backgroundImage: `url(${interview})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "75.5vh",
        }}
      />

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
            <h1>{count}</h1>
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
