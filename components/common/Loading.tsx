import React from "react";

export const Loading = () => {
  return (
    <div className="w-full h-[100vh] bg-white dark:bg-blue-dark-bg  pt-[30vh] ">
      <div className="loading box-border w-[300px] h-[300px] border-blu-dark dark:border-blue-dark rounded-full border-[15px] border-t-blue-dark-bg dark:border-t-white animate-spin-slow mx-auto "></div>
    </div>
  );
};
