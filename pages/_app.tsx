import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Loading } from "../components/common/Loading";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
