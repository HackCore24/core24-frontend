"use client";
import React, { FC } from "react";
import styles from "./NavBar.module.scss";
import Logo from "@/components/Logo";
import Image from "next/image";
import { useUsers } from "@/api/endpoints/users";

interface NavBarProps {
  children: React.ReactNode;
}

const NavBar: FC<NavBarProps> = ({ children }) => {
  const users = useUsers();
  const { data: userData } = users.GetMe();
  return (
    <div className={styles.root}>
      <div className={styles.navbar}>
        <div className={styles.titleContainer}>
          <Logo />
          <h2>Ядро</h2>
        </div>

        <div className={styles.profile}>
          <div className={styles.textsContainer}>
            <h4 className={styles.name}>
              {userData?.firstname} {userData?.lastname}
            </h4>
            <h4 className={styles.city}>Краснодар</h4>
          </div>

          <Image
            className={styles.avatar}
            src={userData?.avatar || ""}
            alt="avatar"
            width={64}
            height={64}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default NavBar;
