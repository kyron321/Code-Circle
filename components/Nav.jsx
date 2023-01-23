import logo from '../images/Logo.svg';
import arrow from '../images/arrow.svg';
import Image from 'next/image';
export default function Nav() {
  return (
    <nav>
      <div style={navStyle} id="nav-container">
        <Image style={logoStyle} className="logo" alt="logo" src={logo} />

        <div id="button-container" style={buttonContainerStyle}>
          <button style={loginButtonStyle} id="login-button">
            Login
          </button>
          <button style={tryCodeCircleButtonStyle} id="login-button">
            Try Code Circle free <Image src={arrow} alt="button arrow" />
          </button>
        </div>
      </div>
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  justifyItems: 'center',
  // padding: '16px 220px',

  position: 'absolute',
  width: '100vw',
  height: '92px',
  left: '0px',
  top: '0px',

  background: '#043873',
};

const loginButtonStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px 40px',
  gap: '10px',

  width: '124px',
  height: '60px',

  background: '#fb8c00',
  border: '0',
  borderRadius: '8px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

  flex: 'none',
  order: '0',
  flexGrow: '0',

  fontFamily: 'Archivo',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '23px',

  letterSpacing: ' -0.02em',

  color: '#FFFFFF',
};

const tryCodeCircleButtonStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: ' 16px 24px',
  gap: '10px',

  width: '220px',
  height: '60px',

  background: '#4F9CF9',
  borderRadius: '8px',
  border: '0',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',

  fontFamily: 'Archivo',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '23px',

  letterSpacing: '-0.02em',
  color: '#FFFFFF',
  flex: 'none',
  order: '0',
  flexGrow: '0',
  flex: 'none',
  order: '1',
  flexGrow: '0',
};

const buttonContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  padding: '0px',
  gap: '24px',

  width: '368px',
  height: '60px',
  flex: 'none',
  order: '0',
  flexGrow: '0',
};
const logoStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px',
  gap: '10px',

  width: '191px',
  height: '36px',

  flex: 'none',
  order: '0',
  flexGrow: ' 0',
};
