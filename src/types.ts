export interface SareeProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  tag?: string; // "New Arrival", "Editorial Exclusive", "Limited Release", "Rare Heirloom"
  tagColor?: 'teal' | 'terracotta' | 'plum';
  image: string;
  secondaryImage?: string;
  fabric: string;
  colorCode: string;
  colorName: string;
  origin: string;
  description: string;
  editorialNote: string;
  drapingDifficulty: 'Beginner' | 'Intermediate' | 'Master';
}

export interface CartItem {
  product: SareeProduct;
  quantity: number;
  selectedBlouseSize?: string;
}
