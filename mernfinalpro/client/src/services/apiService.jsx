
// Mock API Service
export const apiService = {
  getProducts: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      {
        id: 1,
        name: "Mid-Century Modern Dining Table",
        price: 450,
        originalPrice: 800,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        condition: "Excellent",
        qualityScore: 9.2,
        category: "Furniture",
        description: "Beautiful teak dining table for 6 people. Minor wear on corners, professionally cleaned.",
        verified: true
      },
      {
        id: 2,
        name: "KitchenAid Stand Mixer",
        price: 180,
        originalPrice: 380,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        condition: "Good",
        qualityScore: 8.5,
        category: "Kitchen Appliances",
        description: "Classic red KitchenAid mixer, all attachments included. Light scratches on base.",
        verified: true
      },
      {
        id: 3,
        name: "Samsung 55\" Smart TV",
        price: 320,
        originalPrice: 650,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
        condition: "Excellent",
        qualityScore: 9.0,
        category: "Electronics",
        description: "4K UHD Smart TV with HDR. Perfect working condition, includes remote.",
        verified: true
      },
      {
        id: 4,
        name: "Vintage Leather Armchair",
        price: 280,
        originalPrice: 600,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        condition: "Good",
        qualityScore: 8.0,
        category: "Furniture",
        description: "Genuine leather armchair with minor patina. Very comfortable and sturdy.",
        verified: true
      }
    ];
  },
  
  getProduct: async (id) => {
    const products = await apiService.getProducts();
    return products.find(p => p.id === parseInt(id));
  },
  
  processPayment: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, orderId: Math.random().toString(36).substr(2, 9) };
  }
};
