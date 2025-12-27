import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { Property } from '@/types/property';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Yerel state
  const [isFavorite, setIsFavorite] = useState(false);

  // 1. Sayfa yüklenince: Bu kart favori mi diye kontrol et
  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        const favoriteIds = JSON.parse(savedFavorites);
        // ID'leri string'e çevirerek karşılaştır
        const isFav = favoriteIds.some((id: any) => String(id) === String(property.id));
        setIsFavorite(isFav);
      }
    }
  }, [user, property.id]);

  // 2. Tıklama fonksiyonu
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Linke gitmeyi engelle
    e.stopPropagation(); // Eventin yukarı taşmasını engelle

    if (!user) {
      toast.error('Please sign in to add favorites');
      navigate('/login');
      return;
    }

    const storageKey = `favorites_${user.id}`;
    const savedFavorites = localStorage.getItem(storageKey);
    let favoriteIds: any[] = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorite) {
      // Favorilerden Çıkar
      favoriteIds = favoriteIds.filter((id: any) => String(id) !== String(property.id));
      toast.success('Removed from favorites');
    } else {
      // Favorilere Ekle
      favoriteIds.push(property.id);
      toast.success('Added to favorites');
    }

    // Veriyi kaydet ve State'i güncelle
    localStorage.setItem(storageKey, JSON.stringify(favoriteIds));
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/property/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-64">
          
          {/* GÜNCELLENEN RESİM KODU */}
          <img
            src={
              // Resim listesi (images) varsa ilkini al, yoksa tekil (image) alanı al.
              // Hiçbiri yoksa placeholder göster.
              (property.images && property.images.length > 0)
                ? property.images[0]
                : property.image || "https://placehold.co/600x400?text=No+Image"
            }
            alt={property.title}
            className="w-full h-full object-cover"
            // Resim yüklenemezse hata vermesin diye:
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x400?text=Image+Error";
            }}
          />

          <Badge className="absolute top-4 left-4 bg-blue-600">
            {property.type}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-4 right-4 bg-white/90 hover:bg-white transition-colors ${
              isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-600 hover:text-red-500'
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <CardContent className="p-6">
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
          <p className="text-2xl font-bold text-blue-600 mb-4">
            ${property.price.toLocaleString()}
          </p>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.area} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}