import "./Description.css";
import { ReactComponent as LocationIcon } from "../assets/map-pin.svg";
import { ReactComponent as PhoneIcon } from "../assets/phone.svg";
import { ReactComponent as InstagramIcon } from "../assets/instagram.svg";
import Swal from "sweetalert2";
import React from "react";

function Description() {
  const handleCopy = async (e) => {
    e.preventDefault();
    const numberToCopy = "0644902757";
    try {
      await navigator.clipboard.writeText(numberToCopy);
      Swal.fire({
        title: "Broj je kopiran!",
        text: `${numberToCopy} je uspešno kopiran u vaš clipboard.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        title: "Greška!",
        text: "Kopiranje nije uspelo.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="desc">
      <h1>
        <a href="#" onClick={handleCopy}>Poručite</a> ili svratite svakim radnim danom od 10 do 16h.
        <br />
        <b>Dobrodošli!</b>
      </h1>
      <span><LocationIcon className="location-icon" /> Temerinska 7, Novi Sad</span>
      <br />
      <span><PhoneIcon className="location-icon" />{" "}
        <a href="#" onClick={handleCopy}>0644902757</a>
      </span>
      <br />
      <span>
        <InstagramIcon className="insta-icon" />{" "}
        <a
          className="insta-link"
          href="https://www.instagram.com/zalogajsavrsen/"
          target="_blank"
          rel="noopener noreferrer"
        >
          zalogajsavrsen
        </a>
      </span>
    </div>
  );
}

export default Description;
