export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  subcategory?: string | null;
  brand?: string | null;
  created_at?: string;
};
