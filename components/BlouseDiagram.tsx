
import React from 'react';
import { BlouseMeasurements } from '../types';

interface BlouseDiagramProps {
  measurements: BlouseMeasurements;
}

const BlouseDiagram: React.FC<BlouseDiagramProps> = ({ measurements }) => {
  const hasData = measurements.bustSize > 0;

  return (
    <div className="bg-[#0F3D3E] rounded-3xl border-4 border-[#042F2E] p-6 flex flex-col items-center shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#5EEAD4]/5 pointer-events-none"></div>

      <h3 className="text-[11px] font-black text-[#E6FFFA] uppercase tracking-[0.2em] mb-6 px-4 py-1.5 bg-[#022C22] rounded-full border border-[#5EEAD4]/30 z-10">
        Drafting Blueprint
      </h3>
      
      <div className="relative w-64 h-64 bg-[#042F2E]/40 rounded-2xl border border-[#5EEAD4]/15 flex items-center justify-center p-4 z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#99F6E4]" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Main Blouse Body Drafting */}
          <path d="M40 40 L160 40 L175 80 L160 180 L40 180 L25 80 Z" strokeWidth="2.5" className="text-[#5EEAD4]" />
          
          {/* Neckline (Front) */}
          <path d="M85 40 Q100 90 115 40" strokeDasharray="4 3" className="opacity-30" />
          
          {/* Apex Point Crosshair */}
          {hasData && (
            <g className="text-[#7A1F2B] stroke-[#7A1F2B]" strokeWidth="1">
              <circle cx="100" cy="110" r="4" fill="#E6FFFA" strokeWidth="2" />
              <line x1="90" y1="110" x2="110" y2="110" />
              <line x1="100" y1="100" x2="100" y2="120" />
            </g>
          )}

          {/* Dimension Lines & Labels */}
          {hasData && (
            <g className="text-[10px] font-black fill-[#E6FFFA] stroke-none uppercase tracking-tight">
              {/* Shoulder */}
              <text x="62" y="32" textAnchor="middle" className="fill-[#5EEAD4]">S: {measurements.shoulderWidth}</text>
              
              {/* Neck Width */}
              <text x="100" y="32" textAnchor="middle" className="fill-[#E6FFFA] font-black">NW: {measurements.neckWidth}</text>
              
              {/* Front Neck Depth */}
              <text x="105" y="65" textAnchor="start" className="fill-[#5EEAD4]">FND: {measurements.frontNeckDepth}</text>

              {/* Armhole Curve Label */}
              <text x="32" y="65" transform="rotate(-65 32 65)" className="fill-[#5EEAD4]">AH: {measurements.armhole}</text>
              
              {/* Apex Markers */}
              <g className="fill-[#E6FFFA]">
                <text x="108" y="105" className="font-black text-[#E6FFFA]">V: {measurements.apexVertical}</text>
                <text x="108" y="118" className="fill-[#5EEAD4]">H: {measurements.apexHorizontal}</text>
              </g>

              {/* Waist / Dart */}
              <text x="100" y="195" textAnchor="middle" className="fill-[#5EEAD4] opacity-80">Dart: {measurements.dartSize}</text>
            </g>
          )}

          {!hasData && (
            <text x="100" y="100" textAnchor="middle" className="opacity-20 text-[13px] font-black fill-[#5EEAD4]" stroke="none">
              ENTER SIZE
            </text>
          )}
        </svg>
        
        {/* Sleeve Preview Tag */}
        {hasData && (
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-[#7A1F2B] border-2 border-[#E6FFFA] px-3 py-1.5 rounded-lg shadow-2xl flex flex-col items-center scale-95 transition-transform hover:scale-100">
             <span className="text-[8px] text-white/90 uppercase font-black tracking-tighter">Sleeve</span>
             <span className="text-sm font-black text-white">{measurements.sleeveLength}"</span>
          </div>
        )}
      </div>
      
      <div className="mt-5 flex items-center space-x-2 z-10">
        <div className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse shadow-[0_0_8px_#5EEAD4]"></div>
        <p className="text-[10px] text-[#5EEAD4] font-extrabold uppercase tracking-widest leading-tight">
          Live Layout 0.25 Precision
        </p>
      </div>
    </div>
  );
};

export default BlouseDiagram;
