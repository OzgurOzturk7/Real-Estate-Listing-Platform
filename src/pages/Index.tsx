import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import SupabaseWarning from '@/components/SupabaseWarning';
import { mockProperties } from '@/data/mockProperties';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // PropertyFilters bileşeninden gelen veriyi tutacak state
  const [filters, setFilters] = useState<any>({});

  const filteredProperties = mockProperties.filter((property) => {
    // 1. ARAMA KUTUSU MANTIĞI
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Arama kutusu doluysa ve eşleşme yoksa gizle
    if (searchQuery && !matchesSearch) return false;

    // 2. FİLTRELEME MANTIĞI

    // Type (Sale / Rent)
    if (filters.type && filters.type !== 'all' && property.type !== filters.type) {
        return false;
    }

    // Location (Filtre kutusundaki location)
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
    }

    // Bedrooms (Filter 'rooms' yolluyor, Data 'bedrooms' tutuyor)
    if (filters.rooms && filters.rooms !== 'all') {
        if (property.bedrooms !== filters.rooms) return false;
    }

    // Price Range (Filter minPrice/maxPrice yolluyor)
    if (filters.minPrice && property.price < filters.minPrice) {
        return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
    }

    // Square Feet (Size) - DÜZELTİLDİ: sqft yerine area kullanıldı
    if (filters.minSize && property.area < filters.minSize) {
        return false;
    }
    if (filters.maxSize && property.area > filters.maxSize) {
        return false;
    }
    
    return true;
  });

  const featuredProperties = mockProperties.slice(0, 6);

  // Filtreleme yapılıyor mu kontrolü
  const isFiltering = searchQuery !== '' || Object.keys(filters).length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/hero-real-estate-background_variant_2.jpg')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-white mb-8 drop-shadow-lg">
              Discover the perfect property from our extensive collection
            </p>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl mx-auto mt-4">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by location..."
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SupabaseWarning />
        
        {/* Filters */}
        <div className="mb-8 p-4">
          <PropertyFilters 
            filters={filters} 
            onFiltersChange={setFilters} 
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isFiltering ? `Search Results (${filteredProperties.length})` : 'Featured Properties'}
          </h2>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed">
             <p className="text-gray-500 text-lg">No properties found.</p>
             <p className="text-gray-400 text-sm mt-1">Try changing your filters.</p>
             <Button 
                variant="link" 
                className="mt-2"
                onClick={() => {
                    setSearchQuery('');
                    setFilters({}); 
                    window.location.reload(); 
                }}
             >
                Clear All Filters
             </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {(isFiltering ? filteredProperties : featuredProperties).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* View All Button */}
        {!isFiltering && (
          <div className="text-center">
            <Link to="/properties">
              <Button size="lg" variant="outline" className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700">
                View All Properties
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}