// services/reservationApi.ts

import axios from 'axios';

export type BookingItem = {
  booking_id: number;
  user_id: number;
  status: 'confirmed' | 'cancel' | 'done' | string;
  date: string; // "YYYY-MM-DD"
  start_time: string; // "HH:MM:SS"
  end_time: string; // "HH:MM:SS"
  service_ids: number[];
  total_price: number; // thai baht
};

export type HistoryBookingResponse =
  | { status: true; data: BookingItem[] }
  | { status: false; message?: string };

export type CancelBookingResponse = {
  status: boolean;
  message: string;
};

const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL;

export const reservationApi = {
  async getHistory(token: string): Promise<HistoryBookingResponse> {
    const res = await axios.get(`${API_BASE}/history-booking`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data as HistoryBookingResponse;
  },

  async cancelBooking(token: string, booking_id: number): Promise<CancelBookingResponse> {
    const res = await axios.post(
      `${API_BASE}/cancel-booking`,
      { booking_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data as CancelBookingResponse;
  },
};
