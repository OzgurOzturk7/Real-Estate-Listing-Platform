import { useState } from 'react';
import { PropertyFilters as Filters } from '@/types/property';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters: Filters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const updateFilter = (key: keyof Filters, value: string | number | undefined) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }));
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="type">Property Type</Label>
          <Select
            value={localFilters.type || 'all'}
            onValueChange={(value) => updateFilter('type', value === 'all' ? undefined : value as 'sale' | 'rent')}
          >
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div>
          <Label>Price Range ($)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, District"
            value={localFilters.location || ''}
            onChange={(e) => updateFilter('location', e.target.value)}
          />
        </div>

        <Separator />

        <div>
          <Label>Square Feet</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <Input
                type="number"
                placeholder="Min sq ft"
                value={localFilters.minSize || ''}
                onChange={(e) => updateFilter('minSize', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Max sq ft"
                value={localFilters.maxSize || ''}
                onChange={(e) => updateFilter('maxSize', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <Label htmlFor="rooms">Bedrooms</Label>
          <Select
            value={localFilters.rooms?.toString() || 'all'}
            onValueChange={(value) => updateFilter('rooms', value === 'all' ? undefined : parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3 Bedrooms</SelectItem>
              <SelectItem value="4">4 Bedrooms</SelectItem>
              <SelectItem value="5">5+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-2 pt-2">
          <Button onClick={handleApplyFilters} className="w-full">
            Apply Filters
          </Button>
          <Button onClick={handleClearFilters} variant="outline" className="w-full">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}