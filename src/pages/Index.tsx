import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { supabase } from '@/lib/supabase';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (!error) {
      setProperties(data || []);
    }

    setLoading(false);
  };

  // 🔥 Filtreleme artık database verisi üzerinde
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchQuery.toLowerCase());

    if (searchQuery && !matchesSearch) return false;

    if (filters.type && filters.type !== 'all' && property.type !== filters.type) {
      return false;
    }

    if (filters.location && !property.location?.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    if (filters.rooms && filters.rooms !== 'all') {
      if (property.bedrooms !== filters.rooms) return false;
    }

    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;

    if (filters.minSize && property.area < filters.minSize) return false;
    if (filters.maxSize && property.area > filters.maxSize) return false;

    return true;
  });

  const featuredProperties = properties.slice(0, 6);
  const isFiltering = searchQuery !== '' || Object.keys(filters).length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* HERO */}
      <div
        className="relative h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/hero-real-estate-background_variant_2.jpg')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Find Your Dream Home
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button>
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="mb-8">
          <PropertyFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isFiltering
              ? `Search Results (${filteredProperties.length})`
              : 'Featured Properties'}
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            No properties found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(isFiltering ? filteredProperties : featuredProperties).map(
              (property) => (
                <PropertyCard
                  key={property.id}
                  property={{
                    ...property,
                    image: property.images?.[0] || '/placeholder.jpg',
                  }}
                />
              )
            )}
          </div>
        )}

        {!isFiltering && (
          <div className="text-center mt-10">
            <Link to="/properties">
              <Button size="lg" variant="outline">
                View All Properties
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}