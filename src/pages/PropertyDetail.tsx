import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Car, Heart, Share2, Phone, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageGallery from '@/components/ImageGallery';
import ContactSellerForm from '@/components/ContactSellerForm';
import { mockProperties } from '@/data/mockProperties';
import { useAuth } from '@/contexts/AuthContext';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const property = mockProperties.find(p => p.id === id);

  // Check if user is admin
  const isAdmin = user?.user_metadata?.role === 'admin';

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Property Not Found</h1>
            <Button onClick={() => navigate('/properties')}>Back to All Properties</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant={property.type === 'sale' ? 'default' : 'secondary'} className="text-sm">
              {property.type === 'sale' ? 'For Sale' : 'For Rent'}
            </Badge>
            <span className="text-3xl font-bold text-primary">
              €{property.price.toLocaleString('en-US')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={property.images} />

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.bedrooms && (
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</p>
                        <p className="font-semibold">{property.bedrooms}</p>
                      </div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</p>
                        <p className="font-semibold">{property.bathrooms}</p>
                      </div>
                    </div>
                  )}
                  {property.area && (
                    <div className="flex items-center gap-2">
                      <Square className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Area</p>
                        <p className="font-semibold">{property.area} m²</p>
                      </div>
                    </div>
                  )}
                  {property.parking !== undefined && (
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Parking</p>
                        <p className="font-semibold">{property.parking}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {property.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {property.year_built && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Year Built</p>
                      <p className="font-semibold">{property.year_built}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Property Type</p>
                    <p className="font-semibold capitalize">{property.property_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Furnished</p>
                    <p className="font-semibold">{property.furnished ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            {property.owner && (
              <Card>
                <CardHeader>
                  <CardTitle>Property Owner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={property.owner.avatar} 
                      alt={property.owner.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-lg">{property.owner.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Real Estate Agent</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      {property.owner.phone}
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Form */}
            <ContactSellerForm propertyId={property.id} />

            {/* Quick Info - Only visible to admins */}
            {isAdmin && (
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info (Admin Only)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Property ID</span>
                    <span className="font-semibold">#{property.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Published</span>
                    <span className="font-semibold">
                      {new Date(property.created_at).toLocaleDateString('en-US')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Views</span>
                    <span className="font-semibold">1,234</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}