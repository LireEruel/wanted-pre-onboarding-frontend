import axios from "axios";

const baseURL = "https://www.pre-onboarding-selection-task.shop";
const headers = {
  "Content-Type": "application/json",
};

async function requestSignUp(email, password) {
  const result = {
    succses: false,
    message: "",
  };
  try {
    await axios.post(
      `${baseURL}/auth/signup`,
      {
        email: email,
        password: password,
      },
      {
        headers: headers,
      },
    );
    result.succses = true;
    result.message = "회원 가입이 성공되었습니다.";
  } catch (e) {
    result.succses = false;
    result.message = e.response.data.message;
  }
  return result;
}

async function requestSignIn(email, password) {
  const result = {
    succses: false,
    message: "",
    access_token: "",
  };
  try {
    const res = await axios.post(
      `${baseURL}/auth/signin`,
      {
        email: email,
        password: password,
      },
      {
        headers: headers,
      },
    );
    result.succses = true;
    result.message = "로그인이 성공되었습니다.";
    result.access_token = res.data.access_token;
  } catch (e) {
    result.succses = false;
    result.message = e.response.data.message;
  }
  return result;
}

export { requestSignUp, requestSignIn };
