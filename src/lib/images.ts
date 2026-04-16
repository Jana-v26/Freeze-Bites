// Product image URLs for Meelar brand
export const productImages: Record<string, { main: string; alt: string }> = {
  'jamun-pouch': {
    main: '/images/products/jamun-pouch.png',
    alt: 'Meelar Premium Matte Pouch - Freeze-Dried Jamun (Black Plum)',
  },
  'banana-pouch': {
    main: '/images/products/banana-pouch.png',
    alt: 'Meelar Premium Matte Pouch - Freeze-Dried Banana Slices',
  },
  'mango-pouch': {
    main: '/images/products/mango-pouch.png',
    alt: 'Meelar Premium Matte Pouch - Freeze-Dried Mango Cubes',
  },
  'guava-pouch': {
    main: '/images/products/guava-pouch.png',
    alt: 'Meelar Premium Matte Pouch - Freeze-Dried Pink Guava Slices',
  },
  'moringa-pouch': {
    main: '/images/products/moringa-pouch.png',
    alt: 'Meelar Premium Matte Pouch - Organic Moringa Powder',
  },
};

export const heroImages = {
  main: '/images/products/mango-pouch.png',
};

// Get image for a product slug
export function getProductImage(slug: string): { main: string; alt: string } {
  return productImages[slug] || {
    main: heroImages.main,
    alt: 'Meelar product',
  };
}
