import Head from "next/head";
import Image from "next/image";
import Styles from "../styles/stylesheet";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home({}) {
  const [showSongs, setShowSongs] = useState(false);
  const [songDataArray, setSongDataArray] = useState([]);

  function getTokenPromise() {
    var authOptions = {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization:
          "Basic OTMyMWUxZjAwYjZiNDIyNWE4Yzg5NDVmODVjODllOGM6NzhkMGM5Mzg4N2M5NGEyMzgyOTNmZjViOWFiODgxNDY=",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      json: true,
    };
    return fetch("https://accounts.spotify.com/api/token", authOptions);
  }

  const getSongDetailsPromise = async () => {
    setShowSongs(true);
    let token1 = getTokenPromise()
      .then((response) => response.json())
      .then((value) => {
        return value["access_token"];
      });
    const token = await token1;
    if (process.browser) {
      var song = document.getElementById("songNameInput").value;
    }
    return fetch(
      "https://api.spotify.com/v1/search?q=" + song + "&type=track",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
  };

  function Song(data) {
    const name = data["data"]["name"];
    const artists = data["data"]["artists"];
    const artist = "";
    for (const x of artists) {
      artist += x["name"] + ", ";
    }
    artist = artist.slice(0, -2);
    const coverUrl = data["data"]["album"]["images"][0]["url"];
    const songUrl = data["data"]["external_urls"]["spotify"];

    const item = {
      hidden: { x: -2000 },
      visible: { x: 0 },
      transition: { duration: 0.3, delay: -0.1 },
    };
    return (
      <>
        <motion.div
          variants={item}
          whileHover={{ scale: 1.1 }}
          style={Styles["Song"]}
        >
          <img style={Styles["coverImage"]} src={coverUrl} alt={name}></img>
          <div style={Styles["textDiv"]}>
            <h3>{name}</h3>
            <h5>{artist}</h5>
          </div>
          <a href={songUrl} style={Styles["spotifyLogo"]} target="blank">
            <img
              src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-download-logo-30.png"
              style={Styles["spotifyLogo"]}
            ></img>
          </a>
        </motion.div>
      </>
    );
  }
  async function getSongData() {
    let songData = getSongDetailsPromise()
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    songData = await songData;
    let arrayOfData = songData["tracks"]["items"].map((data) => {
      return data;
    });
    setSongDataArray(arrayOfData);
  }
  function SongList() {
    const list = {
      hidden: {
        opacity: 0,
        transition: {
          when: "afterChildren",
        },
      },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.3,
        },
      },
    };
    return (
      <>
        <motion.div initial="hidden" animate="visible" variants={list}>
          {songDataArray.map((data) => {
            return <Song data={data}></Song>;
          })}
        </motion.div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Great</title>
      </Head>
      <section>
        <div style={Styles["section"]}>
          <h1 style={Styles["heading"]}>Find your song!</h1>
          <div style={Styles["searchBar"]}>
            <motion.input
              name="songNameInput"
              id="songNameInput"
              type="text"
              style={Styles["input"]}
            ></motion.input>
            <button style={Styles["goButton"]} onClick={getSongData}>
              Go
            </button>
          </div>
        </div>
      </section>
      <section>{showSongs && <SongList></SongList>}</section>
    </>
  );
}
