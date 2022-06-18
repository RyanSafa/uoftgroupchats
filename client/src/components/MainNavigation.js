import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to='/' >
          UofT Groupchats
        </NavLink>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/' className={navData => navData.isActive ? classes.active : ''}>
              Donate
            </NavLink>
          </li>
          <li>
            <NavLink to='/' className={navData => navData.isActive ? classes.active : ''}>
              Github
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
