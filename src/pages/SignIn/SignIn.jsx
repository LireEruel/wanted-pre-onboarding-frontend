import { requestSignIn } from "api/api";
import { useState, useEffect } from "react";
import swal from "sweetalert";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
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

  useEffect(() => {
    if (email.search("@") > -1 && password.length > 7) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);
  return (
    <div>
      <h1>SignIn</h1>
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
        <button data-testid="signin-button" type="submit" disabled={disabled} onClick={trySignIn}>
          SignIn
        </button>
      </form>
    </div>
  );
}
export default SignIn;
