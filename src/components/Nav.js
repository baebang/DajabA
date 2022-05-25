import { Link } from "react-router-dom";
import Container from "./Container";
import UserMenu from "./UserMenu";
import logoImg from "../assets/logo.svg";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className={styles.nav}>
      <Container className={styles.container}>
        <Link to="/">
          <img src={logoImg} alt="Codethat Logo" />
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link to="/EyeTracking">시선측정 면접</Link>
          </li>
          <li>
            <Link to="/GossipMeasure">군소리 측정</Link>
          </li>
          <li>
            <Link to="/SpeechFunction">반복적인 단어 검출</Link>
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
