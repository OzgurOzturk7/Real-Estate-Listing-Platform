import { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/data/mockProperties';
import { PropertyFilters } from '@/types/property';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Properties() {
  const [filters, setFilters] = useState<PropertyFilters>({
    type: 'all',
    propertyType: 'all',
    location: '',
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: 0,
    bathrooms: 0,
    minArea: 0,
    maxArea: 10000,
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.type !== 'all' && property.type !== filters.type) return false;
      if (filters.propertyType !== 'all' && property.propertyType !== filters.propertyType) return false;
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (property.price < filters.minPrice || property.price > filters.maxPrice) return false;
      if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms > 0 && property.bathrooms < filters.bathrooms) return false;
      if (property.area < filters.minArea || property.area > filters.maxArea) return false;
      return true;
    });
  }, [filters]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.type !== 'all') count++;
    if (filters.propertyType !== 'all') count++;
    if (filters.location) count++;
    if (filters.minPrice > 0) count++;
    if (filters.maxPrice < 10000000) count++;
    if (filters.bedrooms > 0) count++;
    if (filters.bathrooms > 0) count++;
    if (filters.minArea > 0) count++;
    if (filters.maxArea < 10000) count++;
    return count;
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      type: 'all',
      propertyType: 'all',
      location: '',
      minPrice: 0,
      maxPrice: 10000000,
      bedrooms: 0,
      bathrooms: 0,
      minArea: 0,
      maxArea: 10000,
    });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-2 block">Listing Type</Label>
        <Select value={filters.type} onValueChange={(value: 'all' | 'sale' | 'rent') => setFilters({ ...filters, type: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Property Type</Label>
        <Select value={filters.propertyType} onValueChange={(value: 'all' | 'house' | 'apartment' | 'villa' | 'land') => setFilters({ ...filters, propertyType: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="land">Land</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="location" className="text-sm font-medium mb-2 block">Location</Label>
        <Input
          id="location"
          placeholder="Enter location..."
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Price Range</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice === 10000000 ? '' : filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) || 10000000 })}
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Bedrooms</Label>
        <Select value={filters.bedrooms.toString()} onValueChange={(value) => setFilters({ ...filters, bedrooms: Number(value) })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Bathrooms</Label>
        <Select value={filters.bathrooms.toString()} onValueChange={(value) => setFilters({ ...filters, bathrooms: Number(value) })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Area (m²)</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minArea || ''}
            onChange={(e) => setFilters({ ...filters, minArea: Number(e.target.value) })}
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxArea === 10000 ? '' : filters.maxArea}
            onChange={(e) => setFilters({ ...filters, maxArea: Number(e.target.value) || 10000 })}
          />
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={resetFilters} className="w-full">
          <X className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">All Properties</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {filteredProperties.length} properties found
            </p>
          </div>

          {/* Mobile Filter Button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold dark:text-white">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Badge variant="destructive">{activeFiltersCount}</Badge>
                )}
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Properties Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {filters.type !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.type === 'sale' ? 'For Sale' : 'For Rent'}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters({ ...filters, type: 'all' })}
                    />
                  </Badge>
                )}
                {filters.propertyType !== 'all' && (
                  <Badge variant="secondary" className="gap-1 capitalize">
                    {filters.propertyType}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters({ ...filters, propertyType: 'all' })}
                    />
                  </Badge>
                )}
                {filters.location && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.location}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters({ ...filters, location: '' })}
                    />
                  </Badge>
                )}
                {filters.bedrooms > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.bedrooms}+ Bedrooms
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setFilters({ ...filters, bedrooms: 0 })}
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Properties Grid */}
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No properties found matching your criteria.
                </p>
                <Button onClick={resetFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}