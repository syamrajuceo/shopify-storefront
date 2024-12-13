import { useState } from "react";
import Rounded from "../../assets/round.png";
import Rectangle from "../../assets/rectangleglass.png";
import CatEye from "../../assets/catEyeglass.png";
import aviator from "../../assets/aviator.png";
import Geometric from "../../assets/geomatricglass.png";
const shapes = [
  {
    id: "round",
    name: "Round",
    image: Rounded,
  },
  {
    id: "rectangle",
    name: "Rectangle",
    image: Rectangle,
  },
  {
    id: "cat-eye",
    name: "Cat Eye",
    image: CatEye,
  },
  {
    id: "aviator",
    name: "Aviator",
    image: aviator,
  },
  {
    id: "geometric",
    name: "Geometric",
    image: Geometric,
  },
];

export default function ShapeSelector() {
  return (
    <div className=" p-4 md:p-8 md:mt-6 mx-auto">
      <div className=" mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pick your Shape
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:w-[70%] mx-auto flex-wrap  justify-center items-center gap-3">

           
        <div className="grid grid-cols-3 gap-3">
          <div className="relative group flex flex-col items-center  ">
            <div
              className={`
                 md:h-36 md:w-36 h-24 w-24 border-2  rounded-full overflow-hidden 
                  transition-all duration-300 ease-in-out
                  cursor-pointer transform hover:scale-105
                `}
            >
              <img
                src={Rounded}
                alt={"rounded"}
                className="max-w-full max-h-full object-contain m-auto block "
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">Rounded</h3>
            </div>
          </div>
          <div className="relative group flex flex-col items-center  ">
            <div
              className={`
                 md:h-36 md:w-36 h-24 w-24 border-2  rounded-full overflow-hidden 
                  transition-all duration-300 ease-in-out
                  cursor-pointer transform hover:scale-105
                `}
            >
              <img
                src={Rectangle}
                alt={"Rectangle"}
                className="max-w-full max-h-full object-contain m-auto block "
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">Rectangle</h3>
            </div>
          </div>

          <div className="relative group flex flex-col items-center  ">
            <div
              className={`
                 md:h-36 md:w-36 h-24 w-24 border-2  rounded-full overflow-hidden 
                  transition-all duration-300 ease-in-out
                  cursor-pointer transform hover:scale-105
                `}
            >
              <img
                src={CatEye}
                alt={"cateye"}
                className="max-w-full max-h-full object-contain m-auto block "
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">Cat Eye</h3>
            </div>
          </div>
          </div>

         <div className="grid grid-cols-2  gap-3">
          <div className="relative group flex flex-col items-center  ">
            <div
              className={`
                 md:h-36 md:w-36 h-24 w-24 border-2  rounded-full overflow-hidden 
                  transition-all duration-300 ease-in-out
                  cursor-pointer transform hover:scale-105
                `}
            >
              <img
                src={aviator}
                alt={"aviator"}
                className="max-w-full max-h-full object-contain m-auto block "
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">{"Aviator"}</h3>
            </div>
          </div>
          <div className="relative group flex flex-col items-center  ">
            <div
              className={`
                 md:h-36 md:w-36 h-24 w-24 border-2  rounded-full overflow-hidden 
                  transition-all duration-300 ease-in-out
                  cursor-pointer transform hover:scale-105
                `}
            >
              <img
                src={Geometric}
                alt={"Geometric"}
                className="max-w-full max-h-full object-contain m-auto block "
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-900">Geometric</h3>
            </div>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
}
