export interface Vehicle {
  id: string;
  name: string;
  type: 'standard' | 'executive' | 'wav' | 'minibus';
  description: string;
  capacity: number; // passengers
  luggage: number; // suitcases
  baseFare: number;
  perMileRate: number;
  imageUrl?: string;
  features: string[];
}

export interface RouteOption {
  id: string;
  name: string;
  type: 'local' | 'airport' | 'station' | 'hospital';
  address: string;
  milesFromWimborne: number;
}

export interface BookingDetails {
  pickup: string;
  dropoff: string;
  pickupCustom: string;
  dropoffCustom: string;
  pickupType: 'preset' | 'custom';
  dropoffType: 'preset' | 'custom';
  date: string;
  time: string;
  vehicleId: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  specialRequirements: string;
  isWheelchairRequired: boolean;
  isSchoolRun: boolean;
  schoolName?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  serviceType: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'booking' | 'accessibility' | 'airports' | 'pricing';
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  specialNeedsAlert?: boolean;
}
