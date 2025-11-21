"use client";

export interface CarItem {
  id?: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  type: string;
  description?: string;
  featured?: boolean;
  mostWanted?: boolean;
}

interface CarCardProps {
  car: CarItem;
  onClick: (car: CarItem) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => (
  <div
    onClick={() => onClick(car)}
    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col"
  >
    {/* Полный JSX 1:1 из main: картинка, заголовок, цена, теги */}
  </div>
);

export default CarCard;

