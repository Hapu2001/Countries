import React from "react";
import { Header } from "../../components/common/Header";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import useSWR, { SWRConfig } from "swr";
import { Loading } from "../../components/common/Loading";
import { usePageLoading } from "../../components/common/usePageLoading";
import Image from "next/image";
import { useRouter } from "next/router";

interface CountryData {
  countryData: {
    flags: { png: string };
    name: { common: string; nativeName: Record<string, { common: string }> };
    population: number;
    region: string;
    capital: string[];
    currencies: Record<string, any>;
    languages: Record<string, any>;
    subregion: string;
    tld: string[];
    borders: string[];
  };
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Country = () => {
  const router = useRouter();
  const query = router.query;
  const path = router.pathname;
  const { isPageLoading } = usePageLoading();
  const { data, error } = useSWR("/api/name");
  const nativeName =
    data.name.nativeName[Object.keys(data.name.nativeName)[0]].common;
  const currenciesRender =
    data.currencies[Object.keys(data.currencies)[0]].name;
  const handleResetQuery = () => {
    router.push({
      pathname: "/",
    });
  };
  if (!data) {
    return <Loading />;
  }
  return (
    <div
      className={`dark:text-white text-[16px] dark:bg-blue-dark-bg ${
        data.borders.length < 6 ? "h-[100vh]" : "h-auto"
      } md:h-auto sm:h-auto`}
    >
      <Header handleResetQuery={handleResetQuery} />
      {isPageLoading ? (
        <Loading />
      ) : (
        <div className="w-[1440px] mx-auto md:w-auto pb-[40px] md:pb-[50px] px-[30px] sm:w-auto sm:px-[15px] sm:pb-[15px]">
          <Link href={"/"}>
            <div className="flex items-center w-[150px] rounded shadow-primary dark:bg-blue-dark justify-center my-[60px] px-[20px] py-[10px] dark:hover:bg-slate-900 hover:bg-blue-dark-bg hover:text-white">
              <p className="mr-[15px]">
                <FontAwesomeIcon icon={faArrowLeft} />
              </p>
              <p>Back</p>
            </div>
          </Link>
          <div>
            {data && (
              <div className="flex justify-between items-center md:flex-col sm:flex-wrap">
                <div className="basis-1/2 md:mb-[25px] sm:basis-full">
                  <Image
                    className="h-[350px] sm:w-full sm:h-auto"
                    alt="Picture of the country"
                    width={550}
                    height={350}
                    src={data.flags.png}
                  />
                </div>
                <div className="basis-1/2 sm:basis-full px-4 sm:px-0 sm:mt-5">
                  <p className="font-extrabold text-[18px] mb-6">
                    {data.name.common}
                  </p>
                  <div className="flex justify-between sm:flex-wrap ">
                    <div className="sm:basis-full grid gap-y-[16px] sm:mb-[50px]">
                      <p>
                        <span className="font-semibold ">Native Name: </span>
                        {nativeName}
                      </p>
                      <p>
                        <span className="font-semibold ">Population: </span>
                        {data.population}
                      </p>
                      <p>
                        <span className="font-semibold">Region: </span>
                        {data.region}
                      </p>
                      <p>
                        <span className="font-semibold">Sub Region: </span>
                        {data.subregion}
                      </p>
                      <p>
                        <span className="font-semibold">Capital: </span>
                        {data.capital[0]}
                      </p>
                    </div>
                    <div className="sm:basis-full grid gap-y-[16px] content-start ">
                      <p>
                        <span className="font-semibold">
                          Top Level Domain:{" "}
                        </span>
                        {data.tld[0]}
                      </p>
                      <p>
                        <span className="font-semibold">Currencies: </span>
                        {currenciesRender}
                      </p>
                      <p>
                        <span className="font-semibold">Languages: </span>
                        {Object.keys(data.languages).map((item, index) => (
                          <span key={item}>
                            {data.languages[item]}
                            {index === Object.keys(data.languages).length - 1
                              ? ""
                              : ","}{" "}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  {data.borders.length > 0 && (
                    <div className="flex items-start mt-[50px] sm:flex-wrap">
                      <span className="font-semibold basis-1/4 sm:basis-full sm:mb-[16px] ">
                        Border Countries:
                      </span>
                      <div className="basis-3/4 grid grid-cols-3 gap-[5px] sm:gap-[5px] sm:justify-between sm:basis-full ">
                        {data.borders.map((item: string) => (
                          <Link href={`/countries/${item}`} key={item}>
                            {" "}
                            <p className="rounded px-[20px] py-[10px] dark:bg-blue-dark w-[150px] text-center shadow-primary sm:mx-0 sm:w-full flex-wrap dark:hover:bg-slate-900 hover:bg-blue-dark-bg hover:text-white">
                              {item}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default function Detail({ fallback }: any) {
  return (
    <SWRConfig value={{ fallback }}>
      <Country />
    </SWRConfig>
  );
}
export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const tempCountryData = await fetcher(
    `https://restcountries.com/v3.1/name/${params.name}`
  );
  let couuntryData = {
    ...tempCountryData[0],
    population: tempCountryData[0].population
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
  };
  let borderData = [];
  if (tempCountryData[0].borders) {
    borderData = await fetcher(
      `https://restcountries.com/v3.1/alpha?codes=${tempCountryData[0].borders.join(
        ","
      )}`
    );
    borderData = borderData.map(
      (item: { name: { common: any } }) => item.name.common
    );
  }
  return {
    props: {
      fallback: {
        "/api/name": { ...couuntryData, borders: borderData },
      },
    },
  };
};
