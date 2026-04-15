// Product image URLs from Google CDN (Stitch-generated packaging images)
// All URLs are 322 chars - if shorter, they're truncated and will 400

export const productImages: Record<string, { main: string; alt: string }> = {
  'mango-cubes': {
    main: '/images/products/mango-cubes.png',
    alt: 'Premium Stand-up Pouch Mockup for Freeze-Dried Mango Cubes',
  },
  'pineapple-cubes': {
    main: '/images/products/pineapple-cubes.png',
    alt: 'Premium Stand-up Pouch Mockup for Freeze-Dried Pineapple Cubes',
  },
  'jamun-cubes': {
    main: '/images/products/jamun-cubes.png',
    alt: 'Premium Stand-up Pouch Mockup for Freeze-Dried Jamun Cubes',
  },
  'banana-cubes': {
    main: '/images/products/banana-cubes.png',
    alt: 'Premium Stand-up Pouch Mockup for Freeze-Dried Banana Slices',
  },
  'jackfruit-cubes': {
    main: '/images/products/jackfruit-cubes.png',
    alt: 'Premium Stand-up Pouch Mockup for Freeze-Dried Jackfruit Cubes',
  },
  'jamun-powder': {
    main: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv1D9Ulrmt6M5GvNN_fko0dUtrPS-AroXAlpOthD1kgOzJL4ULEL4QsqdLaEkH4OAojxi_RmH0XGb_7mZnt8GbPyyNDB91DDmF-4ijIfIbCXsnfDt96z_r2Hx78fl6CRBgL9zNfJQIPCy3aR4Jz-lUncyATk_Kbi7CZ3DsCSEV7tux5TujTSFWAjuAl-1x4YTgJcxvMedSJSYEco1Tbw6ATX7UKJ0oe1ecnXajerhcW3TOP6kFXlfSxFiZ0Egd2onHkF6CizZdFB35',
    alt: 'Premium Jamun Powder Sachet',
  },
  'mango-powder': {
    main: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmnILGSlVSSNZzJLrKf7WAygot5YtJJFwKhQ7Sa2Net_U8ICKmtVUpWHkmQA3M5oKdchZrV_GcmJp-F1ipnoksXyNsyhnEvy86vFg5VnAOi1Z46Tk55EVeAhgC9Fz2WYIJ1K37Gy17RXpstKLqr-hugRw0YJD3WaghGcogZZ6YfjAZreUqVkeGVjAFhJNMag-GHTZHOATC8HNYGH-nkIpTbdOZ3LeqsmW5NLHdJ9qaSF5cgyZHbdFoVK7Mn7olBKF6oosY6lxVvSze',
    alt: 'Premium Mango Powder Sachet',
  },
  'pineapple-powder': {
    main: '/images/products/pineapple-powder.png',
    alt: 'Premium Ultra-Slim Stick Sachet for Pineapple Powder',
  },
  'moringa-powder': {
    main: '/images/products/moringa-powder.png',
    alt: 'Premium Ultra-Slim Stick Sachet for Moringa Powder',
  },
  'watermelon-powder': {
    main: '/images/products/watermelon-powder.png',
    alt: 'Premium Ultra-Slim Stick Sachet for Watermelon Powder',
  },
  'lemon-powder': {
    main: '/images/products/lemon-powder.png',
    alt: 'Premium Ultra-Slim Stick Sachet for Lemon Powder',
  },
};

export const heroImages = {
  main: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSRXqa_3Y9FIJjOEW5tSTx-N_75gq9r1nVf_rjT_Zkxp1FpFlfp417vnwDIhessYzQnj693PIYE4467J-OuGfDc3HUKlYg91dbPlIHHnOc4ds89uI14qNyqNQ2AeFNcjteuPjQGRA5091SxOdD3-qLwCDce_CmYPYIG7BAk9b-K26z43SHnTu2s7DoAqEmShsqN-eUPqyPVh1PnA2DAgfe_e-eupiP_KLYcUlqQLJ_gLW7wBcrZwrP_wGRW2Kx-ZAJPNYbTM7zgWvp',
};

// Get image for a product slug
export function getProductImage(slug: string): { main: string; alt: string } {
  return productImages[slug] || {
    main: heroImages.main,
    alt: 'FreezeDelights product',
  };
}
