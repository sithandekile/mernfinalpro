import React from 'react';

const statusColors = {
  // Product statuses
  'active': 'bg-green-100 text-green-800',
  'sold': 'bg-blue-100 text-blue-800',
  'inactive': 'bg-gray-100 text-gray-800',
  
  // Order statuses
  'pending': 'bg-yellow-100 text-yellow-800',
  'approved': 'bg-green-100 text-green-800',
  'confirmed': 'bg-blue-100 text-blue-800',
  'shipped': 'bg-purple-100 text-purple-800',
  'delivered': 'bg-green-100 text-green-800',
  'completed': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800',
  'disputed': 'bg-red-100 text-red-800',
  
  // Escrow statuses
  'held': 'bg-yellow-100 text-yellow-800',
  'released': 'bg-green-100 text-green-800',
  'refunded': 'bg-blue-100 text-blue-800',
  
  // Conditions
  'New': 'bg-purple-100 text-purple-800',
  'Excellent': 'bg-green-100 text-green-800',
  'Good': 'bg-blue-100 text-blue-800',
  'Fair': 'bg-yellow-100 text-yellow-800'
};

const StatusBadge = ({ status }) => {
  const badgeClass = statusColors[status] || 'bg-gray-100 text-gray-800';
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;