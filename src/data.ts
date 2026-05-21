import { Vehicle, RouteOption, Testimonial, FAQItem, ServiceItem } from './types';

export const VEHICLES: Vehicle[] = [
  {
    id: 'std-sedan',
    name: 'Standard Sedan',
    type: 'standard',
    description: 'Comfortable, fuel-efficient saloons perfect for daily commutes, shopping runs, and office travel.',
    capacity: 4,
    luggage: 2,
    baseFare: 4.50,
    perMileRate: 2.20,
    features: ['Climate Control', 'Professional Local Driver', 'USB Charging', 'Strict Cleanliness Standard']
  },
  {
    id: 'exec-saloon',
    name: 'Executive Class',
    type: 'executive',
    description: 'Chauffeured premium saloons (Mercedes/BMW) catering to executive travelers and corporate transfers.',
    capacity: 4,
    luggage: 3,
    baseFare: 8.00,
    perMileRate: 3.00,
    features: ['Premium Leather Interior', 'Complimentary Water & Wifi', 'Silent Electric or Hybrid Drive', 'Airport Meet & Greet Included']
  },
  {
    id: 'wav-accessible',
    name: 'WAV Specialist (Wheelchair)',
    type: 'wav',
    description: 'Fully equipped Wheelchair Accessible Vehicles featuring rear ramps, comprehensive safety winches, and wide entrances.',
    capacity: 4, // 1 wheelchair + 3 passengers
    luggage: 3, // includes active wheelchairs
    baseFare: 6.00,
    perMileRate: 2.40,
    features: ['Full Hydraulic Rear Ramp', 'Universal Wheelchair Safety Winches', 'WAV Disabled Badge Approved', 'Specialized Care Attentive Driver']
  },
  {
    id: 'exec-minibus',
    name: '8-Seater Passenger Minibus',
    type: 'minibus',
    description: 'Spacious multi-purpose vehicles designed for corporate teams, school runs, family holidays, and airport groups.',
    capacity: 8,
    luggage: 8,
    baseFare: 10.00,
    perMileRate: 3.50,
    features: ['Generous Legroom', 'Extra-Large Luggage Capacity', 'Perfect for Airport & Port Runs', 'Sliding Doors for Easy Access']
  }
];

