import { requestSignIn } from "api/api";
import { useState, useEffect, useContext } from "react";
import swal from "sweetalert";
import { AuthContext } from "App";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { onLogin } = useContext(AuthContext);

  const goSignUp = () => {
    navigate("/signup");
  };

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
    <div style={{ width: "30%", margin: "auto" }}>
      <h1>SignIn</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
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
      <button
        data-testid="signin-button"
        type="submit"
        disabled={disabled}
        onClick={trySignIn}
        style={{ marginTop: "20px", marginRight: "20px" }}
      >
        SignIn
      </button>
      <button onClick={goSignUp}>go to Sign Up</button>
    </div>
  );
}
export default SignIn;
