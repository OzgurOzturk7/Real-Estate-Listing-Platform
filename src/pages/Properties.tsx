import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter, ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Properties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [sortOrder, setSortOrder] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('properties')
      .select('*');

    if (error) {
      console.error(error);
    } else {
      setProperties(data || []);
    }

    setLoading(false);
  };

  const filteredProperties = properties
    .filter((property) => {
      if (filters.location && !property.location?.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          All Properties
        </h1>

        {loading ? (
          <div className="text-center py-12">Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            No properties found.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}