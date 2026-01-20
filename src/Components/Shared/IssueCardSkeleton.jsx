import React from 'react';

const IssueCardSkeleton = () => {
  return (
    <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden animate-pulse">
      
      {/* Image skeleton */}
      <div className="h-52 bg-base-300"></div>

      {/* Content */}
      <div className="p-6 space-y-4">
        
        {/* Title */}
        <div className="h-5 bg-base-300 rounded w-3/4"></div>
        <div className="h-5 bg-base-300 rounded w-1/2"></div>

        {/* Location */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-base-300 rounded-lg"></div>
          <div className="h-4 bg-base-300 rounded w-2/3"></div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4">
          <div className="h-6 w-16 bg-base-300 rounded"></div>
          <div className="h-9 w-28 bg-base-300 rounded-lg"></div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-base-300"></div>
    </div>
  );
};

export default IssueCardSkeleton;
