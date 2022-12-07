import React from "react";
import Select from "react-select";
import { useTheme } from "next-themes";

export const RegionFilter = (props: any) => {
  const { theme } = useTheme();
  const options = [
    { id: "1", value: "africa", label: "Africa" },
    { id: "2", value: "americas", label: "America" },
    { id: "3", value: "asia", label: "Asia" },
    { id: "4", value: "europe", label: "Europe" },
    { id: "5", value: "oceania", label: "Oceania" },
  ];
  const customStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor:
        theme === "light" ? "rgb(255 255 255)" : "hsl(209, 23%, 22%)",
      boxShadow: "0 0px 10px 4px rgba(0, 0, 0, 0.08)",
      border: 0,
      color: theme === "light" ? "hsl(200, 15%, 8%)" : "rgb(255 255 255)",
      padding: 5.5,
      width: 200,
      cursor: "pointer",
    }),
    option: (styles: any, state: any) => ({
      ...styles,
      backgroundColor:
        theme === "light"
          ? state.isSelected
            ? "hsl(207, 26%, 17%)"
            : "rgb(255 255 255)"
          : state.isSelected
          ? "rgb(15, 23, 42)"
          : "hsl(209, 23%, 22%)",
      border: "none",
      cursor: "pointer",
      color: theme === "light" ? "hsl(200, 15%, 8%)" : "rgb(255 255 255)",
      "&:hover": {
        backgroundColor:
          theme === "light" ? "hsl(207, 26%, 17%)" : "rgb(15, 23, 42)",
        color: "rgb(255, 255, 255)",
      },
    }),
    Input: (styles: any) => ({
      ...styles,
      border: 0,
      margin: 0,
      padding: 0,
      color: "hsl(200, 15%, 8%)",
    }),
    valueContainer: (styles: any) => ({
      ...styles,
      border: 0,
      padding: 0,
    }),
    menu: (styles: any) => ({
      ...styles,
      padding: 0,
      backgroundColor:
        theme === "light" ? "rgb(255 255 255)" : "hsl(209, 23%, 22%)",
    }),
    singleValue: (provided: any) => {
      return {
        ...provided,
        color: theme === "light" ? "hsl(200, 15%, 8%)" : "rgb(255, 255, 255)",
      };
    },
    placeholder: (styles: any) => ({
      ...styles,
      color: theme === "light" ? "hsl(200, 15%, 8%)" : "rgb(255 255 255)",
    }),
  };

  return (
    <div className="sm:w-[200px] ">
      <Select
        placeholder={"Filter by Region"}
        id="long-value-select"
        instanceId="long-value-select"
        styles={customStyles}
        options={options}
        onChange={(e: any) => {
          props.handleChangeSetRegion(e.value);
        }}
        defaultValue={options.find((item) => item.value === props.region)}
      />
    </div>
  );
};
