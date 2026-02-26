import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Favorites() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadFavorites();
  }, [user]);

  const loadFavorites = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        property_id,
        properties (*)
      `)
      .eq('user_id', user?.id);

    if (error) {
      console.error(error);
      toast.error('Failed to load favorites');
    } else {
      // join sonucu nested geliyor
      const propertyList = data.map((item) => item.properties);
      setFavorites(propertyList);
    }

    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Properties you've saved
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading favorites...</div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              You haven't added any favorites yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <PropertyCard
                key={property.id}
                property={{
                  ...property,
                  image: property.images?.[0] || '/placeholder.jpg',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}