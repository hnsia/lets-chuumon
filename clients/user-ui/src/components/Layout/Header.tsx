import styles from "@/src/utils/style";
import React from "react";
import NavItems from "../NavItems";
import ProfileDropDown from "../ProfileDropDown";

const Header = () => {
  return (
    <header className="w-full bg-[#0F1524] ">
      <div className="w-[90%] m-auto h-[80px]  text-white flex items-center justify-between">
        <h1 className={`${styles.logo}`}>Let&apos;s Chuumon</h1>
        <NavItems />
        <ProfileDropDown />
      </div>
    </header>
  );
};

export default Header;
