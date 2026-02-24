import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import ImageUploader from './ImageUploader';
import { X } from 'lucide-react';

interface PropertyFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: any;
}

export default function PropertyForm({ onSuccess, onCancel, initialData }: PropertyFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price?.toString() || '',
    location: initialData?.location || '',
    property_type: initialData?.property_type || 'apartment',
    type: initialData?.type || 'sale',
    bedrooms: initialData?.bedrooms?.toString() || '',
    bathrooms: initialData?.bathrooms?.toString() || '',
    area: initialData?.area?.toString() || '',
    year_built: initialData?.year_built?.toString() || '',
    parking: initialData?.parking?.toString() || '',
    furnished: initialData?.furnished || false,
    features: initialData?.features || [],
    images: initialData?.images || [],
    status: initialData?.status || 'active',
  });

  const [newFeature, setNewFeature] = useState('');

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData({
      ...formData,
      features: [...formData.features, newFeature.trim()],
    });
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_: string, i: number) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please sign in');
      return;
    }

    if (formData.images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setLoading(true);

    try {
      const propertyData = {
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        property_type: formData.property_type,
        type: formData.type,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        area: formData.area ? parseFloat(formData.area) : null,
        year_built: formData.year_built ? parseInt(formData.year_built) : null,
        parking: formData.parking ? parseInt(formData.parking) : null,
        furnished: formData.furnished,
        features: formData.features,
        images: formData.images,
        status: formData.status,
      };

      let error;

      if (initialData?.id) {
        ({ error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', initialData.id));
      } else {
        ({ error } = await supabase
          .from('properties')
          .insert(propertyData));
      }

      if (error) throw error;

      toast.success(initialData ? 'Property updated!' : 'Property created!');
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Property' : 'Add New Property'}</CardTitle>
        <CardDescription>Fill in property details</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          <Input placeholder="Title" value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />

          <Textarea placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

          <div className="grid grid-cols-2 gap-4">
            <Input type="number" placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />

            <Input placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select value={formData.property_type}
              onValueChange={(v) => setFormData({ ...formData, property_type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>

            <Select value={formData.type}
              onValueChange={(v) => setFormData({ ...formData, type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Input type="number" placeholder="Bedrooms"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })} />

            <Input type="number" placeholder="Bathrooms"
              value={formData.bathrooms}
              onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })} />

            <Input type="number" placeholder="Area (m²)"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })} />

            <Input type="number" placeholder="Parking"
              value={formData.parking}
              onChange={(e) => setFormData({ ...formData, parking: e.target.value })} />
          </div>

          <Input type="number" placeholder="Year Built"
            value={formData.year_built}
            onChange={(e) => setFormData({ ...formData, year_built: e.target.value })} />

          <div className="flex items-center justify-between">
            <Label>Furnished</Label>
            <Switch checked={formData.furnished}
              onCheckedChange={(v) => setFormData({ ...formData, furnished: v })} />
          </div>

          <ImageUploader
            existingImages={formData.images}
            onImagesChange={(imgs) => setFormData({ ...formData, images: imgs })}
            maxImages={10}
          />

          <div>
            <div className="flex gap-2">
              <Input value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add feature" />
              <Button type="button" onClick={addFeature}>Add</Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features.map((f: string, i: number) => (
                <div key={i} className="bg-gray-200 px-3 py-1 rounded flex items-center gap-2">
                  {f}
                  <X size={14} onClick={() => removeFeature(i)} className="cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Property'}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}