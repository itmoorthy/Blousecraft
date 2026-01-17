
import React from 'react';
import { BlouseMeasurements } from '../types';

interface BlouseDiagramProps {
  measurements: BlouseMeasurements;
}

const BlouseDiagram: React.FC<BlouseDiagramProps> = ({ measurements }) => {
  const hasData = measurements.bustSize > 0;

  return (
    <div className="bg-[#0F3D3E] rounded-3xl border-4 border-[#042F2E] p-6 flex flex-col items-center shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[#5EEAD4]/5 pointer-events-none"></div>

      <h3 className="text-[11px] font-black text-[#E6FFFA] uppercase tracking-[0.2em] mb-6 px-4 py-1.5 bg-[#022C22] rounded-full border border-[#5EEAD4]/30 z-10">
        Drafting Blueprint
      </h3>
      
      <div className="relative w-64 h-64 bg-[#042F2E]/40 rounded-2xl border border-[#5EEAD4]/15 flex items-center justify-center p-4 z-10">
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#99F6E4]" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M40 40 L160 40 L175 80 L160 180 L40 180 L25 80 Z" strokeWidth="2.5" className="text-[#5EEAD4]" />
          <path d="M85 40 Q100 90 115 40" strokeDasharray="4 3" className="opacity-30" />
          
          {hasData && (
            <g className="text-[#7A1F2B] stroke-[#7A1F2B]" strokeWidth="1">
              <circle cx="100" cy="110" r="4" fill="#E6FFFA" strokeWidth="2" />
              <line x1="90" y1="110" x2="110" y2="110" />
              <line x1="100" y1="100" x2="100" y2="120" />
            </g>
          )}

          {hasData && (
            <g className="text-[10px] font-black fill-[#E6FFFA] stroke-none uppercase tracking-tight">
              {/* Total Span Line */}
              <line x1="40" y1="20" x2="100" y2="20" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="2 2" />
              <text x="70" y="15" textAnchor="middle" className="fill-[#5EEAD4] text-[8px]">Span: {measurements.totalShoulder}</text>

              <text x="62" y="35" textAnchor="middle" className="fill-[#5EEAD4]">S: {measurements.shoulderWidth}</text>
              <text x="100" y="35" textAnchor="middle" className="fill-[#E6FFFA]">NW: {measurements.neckWidth}</text>
              <text x="105" y="65" textAnchor="start" className="fill-[#5EEAD4]">FND: {measurements.frontNeckDepth}</text>
              <text x="32" y="65" transform="rotate(-65 32 65)" className="fill-[#5EEAD4]">AH: {measurements.armhole}</text>
              
              <g className="fill-[#E6FFFA]">
                <text x="108" y="105">V: {measurements.apexVertical}</text>
                <text x="108" y="118" className="fill-[#5EEAD4]">H: {measurements.apexHorizontal}</text>
              </g>

              <text x="100" y="195" textAnchor="middle" className="fill-[#5EEAD4] opacity-80">Dart: {measurements.dartSize}</text>
            </g>
          )}

          {!hasData && (
            <text x="100" y="100" textAnchor="middle" className="opacity-20 text-[13px] font-black fill-[#5EEAD4]" stroke="none">
              ENTER SIZE
            </text>
          )}
        </svg>
      </div>
      
      <div className="mt-5 flex items-center space-x-2 z-10">
        <div className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse shadow-[0_0_8px_#5EEAD4]"></div>
        <p className="text-[10px] text-[#5EEAD4] font-extrabold uppercase tracking-widest leading-tight">
          Folded Fabric View
        </p>
      </div>
    </div>
  );
};

export default BlouseDiagram;
