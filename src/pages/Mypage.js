// import { useEffect, useState } from "react";
import { firestore } from "./firebase";

import { useRecoilValue } from "recoil";
import { setUid } from "../recoil/loginCheck";
import ListPage from "../components/ListPage";

function Mypage() {
  const UidCheck = useRecoilValue(setUid);
  console.log(UidCheck);

  const CounterDB = firestore
    .collection("Mypage")
    .doc(UidCheck)
    .collection("History");

  console.log();

  return (
    <ListPage
      variant="catalog"
      title="면접 시뮬레이션 결과"
      description="누적된 데이터를 기반으로 면접의 달인이 되어보세요!"
    >
      <br />
    </ListPage>
  );
}

export default Mypage;
