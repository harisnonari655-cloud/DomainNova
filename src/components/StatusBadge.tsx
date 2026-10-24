import React from 'react';
import { CheckCircle, AlertTriangle, FileCode, ShieldAlert } from 'lucide-react';
import { VerificationStatus } from '../types/provider';

interface StatusBadgeProps {
  status: VerificationStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const isSm = size === 'sm';

  switch (status) {
    case 'FREE VERIFIED':
      return (
        <span className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 ${isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'}`}>
          <CheckCircle className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          FREE VERIFIED
        </span>
      );
    case 'CHECK OFFICIAL TERMS':
      return (
        <span className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 ${isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'}`}>
          <AlertTriangle className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          CHECK OFFICIAL TERMS
        </span>
      );
    case 'REQUIRES OPEN SOURCE':
      return (
        <span className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 ${isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'}`}>
          <FileCode className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          OPEN SOURCE ONLY
        </span>
      );
    case 'RESTRICTED ELIGIBILITY':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 ${isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'}`}>
          <ShieldAlert className={isSm ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
          RESTRICTED
        </span>
      );
  }
};
