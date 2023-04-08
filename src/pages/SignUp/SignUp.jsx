import { requestSignUp } from "api/api";
import { useState, useEffect } from "react";
import swal from "sweetalert";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const trySignUp = async () => {
    const signupResult = await requestSignUp(email, password);
    swal({
      icon: signupResult.succses ? "success" : "error",
      title: signupResult.succses ? "SUCCSESS" : "ERROR!",
      text: signupResult.message,
    });
  };
  useEffect(() => {
    if (email.search("@") > -1 && password.length > 7) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);
  return (
    <div>
      <h1>SignUp</h1>
      <form>
        <label>email</label>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>password</label>
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="signup-button" type="submit" disabled={disabled} onClick={trySignUp}>
          SignIn
        </button>
      </form>
    </div>
  );
}
export default SignUp;
