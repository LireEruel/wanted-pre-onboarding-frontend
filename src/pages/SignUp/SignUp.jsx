import { requestSignUp } from "api/api";
import { useState } from "react";
import swal from "sweetalert";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const trySignUp = async () => {
    const signupResult = await requestSignUp(email, password);
    swal({
      icon: signupResult.succses ? "success" : "error",
      title: signupResult.succses ? "SUCCSESS" : "ERROR!",
      text: signupResult.message,
    });
  };
  return (
    <div>
      <h1>SignUp</h1>
      <label>email</label>
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <label>password</label>
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button type="submit" onClick={trySignUp}>
        SignUP
      </button>
    </div>
  );
}
export default SignUp;
