export interface RecommendedApp {
  id: number;
  name: string;
  category: string;
  external_id: string;
  rating: number;
  install_count: number
  description: string;
  url: string;
  publisher: string;
  icon: string;
  min_age: number;
}
  
export type NormalizedApp = Omit<RecommendedApp, 'external_id' | 'install_count' | 'description' | 'publisher'>;

export interface Filters {
  name: string;
  category: string;
  rating: number;
  min_age: number;
}