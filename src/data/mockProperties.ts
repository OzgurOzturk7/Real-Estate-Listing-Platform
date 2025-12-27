import { Property } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Lüks Deniz Manzaralı Villa - Bodrum',
    description: 'Muhteşem Ege manzaralı, özel havuzlu, 5+1 villa. Plaja yürüme mesafesinde, tam eşyalı.',
    price: 12500000,
    location: 'Bodrum, Muğla',
    type: 'sale',
    property_type: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ],
    features: ['Özel Havuz', 'Deniz Manzarası', 'Bahçe', 'Otopark', 'Güvenlik', 'Jakuzi'],
    year_built: 2020,
    parking: 3,
    furnished: true,
    status: 'active',
    user_id: 'user1',
    created_at: '2024-01-15',
    owner: {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@bestate.com',
      phone: '+90 532 123 4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet'
    }
  },
  {
    id: '2',
    title: 'Modern 3+1 Daire - Şişli, İstanbul',
    description: 'Merkezi konumda, yeni binada, asansörlü, güvenlikli site içinde modern daire.',
    price: 4500000,
    location: 'Şişli, İstanbul',
    type: 'sale',
    property_type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    features: ['Asansör', 'Güvenlik', 'Otopark', 'Spor Salonu', 'Kapalı Havuz'],
    year_built: 2022,
    parking: 1,
    furnished: false,
    status: 'active',
    user_id: 'user2',
    created_at: '2024-02-10',
    owner: {
      name: 'Ayşe Demir',
      email: 'ayse@bestate.com',
      phone: '+90 533 234 5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse'
    }
  },
  {
    id: '3',
    title: 'Kiralık Öğrenci Evi - Eskişehir',
    description: 'Üniversiteye yakın, eşyalı, 2+1 daire. Tüm ihtiyaçlar yürüme mesafesinde.',
    price: 12000,
    location: 'Eskişehir Merkez',
    type: 'rent',
    property_type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    features: ['Eşyalı', 'Doğalgaz', 'İnternet', 'Beyaz Eşya'],
    year_built: 2018,
    parking: 0,
    furnished: true,
    status: 'active',
    user_id: 'user3',
    created_at: '2024-03-05',
    owner: {
      name: 'Mehmet Kaya',
      email: 'mehmet@bestate.com',
      phone: '+90 534 345 6789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet'
    }
  },
  {
    id: '4',
    title: 'Yatırım Fırsatı Arsa - Antalya',
    description: 'İmar planlı, denize 2km, yatırım için ideal 1000m² arsa.',
    price: 3500000,
    location: 'Konyaaltı, Antalya',
    type: 'sale',
    property_type: 'land',
    bedrooms: 0,
    bathrooms: 0,
    area: 1000,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
    ],
    features: ['İmar Planlı', 'Elektrik', 'Su', 'Yol'],
    year_built: null,
    parking: 0,
    furnished: false,
    status: 'active',
    user_id: 'user1',
    created_at: '2024-03-12',
    owner: {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@bestate.com',
      phone: '+90 532 123 4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet'
    }
  },
  {
    id: '5',
    title: 'Göl Manzaralı Villa - Bolu',
    description: 'Abant Gölü manzaralı, doğayla iç içe, 4+1 müstakil villa. Şömineli, geniş bahçeli.',
    price: 6800000,
    location: 'Abant, Bolu',
    type: 'sale',
    property_type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    features: ['Göl Manzarası', 'Şömine', 'Bahçe', 'Otopark', 'Barbekü'],
    year_built: 2019,
    parking: 2,
    furnished: true,
    status: 'active',
    user_id: 'user2',
    created_at: '2024-03-18',
    owner: {
      name: 'Ayşe Demir',
      email: 'ayse@bestate.com',
      phone: '+90 533 234 5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse'
    }
  },
  {
    id: '6',
    title: 'Kiralık Ofis - Ankara Çankaya',
    description: 'Kızılay merkezde, asansörlü, 120m² ofis. Metro ve otobüse yakın.',
    price: 25000,
    location: 'Çankaya, Ankara',
    type: 'rent',
    property_type: 'apartment',
    bedrooms: 0,
    bathrooms: 1,
    area: 120,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    features: ['Asansör', 'Klima', 'İnternet Altyapısı', 'Güvenlik'],
    year_built: 2021,
    parking: 1,
    furnished: false,
    status: 'active',
    user_id: 'user3',
    created_at: '2024-03-20',
    owner: {
      name: 'Mehmet Kaya',
      email: 'mehmet@bestate.com',
      phone: '+90 534 345 6789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet'
    }
  },
  {
    id: '7',
    title: 'Deniz Kenarı Daire - Alanya',
    description: 'Kleopatra plajına 50m, 2+1 eşyalı daire. Yüzme havuzlu site.',
    price: 3200000,
    location: 'Alanya, Antalya',
    type: 'sale',
    property_type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      '/images/Apartment.jpg'
    ],
    features: ['Deniz Manzarası', 'Havuz', 'Güvenlik', 'Otopark', 'Asansör'],
    year_built: 2020,
    parking: 1,
    furnished: true,
    status: 'active',
    user_id: 'user1',
    created_at: '2024-03-25',
    owner: {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@bestate.com',
      phone: '+90 532 123 4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet'
    }
  },
  {
    id: '8',
    title: 'Lüks Rezidans Dairesi - İstanbul Kadıköy',
    description: 'Boğaz manzaralı, 4+1 dubleks daire. Site içinde havuz, spor salonu, güvenlik.',
    price: 9500000,
    location: 'Kadıköy, İstanbul',
    type: 'sale',
    property_type: 'apartment',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'
    ],
    features: ['Boğaz Manzarası', 'Havuz', 'Spor Salonu', 'Güvenlik', 'Otopark', 'Asansör'],
    year_built: 2023,
    parking: 2,
    furnished: false,
    status: 'active',
    user_id: 'user2',
    created_at: '2024-04-01',
    owner: {
      name: 'Ayşe Demir',
      email: 'ayse@bestate.com',
      phone: '+90 533 234 5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse'
    }
  },
  {
    id: '9',
    title: 'Kiralık Stüdyo Daire - İzmir Bornova',
    description: 'Üniversiteye 5 dakika, eşyalı stüdyo daire. Tüm ihtiyaçlar yakında.',
    price: 8500,
    location: 'Bornova, İzmir',
    type: 'rent',
    property_type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    features: ['Eşyalı', 'Asansör', 'Doğalgaz', 'İnternet'],
    year_built: 2019,
    parking: 0,
    furnished: true,
    status: 'active',
    user_id: 'user3',
    created_at: '2024-04-05',
    owner: {
      name: 'Mehmet Kaya',
      email: 'mehmet@bestate.com',
      phone: '+90 534 345 6789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet'
    }
  },
  {
    id: '10',
    title: 'Müstakil Ev - Bursa Mudanya',
    description: 'Denize 200m, bahçeli, 3+1 müstakil ev. Sakin ve huzurlu bir mahallede.',
    price: 4200000,
    location: 'Mudanya, Bursa',
    type: 'sale',
    property_type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    features: ['Bahçe', 'Otopark', 'Barbekü', 'Şömine', 'Deniz Yakını'],
    year_built: 2017,
    parking: 2,
    furnished: false,
    status: 'active',
    user_id: 'user1',
    created_at: '2024-04-10',
    owner: {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@bestate.com',
      phone: '+90 532 123 4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet'
    }
  },
  {
    id: '11',
    title: 'Penthouse Daire - İstanbul Beşiktaş',
    description: 'Boğaz ve şehir manzaralı, 5+2 çatı dubleks. Özel teraslı, jakuzili.',
    price: 18500000,
    location: 'Beşiktaş, İstanbul',
    type: 'sale',
    property_type: 'apartment',
    bedrooms: 5,
    bathrooms: 4,
    area: 320,
    images: [
      '/images/Apartment.jpg',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    features: ['Boğaz Manzarası', 'Teras', 'Jakuzi', 'Asansör', 'Güvenlik', 'Otopark'],
    year_built: 2024,
    parking: 3,
    furnished: true,
    status: 'active',
    user_id: 'user2',
    created_at: '2024-04-12',
    owner: {
      name: 'Ayşe Demir',
      email: 'ayse@bestate.com',
      phone: '+90 533 234 5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse'
    }
  },
  {
    id: '12',
    title: 'Kiralık Villa - Bodrum Yalıkavak',
    description: 'Özel havuzlu, deniz manzaralı, 4+1 villa. Haftalık ve aylık kiralama seçenekleri.',
    price: 45000,
    location: 'Yalıkavak, Bodrum',
    type: 'rent',
    property_type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ],
    features: ['Özel Havuz', 'Deniz Manzarası', 'Bahçe', 'Barbekü', 'Güvenlik'],
    year_built: 2021,
    parking: 2,
    furnished: true,
    status: 'active',
    user_id: 'user3',
    created_at: '2024-04-15',
    owner: {
      name: 'Mehmet Kaya',
      email: 'mehmet@bestate.com',
      phone: '+90 534 345 6789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet'
    }
  },
  {
    id: '13',
    title: 'Yeni Yapı Daire - Ankara Çayyolu',
    description: 'Sıfır, 3+1 daire. Modern mimari, akıllı ev sistemleri.',
    price: 3800000,
    location: 'Çayyolu, Ankara',
    type: 'sale',
    property_type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 135,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'
    ],
    features: ['Akıllı Ev', 'Asansör', 'Otopark', 'Güvenlik', 'Spor Salonu'],
    year_built: 2024,
    parking: 1,
    furnished: false,
    status: 'active',
    user_id: 'user1',
    created_at: '2024-04-18',
    owner: {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@bestate.com',
      phone: '+90 532 123 4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet'
    }
  },
  {
    id: '14',
    title: 'Tarihi Konak - Safranbolu',
    description: 'Restore edilmiş, 200 yıllık tarihi konak. Butik otel potansiyeli.',
    price: 8500000,
    location: 'Safranbolu, Karabük',
    type: 'sale',
    property_type: 'house',
    bedrooms: 6,
    bathrooms: 4,
    area: 400,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    features: ['Tarihi Bina', 'Bahçe', 'Şömine', 'Orijinal Mimari', 'Otopark'],
    year_built: 1824,
    parking: 2,
    furnished: true,
    status: 'active',
    user_id: 'user2',
    created_at: '2024-04-20',
    owner: {
      name: 'Ayşe Demir',
      email: 'ayse@bestate.com',
      phone: '+90 533 234 5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse'
    }
  },
  {
    id: '15',
    title: 'Kiralık Loft - İzmir Alsancak',
    description: 'Endüstriyel tarzda, 150m² loft daire. Yüksek tavanlar, geniş mekanlar.',
    price: 22000,
    location: 'Alsancak, İzmir',
    type: 'rent',
    property_type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 150,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    features: ['Loft', 'Yüksek Tavan', 'Asansör', 'Otopark', 'Merkezi Konum'],
    year_built: 2020,
    parking: 1,
    furnished: true,
    status: 'active',
    user_id: 'user3',
    created_at: '2024-04-22',
    owner: {
      name: 'Mehmet Kaya',
      email: 'mehmet@bestate.com',
      phone: '+90 534 345 6789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet'
    }
  },
  {
    id: '16',
    title: 'Dağ Evi - Uludağ',
    description: 'Kayak merkezine 10 dakika, 3+1 dağ evi. Kış ve yaz tatili için ideal.',
    price: 5200000,
    location: 'Uludağ, Bursa',
    type: 'sale',
    property_type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'
    ],
    features: ['Dağ Manzarası', 'Şömine', 'Bahçe', 'Otopark', 'Barbekü'],
    year_built: 2018,
    parking: 2,
    furnished: true,
    status: 'active',
    user_id: 'user1',
    created_at: '2024-04-25',
    owner: {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@bestate.com',
      phone: '+90 532 123 4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet'
    }
  },
  {
    id: '17',
    title: 'Rezidans Dairesi - Antalya Lara',
    description: 'Denize sıfır, 2+1 daire. Site içinde her türlü sosyal tesis.',
    price: 4800000,
    location: 'Lara, Antalya',
    type: 'sale',
    property_type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    area: 110,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      '/images/Apartment.jpg'
    ],
    features: ['Deniz Manzarası', 'Havuz', 'Spor Salonu', 'Sauna', 'Güvenlik'],
    year_built: 2022,
    parking: 1,
    furnished: false,
    status: 'active',
    user_id: 'user2',
    created_at: '2024-04-28',
    owner: {
      name: 'Ayşe Demir',
      email: 'ayse@bestate.com',
      phone: '+90 533 234 5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse'
    }
  },
  {
    id: '18',
    title: 'Kiralık Yazlık - Çeşme',
    description: 'Plaja 100m, 2+1 yazlık. Yaz ayları için kiralık.',
    price: 35000,
    location: 'Çeşme, İzmir',
    type: 'rent',
    property_type: 'house',
    bedrooms: 2,
    bathrooms: 1,
    area: 90,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800'
    ],
    features: ['Deniz Yakını', 'Bahçe', 'Barbekü', 'Otopark'],
    year_built: 2016,
    parking: 1,
    furnished: true,
    status: 'active',
    user_id: 'user3',
    created_at: '2024-05-01',
    owner: {
      name: 'Mehmet Kaya',
      email: 'mehmet@bestate.com',
      phone: '+90 534 345 6789',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet'
    }
  },
  {
    id: '19',
    title: 'Satılık Arsa - Fethiye',
    description: 'Deniz manzaralı, 500m² imarlı arsa. Villa yapımı için ideal.',
    price: 2800000,
    location: 'Fethiye, Muğla',
    type: 'sale',
    property_type: 'land',
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
    ],
    features: ['Deniz Manzarası', 'İmar Planlı', 'Elektrik', 'Su'],
    year_built: null,
    parking: 0,
    furnished: false,
    status: 'active',
    user_id: 'user1',
    created_at: '2024-05-05',
    owner: {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@bestate.com',
      phone: '+90 532 123 4567',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet'
    }
  },
  {
    id: '20',
    title: 'Lüks Daire - İstanbul Nişantaşı',
    description: 'Şehrin kalbinde, 4+1 ultra lüks daire. Tüm detaylar düşünülmüş.',
    price: 15500000,
    location: 'Nişantaşı, İstanbul',
    type: 'sale',
    property_type: 'apartment',
    bedrooms: 4,
    bathrooms: 3,
    area: 240,
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    features: ['Merkezi Konum', 'Asansör', 'Güvenlik', 'Otopark', 'Concierge'],
    year_built: 2023,
    parking: 2,
    furnished: true,
    status: 'active',
    user_id: 'user2',
    created_at: '2024-05-08',
    owner: {
      name: 'Ayşe Demir',
      email: 'ayse@bestate.com',
      phone: '+90 533 234 5678',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse'
    }
  }
];