import { useState } from 'react';

function Brand() {
  const brands = [
    {
        name: 'D&G',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=684&h=384',
      },
      {
        name: 'D&G',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=684&h=384',
      },
      {
        name: 'D&G',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=684&h=384',
      },
    {
      name: 'BURBERRY',
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=684&h=384',
    },
    {
      name: 'TIFFANY & CO.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=684&h=384',
    },
    {
      name: 'ARMANI EXCHANGE',
      image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=684&h=384',
    },
    {
      name: 'VOGUE',
      image: 'https://images.unsplash.com/photo-1596510914965-9ae08acae566?auto=format&fit=crop&q=80&w=684&h=384',
    },
    {
      name: 'VERSACE',
      image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=684&h=384',
    },
    {
      name: 'RAY-BAN',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=684&h=384',
    },
    {
      name: 'OAKLEY',
      image: 'https://images.unsplash.com/photo-1625591339971-4c9a87a66871?auto=format&fit=crop&q=80&w=684&h=384',
    },
    {
      name: 'AMARA',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=684&h=384',
    },
    {
      name: 'MICHAEL KORS',
      image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&q=80&w=684&h=384',
    },
  ];

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <h1 className="text-1xl font-bold text-center text-gray-900 mb-12">
          Pick your Brand
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="aspect-[16/9]">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-white text-2xl font-bold tracking-wider">
                    {brand.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brand;