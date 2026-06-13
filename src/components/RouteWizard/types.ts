export interface Stop {
  id: string;
  customerId: string;
  customerName: string;
  address: string;
  lat: string;
  lng: string;
  type: "pick-up" | "drop-off";
  appointmentTime: string;
  note: string;
}

export interface FormData {
  name: string;
  brandId: string;
  date: string;
  driverId: string;
  vehicleId: string;
  isPartnerVehicle: boolean;
  stops: Stop[];
}

export interface Brand {
  id: string;
  name: string;
  color: string;
  penaltyRules: string;
}

export interface Customer {
  id: string;
  name: string;
  address: string;
  lat: string;
  lng: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseExpiry: string;
  status: string;
}

export interface Vehicle {
  id: string;
  type: string;
  status: string;
  isPartner: boolean;
  maintenanceDue: string;
  taxExpiry: string;
  insuranceExpiry: string;
}
