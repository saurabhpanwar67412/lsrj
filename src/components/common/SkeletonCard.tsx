import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="p-5 rounded-3xl bg-night-900 border border-slate-800 animate-pulse space-y-4">
      <div className="h-44 rounded-2xl bg-night-800/80" />
      <div className="space-y-2">
        <div className="h-4 bg-night-800 rounded-md w-3/4" />
        <div className="h-3 bg-night-800/60 rounded-md w-1/2" />
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-slate-800">
        <div className="h-4 bg-night-800/60 rounded-md w-1/4" />
        <div className="h-8 bg-night-800 rounded-xl w-1/3" />
      </div>
    </div>
  );
};
