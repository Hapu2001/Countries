import React from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const Header = (props: any) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div className="flex dark:bg-blue-dark justify-between py-4 px-[50px] shadow-primary items-center sm:px-[15px] ">
      <Link href="">
        <p
          className="text-[18px] font-extrabold  dark:hover:text-blue-dark-text"
          onClick={() => props.handleResetQuery()}
        >
          Where in the world?
        </p>
      </Link>
      <p
        className="cursor-pointer flex items-center dark:hover:text-blue-dark-text"
        onClick={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
      >
        <FontAwesomeIcon style={{ width: "16px" }} icon={faMoon} />{" "}
        <span className="ml-2 ">Dark Mode</span>
      </p>
    </div>
  );
};
