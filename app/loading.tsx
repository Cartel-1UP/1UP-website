
import cartel1 from '../images/cartel_logo_5.png';

export default function Loading() {
  const loaderContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(#125c6b 0%, #072f37 70%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const loaderStyle = {
    width: '250px',
    height: '250px',
    backgroundImage: `url(${cartel1.src})`,
    backgroundSize: 'cover',
    animation: 'spin 2.5s linear infinite',
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={loaderContainerStyle}>
      <style>{keyframes}</style>
      <div style={loaderStyle}></div>
    </div>
  );
}
