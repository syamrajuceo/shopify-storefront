import { useState } from "react";
import DG from "../../assets/D&G.png";
import Burberry from "../../assets/Burberry.png";
import TiffanyCo from "../../assets/Tiffany&co.png";
import TiffanyCologo from "../../assets/Tiffy.svg";
import ArmaniExchange from "../../assets/ArmaniExange.png";
import Vouge from "../../assets/Vouge.png";
import DgLoGO from "../../assets/dglogo2.png";
import ArmaniXlogo from "../../assets/ArmaniXlogo.png";
import Vougelogo from "../../assets/vougeLogo.png";
import oakelylogo from "../../assets/oakleylogo.png";
import BurberryLogo from "../../assets/BurberryLogo.svg";
import versacelogo from "../../assets/versaceLogo.svg";
import versaceBrand from "../../assets/versaceBrand.png";
import michaelkrosBrand from "../../assets/michelkrosBrand.png";
import michaelkrosLogo from "../../assets/michelkroslogo.svg";
import raybanlogo from "../../assets/raybanLogo.svg";
import raybanBrand from "../../assets/raybanBrand.png";
import oakelyBrand from "../../assets/okleyabrand.png";
import amaraBrand from "../../assets/amaraBrand.png";
import amaralogo from "../../assets/AmaraLogo.svg";
import gucciBrand from "../../assets/gucciBrand2.jpg";
import gucciLogo from "../../assets/gucci-4.svg";
import pradaBrand from "../../assets/pradaBrand2.jpg";
import pradaLogo from "../../assets/prada-logo-1.svg";
import { Link } from "react-router-dom";
function Brand() {
  const brands = [
    {
      name: "D&G",
      image: DG,
      logo: DgLoGO,
      id: "d&g",
    },
    {
      name: "BURBERRY",
      image: Burberry,
      logo: BurberryLogo,
      id: "Burberry",
    },
    {
      name: "Gucci",
      image: gucciBrand,
      logo: gucciLogo,
      id: "gucci",
    },
    {
      name: "tiffany&CO",
      image: TiffanyCo,
      logo: TiffanyCologo,
      id: "tiffany&co",
    },
    {
      name: ":Vouge",
      image: Vouge,
      logo: Vougelogo,
      id: "vouge",
    },
    {
      name: "ARMANI EXCHANGE",
      image: ArmaniExchange,
      logo: ArmaniXlogo,
      id: "Armani-Exchange",
    },
    {
      name: "versacelogo",
      image: versaceBrand,
      logo: versacelogo,
      id: "versacelogo",
    },
    {
      name: "rayban",
      image: raybanBrand,
      logo: raybanlogo,
      id: "Ray-Ban",
    },
    {
      name: "prada",
      image: pradaBrand,
      logo: pradaLogo,
      id: "prada",
    },
    {
      name: "OAKLEY",
      image: oakelyBrand,
      logo: oakelylogo,
      id: "oakley",
    },
    {
      name: "AMARA",
      image: amaraBrand,
      logo: amaralogo,
      id: "amara",
    },
    {
      name: "MICHAEL KORS",
      image: michaelkrosBrand,
      logo: michaelkrosLogo,
      id: "michael kors",
    },
  ];

  return (
    <div className="  py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <h1 className="text-1xl font-bold text-center text-gray-900 mb-12">
          Pick your Brand
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={{ pathname: "/shop/brand", search: `?query=${brand.id}` }}
            >
              <div className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105">
                <div className="aspect-[16/9]">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center  ">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center  ">
                      <img
                        src={brand.logo}
                        alt="logo"
                        className="object-contain w-[80%] h-[80%]"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brand;
