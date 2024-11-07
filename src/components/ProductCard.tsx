import { useState } from 'react';
import { Heart, Edit2, Save, X, Trash2 } from 'lucide-react';
import { Product } from '../types';
import Toast from './Toast';

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onUpdate?: (product: Product) => void;
  onDelete?: () => void;
  onQuickView?: () => void;
}

export default function ProductCard({ 
  product, 
  isAdmin, 
  onUpdate, 
  onDelete,
  onQuickView 
}: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSave = () => {
    if (onUpdate) {
      const updatedProduct = {
        ...editedProduct,
        updatedAt: new Date().toISOString()
      };
      onUpdate(updatedProduct);
      setToastMessage('Product updated successfully');
      setShowToast(true);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h3 className="font-medium">Edit Product</h3>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="p-2 rounded-full bg-accent-600 text-white hover:bg-accent-700 transition-colors"
              title="Save changes"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              title="Cancel editing"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent-500"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={editedProduct.description}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={editedProduct.category}
              onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent-500"
            >
              <option value="Electronics">Electronics</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Watches">Watches</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={editedProduct.image}
              onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          {isAdmin && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-full bg-accent-600 text-white hover:bg-accent-700 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={onDelete}
                className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
          <button className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        {onQuickView && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={onQuickView}
              className="w-full bg-white text-black py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Quick View
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg mb-1">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
        </div>
        <span className="text-sm text-gray-500">{product.category}</span>
      </div>

      <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}