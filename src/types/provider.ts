
export interface ClinicDetails {
  id: number;
  name: string;
}

export interface Availability {
  online_slots: string[];
  offline_slots: string[];
  both_slots: string[];
  online_booked_slots: string[];
  offline_booked_slots: string[];
  blocked_slots: string[];
}

export interface Provider {
  name: string;
  provider_usertype: "therapist" | "psychiatrist";
  is_inhouse: boolean;
  id: number;
  image: string;
  clinic_details: ClinicDetails;
  availabilities: Availability[];
}
