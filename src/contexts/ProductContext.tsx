import { createContext, useContext, useState } from 'react';
import { Product } from '../types';
import toast from 'react-hot-toast';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => Promise<void>;
  getProductsByCategory: (category: string) => Product[];
}

const initialProducts: Product[] = [
  // Electronics
  {
    id: 'e1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'e2',
    name: 'Smart 4K TV',
    description: 'Ultra HD Smart TV with HDR and built-in streaming apps.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Men's Products
  {
    id: 'm1',
    name: 'Classic White Shirt',
    description: 'Premium cotton dress shirt for formal occasions.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    category: 'Men',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'm2',
    name: 'Slim Fit Jeans',
    description: 'Comfortable slim fit jeans in dark wash.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    category: 'Men',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Women's Products
  {
    id: 'w1',
    name: 'Designer Handbag',
    description: 'Luxury leather handbag with gold hardware.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    category: 'Women',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'w2',
    name: 'Floral Maxi Dress',
    description: 'Elegant floral print maxi dress for summer.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    category: 'Women',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Watches
  {
    id: 'watch1',
    name: 'Luxury Chronograph Watch',
    description: 'Premium chronograph watch with leather strap.',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    category: 'Watches',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'watch2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=800',
    category: 'Watches',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addProduct = (product: Product) => {
    try {
      const newProduct = {
        ...product,
        id: `prod_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProducts(prev => [...prev, newProduct]);
      toast.success('Product added successfully');
    } catch (error) {
      toast.error('Failed to add product');
      setError('Failed to add product');
    }
  };

  const updateProduct = (updatedProduct: Product) => {
    try {
      setProducts(prev => {
        const newProducts = prev.map(product => 
          product.id === updatedProduct.id 
            ? { 
                ...updatedProduct, 
                updatedAt: new Date().toISOString() 
              }
            : product
        );
        return newProducts;
      });
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
      setError('Failed to update product');
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      setProducts(prev => prev.filter(product => product.id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
      setError('Failed to delete product');
      throw error;
    }
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => 
      category === 'All' ? true : product.category === category
    );
  };

  const value = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}