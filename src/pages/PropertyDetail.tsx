import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Heart,
  Share2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageGallery from '@/components/ImageGallery';
import ContactSellerForm from '@/components/ContactSellerForm';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const isAdmin = user?.user_metadata?.role === 'admin';

  // 🔹 Property fetch
  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setProperty(data);
      } else {
        setProperty(null);
      }

      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  // 🔹 Favori kontrol
  useEffect(() => {
    if (!user || !property) return;

    const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      const isFav = favoriteIds.some(
        (favId: any) => String(favId) === String(property.id)
      );
      setIsFavorite(isFav);
    }
  }, [user, property]);

  // 🔹 Favori toggle
  const handleFavoriteClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const storageKey = `favorites_${user.id}`;
    const savedFavorites = localStorage.getItem(storageKey);
    let favoriteIds: any[] = savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

    if (isFavorite) {
      favoriteIds = favoriteIds.filter(
        (favId: any) => String(favId) !== String(property.id)
      );
    } else {
      favoriteIds.push(property.id);
    }

    localStorage.setItem(storageKey, JSON.stringify(favoriteIds));
    setIsFavorite(!isFavorite);
  };

  // 🔹 Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="text-center py-20">Loading property...</div>
      </div>
    );
  }

  // 🔹 Not found
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">
            Property Not Found
          </h1>
          <Button onClick={() => navigate('/properties')}>
            Back to All Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFavoriteClick}
                className={isFavorite ? 'text-red-500' : ''}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite ? 'fill-current' : ''
                  }`}
                />
              </Button>

              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="default">
              {property.type === 'sale'
                ? 'For Sale'
                : 'For Rent'}
            </Badge>

            <span className="text-3xl font-bold text-primary">
              €{property.price?.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* MAIN */}
          <div className="lg:col-span-2 space-y-8">

            <ImageGallery
              images={property.images || []}
              title={property.title}
            />

            {/* Property Features */}
            <Card>
              <CardHeader>
                <CardTitle>Property Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Feature
                    icon={<Bed className="h-5 w-5 text-gray-400" />}
                    label="Bedrooms"
                    value={property.bedrooms}
                  />
                  <Feature
                    icon={<Bath className="h-5 w-5 text-gray-400" />}
                    label="Bathrooms"
                    value={property.bathrooms}
                  />
                  <Feature
                    icon={<Square className="h-5 w-5 text-gray-400" />}
                    label="Area"
                    value={`${property.area} m²`}
                  />
                  <Feature
                    icon={<Car className="h-5 w-5 text-gray-400" />}
                    label="Parking"
                    value={property.parking}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            {property.features?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Features & Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map(
                      (feature: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2"
                        >
                          <div className="h-2 w-2 bg-primary rounded-full" />
                          <span className="text-sm">
                            {feature}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Info
                    label="Year Built"
                    value={property.year_built}
                  />
                  <Info
                    label="Property Type"
                    value={property.property_type}
                  />
                  <Info
                    label="Furnished"
                    value={
                      property.furnished ? 'Yes' : 'No'
                    }
                  />
                  <Info
                    label="Status"
                    value="Active"
                  />
                </div>
              </CardContent>
            </Card>

          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">

            <ContactSellerForm
              propertyId={property.id}
              propertyTitle={property.title}
              sellerEmail={property.seller_email || ''}
            />

            {isAdmin && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    Quick Info (Admin Only)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Info
                    label="Property ID"
                    value={property.id}
                  />
                  <Info
                    label="Published"
                    value={new Date(
                      property.created_at
                    ).toLocaleDateString()}
                  />
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}