export const ROUTE_OPTIONS: RouteOption[] = [
  { id: 'wimborne', name: 'Wimborne Minster (Town Centre)', type: 'local', address: 'The Square, Wimborne Minster, BH21 1JA', milesFromWimborne: 0 },
  { id: 'poole-quay', name: 'Poole Quay & Harbour', type: 'local', address: 'The Quay, Poole, Dorset, BH15 1HP', milesFromWimborne: 6.8 },
  { id: 'bournemouth-pier', name: 'Bournemouth Pier & Beach', type: 'local', address: 'Pier Approach, Bournemouth, BH2 5AA', milesFromWimborne: 9.5 },
  { id: 'bournemouth-airport', name: 'Bournemouth Airport (BOH)', type: 'airport', address: 'Parley Lane, Christchurch, BH23 6SE', milesFromWimborne: 8.2 },
  { id: 'heathrow-airport', name: 'London Heathrow Airport (LHR)', type: 'airport', address: 'Longford, Hounslow, TW6 1AP', milesFromWimborne: 88.4 },
  { id: 'gatwick-airport', name: 'London Gatwick Airport (LGW)', type: 'airport', address: 'Horley, Gatwick, RH6 0NP', milesFromWimborne: 104.2 },
  { id: 'southampton-port', name: 'Southampton Cruise Terminal', type: 'station', address: 'Herbert Walker Ave, Southampton, SO15 1HJ', milesFromWimborne: 34.1 },
  { id: 'poole-hospital', name: 'Poole General Hospital', type: 'hospital', address: 'Longfleet Rd, Poole, Dorset, BH15 2JB', milesFromWimborne: 6.2 },
  { id: 'royal-bournemouth', name: 'Royal Bournemouth Hospital', type: 'hospital', address: 'Castle Lane East, Bournemouth, BH7 7DW', milesFromWimborne: 12.4 },
  { id: 'wimborne-gp', name: 'The Quarterjack Surgery (GP Wimborne)', type: 'hospital', address: 'Rodways Corner, Wimborne, BH21 1AP', milesFromWimborne: 0.5 },
  { id: 'bournemouth-train', name: 'Bournemouth Central Train Station', type: 'station', address: 'Holdenhurst Road, Bournemouth, BH8 8DL', milesFromWimborne: 9.8 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    location: 'Wimborne Minster',
    rating: 5,
    comment: 'Wimborne Cab Taxis has been a lifesaver for our family. Their specialized WAV vehicle was spotless, and the driver took incredible care in securing my father’s wheelchair. Outstanding service for anyone with disabled family members.',
    serviceType: 'Special Needs WAV Transfer',
    date: '10 days ago'
  },
  {
    id: 't2',
    name: 'Dr. Alistair Vance',
    location: 'Colehill, Wimborne',
    rating: 5,
    comment: 'I use the Executive Class saloon for regular commute runs from Dorset to Heathrow and Gatwick. Punctually arriving and clean, with USB chargers and wifi. Highly recommended professional cab service.',
    serviceType: 'Airport Business Transfer',
    date: '3 weeks ago'
  },
  {
    id: 't3',
    name: 'Michael O’Connor',
    location: 'Poole',
    rating: 5,
    comment: 'We booked them for school runs when our regular arrangement fell through. The company is licensed and DBS-checked, which gave us absolute peace of mind. Very approachable and responsive dispatchers!',
    serviceType: 'Regular School Run Assist',
    date: '1 month ago'
  },
  {
    id: 't4',
    name: 'Patricia Miller',
    location: 'Bournemouth',
    rating: 5,
    comment: 'Fabulous booking for a GP surgery trip. The driver actually came to the front door, offered an arm to help keep me steady, and waited to make sure I got checked in safely. It is rare to see this level of human kindness.',
    serviceType: 'Hospital & Care Companion',
    date: '2 weeks ago'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'accessibility',
    question: 'Are your Wheelchair Accessible Vehicles (WAV) fully licensed?',
    answer: 'Yes, absolutely. All our WAV cabs are fully licensed by the Council, display active Dorset private-hire/hackney badges, and are rigorously tested. They feature heavy-duty commercial non-slip rear ramps, 4-point wheelchair restraint winches, and premium seatbelts to transport wheelchair users with complete and secure safety.'
  },
  {
    id: 'faq-2',
    category: 'accessibility',
    question: 'Do your drivers help disabled badge holders and special needs passengers?',
    answer: 'All WCT private-hire drivers undergo specialized training to assist passengers with limited mobility, visual or hearing impairments, and physical or neurodivergent needs. We provide full "door-to-door" service, helping with baggage, assisting in and out of the vehicle, and coordinating smoothly at your destination.'
  },
  {
    id: 'faq-3',
    category: 'airports',
    question: 'How do you coordinate airport pickups for late flight arrivals?',
    answer: 'We monitor flight statuses in real time using your flight number (Heathrow, Gatwick, Bournemouth, or Southampton). If your flight is delayed or arrives early, your driver is automatically scheduled to match your new landing time. We offer meet-and-greet in the passenger arrivals hall with a name card as part of our airport package.'
  },
  {
    id: 'faq-4',
    category: 'booking',
    question: 'Can I set up regular school runs or contract bookings?',
    answer: 'Yes! We run regular contract transport solutions, including school runs, local GP surgery or clinic visits, dialysis appointments, and company employee shuttles across Wimborne, Poole, and Bournemouth. These bookings can be invoiced weekly or monthly.'
  },
  {
    id: 'faq-5',
    category: 'pricing',
    question: 'Are your taxi fares fixed, and how can I pay?',
    answer: 'For long-distance transfers like London airports or ferry terminals, we provide fixed quotes so you never pay for unexpected congestion. For local journeys, we match or beat council meter rates. We accept all major Credit/Debit Cards (including contactless and Apple Pay) in the vehicle, as well as digital invoices or cash.'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'special-needs',
    iconName: 'Accessibility',
    title: 'Special Need & Wheelchair WAV',
    description: 'Expert mobility transfers with dedicated wheelchair restraints, hydraulic safety winches, and low-gradient entrance solutions.',
    specialNeedsAlert: true
  },
  {
    id: 'school-runs',
    iconName: 'CalendarRange',
    title: 'DBS-Checked School Runs',
    description: 'Punctual, fully licensed contract passenger transfers to schools, colleges, and specialist academies in Dorset.',
  },
  {
    id: 'medical-trips',
    iconName: 'HeartPulse',
    title: 'GP Surgeries & Hospitals',
    description: 'Stress-free companion transport to local surgeries (Quarterjack GP, Poole Hospital, Royal Bournemouth) with full door-to-door escort.',
  },
  {
    id: 'airport-runs',
    iconName: 'Plane',
    title: 'Airport Dropoffs & Pickups',
    description: 'Punctual private airport shuttles connecting East Dorset to Heathrow, Gatwick, Southampton, and Bournemouth Airports.',
  },
  {
    id: 'terminal-stations',
    iconName: 'Train',
    title: 'Coach, Bus & Rail Terminals',
    description: 'Seamless transfers to Bournemouth Central, Poole Stations, regional bus depots, and Southampton cruise terminals.',
  },
  {
    id: 'shopping-runs',
    iconName: 'ShoppingBag',
    title: 'Shops, Leisure & Socials',
    description: 'Flexible local bookings for grocery runs, social clubs, beauty shops, and dining around town with helpful assistance with bags.',
  }
];
