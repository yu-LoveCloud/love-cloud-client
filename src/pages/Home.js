import AppContainer from "../components/AppContainer";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <AppContainer>
      <h4> LOVE CLOUD </h4>
      <Link to="/loginform">로그인</Link> <br />
      <Link to="/signup">회원가입</Link> <br />
      <Link to="/invitation">청첩장제작</Link> <br />
      <Link to="/partnerconnect">파트너초대</Link>
    </AppContainer>
  );
}

export default Home;
