export interface Laboatoria {
  id: number;
  nazwa: string;
  adres: string;
  kod_pocztowy: string;
  miejscowosc: string;
  tel: string;
  gps_lat: number;
  gps_lng: number;
  info?: string;
}
