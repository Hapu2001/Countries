import Head from "next/head";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Search } from "../components/filterAndSearch/Search";
import { RegionFilter } from "../components/filterAndSearch/RegionFilter";
import { CountryCard } from "../components/country/CountryCard";
import { Header } from "../components/common/Header";
import { Pagnigation } from "../components/filterAndSearch/Pagnigation";
import { useRouter } from "next/router";
import Country from "./countries/[name]";
import useSWR, { SWRConfig } from "swr";
import { Loading } from "../components/common/Loading";
import { GetServerSideProps } from "next";
import { usePageLoading } from "../components/common/usePageLoading";
import PageNotFound from "../components/common/PageNotFound";

interface Country {
  flags: { png: string };
  name: { common: string; nativeName: Record<string, { common: string }> };
  population: string;
  region: string;
  capital: string[];
  currencies: Record<string, any>;
  languages: Record<string, any>;
  subregion: string;
  tld: string[];
  borders: string[];
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const GetData = () => {
  const { isPageLoading } = usePageLoading();
  const router = useRouter();
  const query = router.query;
  const path = router.pathname;
  const { data, error } = useSWR("/api/countries");
  const [region, setRegion] = useState("");
  const [listCountries, setListCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [listSearch, setListSearch] = useState<Country[]>([]);
  // configPagnigations
  const countryPerPage = 8;
  const [pageNumber, setPageNumber] = useState<number[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const handleChangeCurrentPage = (page: number) => {
    setCurrentPage(page);
    setLastIndex(countryPerPage * page);
    setStartIndex(countryPerPage * page - 8);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setStartIndex(startIndex + countryPerPage);
    setLastIndex(lastIndex + countryPerPage);
  };
  const handlePrePage = () => {
    setCurrentPage(currentPage - 1);
    setStartIndex(startIndex - countryPerPage);
    setLastIndex(lastIndex - countryPerPage);
  };
  ///////////////GetData/////////////////////////////////
  const handleChangeSetRegion = (region: string) => {
    setRegion(region);
    query.region = region;
    router.push({
      pathname: path,
      query: query,
    });
  };
  const onFormSubmit = (e: any) => {
    e.preventDefault();
    let name = e.target.elements.inputSearch.value;
    setSearch(name);
    query.name = name;
    router.push({
      pathname: path,
      query: query,
    });
  };
  useEffect(() => {
    let tempPageNumber: number[] = [];
    for (
      let i = 0;
      i <=
      Math.ceil(
        (search || region ? listSearch.length : listCountries.length) /
          countryPerPage
      );
      i++
    ) {
      tempPageNumber.push(i);
    }
    setPageNumber(tempPageNumber);
    setCurrentPage(1);
    setStartIndex(0);
    setLastIndex(8);
  }, [listCountries.length, search, listSearch.length, region]);
  useEffect(() => {
    const handlePreLoad = async () => {
      setListSearch([]);
      if (query.name && query.region) {
        setSearch(query.name as string);
        setRegion(query.region as string);
        let tempListFilter: Country[];
        await fetch(`https://restcountries.com/v3.1/region/${query.region}`)
          .then((res) => res.json())
          .then((data) => {
            const tempListFilter2 = data ? [...data] : [];
            tempListFilter = tempListFilter2.filter((country: Country) =>
              country.name.common
                .toLocaleLowerCase()
                .includes(query.name as string)
            );
          });
        return setListSearch(tempListFilter!);
      }
      if (query.name) {
        setSearch(query.name as string);
        let tempListSearch = [...data];
        tempListSearch = tempListSearch.filter((country: Country) =>
          country.name.common.toLocaleLowerCase().includes(query.name as string)
        );
        setListSearch(tempListSearch);
      }
      if (query.region) {
        await fetch(`https://restcountries.com/v3.1/region/${query.region}`)
          .then((res) => res.json())
          .then((data) => setListSearch(data));
      }
    };
    handlePreLoad();
  }, [query.name, query.region, search, region]);
  useEffect(() => {
    setListCountries(data || []);
  }, []);
  ///////////////////RenderCountriesTrueCondiTion/////////////////////////////////////////
  let tempListCountries =
    listSearch.length > 0
      ? listSearch.slice(startIndex, lastIndex)
      : listCountries.slice(startIndex, lastIndex);
  ///////////////////LazyLoadData/////////////////////////////////////////
  if (tempListCountries.length === 0) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Countries</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-blue-dark-text text-[14px] bg-white dark:bg-blue-dark-bg  dark:text-white ">
        <Header />
        {isPageLoading ? (
          <Loading />
        ) : (
          <div
            className={`w-[1200px] mx-auto pb-[25px] md:w-auto md:px-[25px] sm:w-auto ${
              tempListCountries.length < 4 && "h-[100vh]"
            } `}
          >
            <div className="flex justify-between my-10 sm:flex-col sm:justify-center sm:px-[15px] ">
              <Search onFormSubmit={onFormSubmit} search={search} />
              <RegionFilter
                region={region}
                handleChangeSetRegion={handleChangeSetRegion}
              />
            </div>
            <div className="flex flex-wrap justify-start gap-x-[60px] sm:justify-center sm:px-[15px] ">
              {listSearch.length === 0 && (region || search) ? (
                <PageNotFound />
              ) : (
                tempListCountries.map((country: Country) => {
                  return (
                    <div key={country.name.common}>
                      <Link href={`/countries/${country.name.common}`}>
                        <CountryCard country={country} />
                      </Link>
                    </div>
                  );
                })
              )}
              {}
            </div>
            <div>
              <Pagnigation
                pageNumber={pageNumber}
                handleNextPage={handleNextPage}
                handlePrePage={handlePrePage}
                currentPage={currentPage}
                handleChangeCurrentPage={handleChangeCurrentPage}
              />
            </div>
          </div>
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default function Home({ fallback }: any) {
  return (
    <SWRConfig value={{ fallback }}>
      <GetData />
    </SWRConfig>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let tempCountries = await fetcher("https://restcountries.com/v3.1/all");
  let countries = tempCountries.map((country: Country) => ({
    ...country,
    population: country.population
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","),
  }));
  return {
    props: {
      fallback: {
        "/api/countries": countries,
      },
    },
  };
};
