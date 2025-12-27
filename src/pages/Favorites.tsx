import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockProperties } from '@/data/mockProperties';
import { Property } from '@/types/property';

export default function Favorites() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Property[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      const favoriteProperties = mockProperties.filter(p => favoriteIds.includes(p.id));
      setFavorites(favoriteProperties);
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Favorites</h1>
          <p className="text-gray-600 dark:text-gray-400">Properties you've saved</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">You haven't added any favorites yet.</p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">Start exploring properties and save your favorites.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}