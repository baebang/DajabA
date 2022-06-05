import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { setUid } from "../recoil/loginCheck";
import ListPage from "../components/ListPage";

import Eyeimage from "../assets/icon--algorithm.svg";
import speechimage from "../assets/icon--automation.svg";

import styled from "@emotion/styled";

import { firestore, authService } from "./firebase";

function Mypage() {
  const UidCheck = useRecoilValue(setUid);
  const [ProfileData, setProfileData] = useState([]);

  useEffect(() => {
    const CounterDB = firestore.collection("Mypage");

    if (ProfileData.length == 0) {
      authService.onAuthStateChanged((res) => {
        if (res != undefined) {
          CounterDB.doc(UidCheck)
            .collection("History")
            .get()
            .then((document) => {
              document.forEach(function (doc) {
                let docs = doc.data();

                setProfileData((currentArray) => [...currentArray, docs]);
              });
            });
        }
      });
    }
  }, []);

  const FirstFilterHandler = (data) => {
    return data.filter((item) => {
      return item.lala === undefined;
    });
  };

  return (
    <>
      <ListPage
        variant="catalog"
        title="면접 시뮬레이션 결과"
        description="누적된 데이터를 기반으로 면접의 달인이 되어보세요!"
      />
      <ProfileContatiner>
        {FirstFilterHandler(ProfileData).map((item, key) => {
          return (
            <div key={key}>
              {item.type == "Eye" ? (
                <div id="profile-box">
                  {/* 핑크 부분 */}
                  <div id="header-point">
                    <TitleText>{item.type}</TitleText>
                  </div>

                  {/* 데이터 출력부분 */}
                  <div id="profile-data-filed">
                    {/* 왼쪽 */}
                    <div id="left-area">
                      <img
                        src={Eyeimage} // 스피크 이미지 넣는부분
                        style={{
                          width: 150,
                          height: 150,
                        }}
                      />

                      <span>Eyetricking Result</span>
                      <span>면접 시, 또렷한 시선으로 신뢰도를 높여보세요.</span>
                    </div>

                    {/* 오른쪽 */}
                    <div id="right-area">
                      <TitleText>{item.time}</TitleText>

                      <div>
                        <TitleText>총 녹화 시간</TitleText>
                        <ContentText>{item.runnningTime}</ContentText>
                      </div>

                      <div>
                        <TitleText>시선처리 한 시간</TitleText>
                        <ContentText>{item.EyeTrackingcounter}</ContentText>
                      </div>

                      <div>
                        <TitleText>전체 퍼센데이지</TitleText>
                        <ContentText>{item.carculator}</ContentText>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div id="profile-box" key={key}>
                  {/* 핑크 부분 */}
                  <div id="header-point">
                    <TitleText>{item.type}</TitleText>
                  </div>

                  {/* 데이터 출력부분 */}
                  <div id="profile-data-filed">
                    {/* 왼쪽 */}
                    <div id="left-area">
                      <img
                        src={speechimage} // 스피크 이미지 넣는 부분
                        style={{
                          width: 150,
                          height: 150,
                        }}
                      />

                      <span>Speech Result</span>
                      <span>어중간한 표현을 줄이도록 노력해 보세요.</span>
                    </div>

                    {/* 오른쪽 */}
                    <div id="right-area">
                      <TitleText>{item.time}</TitleText>

                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div>
                            <TitleText>음</TitleText>
                            <ContentText>{item.um}</ContentText>
                          </div>

                          <div>
                            <TitleText>아</TitleText>
                            <ContentText>{item.aa}</ContentText>
                          </div>

                          <div>
                            <TitleText>잠시만요</TitleText>
                            <ContentText>{item.wating}</ContentText>
                          </div>
                        </div>

                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div>
                            <TitleText>그니까</TitleText>
                            <ContentText>{item.so}</ContentText>
                          </div>

                          <div>
                            <TitleText>죄송함니다</TitleText>
                            <ContentText>{item.sorry}</ContentText>
                          </div>

                          <div>
                            <TitleText>모르겠습니다</TitleText>
                            <ContentText>{item.donknow}</ContentText>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </ProfileContatiner>
    </>
  );
}

export default Mypage;

const ProfileContatiner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  max-height: 550px;
  overflow: scroll;

  #profile-box {
    display: flex;
    flex-direction: column;
    width: 900px;
    min-width: 500px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 37px;
    margin: 10px;

    #header-point {
      display: flex;
      min-width: 500px;
      height: 31.55px;
      background: #d9d9d9;
      border-radius: 28px 28px 0px 0px;
      justify-content: center;
      align-items: center;
    }

    #profile-data-filed {
      display: flex;

      #left-area {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        justify-content: center;
      }

      #right-area {
        display: flex;
        flex: 2;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        div {
          min-width: 200px;
          justify-content: space-between;
          display: flex;
          padding: 10px;
        }
      }
    }
  }
`;

const TitleText = styled.span`
  font-size: 17px;
  font-family: var(—gmarket-sans);
  font-weight: 500;
`;

const ContentText = styled.span`
  font-size: 17px;
  font-family: var(—gmarket-sans);
  font-weight: 500;
`;
