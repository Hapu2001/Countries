import React from "react";
import Image from "next/image";

interface Props {
  country: {
    flags: { png: string };
    name: { common: string; nativeName: Record<string, { common: string }> };
    region: string;
    capital: string[];
    population: string;
  };
}

export const CountryCard = (props: Props) => {
  const { flags, name, region, capital, population } = props.country;

  return (
    <div className="shadow-primary hover:shadow-secondary mb-[40px] relative w-[250px] h-[300px] rounded">
      <div>
        <div className="w-[250px]">
          <Image
            className="h-[150px] w-full rounded"
            alt="Image of the country"
            width={150}
            height={150}
            src={flags.png}
          />
        </div>
        <div className="p-5">
          <p className="my-3 font-semibold text-[16px]">{name.common}</p>
          <div>
            <p>
              <span className="my-3 font-semibold">Population:</span>{" "}
              {population}
            </p>
            <p>
              <span className="my-3 font-semibold">Region:</span> {region}
            </p>
            <p>
              <span className="my-3 font-semibold">Capital:</span>{" "}
              {capital ? capital[0] : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
