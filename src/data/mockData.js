export const INITIAL_CARS = [
  {
    make: 'Mercedes-Benz',
    model: 'G-Class G63 AMG',
    year: 2024,
    price: 1200000,
    mileage: 0,
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800', // Черный Гелендваген
    type: 'SUV',
    featured: true,
    mostWanted: true,
    description: 'The legendary G-Wagon with ultimate luxury and performance.'
  },
  {
    make: 'Porsche',
    model: '911 GT3 RS',
    year: 2023,
    price: 1450000,
    mileage: 1200,
    fuel: 'Petrol',
    transmission: 'PDK',
    image: '/images/porsche_911_gt3_rs.png', // Generated Green GT3 RS
    type: 'Coupe',
    featured: true,
    mostWanted: true,
    description: 'Track weapon for the road. Weissach package included.'
  },
  {
    make: 'Rolls-Royce',
    model: 'Cullinan',
    year: 2023,
    price: 2100000,
    mileage: 500,
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: '/images/rolls_royce_cullinan.png', // Generated White Cullinan
    type: 'SUV',
    featured: false,
    mostWanted: true,
    description: 'The architecture of luxury. Bespoke interior.'
  },
  {
    make: 'Lamborghini',
    model: 'Huracan Evo',
    year: 2022,
    price: 950000,
    mileage: 4500,
    fuel: 'Petrol',
    transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1566024287286-457247b70310?auto=format&fit=crop&q=80&w=800', // Синий Huracan
    type: 'Coupe',
    featured: false,
    mostWanted: false,
    description: 'V10 naturally aspirated engine. Emotional sound.'
  }
];

export const BRANDS = [
  { name: 'Mercedes-Benz', logo: 'https://logo.clearbit.com/mercedes-benz.com' },
  { name: 'BMW', logo: 'https://logo.clearbit.com/bmw.com' },
  { name: 'Porsche', logo: 'https://logo.clearbit.com/porsche.com' },
  { name: 'Lamborghini', logo: 'https://logo.clearbit.com/lamborghini.com' },
  { name: 'Ferrari', logo: 'https://logo.clearbit.com/ferrari.com' },
  { name: 'Rolls-Royce', logo: 'https://logo.clearbit.com/rolls-roycemotorcars.com' },
];

export const SHOWROOM_LOCATIONS = [
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'UAE',
    address: 'Sheikh Zayed Road, Exit 42, Dubai',
    phone: '+971 4 123 4567',
    hours: '9:00 AM - 9:00 PM',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea9ba6a80f4?auto=format&fit=crop&q=80&w=800',
    mapQuery: 'Sheikh+Zayed+Road+Dubai'
  },
  {
    id: 'seoul',
    city: 'Seoul',
    country: 'South Korea',
    address: 'Gangnam-gu, Teheran-ro, Seoul',
    phone: '+82 2 987 6543',
    hours: '10:00 AM - 8:00 PM',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&q=80&w=800',
    mapQuery: 'Gangnam-gu+Seoul'
  },
  {
    id: 'london',
    city: 'London',
    country: 'UK',
    address: 'Park Lane, Mayfair, London',
    phone: '+44 20 7123 4567',
    hours: '9:00 AM - 7:00 PM',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    mapQuery: 'Park+Lane+London'
  }
];
