import logo from "../assets/grayLogo.svg";
import facebookIcon from "../assets/facebook.svg";
import twitterIcon from "../assets/twitter.svg";
import instagramIcon from "../assets/instagram.svg";
import styles from "./Footer.module.css";
import Container from "./Container";

function Footer() {
  return (
    <div className={styles.footer}>
      <Container>
        <ul className={styles.links}>
          <li>다잡아 소개</li>
          <li>개인정보 취급방침</li>
          <li>사용자 이용약관</li>
          <li>자주 묻는 질문</li>
        </ul>
        <ul className={styles.info}>
          <li>명지대학교 | 캡스톤디자인</li>
          <li>조장/메인코더 | 김재정 </li>
          <li>서브코더 | 문서연 </li>
          <li>서브코더 | 좌동환 </li>
          <li>자료조사 및 기획 | 전은빈</li>
          <li>담당 교수님 | 안희철 교수님 </li>
          <li>주소 | 경기도 용인시 처인구 명지로 116 </li>
        </ul>
        <div className={styles.icons}>
          <img src={logo} alt="dajaba" />
          <div className={styles.sns}>
            <img src={facebookIcon} alt="facebook icon" />
            <img src={twitterIcon} alt="twitter icon" />
            <img src={instagramIcon} alt="instagram icon" />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
