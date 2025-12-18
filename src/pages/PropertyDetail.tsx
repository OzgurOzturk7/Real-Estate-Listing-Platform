import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Bed, Bath, Maximize, MapPin, Calendar, Car, Home, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ImageGallery from '@/components/ImageGallery';
import ContactSellerForm from '@/components/ContactSellerForm';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import { properties } from '@/data/mockProperties';
import { useFavorites } from '@/hooks/useFavorites';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Button onClick={() => navigate('/properties')}>Back to Properties</Button>
        </div>
      </div>
    );
  }

  // Generate multiple images for gallery (using the same image for demo)
  const galleryImages = property.images || [
    property.image,
    property.image,
    property.image,
    property.image,
  ];

  // Mock related properties
  const relatedProperties = properties
    .filter((p) => p.id !== property.id && p.propertyType === property.propertyType)
    .slice(0, 3);

  const favorite = isFavorite(property.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/properties" className="hover:text-primary">Properties</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">{property.title}</span>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery images={galleryImages} title={property.title} />

            {/* Property Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2 dark:text-white">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleFavorite(property.id)}
                  className={favorite ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <Badge variant={property.type === 'sale' ? 'default' : 'secondary'} className="text-sm">
                  For {property.type === 'sale' ? 'Sale' : 'Rent'}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {property.propertyType}
                </Badge>
                {property.status && (
                  <Badge variant={property.status === 'active' ? 'default' : 'secondary'} className="text-sm">
                    {property.status}
                  </Badge>
                )}
              </div>

              <div className="text-3xl font-bold text-primary mb-6">
                ${property.price.toLocaleString()}
                {property.type === 'rent' && <span className="text-lg text-gray-600 dark:text-gray-400">/month</span>}
              </div>
            </div>

            {/* Key Features */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Key Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bed className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Bedrooms</div>
                      <div className="font-semibold dark:text-white">{property.bedrooms}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Bath className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Bathrooms</div>
                      <div className="font-semibold dark:text-white">{property.bathrooms}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Maximize className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Area</div>
                      <div className="font-semibold dark:text-white">{property.area} m²</div>
                    </div>
                  </div>
                  {property.parking && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Parking</div>
                        <div className="font-semibold dark:text-white">{property.parking}</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Description</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {property.description || `Beautiful ${property.propertyType} located in ${property.location}. This property features ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms, and ${property.area}m² of living space. Perfect for families or individuals looking for a comfortable and spacious home.`}
                </p>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">Property Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Property Type</span>
                    <span className="font-medium dark:text-white capitalize">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Listing Type</span>
                    <span className="font-medium dark:text-white capitalize">{property.type}</span>
                  </div>
                  {property.yearBuilt && (
                    <div className="flex justify-between py-2 border-b dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Year Built</span>
                      <span className="font-medium dark:text-white">{property.yearBuilt}</span>
                    </div>
                  )}
                  {property.furnished !== undefined && (
                    <div className="flex justify-between py-2 border-b dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Furnished</span>
                      <span className="font-medium dark:text-white">{property.furnished ? 'Yes' : 'No'}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 dark:text-white">Features & Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full" />
                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Contact Form */}
          <div className="space-y-6">
            <ContactSellerForm
              propertyId={property.id}
              propertyTitle={property.title}
              sellerId={property.userId || 'demo-seller'}
              sellerName={property.sellerName || 'Property Owner'}
              sellerEmail={property.sellerEmail || 'owner@bestate.com'}
              sellerPhone={property.sellerPhone}
            />
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}