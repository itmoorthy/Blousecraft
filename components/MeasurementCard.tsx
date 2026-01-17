
import React from 'react';

interface MeasurementCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
}

const MeasurementCard: React.FC<MeasurementCardProps> = ({ 
  label, 
  value, 
  icon, 
  description 
}) => {
  return (
    <div className="bg-[#0F3D3E] p-5 rounded-2xl shadow-xl border-2 border-[#5EEAD4]/10 hover:border-[#5EEAD4] transition-all group">
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-xl bg-[#042F2E] text-[#5EEAD4] ring-1 ring-[#5EEAD4]/30 transition-all group-hover:scale-110">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-extrabold uppercase tracking-wider mb-1.5 text-[#5EEAD4]">
            {label}
          </p>
          
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-black text-[#E6FFFA]">
              {value > 0 ? value.toFixed(2) : '--'}
            </span>
            <span className="text-sm font-bold text-[#99F6E4] italic">in</span>
          </div>
          
          {description && (
            <p className="text-[10px] text-[#E6FFFA] mt-2 font-bold bg-[#042F2E] px-2 py-1 rounded-md inline-block border border-[#5EEAD4]/20">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeasurementCard;
