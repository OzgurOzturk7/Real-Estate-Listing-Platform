import { useState } from 'react';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import PropertyFilters from '@/components/PropertyFilters';
import { mockProperties } from '@/data/mockProperties';
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
  // TypeScript hatalarını önlemek için 'any' kullanıyoruz
  const [filters, setFilters] = useState<any>({});
  const [sortOrder, setSortOrder] = useState('newest');

  // Filtreleme Mantığı (Index.tsx ile aynı standartta)
  const filteredProperties = mockProperties.filter((property) => {
    
    // 1. Tip Filtresi
    if (filters.type && filters.type !== 'all' && property.type !== filters.type) {
      return false;
    }

    // 2. Konum Filtresi
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    // 3. Oda Sayısı Filtresi (filters.rooms -> property.bedrooms)
    if (filters.rooms && filters.rooms !== 'all') {
      if (property.bedrooms !== filters.rooms) return false;
    }

    // 4. Fiyat Aralığı (minPrice / maxPrice)
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    // 5. Metrekare (minSize / maxSize) - area kontrolü
    if (filters.minSize && property.area < filters.minSize) {
      return false;
    }
    if (filters.maxSize && property.area > filters.maxSize) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    // Sıralama Mantığı
    switch (sortOrder) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        // HATA DÜZELTİLDİ: created_at yerine createdAt kullanıldı
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              All Properties
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredProperties.length} propert{filteredProperties.length !== 1 ? 'ies' : 'y'} found
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            {/* Mobil Filtre Butonu (Sheet içinde) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  <PropertyFilters filters={filters} onFiltersChange={setFilters} />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sıralama Dropdown */}
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest Listed</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Masaüstü Sol Sidebar Filtreler */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <PropertyFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>

          {/* İlan Listesi */}
          <div className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No properties found matching your criteria.</p>
                <Button 
                  variant="link" 
                  onClick={() => setFilters({})}
                  className="mt-2"
                >
                  Clear all filters
                </Button>
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
      </div>
    </div>
  );
}