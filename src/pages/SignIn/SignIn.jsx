import { requestSignIn } from "api/api";
import { useState } from "react";
import swal from "sweetalert";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const trySignIn = async () => {
    const signupResult = await requestSignIn(email, password);
    if (signupResult.succses) {
      localStorage.setItem("access_token", signupResult.access_token);
    }

    swal({
      icon: signupResult.succses ? "success" : "error",
      title: signupResult.succses ? "SUCCSESS" : "ERROR!",
      text: signupResult.message,
    });
  };
  return (
    <div>
      <h1>SignIn</h1>
      <label>email</label>
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <label>password</label>
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button type="submit" onClick={trySignIn}>
        SignIn
      </button>
    </div>
  );
}
export default SignIn;
