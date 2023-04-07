import { requestSignup } from "api/api";

function SignUp() {
  const trySignUp = async () => {
    await requestSignup("abc@as", "123");
  };

  return (
    <div>
      <h1>SignUp</h1>

      <button type="submit" value="Submit" onClick={trySignUp} />
    </div>
  );
}
export default SignUp;
