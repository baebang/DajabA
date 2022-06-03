import { authService, firebaseInstance, firestore } from "./firebase";

import Button from "../components/Button";
import Container from "../components/Container";
import Lined from "../components/Lined";
import styles from "./HomePage.module.css";
import landingImg from "../assets/landing.svg";

import { useRecoilState } from "recoil";
import { Login, setUid } from "../recoil/loginCheck";

import moment from "moment";
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import "moment/locale/ko";

function HomePage() {
  const [check, setCheck] = useRecoilState(Login);
  const [uid, setUID] = useRecoilState(setUid);

  const nowTime = moment().format("YYYYMMDDHHmmss");
  console.log(nowTime);

  const onGoogleClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);

    setCheck(true);
    setUID(data.user.uid);

    // uidDB = data.user.uid;
    // nameDB = data.user.displayName;
    const UsersetDB = firestore.collection("Mypage");
    const CounterDB = firestore
      .collection("Mypage")
      .doc(data.user.uid)
      .collection("History");

    UsersetDB.doc(data.user.uid)
      .get()
      .then((doc) => {
        // 같은 document가 있는지 확인한다.
        if (doc.exists) {
          // 있다면 document의 데이터를 가져옴
          console.log(doc.data());
        }
        //없다면 만들어 준다.
        else
          UsersetDB.doc(data.user.uid).set({
            uid: data.user.uid,
            name: data.user.displayName,
          });

        CounterDB.doc("Welcom").set({
          lala: "ss",
        });
      });

    alert(
      data.user.displayName +
        "님 당신의 취업을 언제나 응원합니다. \n 로그인에 성공하였습니다!"
    );
  };

  //로그아웃버튼
  // const onLogOutClick = () => {
  //   authService.signOut();
  //    check = 0;
  // };

  //const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <div className={styles.bg} />
      <Container className={styles.container}>
        <div className={styles.texts}>
          <h1 className={styles.heading}>
            <Lined>다잡아</Lined>
            <br />
            <strong>취업을 다잡다.</strong>
          </h1>
          <p className={styles.description}>
            AI 면접의 시대. <br />
            DAJOBA는 취업을 준비하시는 여러분께 최고의 길잡이가 되어드립니다.{" "}
            <br />
            우리는 당신의 면접 음성과 시선을 인공지능으로 분석하여 <br />
            최적의 솔루션을 제공합니다. <br />
            면접 능력을 향상시키기 위한 최고의 선택 DAJOBA. <br />
            별도의 설치 없이 빠르게 이용하세요
            <br />
            지금 함께 시작해보실래요?
          </p>
          <div>
            <Button name="google" onClick={onGoogleClick}>
              구글 계정 로그인
            </Button>
          </div>
        </div>
        <div className={styles.figure}>
          <img src={landingImg} alt="면접, 통계, 그래프를 만드는 사람들" />
        </div>
      </Container>
    </>
  );
}

export default HomePage;
