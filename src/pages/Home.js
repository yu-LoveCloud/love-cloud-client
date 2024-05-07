import AppContainer from "../components/AppContainer";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <AppContainer>
      <h4> LOVE CLOUD </h4>
      <Link to="/loginform">로그인</Link> <br />
      <Link to="/signup">회원가입</Link> <br />
    </AppContainer>
  );
}

export default Home;
