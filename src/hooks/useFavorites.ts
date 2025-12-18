import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && isSupabaseConfigured()) {
      loadFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const loadFavorites = async () => {
    if (!user || !isSupabaseConfigured()) return;

    try {
      const { data, error } = await supabase
        .from('app_13f02_favorites')
        .select('property_id')
        .eq('user_id', user.id);

      if (error) throw error;

      setFavorites(data.map((fav) => fav.property_id));
    } catch (error) {
      console.error('Error loading favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (propertyId: string) => {
    if (!user) {
      toast.error('Please sign in to add favorites');
      return false;
    }

    if (!isSupabaseConfigured()) {
      toast.error('Supabase is not configured. Please set up your Supabase credentials.');
      return false;
    }

    try {
      const { error } = await supabase
        .from('app_13f02_favorites')
        .insert({
          user_id: user.id,
          property_id: propertyId,
        });

      if (error) throw error;

      setFavorites([...favorites, propertyId]);
      toast.success('Added to favorites');
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      toast.error('Failed to add favorite');
      return false;
    }
  };

  const removeFavorite = async (propertyId: string) => {
    if (!user) return false;

    if (!isSupabaseConfigured()) {
      toast.error('Supabase is not configured. Please set up your Supabase credentials.');
      return false;
    }

    try {
      const { error } = await supabase
        .from('app_13f02_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('property_id', propertyId);

      if (error) throw error;

      setFavorites(favorites.filter((id) => id !== propertyId));
      toast.success('Removed from favorites');
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove favorite');
      return false;
    }
  };

  const toggleFavorite = async (propertyId: string) => {
    if (favorites.includes(propertyId)) {
      return await removeFavorite(propertyId);
    } else {
      return await addFavorite(propertyId);
    }
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}