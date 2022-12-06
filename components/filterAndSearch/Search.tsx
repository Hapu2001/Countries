import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const Search = (props: any) => {
  return (
    <form onSubmit={props.onFormSubmit}>
      <div className="flex items-center relative sm:mb-[35px] ">
        <input
          className="dark:bg-blue-dark pr-3 pl-[50px] py-3 w-[300px] focus:border-blue-dark-bg 
          dark:border-blue-dark-bg outline-none border-2 dark:focus:invalid:border-blue-dark-bg  shadow-primary rounded dark:focus:border-slate-900 sm:w-full"
          type="text"
          placeholder="Search for a country..."
          name="inputSearch"
          defaultValue={props.search}
        ></input>

        <FontAwesomeIcon
          type="submit"
          className="absolute left-[17px] w-[14px] cursor-pointer "
          icon={faMagnifyingGlass}
        />
      </div>
    </form>
  );
};
