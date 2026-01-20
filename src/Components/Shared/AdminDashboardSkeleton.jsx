import React from 'react';

const SkeletonBox = ({ className }) => (
  <div className={`animate-pulse bg-base-300 rounded-lg ${className}`} />
);

const AdminDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6 space-y-6">

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-base-100 rounded-2xl shadow p-6 space-y-3">
            <SkeletonBox className="h-4 w-24" />
            <SkeletonBox className="h-8 w-16" />
          </div>
        ))}
      </div>

      {/* ===== CARDS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Latest Issues */}
        <div className="bg-base-100 rounded-2xl shadow p-6 space-y-4">
          <SkeletonBox className="h-6 w-40" />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-xl bg-base-200"
            >
              <SkeletonBox className="h-4 w-32" />
              <SkeletonBox className="h-6 w-20" />
            </div>
          ))}
        </div>

        {/* Latest Payments */}
        <div className="bg-base-100 rounded-2xl shadow p-6 space-y-4">
          <SkeletonBox className="h-6 w-44" />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-xl bg-base-200"
            >
              <SkeletonBox className="h-4 w-40" />
              <SkeletonBox className="h-6 w-16" />
            </div>
          ))}
        </div>

        {/* Latest Users */}
        <div className="bg-base-100 rounded-2xl shadow p-6 space-y-4">
          <SkeletonBox className="h-6 w-32" />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-base-200"
            >
              <SkeletonBox className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonBox className="h-4 w-32" />
                <SkeletonBox className="h-3 w-48" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CHART ===== */}
      <div className="bg-base-100 rounded-2xl shadow p-6">
        <SkeletonBox className="h-6 w-52 mb-4" />
        <div className="flex justify-center">
          <SkeletonBox className="h-56 w-56 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;
