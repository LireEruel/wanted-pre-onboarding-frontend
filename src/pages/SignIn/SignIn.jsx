import { requestSignIn } from "api/api";
import { useState, useEffect, useContext } from "react";
import swal from "sweetalert";
import { AuthContext } from "App";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { onLogin } = useContext(AuthContext);
  const trySignIn = async () => {
    const signupResult = await requestSignIn(email, password);
    swal({
      icon: signupResult.succses ? "success" : "error",
      title: signupResult.succses ? "SUCCSESS" : "ERROR!",
      text: signupResult.message,
    });
    if (signupResult.succses) {
      onLogin(signupResult.access_token);
    }
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
      </form>
      <button data-testid="signin-button" type="submit" disabled={disabled} onClick={trySignIn}>
        SignIn
      </button>
    </div>
  );
}
export default SignIn;
