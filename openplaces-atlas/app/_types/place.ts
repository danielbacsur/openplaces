export type Place = {
  name: string;
  rating: number;
  reviews: string;
  price?: string;
  category: string;
  address: string;
  description?: string;
  hours: { status: string; detail: string; color: string };
  accessible?: boolean;
  sponsored?: boolean;
  services?: { label: string; available: boolean }[];
  reserve?: boolean;
  review?: string;
  image: string;
};
