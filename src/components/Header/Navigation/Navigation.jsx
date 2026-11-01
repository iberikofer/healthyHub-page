import profile from '../../../assets/profile-circle.svg';
import { NavLink, useLocation } from 'react-router-dom';
import css from './Navigation.module.css';

function Navigation() {
  const { pathname } = useLocation();
  const isWelcomePage = pathname === '/' || pathname === '/healthyHub-page';

  const handleActiveStyle = ({ isActive }) => {
    return {
      color:
        isActive ||
        pathname === '/usergoal' ||
        pathname === '/usergender' ||
        pathname === '/userbody' ||
        pathname === '/useractivity'
          ? '#E3FFA8'
          : '#FFFFFF',
    };
  };
  const handleisActiveStyle = ({ isActive }) => {
    return {
      color: isActive ? '#E3FFA8' : '#FFFFFF',
    };
  };

  return (
    <div className={`${css.auth} ${isWelcomePage ? css.disabledAuth : ''}`}>
      <div className={css.sign}>
        <NavLink
          style={handleisActiveStyle}
          className={`${css.link} ${isWelcomePage ? css.disabledLink : ''}`}
          to="/signin"
          onClick={isWelcomePage ? (e) => e.preventDefault() : undefined}
          tabIndex={isWelcomePage ? -1 : undefined}
          aria-disabled={isWelcomePage}
        >
          Sign in
        </NavLink>
        <p className={css.link}> / </p>
        <NavLink
          style={handleActiveStyle}
          className={`${css.link} ${isWelcomePage ? css.disabledLink : ''}`}
          to="/signup"
          onClick={isWelcomePage ? (e) => e.preventDefault() : undefined}
          tabIndex={isWelcomePage ? -1 : undefined}
          aria-disabled={isWelcomePage}
        >
          Sign up
        </NavLink>
      </div>

      <img className={css.profile} src={profile} alt="profile" />

      {isWelcomePage && (
        <div className={css.navTooltip} role="tooltip">
          Please check the information below
        </div>
      )}
    </div>
  );
}

export default Navigation;
