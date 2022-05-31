import {useRef} from 'react';
import Container from "../components/Container";

import Button from "../components/Button";
import Lined from "../components/Lined";
import styles from "./GossipMeasure.module.css";

const CONSTRAINTS = { video: true };

function GossipMeasure() {

//   const [check, setCheck] = useRecoilState(Login);
  const videoRef = useRef(null);

  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  };

  const stopVideo = async () => {
    const stop = await navigator.mediaDevices.removeEventListener(false,CONSTRAINTS);
    videoRef.current.srcObject = stop;
  };

  return (
    <>
      <div className={styles.bg} />
      <Container className={styles.container}>
        <div className={styles.texts}>
          <h1 className={styles.heading}>
            <Lined>군소리 측정</Lined>
            <br />
            <strong>면접 화면</strong>
          </h1>
          
          <div>
            <video autoPlay ref={videoRef} />
            <div className={styles.btn_center}>
                <Button name="video-start" onClick={startVideo}>
                    화면 켜기
                </Button>
                <Button name="video-end" onClick={stopVideo}>
                    화면 끄기
                </Button>
            </div>
            
          </div>
        </div>
        
      </Container>
    </>
  );
}

export default GossipMeasure;
