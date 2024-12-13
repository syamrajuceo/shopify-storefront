import { ShoppingCart, Truck } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ProductCard2({
  image,
  title,
  originalPrice,
  discountedPrice,
  discount,
  expressDelivery = false,
  className,
}) {
  return (
    <div className={cn("group relative flex flex-col rounded-lg bg-white shadow-md transition-all hover:shadow-lg", className)}>
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount && (
          <div className="absolute left-4 top-4 rounded bg-red-500 px-2 py-1 text-sm font-medium text-white">
            {discount}% off
          </div>
        )}
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
        
        <div className="mb-4 flex items-center gap-2">
          {discountedPrice ? (
            <>
              <span className="text-lg font-bold text-gray-900">AED {discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">AED {originalPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">AED {originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between">
          {expressDelivery && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Truck className="h-4 w-4" />
              <span>Express</span>
            </div>
          )}
          <button className="ml-auto flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
            <ShoppingCart className="h-4 w-4" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
