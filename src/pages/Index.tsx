import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import SupabaseWarning from '@/components/SupabaseWarning';
import { properties } from '@/data/mockProperties';
import { PropertyFilters as FilterType } from '@/types/property';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterType>({
    type: 'all',
    priceRange: 'all',
    bedrooms: 'all',
    location: 'all',
  });

  const filteredProperties = properties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filters.type !== 'all' && property.type !== filters.type) return false;
    if (filters.bedrooms !== 'all' && property.bedrooms !== parseInt(filters.bedrooms)) return false;
    if (filters.location !== 'all' && property.location !== filters.location) return false;
    
    if (filters.priceRange !== 'all') {
      const price = property.price;
      switch (filters.priceRange) {
        case '0-500000':
          if (price > 500000) return false;
          break;
        case '500000-1000000':
          if (price < 500000 || price > 1000000) return false;
          break;
        case '1000000+':
          if (price < 1000000) return false;
          break;
      }
    }
    
    return true;
  });

  const featuredProperties = properties.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/hero-real-estate-background_variant_2.jpg')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-white mb-8 drop-shadow-lg">
              Discover the perfect property from our extensive collection
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by location or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button size="lg">
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SupabaseWarning />
        
        {/* Filters */}
        <div className="mb-8">
          <PropertyFilters filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? 'Search Results' : 'Featured Properties'}
          </h2>
          <p className="text-gray-600">
            Showing {filteredProperties.length} properties
          </p>
        </div>

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {(searchQuery ? filteredProperties : featuredProperties).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* View All Button */}
        {!searchQuery && (
          <div className="text-center">
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