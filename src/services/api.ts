
import { Provider } from "@/types/provider";

const mockData: Provider[] = [
  {
    "name": "Dr. Aarushi Sharma",
    "provider_usertype": "therapist",
    "is_inhouse": true,
    "id": 101,
    "image": "https://randomuser.me/api/portraits/women/1.jpg",
    "clinic_details": {
      "id": 1,
      "name": "Bandra Clinic"
    },
    "availabilities": [
      {
        "online_slots": ["08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45"],
        "offline_slots": ["10:00", "10:15", "10:30", "10:45"],
        "both_slots": ["11:00", "11:15", "11:30", "11:45"],
        "online_booked_slots": ["10:30", "09:45"],
        "offline_booked_slots": ["11:15", "10:45"],
        "blocked_slots": ["09:00", "12:15"]
      }
    ]
  },
  {
    "name": "Anjana Thattil",
    "provider_usertype": "psychiatrist",
    "is_inhouse": false,
    "id": 102,
    "image": "https://randomuser.me/api/portraits/women/2.jpg",
    "clinic_details": {
      "id": 2,
      "name": "Andheri Clinic"
    },
    "availabilities": [
      {
        "online_slots": ["09:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45"],
        "offline_slots": ["07:00", "12:15", "12:30", "12:45"],
        "both_slots": ["13:00", "13:15", "13:30", "13:45"],
        "online_booked_slots": ["10:30", "11:45"],
        "offline_booked_slots": ["9:15", "12:45"],
        "blocked_slots": ["14:00", "14:15"]
      }
    ]
  },
  {
    "name": "Dr. Amiya Banerjee",
    "provider_usertype": "psychiatrist",
    "is_inhouse": true,
    "id": 103,
    "image": "https://randomuser.me/api/portraits/men/3.jpg",
    "clinic_details": {
      "id": 3,
      "name": "Juhu Clinic"
    },
    "availabilities": [
      {
        "online_slots": ["08:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45"],
        "offline_slots": ["11:00", "16:15", "16:30", "16:45"],
        "both_slots": ["17:00", "17:15", "17:30", "17:45"],
        "online_booked_slots": ["12:30", "15:45"],
        "offline_booked_slots": ["2:15", "16:45"],
        "blocked_slots": ["09:00", "18:15"]
      }
    ]
  },
  {
    "name": "Dr. Rohan Mehta",
    "provider_usertype": "therapist",
    "is_inhouse": true,
    "id": 104,
    "image": "https://randomuser.me/api/portraits/men/4.jpg",
    "clinic_details": {
      "id": 4,
      "name": "Khar Clinic"
    },
    "availabilities": [
      {
        "online_slots": ["09:00", "08:15", "09:30", "08:45", "09:00", "09:15", "09:30", "09:45"],
        "offline_slots": ["10:00", "10:15", "10:30", "10:45"],
        "both_slots": ["11:00", "11:15", "11:30", "11:45"],
        "online_booked_slots": ["08:30", "09:45"],
        "offline_booked_slots": ["10:15", "10:45"],
        "blocked_slots": ["12:00", "12:15"]
      }
    ]
  }
];



export const getProviders = async (): Promise<Provider[]> => {
  // API with delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockData;
};
