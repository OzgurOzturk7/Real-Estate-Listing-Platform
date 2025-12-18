export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images?: string[];
  type: 'sale' | 'rent';
  propertyType: 'house' | 'apartment' | 'villa' | 'land';
  description?: string;
  features?: string[];
  yearBuilt?: number;
  parking?: number;
  furnished?: boolean;
  userId?: string;
  sellerName?: string;
  sellerEmail?: string;
  sellerPhone?: string;
  sellerAvatar?: string;
  status?: 'active' | 'sold' | 'rented';
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyFilters {
  type: 'all' | 'sale' | 'rent';
  propertyType: 'all' | 'house' | 'apartment' | 'villa' | 'land';
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  minArea: number;
  maxArea: number;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface Message {
  id: string;
  propertyId: string;
  senderId: string;
  recipientId: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}