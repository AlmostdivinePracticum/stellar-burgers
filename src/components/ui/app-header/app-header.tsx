import React, { FC } from 'react';
import { NavLink } from 'react-router-dom'; // Импортируем NavLink
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to='/' className={({ isActive }) => `${styles.link} p-4`}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <span
                className={isActive ? styles.link_active : styles.link_inactive}
              >
                Конструктор
              </span>
            </>
          )}
        </NavLink>
        <NavLink to='/feed' className={({ isActive }) => `${styles.link} p-4`}>
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <span className={isActive ? styles.link_active : ''}>
                Лента заказов
              </span>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink
          to='/profile'
          className={({ isActive }) => `${styles.link} p-4`}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <span
                className={
                  userName
                    ? isActive
                      ? styles.link_active
                      : styles.link_inactive
                    : styles.link_inactive
                }
              >
                {userName || 'Личный кабинет'}
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
