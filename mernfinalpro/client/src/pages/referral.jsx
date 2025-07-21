
// Referral Program Component
import { useState } from 'react';
import { Gift, User, CheckCircle } from 'lucide-react';

export const ReferralProgram = () => {
  const [referralCode, setReferralCode] = useState('SAFE' + Math.random().toString(36).substr(2, 6).toUpperCase());

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Earn Store Credits</h1>
          <p className="text-xl text-gray-600">Refer friends and earn $25 credit for each successful referral</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Your Referral Code</h2>
            <div className="bg-white text-orange-600 text-2xl font-bold py-4 px-8 rounded-xl inline-block mb-4">
              {referralCode}
            </div>
            <p className="text-orange-100 mb-6">Share this code with friends to earn credits</p>
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Copy Code
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="text-orange-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Share Your Code</h3>
            <p className="text-gray-600">Send your referral code to friends via social media or email</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Friend Joins</h3>
            <p className="text-gray-600">Your friend signs up and makes their first purchase of $50+</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Both Earn Credits</h3>
            <p className="text-gray-600">You get $25, they get $10 off their first purchase</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Referral Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
              <div className="text-gray-600">Successful Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">$0</div>
              <div className="text-gray-600">Credits Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">$0</div>
              <div className="text-gray-600">Available Balance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

