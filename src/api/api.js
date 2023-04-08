import axios from "axios";

const baseURL = "https://www.pre-onboarding-selection-task.shop";
const default_headers = {
  "Content-Type": "application/json",
};

const auth_headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("access_token"),
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
        headers: default_headers,
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
        headers: default_headers,
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

async function requestCreateTodo(todo) {
  const result = {
    succses: false,
    message: "",
  };

  try {
    await axios.post(
      `${baseURL}/todos`,
      {
        todo: todo,
      },
      {
        headers: auth_headers,
      },
    );
    result.succses = true;
    result.message = "success";
  } catch (e) {
    result.succses = false;
    result.message = e.response.data.message;
  }
  return result;
}

async function requestGetTodo() {
  const result = {
    succses: false,
    todos: [],
    message: "",
  };

  try {
    const res = await axios.get(`${baseURL}/todos`, {
      headers: auth_headers,
    });

    result.succses = true;
    result.todos = res.data;
    result.message = "success";
  } catch (e) {
    result.succses = false;
    result.message = e.response.data.message;
  }
  return result;
}

export { requestSignUp, requestSignIn, requestCreateTodo, requestGetTodo };
