import React, { useState, useEffect } from 'react';
import { 
  MapPin, Calendar, Clock, ChevronRight, ChevronLeft, Check, 
  Info, Sparkles, AlertCircle, ShieldCheck, Phone, CheckCircle, Ticket 
} from 'lucide-react';
import { VEHICLES, ROUTE_OPTIONS } from '../data';
import { Vehicle, RouteOption, BookingDetails } from '../types';

interface BookingEngineProps {
  initialTargetDropoff?: string;
}
export default function BookingEngine({ initialTargetDropoff = '' }: BookingEngineProps) {
  // Wizard Steps: 1 = Route/Date, 2 = Choose Vehicle, 3 = Passenger Details, 4 = Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form States
  const [pickupId, setPickupId] = useState<string>('wimborne');
  const [dropoffId, setDropoffId] = useState<string>(initialTargetDropoff || 'bournemouth-airport');
  
  const [pickupCustom, setPickupCustom] = useState<string>('');
  const [dropoffCustom, setDropoffCustom] = useState<string>('');
  
  const [pickupType, setPickupType] = useState<'preset' | 'custom'>('preset');
  const [dropoffType, setDropoffType] = useState<'preset' | 'custom'>('preset');

  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('std-sedan');
  
  const [passengerName, setPassengerName] = useState<string>('');
  const [passengerEmail, setPassengerEmail] = useState<string>('');
  const [passengerPhone, setPassengerPhone] = useState<string>('');
  const [specialRequirements, setSpecialRequirements] = useState<string>('');
  const [isWheelchairRequired, setIsWheelchairRequired] = useState<boolean>(false);
  const [isSchoolRun, setIsSchoolRun] = useState<boolean>(false);
  const [schoolName, setSchoolName] = useState<string>('');

  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  // Set default date and time (tomorrow morning at 09:00)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];
    setDate(dateString);
    setTime('09:00');
  }, []);

  // Sync initial dropoff recommendation if passed in from pricing sections
  useEffect(() => {
    if (initialTargetDropoff) {
      setDropoffId(initialTargetDropoff);
      setDropoffType('preset');
    }
  }, [initialTargetDropoff]);

  // Handle accessibility sync - if wheelchair is flagged, auto-select WAV vehicle
  useEffect(() => {
    if (isWheelchairRequired) {
      setSelectedVehicleId('wav-accessible');
    }
  }, [isWheelchairRequired]);

  // Fare calculation logic
  const calculateDistance = (): number => {
    if (pickupType === 'custom' || dropoffType === 'custom') {
      // Return a standard custom distance
      return 15.6; 
    }

    const pOption = ROUTE_OPTIONS.find(r => r.id === pickupId);
    const dOption = ROUTE_OPTIONS.find(r => r.id === dropoffId);

    if (!pOption || !dOption) return 5.0;

    const diff = Math.abs(pOption.milesFromWimborne - dOption.milesFromWimborne);
    if (diff === 0) {
      return 3.5; // Shared local transfer min distance
    }
    // Multiply by 1.25 to account for actual road networks instead of straight lines
    return parseFloat((diff * 1.22).toFixed(1));
  };

  const getEstimatedPrice = (vehicle: Vehicle): number => {
    const dist = calculateDistance();
    const subtotal = vehicle.baseFare + (dist * vehicle.perMileRate);
    return Math.max(12.50, parseFloat(subtotal.toFixed(2))); // minimum flat charge of £12.50
  };

  const getActivePickupName = (): string => {
    if (pickupType === 'custom') return pickupCustom || 'Custom Dorset Address';
    return ROUTE_OPTIONS.find(r => r.id === pickupId)?.name || 'Wimborne';
  };

  const getActiveDropoffName = (): string => {
    if (dropoffType === 'custom') return dropoffCustom || 'Custom Destination Address';
    return ROUTE_OPTIONS.find(r => r.id === dropoffId)?.name || 'Destination';
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (pickupType === 'custom' && !pickupCustom.trim()) {
        alert('Please enter your pickup address.');
        return;
      }
      if (dropoffType === 'custom' && !dropoffCustom.trim()) {
        alert('Please enter your dropoff destination.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName.trim() || !passengerEmail.trim() || !passengerPhone.trim()) {
      alert('Please fill out all contact fields details.');
      return;
    }

    setIsDispatching(true);
    
    // Generate reference immediately so it is available for both email and success screen
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ref = `WCT-2026-X${randomSuffix}`;
    setBookingRef(ref);

    // Simulate dispatching delay, then redirect / trigger mailto and show success
    setTimeout(() => {
      setIsDispatching(false);
      
      const subject = encodeURIComponent(`Booking Request ${ref} - ${passengerName}`);
      const body = encodeURIComponent(
        `Wimborne Cab Taxis Dispatch Reservation Request\n` +
        `==================================================\n\n` +
        `Booking Reference: ${ref}\n\n` +
        `--- CUSTOMER DETAILS ---\n` +
        `Name: ${passengerName}\n` +
        `Email: ${passengerEmail}\n` +
        `Phone: ${passengerPhone}\n\n` +
        `--- JOURNEY DETAILS ---\n` +
        `Pickup Location: ${getActivePickupName()}\n` +
        `Destination Address: ${getActiveDropoffName()}\n` +
        `Date: ${date}\n` +
        `Time: ${time}\n` +
        `Estimated Distance: ${distance} Miles\n\n` +
        `--- VEHICLE & ESTIMATED FARE ---\n` +
        `Selected Option: ${activeVehicle.name}\n` +
        `Estimated Fixed Fare: £${totalCost.toFixed(2)}\n` +
        `Wheelchair WAV Required: ${isWheelchairRequired ? 'YES (Hydraulic Ramp & Winch Match)' : 'No'}\n` +
        `Contract School Run: ${isSchoolRun ? `YES (School Name: ${schoolName || 'Not specified'})` : 'No'}\n\n` +
        `--- SPECIAL REQUIREMENTS / LUGGAGE ---\n` +
        `${specialRequirements || 'None specified.'}\n\n` +
        `--------------------------------------------------\n` +
        `Please click "Send" to forward this reservation request to our central dispatch unit.`
      );

      // Trigger the mailto link action safely
      window.location.href = `mailto:info@taxi-bournemouth.com?subject=${subject}&body=${body}`;

      setStep(4);
      
      // Auto scroll to success ticket
      const ticketEl = document.getElementById('success-booking-ticket');
      if (ticketEl) {
        ticketEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1500);
  };

  const resetBooking = () => {
    setStep(1);
    setPickupId('wimborne');
    setPickupCustom('');
    setDropoffCustom('');
    setPickupType('preset');
    setDropoffType('preset');
    setIsWheelchairRequired(false);
    setIsSchoolRun(false);
    setSchoolName('');
    setPassengerName('');
    setPassengerEmail('');
    setPassengerPhone('');
    setSpecialRequirements('');
  };

  const distance = calculateDistance();
  const activeVehicle = VEHICLES.find(v => v.id === selectedVehicleId) || VEHICLES[0];
  const totalCost = getEstimatedPrice(activeVehicle);

  return (
    <div id="booking-container-card" className="w-full bg-zinc-950 rounded-2xl border border-zinc-800 shadow-xl overflow-hidden shadow-gold-soft">
      {/* Dynamic Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-black p-5 sm:p-6 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-semibold text-[#FFE082] tracking-widest block mb-1">
            WCT Dispatch Console
          </span>
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            {step === 1 && 'Plan Your Route & Options'}
            {step === 2 && 'Select Vehicle Tier'}
            {step === 3 && 'Passenger Contact Details'}
            {step === 4 && 'Reservation Confirmed'}
          </h3>
        </div>
        {step < 4 && (
          <div className="font-mono text-xs px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
            Step {step} of 3
          </div>
        )}
      </div>

      {/* Booking Form Core */}
      <div className="p-5 sm:p-6 md:p-8">
        
        {/* Step 1: Destination and Route Mapping */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Pick Up Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-zinc-300 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-emerald-500" /> Pickup Location (Dorset)
                </label>
                <div className="flex gap-1 text-[11px] bg-zinc-900 p-0.5 rounded border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setPickupType('preset')}
                    className={`px-2 py-0.5 rounded transition ${pickupType === 'preset' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Preset Towns
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupType('custom')}
                    className={`px-2 py-0.5 rounded transition ${pickupType === 'custom' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Custom Address
                  </button>
                </div>
              </div>

              {pickupType === 'preset' ? (
                <div className="relative">
                  <select
                    value={pickupId}
                    onChange={(e) => setPickupId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl py-3 px-4 text-zinc-100 focus:outline-none focus:border-amber-400 transition"
                  >
                    {ROUTE_OPTIONS.filter(r => r.type === 'local' || r.type === 'station' || r.type === 'hospital').map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name} ({option.address.split(',')[0]})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Enter full pickup address or landmark in Dorset..."
                  value={pickupCustom}
                  onChange={(e) => setPickupCustom(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl py-3 px-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition"
                />
              )}
            </div>

            {/* Drop Off Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-zinc-300 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-rose-500" /> Destination / Dropoff
                </label>
                <div className="flex gap-1 text-[11px] bg-zinc-900 p-0.5 rounded border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setDropoffType('preset')}
                    className={`px-2 py-0.5 rounded transition ${dropoffType === 'preset' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Preset Destinations
                  </button>
                  <button
                    type="button"
                    onClick={() => setDropoffType('custom')}
                    className={`px-2 py-0.5 rounded transition ${dropoffType === 'custom' ? 'bg-amber-400 text-black font-semibold' : 'text-zinc-400 hover:text-white'}`}
                  >
                    Custom Address
                  </button>
                </div>
              </div>

              {dropoffType === 'preset' ? (
                <select
                  value={dropoffId}
                  onChange={(e) => setDropoffId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl py-3 px-4 text-zinc-100 focus:outline-none focus:border-amber-400 transition"
                >
                  <optgroup label="Airports & Cruise Ports" className="bg-zinc-950 text-amber-400 font-semibold text-xs">
                    {ROUTE_OPTIONS.filter(r => r.type === 'airport').map((option) => (
                      <option key={option.id} value={option.id} className="text-zinc-100 font-sans">
                        {option.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Hospitals & GP Surgeries" className="bg-zinc-950 text-amber-400 font-semibold text-xs">
                    {ROUTE_OPTIONS.filter(r => r.type === 'hospital').map((option) => (
                      <option key={option.id} value={option.id} className="text-zinc-100 font-sans">
                        {option.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Local Towns & Stations" className="bg-zinc-950 text-gold-400 font-bold text-xs">
                    {ROUTE_OPTIONS.filter(r => r.type === 'local' || r.type === 'station').map((option) => (
                      <option key={option.id} value={option.id} className="text-zinc-100 font-sans" disabled={option.id === pickupId}>
                        {option.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              ) : (
                <input
                  type="text"
                  placeholder="Enter full destination address or airport terminal..."
                  value={dropoffCustom}
                  onChange={(e) => setDropoffCustom(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl py-3 px-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition"
                />
              )}
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase text-zinc-400 block mb-1.5 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" /> Pickup Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl py-3 px-4 text-zinc-100 focus:outline-none focus:border-amber-400 transition"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-zinc-400 block mb-1.5 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-amber-400" /> Pickup Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl py-3 px-4 text-zinc-100 focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            </div>

            {/* Specialized Needs Framework Multipliers (WAV & School Runs) */}
            <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800/80 space-y-4">
              <span className="block text-xs font-bold uppercase tracking-wide text-amber-400 flex items-center gap-1">
                <Info className="h-3.5 w-3.5" /> Specialized Class Requests
              </span>
              
              <div className="flex flex-col gap-3">
                {/* Wheelchair Accessible Vehicle Selector */}
                <label className="flex items-start gap-3 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={isWheelchairRequired}
                    onChange={(e) => setIsWheelchairRequired(e.target.checked)}
                    className="h-5 w-5 rounded border-zinc-700 bg-zinc-800 text-amber-400 focus:ring-amber-400/30 mt-0.5 accent-amber-400"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-zinc-200 group-hover:text-white transition">
                      Requires Wheelchair Accessible Vehicle (WAV)
                    </span>
                    <span className="block text-xs text-zinc-400 mt-0.5">
                      Check this to dispatch a vehicle with dynamic hydraulic ramps and certified wheelchair tie-down points.
                    </span>
                  </div>
                </label>

                {/* School Run Switch */}
                <label className="flex items-start gap-3 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={isSchoolRun}
                    onChange={(e) => setIsSchoolRun(e.target.checked)}
                    className="h-5 w-5 rounded border-zinc-700 bg-zinc-800 text-amber-400 focus:ring-amber-400/30 mt-0.5 accent-amber-400"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-zinc-200 group-hover:text-white transition">
                      Contract School Run / College Transfer
                    </span>
                    <span className="block text-xs text-zinc-400 mt-0.5">
                      Check this for DBS-checked operators licensed for regular educational contract trips.
                    </span>
                  </div>
                </label>
              </div>

              {isSchoolRun && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="text-xs font-semibold text-[#FFE082] block">School or College Name</label>
                  <input
                    type="text"
                    placeholder="E.g., Queen Elizabeth's School, Poole College..."
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 text-sm rounded-lg py-2.5 px-3.5 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}
            </div>

            {/* Next Action Button */}
            <button
              onClick={handleNextStep}
              className="w-full py-4 rounded-xl font-bold bg-gold-gradient text-black hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2 text-base cursor-pointer hover:shadow-gold-heavy"
            >
              Continue to Vehicles
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Step 2: Choose Vehicle Category */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Route Summary */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="font-semibold text-emerald-500 uppercase">Pickup:</span>
                  <span className="truncate max-w-[200px] text-zinc-200">{getActivePickupName()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="font-semibold text-rose-500 uppercase">Destination:</span>
                  <span className="truncate max-w-[200px] text-zinc-200">{getActiveDropoffName()}</span>
                </div>
              </div>
              
              <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-zinc-800 pt-2 sm:pt-0">
                <span className="text-xs text-zinc-400">Est. Distance</span>
                <span className="font-mono font-bold text-amber-400 text-base">{distance} Miles</span>
              </div>
            </div>

            {/* Specialized Constraint Recommendation Alert */}
            {isWheelchairRequired && (
              <div className="bg-amber-400/10 border border-amber-400/30 p-4 rounded-xl text-xs text-amber-200 flex items-start gap-2.5">
                <AlertCircle className="h-4.5 w-4.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-300 mb-0.5">Accessibility Match Activated</strong>
                  We have highlighted and automatically locked our specialized WAV (Wheelchair Accessible Vehicle) below. It contains mechanical ramps and winches tested to council safety code.
                </div>
              </div>
            )}

            {/* List Vehicles with calculated estimates */}
            <div className="space-y-4">
              {VEHICLES.map((vehicle) => {
                const isSelected = selectedVehicleId === vehicle.id;
                const isWAV = vehicle.type === 'wav';
                const computedEstimate = getEstimatedPrice(vehicle);

                // Disable non-WAV options if wheelchair access is strictly required to enforce safety
                const isDisabled = isWheelchairRequired && !isWAV;

                return (
                  <div
                    key={vehicle.id}
                    onClick={() => {
                      if (!isDisabled) setSelectedVehicleId(vehicle.id);
                    }}
                    className={`border rounded-xl p-4 transition-all flex flex-col md:flex-row gap-5 ${
                      isDisabled 
                        ? 'opacity-40 cursor-not-allowed bg-zinc-950 border-zinc-900/60' 
                        : isSelected
                          ? 'border-amber-400 bg-amber-400/5 shadow-gold-soft'
                          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 cursor-pointer'
                    }`}
                  >
                    {/* Vehicle Description Column */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Selected Check Indicator */}
                        <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-amber-400 bg-amber-400 text-black' : 'border-zinc-700'
                        }`}>
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>

                        <span className="font-display font-black tracking-wide text-zinc-100">
                          {vehicle.name}
                        </span>

                        {isWAV && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-400/15 border border-amber-400/40 text-amber-300 font-bold uppercase tracking-wider">
                            Council Approved WAV
                          </span>
                        )}
                        {vehicle.type === 'executive' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-sky-400/10 border border-sky-400/20 text-sky-300 font-bold uppercase tracking-wider">
                            Premium Chauffeur
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed md:max-w-[450px]">
                        {vehicle.description}
                      </p>

                      {/* Specs Badge */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 pt-1">
                        <span className="flex items-center gap-1">👥 {vehicle.capacity} Passengers</span>
                        <span className="h-2 w-2 rounded-full bg-zinc-800" />
                        <span className="flex items-center gap-1">💼 {vehicle.luggage} Suitcases</span>
                      </div>

                      {/* Bullet Features list */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1.5 border-t border-zinc-800/40 mt-2">
                        {vehicle.features.map((feat, idx) => (
                          <div key={idx} className="text-[10px] text-zinc-500 flex items-center gap-1">
                            <span className="h-1 w-1 bg-amber-400 rounded-full" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fare Cost estimation right column */}
                    <div className="flex md:flex-col items-baseline md:items-end justify-between md:justify-center border-t md:border-t-0 border-zinc-800/80 pt-3 md:pt-0 min-w-[140px] md:pl-4 md:border-l md:border-zinc-800/40">
                      <div className="text-zinc-500 text-left md:text-right">
                        <span className="block text-[10px] uppercase font-bold tracking-wider leading-none">Est. Fixed Fare</span>
                        <span className="text-[9px] text-amber-500/80">WCT Guaranteed</span>
                      </div>
                      
                      <div className="mt-1">
                        <span className="text-zinc-300 font-sans text-xs mr-1">£</span>
                        <span className="font-mono text-white text-2xl font-extrabold tracking-tight">
                          {computedEstimate.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Wizard Navigation */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-900">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>

              <button
                onClick={handleNextStep}
                className="flex-1 py-4 rounded-xl font-bold bg-gold-gradient text-black hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Continue to Details
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Passenger Details and Submit */}
        {step === 3 && (
          <form onSubmit={handleBookSubmit} className="space-y-6">
            
            {/* Quick Summary review */}
            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
              <span className="block text-xs font-bold uppercase text-amber-400 mb-1">Trip Review Summary</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-zinc-300">
                <div>
                  <span className="text-zinc-500">Pick-Up:</span> {getActivePickupName()}
                </div>
                <div>
                  <span className="text-zinc-500">Destination:</span> {getActiveDropoffName()}
                </div>
                <div>
                  <span className="text-zinc-500">Schedule:</span> {date} @ {time}
                </div>
                <div>
                  <span className="text-zinc-500">Vehicle:</span> {activeVehicle.name}
                </div>
                {isWheelchairRequired && (
                  <div className="border-t border-zinc-800 pt-1.5 mt-1.5 md:col-span-2 text-amber-300 font-semibold">
                    ♿ Safety ramp and hydraulic winches pre-selected
                  </div>
                )}
              </div>

              <div className="border-t border-zinc-800 pt-3 flex items-center justify-between mt-2">
                <span className="text-zinc-400">Total Estimated Cost:</span>
                <span className="font-mono text-amber-400 font-semibold text-lg">£{totalCost.toFixed(2)}</span>
              </div>
            </div>

            {/* Inputs Core */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-zinc-400 block mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Sarah Jenkins"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl py-3 px-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase text-zinc-400 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="E.g., sarah@example.com"
                    value={passengerEmail}
                    onChange={(e) => setPassengerEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl py-3 px-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-zinc-400 block mb-1.5">
                    Contact Mobile Number (UK)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="E.g., 07757 127214"
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl py-3 px-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 font-mono transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-zinc-400 block mb-1.5 flex items-center justify-between">
                  <span>Special Requirements or Luggage Details</span>
                  <span className="text-zinc-600 font-normal lowercase">optional</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Need assistance carrying heavy bags, specific medical instructions, companion requirements, extra equipment..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm rounded-xl py-2.5 px-4 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            </div>

            {/* Safe Policy guarantee */}
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 text-[10px] text-zinc-500 leading-relaxed flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-[#FFE082]" />
              <div>
                <strong>Zero Booking Risk:</strong> By reserving online, your taxi is secured. No upfront charges. Payment is handled in-vehicle via card or contactless terminal once the journey completes. For special inquiries, you can directly email <a href="mailto:info@taxi-bournemouth.com" className="text-amber-400 hover:text-[#FFE082] underline font-semibold transition-colors">info@taxi-bournemouth.com</a>.
              </div>
            </div>

            {/* Actions Grid */}
            <div className="flex flex-col gap-3 pt-2 border-t border-zinc-900">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-3.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isDispatching}
                  className="flex-1 py-4 rounded-xl font-bold bg-gold-gradient text-black hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2 text-base cursor-pointer hover:shadow-gold-heavy disabled:opacity-50"
                >
                  {isDispatching ? (
                    <>
                      <div className="h-5 w-5 rounded-full border-2 border-dashed border-black animate-spin" />
                      Connecting Dorset Dispatch...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" />
                      Complete Dispatch Reservation
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-zinc-400 mt-1">
                Prefer manual dispatch? You can also complete your reservation request by emailing{' '}
                <a 
                  href="mailto:info@taxi-bournemouth.com?subject=Wimborne Cab Taxis - New Dispatch Reservation Request"
                  className="text-[#FFE082] hover:text-amber-400 underline font-semibold transition-colors"
                >
                  info@taxi-bournemouth.com
                </a>
              </p>
            </div>
          </form>
        )}

        {/* Step 4: Success Ticket Dashboard */}
        {step === 4 && (
          <div id="success-booking-ticket" className="py-6 text-center space-y-6">
            <div className="mx-auto h-16 w-16 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl sm:text-2xl font-bold font-display text-white">
                Booking Secured Successfully!
              </h4>
              <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-white font-semibold">{passengerName}</span>. Your reservation request has been dispatched to our central Dorset team.
              </p>
            </div>

            {/* Luxury Ticket Wrapper */}
            <div className="max-w-md mx-auto bg-zinc-900 rounded-2xl border border-amber-400/20 shadow-lg overflow-hidden relative">
              
              {/* Gold Tickets Side Notches */}
              <div className="absolute top-1/2 -left-3 h-6 w-6 rounded-full bg-zinc-950 border-r border-amber-400/20 transform -translate-y-1/2" />
              <div className="absolute top-1/2 -right-3 h-6 w-6 rounded-full bg-zinc-950 border-l border-amber-400/20 transform -translate-y-1/2" />

              {/* Upper Section */}
              <div className="p-5 border-b border-dashed border-zinc-800">
                <div className="flex justify-between items-center text-xs text-zinc-500 uppercase tracking-widest mb-3.5">
                  <div className="flex items-center gap-1">
                    <Ticket className="h-3 w-3 text-amber-500" /> WCT Boarding Pass
                  </div>
                  <span>Reference ID</span>
                </div>

                <div className="font-mono text-xl text-[#FFE082] font-semibold tracking-wider bg-black/40 py-2 inline-block px-4 rounded-lg">
                  {bookingRef}
                </div>
              </div>

              {/* Ticket Details Body */}
              <div className="p-5 space-y-3.5 text-xs text-left max-w-[340px] mx-auto text-zinc-300">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Pick-Up Address:</span>
                  <span className="font-semibold text-white text-right truncate max-w-[180px]">{getActivePickupName()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Destination:</span>
                  <span className="font-semibold text-white text-right truncate max-w-[180px]">{getActiveDropoffName()}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-zinc-400">Date & Time:</span>
                  <span className="font-semibold text-[#FFE082]">{date} &nbsp;{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Selected Car:</span>
                  <span className="font-semibold text-white">{activeVehicle.name}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-800/80 pt-3">
                  <span className="text-zinc-400 font-bold uppercase tracking-wider">Estimated Fare:</span>
                  <span className="font-mono text-[#FFE082] font-black text-sm">£{totalCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-zinc-950 p-4 border-t border-zinc-800 text-[11px] text-zinc-400 tracking-wide text-center">
                🕒 Operator will call or SMS you at <span className="text-[#FFE082] font-semibold">{passengerPhone}</span> to confirm the driver unit within 10 minutes.
              </div>
            </div>

            {/* Quick action trigger for phone callback */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href="tel:004447757127214"
                className="flex items-center justify-center gap-2 text-sm px-5 py-3 rounded-xl border border-amber-400/20 text-[#FFE082] bg-zinc-950 hover:bg-zinc-900 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Need Immediate Help? Call 07757 127214
              </a>
              <button
                onClick={resetBooking}
                className="text-sm px-5 py-3 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
              >
                Book Another Trip
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
