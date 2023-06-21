import { requestSignUp } from "api/api";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
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
  const goSignIn = () => {
    navigate("/signin");
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
      <h1>SignUp</h1>
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
      </form>{" "}
      <button
        data-testid="signup-button"
        type="submit"
        disabled={disabled}
        onClick={trySignUp}
        style={{ marginTop: "20px", marginRight: "20px" }}
      >
        SignUp
      </button>
      <button onClick={goSignIn}>go to Sign In</button>
    </div>
  );
}
export default SignUp;
