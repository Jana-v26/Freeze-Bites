export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryName: string;
  categorySlug: string;
  basePrice: number;
  images: ProductImage[];
  variants: ProductVariant[];
  averageRating: number;
  reviewCount: number;
  featured: boolean;
  active: boolean;
}

export interface ProductImage {
  id: number;
  url: string;
  altText: string;
  primary: boolean;
  sortOrder: number;
}

export interface ProductVariant {
  id: number;
  name: string;
  weight: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  sku: string;
}

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string;
  variantId: number;
  variantName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: Address;
  paymentStatus: string;
  createdAt: string;
}

export interface OrderItem {
  id: number;
  productName: string;
  variantName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Address {
  id: number;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}
