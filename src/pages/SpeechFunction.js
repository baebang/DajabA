import Container from "../components/Container";
import React, { useState, useEffect } from "react";
import styles from "./SpeechFunction.module.css";
import Lined from "../components/Lined";

import { firestore } from "./firebase";

import { useRecoilValue } from "recoil";
import { setUid } from "../recoil/loginCheck";

import moment from "moment";
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import "moment/locale/ko";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

// counting 변수
var count1 = 0; //음
var count2 = 0; //어
var count3 = 0; //잠시만요
var count4 = 0; //그니까
var count5 = 0; //죄송합니다
var count6 = 0; //모르겠습니다

// 찾고 싶은 단어
var search1 = "음";
var search2 = "어";
var search3 = "잠시만요";
var search4 = "그니까";
var search5 = "죄송합니다";
var search6 = "모르겠습니다";

mic.continuous = true;
mic.interimResults = true;
mic.lang = "ko-KR";

function SpeechFunction() {
  const UidCheck = useRecoilValue(setUid);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  const CounterDB = firestore
    .collection("Mypage")
    .doc(UidCheck)
    .collection("History");

  const nowTime = moment().format("YYYYMMDDHHmmss");
  //문서 이름
  const Day = moment().format("YYYY-MM-DD HH:mm");
  //기록 날짜

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote("");

    // 1~6 몇 번 나오는지 세기
    var pos1 = note.indexOf(search1);
    while (pos1 !== -1) {
      count1++;
      pos1 = note.indexOf(search1, pos1 + 1);
    }

    var pos2 = note.indexOf(search2);
    while (pos2 !== -1) {
      count2++;
      pos2 = note.indexOf(search2, pos2 + 1);
    }

    var pos3 = note.indexOf(search3);
    while (pos3 !== -1) {
      count3++;
      pos3 = note.indexOf(search3, pos3 + 1);
    }

    var pos4 = note.indexOf(search4);
    while (pos4 !== -1) {
      count4++;
      pos4 = note.indexOf(search4, pos4 + 1);
    }

    var pos5 = note.indexOf(search5);
    while (pos5 !== -1) {
      count5++;
      pos5 = note.indexOf(search5, pos5 + 1);
    }

    var pos6 = note.indexOf(search6);
    while (pos6 !== -1) {
      count6++;
      pos6 = note.indexOf(search6, pos6 + 1);
    }

    CounterDB.doc(nowTime).set({
      um: count1,
      aa: count2,
      wating: count3,
      so: count4,
      sorry: count5,
      donknow: count6,
      time: Day,
      type: "speech",
    });

    console.log("음 : " + count1);
    console.log("어 : " + count2);
    console.log("잠시만요 : " + count3);
    console.log("그니까 : " + count4);
    console.log("죄송합니다 : " + count5);
    console.log("모르겠습니다 : " + count6);
  };

  // const checking = () =>{

  // }

  return (
    <>
      <div className={styles.bg} />
      <Container className={styles.container}>
        <h1 className={styles.heading}>
          <Lined>
            <strong>반복 단어 검출 Test</strong>
          </Lined>
        </h1>
        <div className={styles.box2}>
          <div className={styles.box}>
            <br />
            {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
            <button onClick={() => setIsListening((prevState) => !prevState)}>
              <strong>Start/Stop</strong>
            </button>
            <button onClick={handleSaveNote} disabled={!note}>
              <strong>Analyze Interview</strong>
            </button>
            <p>{note}</p>
          </div>

          <div className={styles.box}>
            <h2>면접 내용</h2>
            {savedNotes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>

          <div>
            <h2>
              <strong>반복적인 단어 확인</strong>
            </h2>
            <div>
              <h3>
                <Lined>음 : {count1}</Lined>
              </h3>
              <h3>
                <Lined>어 : {count2}</Lined>
              </h3>
              <h3>
                <Lined>잠시만요 : {count3}</Lined>
              </h3>
              <h3>
                <Lined>그니까 : {count4}</Lined>
              </h3>
              <h3>
                <Lined>죄송합니다 : {count5}</Lined>
              </h3>
              <h3>
                <Lined>모르겠습니다 : {count6}</Lined>
              </h3>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SpeechFunction;
