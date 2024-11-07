import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/api';
import { formatPrice } from '../lib/utils';
import { Heart, ShoppingBag } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as string)
  });

  if (isLoading) return <div className="flex justify-center pt-20">Loading...</div>;
  if (error) return <div className="text-red-500 pt-20">Error loading product</div>;
  if (!product) return <div className="pt-20">Product not found</div>;

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain p-8"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center space-x-2 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors">
                <ShoppingBag className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 border border-black px-8 py-4 rounded-full hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5" />
                <span>Add to Wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}