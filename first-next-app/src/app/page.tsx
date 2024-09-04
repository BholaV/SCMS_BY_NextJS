"use client"
// pages/index.js
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Head from "next/head";
import DashboardLayoutBranding from "./dashboard/page";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [active,setActive] = useState(false);
  useEffect(() => {
    if(!localStorage.getItem("user")){
      redirect("/users/sign-in")
    }else{
      setActive(true);
      redirect("/")
    }
  }, [])
  return (
    <>
      <Head>
        <title>My Project...</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
          integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
          crossOrigin="anonymous"
          defer
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
          defer
        ></script>
      </Head>
      {active &&
      <main >
        <DashboardLayoutBranding/>
        {/* <Link href="/users/sign-up">click me</Link> */}
      </main>}
    </>
  );
}
