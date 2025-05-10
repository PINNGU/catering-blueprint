import "./Description.css"
import {ReactComponent as LocationIcon} from "../assets/map-pin.svg"
import {ReactComponent as PhoneIcon} from "../assets/phone.svg"
import {ReactComponent as InstagramIcon} from "../assets/instagram.svg"

function Description(){

    return (
        <div  className="desc">
<h1><a href="#">Poručite</a> ili svratite svakim radnim danom od 10 do 16h. <br />Dobrodošli!</h1>
        <span><LocationIcon className="location-icon"></LocationIcon> Temerinska 7, Novi Sad</span>
        <br />
        <span><PhoneIcon className="location-icon"></PhoneIcon>   0644902757</span>
        <br />
        <span><InstagramIcon className="insta-icon"></InstagramIcon> <a className="insta-link" href="https://www.instagram.com/zalogajsavrsen/">zalogajsavrsen</a>   </span>
        </div>
    );
};

export default Description