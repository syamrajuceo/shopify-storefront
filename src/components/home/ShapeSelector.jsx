import { Link } from "react-router-dom";
import Rounded from "../../assets/round.png";
import Rectangle from "../../assets/rectangleglass.png";
import CatEye from "../../assets/catEyeglass.png";
import aviator from "../../assets/aviator.png";
import Geometric from "../../assets/geomatricglass.png";
import Square from "../../assets/square.png"
import Semi_cateye from "../../assets/semi cateye.png"
import oval from "../../assets/oval.png"
import cateye from "../../assets/catEye.png"

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
    image: cateye,
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
  {
    id: "square",
    name: "Square",
    image: Square,
  },
  {
    id: "oval",
    name: "Oval",
    image: oval,
  },
  {
    id: "semi-cateye",
    name: "Semi Cateye",
    image:Semi_cateye,
  },
];

export default function ShapeSelector() {
  return (
    <div className="p-4 md:p-8 md:mt-6 mx-auto">
      <div className="mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pick your Shape
          </h1>
        </div>

        {/* Scrollable container with centered content */}
        <div className="w-full overflow-x-auto pb-4">
          <div
            className="flex gap-6 px-4 mx-auto"
            style={{
              width: "max-content",
              justifyContent: "center",
            }}
          >
            {shapes.map((shape) => (
              <Link
                key={shape.id}
                className="relative group flex flex-col items-center shrink-0"
                to={{ pathname: "/shape", search: `?shape=${shape.id}` }}
              >
                <div
                  className={`md:h-36 md:w-36 h-24 w-24 border-2 rounded-full overflow-hidden 
                    transition-all duration-300 ease-in-out
                    cursor-pointer transform hover:scale-105
                  `}
                >
                  <img
                    src={shape.image}
                    alt={shape.name}
                    className="max-w-full max-h-full object-contain m-auto block"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-medium text-gray-900">{shape.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
