import { Link } from "react-router-dom";
import Container from "./Container";
import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.svg";
import styles from "./Nav.module.css";

import { useRecoilValue } from "recoil";
import { Login } from "../recoil/loginCheck";

function Nav() {
  const loginCheck = useRecoilValue(Login);
  const unlogin = (event) => {
    if (loginCheck === false) alert("로그인을 진행해주세요.");
  };

  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">
          <img src={logoImg} alt="Codethat Logo" />
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link to={loginCheck && "/EyeTracking"} onClick={unlogin}>
              시선측정 면접
            </Link>
          </li>
          <li>
            <Link to={loginCheck && "/GossipMeasure"} onClick={unlogin}>
              군소리 측정
            </Link>
          </li>
          <li>
            <Link to={loginCheck && "/SpeechFunction"} onClick={unlogin}>
              반복적인 단어 검출
            </Link>
          </li>

          <li>
            <UserMenu />
          </li>
        </ul>
      </Container>
    </div>
  );
}

export default Nav;
