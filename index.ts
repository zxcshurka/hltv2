export interface Player {
  id?: string;
  nickname: string;
  real_name: string;
  country: string;
  country_flag: string;
  team: string;
  role: string;
  age: number;
  kd_ratio: number;
  rating: number;
  maps_played: number;
  rounds_played: number;
  kills: number;
  deaths: number;
  assists: number;
  headshot_pct: number;
  medals: number;
  trophies: number;
  mvp_count: number;
  created_at?: string;
}

export interface PlayerFormData {
  nickname: string;
  real_name: string;
  country: string;
  team: string;
  role: string;
  age: number;
  kd_ratio: number;
  rating: number;
  maps_played: number;
  kills: number;
  deaths: number;
  assists: number;
  headshot_pct: number;
  medals: number;
  trophies: number;
  mvp_count: number;
}
