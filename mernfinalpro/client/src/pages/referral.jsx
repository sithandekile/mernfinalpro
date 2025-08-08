import React, { useState, useEffect } from 'react';
import { Gift, User, CheckCircle } from 'lucide-react'; 
import apiService from '../services/api'; // Adjust this path

export const ReferralProgram = () => {
  const [referralCode, setReferralCode] = useState('SAFE' + Math.random().toString(36).substr(2, 6).toUpperCase());

  // Referral stats from API
  const [stats, setStats] = useState({
    successfulReferrals: 0,
    creditsEarned: 0,
    availableBalance: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [applyingCode, setApplyingCode] = useState(false);
  const [applyError, setApplyError] = useState(null);
  const [applySuccess, setApplySuccess] = useState(null);

  // Fetch referral stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      setError(null);
      try {
        const data = await apiService.getReferralStats();
        setStats({
          successfulReferrals: data.successfulReferrals || 0,
          creditsEarned: data.creditsEarned || 0,
          availableBalance: data.availableBalance || 0,
        });
      } catch (err) {
        setError('Failed to load referral stats.');
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  // Copy referral code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopySuccess('Referral code copied!');
      setTimeout(() => setCopySuccess(''), 3000);
    });
  };

  // Optional: Apply a referral code input + submit
  const [inputCode, setInputCode] = useState('');

  const handleApplyCode = async () => {
    setApplyingCode(true);
    setApplyError(null);
    setApplySuccess(null);
    try {
      // sending { code: inputCode }
      await apiService.applyReferralCode({ code: inputCode });
      setApplySuccess('Referral code applied successfully!');
      setInputCode('');
    } catch (err) {
      setApplyError('Failed to apply referral code.');
    } finally {
      setApplyingCode(false);
    }
  };

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
            <div className="bg-white text-orange-600 text-2xl font-bold py-4 px-8 rounded-xl inline-block mb-4 select-all cursor-pointer" onClick={handleCopyCode}>
              {referralCode}
            </div>
            <p className="text-orange-100 mb-6">Share this code with friends to earn credits</p>
            <button
              onClick={handleCopyCode}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Copy Code
            </button>
            {copySuccess && <p className="mt-2 text-sm text-green-200">{copySuccess}</p>}
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

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Referral Stats</h2>

          {loadingStats ? (
            <p className="text-center text-gray-500">Loading referral stats...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{stats.successfulReferrals}</div>
                <div className="text-gray-600">Successful Referrals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">${stats.creditsEarned}</div>
                <div className="text-gray-600">Credits Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">${stats.availableBalance}</div>
                <div className="text-gray-600">Available Balance</div>
              </div>
            </div>
          )}
        </div>

        {/* Optional: Apply a referral code */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Apply Referral Code</h2>

          <input
            type="text"
            placeholder="Enter referral code"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-xl tracking-widest"
            maxLength={10}
          />

          <button
            onClick={handleApplyCode}
            disabled={applyingCode || inputCode.trim().length === 0}
            className={`w-full ${
              applyingCode
                ? 'bg-orange-400 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700'
            } text-white px-6 py-3 rounded-lg font-semibold transition-colors`}
          >
            {applyingCode ? 'Applying...' : 'Apply Code'}
          </button>

          {applyError && <p className="mt-4 text-red-600 text-center">{applyError}</p>}
          {applySuccess && <p className="mt-4 text-green-600 text-center">{applySuccess}</p>}
        </div>
      </div>
    </div>
  );
};
