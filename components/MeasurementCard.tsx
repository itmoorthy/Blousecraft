
import React from 'react';

interface MeasurementCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
}

const MeasurementCard: React.FC<MeasurementCardProps> = ({ label, value, icon, description }) => {
  return (
    <div className="bg-[#0F3D3E] p-5 rounded-2xl shadow-xl border border-[#5EEAD4]/10 flex items-start space-x-4 transition-all hover:border-[#5EEAD4] hover:shadow-[0_0_20px_rgba(94,234,212,0.15)] group">
      <div className="p-3 bg-[#042F2E] text-[#5EEAD4] rounded-xl group-hover:scale-105 transition-transform ring-1 ring-[#5EEAD4]/30">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-extrabold text-[#5EEAD4] uppercase tracking-wider mb-1.5">{label}</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-black text-[#E6FFFA] transition-colors">{value.toFixed(2)}</span>
          <span className="text-sm font-bold text-[#99F6E4] italic">in</span>
        </div>
        {description && (
          <p className="text-[10px] text-[#E6FFFA] mt-2 font-bold bg-[#042F2E] px-2 py-1 rounded-md inline-block border border-[#5EEAD4]/20">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default MeasurementCard;
