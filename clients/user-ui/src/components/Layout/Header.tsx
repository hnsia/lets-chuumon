import styles from "@/src/utils/style";
import React from "react";

const Header = () => {
  return (
    <header className="w-full h-[80px] bg-[#0F1524] flex items-center justify-between">
      <div className="w-[90%] m-auto text-white">
        <h1 className={`${styles.logo}`}>Let&apos;s Chuumon</h1>
      </div>
    </header>
  );
};

export default Header;
