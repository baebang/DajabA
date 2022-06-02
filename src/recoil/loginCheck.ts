import { atom } from "recoil";

// 로그인 체크
export const Login = atom<boolean>({
  key: "CHEKC_LOGIN",
  default: false,
});

//UID저장
export const setUid = atom({
  key: "CHEKC_UID",
  default: null,
});
