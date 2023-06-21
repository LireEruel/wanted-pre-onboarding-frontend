import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();

  const navigate = (destination) => {
    nav(destination);
  };
  return (
    <>
      <h1>HOME</h1>
      <h2>Wanted</h2>
      <h2>Pre onboarding</h2>
      <button onClick={() => navigate("/signin")}>SignIn</button>
      <button onClick={() => navigate("/signup")}>SignUp</button>
    </>
  );
}

export default Home;
