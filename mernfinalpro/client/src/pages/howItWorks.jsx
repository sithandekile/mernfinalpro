// How It Works Component
import { Search, Shield, Truck, CheckCircle } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Browse Verified Products",
      description: "All items are inspected and approved by our admin team before listing.",
      icon: <Search size={32} className="text-orange-600" />
    },
    {
      step: 2,
      title: "Secure Purchase",
      description: "Your payment is held in escrow - we only release it after delivery confirmation.",
      icon: <Shield size={32} className="text-sky-600" />
    },
    {
      step: 3,
      title: "Delivery or Pickup",
      description: "Choose local delivery or pickup from our verified sellers.",
      icon: <Truck size={32} className="text-purple-600" />
    },
    {
      step: 4,
      title: "Confirm & Complete",
      description: "Inspect your item and confirm delivery to release payment to seller.",
      icon: <CheckCircle size={32} className="text-orange-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">How SafeSwap Local Works</h1>
          <p className="text-xl text-gray-600">Your trusted marketplace for verified pre-owned household goods</p>
        </div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center mr-6">
                {step.icon}
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-2">
                  <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full mr-4">
                    Step {step.step}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block w-px h-12 bg-gray-300 mx-8"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-orange-50 border border-orange-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-orange-800 mb-4">Why Choose SafeSwap Local?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">🔒 100% Secure Transactions</h3>
              <p className="text-orange-600 text-sm">Escrow system protects every purchase</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">✅ Admin Verified Quality</h3>
              <p className="text-orange-600 text-sm">Every item inspected before listing</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">🚚 Local Delivery</h3>
              <p className="text-orange-600 text-sm">Fast, reliable local delivery options</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">💰 Great Savings</h3>
              <p className="text-orange-600 text-sm">Up to 60% off retail prices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
