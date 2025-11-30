import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <Link to='/' className={`${styles.link} ${styles.link_active} p-4`}>
          <BurgerIcon type={'primary'} />
          Конструктор
        </Link>
        <Link to='/feed' className={`${styles.link} ${styles.link_active} p-4`}>
          <ListIcon type={'primary'} />
          Лента заказов
        </Link>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        {userName ? (
          <Link
            to='/profile'
            className={`${styles.link} ${styles.link_active} ${styles.link_position_last} p-4`}
          >
            <ProfileIcon type={'primary'} />
            {userName}
          </Link>
        ) : (
          <Link
            to='/login'
            className={`${styles.link} ${styles.link_active} p-4`}
          >
            <ProfileIcon type={'primary'} />
            Личный кабинет
          </Link>
        )}
      </div>
    </nav>
  </header>
);
