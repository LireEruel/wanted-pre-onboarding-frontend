import axios from "axios";

const baseURL = "https://www.pre-onboarding-selection-task.shop";
const headers = {
  "Content-Type": "application/json",
};

async function requestSignup(email, password) {
  const res = await axios.post(
    `${baseURL}/auth/signup`,
    {
      email: email,
      password: password,
    },
    {
      headers: headers,
    },
  );
  console.log(res);
}

export { requestSignup };
