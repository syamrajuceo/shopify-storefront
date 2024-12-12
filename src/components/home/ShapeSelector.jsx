import { useState } from 'react';
import Rounded from '../../assets/roundglass.png'
import Rectangle from '../../assets/rectangle.png'
import CatEye from '../../assets/catEye.png'
import aviator from '../../assets/aviator.png'
import Geometric from '../../assets/geomatric.png'
const shapes = [
  {
    id: 'round',
    name: 'Round',
    image: Rounded
  },
  {
    id: 'rectangle',
    name: 'Rectangle',
    image:  Rectangle
  },
  {
    id: 'cat-eye',
    name: 'Cat Eye',
    image:  CatEye 
  },
  {
    id: 'aviator',
    name: 'Aviator',
    image:aviator
  },
  {
    id: 'geometric',
    name: 'Geometric',
    image: Geometric
  }
];

export default function ShapeSelector() {
  const [selectedShape, setSelectedShape] = useState(null);

  return (
    <div className="min-h-  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pick your Shape</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  md:w-[70%] mx-auto ">
          {shapes.map((shape) => (
            <div
              key={shape.id}
              className="relative group flex flex-col items-center  "
              onClick={() => setSelectedShape(shape.id)}
            >
              <div
                className={`
                 h-36 w-36 border-2  rounded-full overflow-hidden 
                  transition-all duration-300 ease-in-out
                  cursor-pointer transform hover:scale-105
                  ${selectedShape === shape.id ? ' ring-offset-4' : ''}
                  hover:shadow-lg
                `}
              >
                <div className="absolute inset-0  group-hover:bg-opacity-20 transition-all duration-300" />
                <img
                  src={shape.image}
                  alt={shape.name}
                  className="max-w-full max-h-full object-contain m-auto  block "
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">{shape.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
