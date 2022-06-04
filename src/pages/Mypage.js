import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { setUid } from "../recoil/loginCheck";
import ListPage from "../components/ListPage";

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
      return item.EyeTrackingcounter !== undefined;
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
            <div id="profile-box" key={key}>
              {/* 핑크 부분 */}
              <div id="header-point" />

              {/* 데이터 출력부분 */}
              <div id="profile-data-filed">
                {/* 왼쪽 */}
                <div id="left-area">
                  <img
                    src=""
                    style={{
                      width: 150,
                      height: 150,
                    }}
                  />

                  <span>Eyetricking Result</span>
                  <span>면접 시, 불안정한 시선은 신뢰도를 어쩌고 저꺼고</span>
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
      min-width: 500px;
      height: 31.55px;
      background: #d9d9d9;
      border-radius: 28px 28px 0px 0px;
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
          min-width: 500px;
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
