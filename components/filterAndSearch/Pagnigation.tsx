import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const Pagnigation = (props: any) => {
  const {
    handleNextPage,
    handlePrePage,
    currentPage,
    pageNumber,
    handleChangeCurrentPage,
  } = props;

  return (
    <div className="flex flex-wrap justify-center items-center">
      {currentPage > 1 && (
        <p
          className="btn-pagnigation hover:text-white"
          onClick={() => {
            handlePrePage();
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} style={{ width: "14px" }} />
        </p>
      )}
      {currentPage > 2 && (
        <p
          className="btn-pagnigation"
          onClick={() => {
            handleChangeCurrentPage(1);
          }}
        >
          1
        </p>
      )}
      {currentPage > 2 && (
        <p className="px-[24px] py-[15px] dark:bg-blue-dark rounded cursor-default">
          ...
        </p>
      )}
      {pageNumber
        .slice(currentPage - 1 === 0 ? 1 : currentPage - 1, currentPage + 2)
        .map((item: any) => (
          <p
            className={`btn-pagnigation hover:text-white ${
              currentPage === item &&
              "dark:bg-slate-900 bg-slate-900 text-white"
            }`}
            key={item}
            onClick={() => {
              handleChangeCurrentPage(item);
            }}
          >
            {item}
          </p>
        ))}
      {currentPage < pageNumber.length - 2 && (
        <p className="px-[24px] py-[15px] dark:bg-blue-dark rounded cursor-default">
          ...
        </p>
      )}
      {currentPage < pageNumber.length - 2 && (
        <p
          className="btn-pagnigation"
          onClick={() => {
            handleChangeCurrentPage(pageNumber.length - 1);
          }}
        >
          {pageNumber.length - 1}
        </p>
      )}
      {currentPage < pageNumber.length - 1 && (
        <p
          className="btn-pagnigation hover:text-white"
          onClick={() => {
            handleNextPage();
          }}
        >
          <i>
            <FontAwesomeIcon style={{ width: "14px" }} icon={faAngleRight} />
          </i>
        </p>
      )}
    </div>
  );
};
