
import React, { useState, useMemo } from 'react';
import { calculateBlouseMeasurements } from './utils/tailoringLogic';
import MeasurementCard from './components/MeasurementCard';
import BlouseDiagram from './components/BlouseDiagram';
import { 
  Scissors, 
  Ruler, 
  ChevronRight, 
  CheckCircle2, 
  Info,
  CircleDashed,
  Menu,
  Calculator,
  Layers,
  MoveHorizontal,
  Shrink,
  Target,
  ArrowLeftRight,
  ArrowDown
} from 'lucide-react';

const App: React.FC = () => {
  const [bustSize, setBustSize] = useState<string>('40');
  const [activeTab, setActiveTab] = useState<'calculator' | 'formulas'>('calculator');

  const measurements = useMemo(() => {
    const size = parseFloat(bustSize);
    return calculateBlouseMeasurements(size);
  }, [bustSize]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBustSize(value);
    }
  };

  return (
    <div className="min-h-screen bg-[#90F5C8] text-[#042F2E] pb-10 font-['Inter']">
      {/* Responsive Header */}
      <header className="bg-[#042F2E] border-b-4 border-[#0F3D3E] sticky top-0 z-30 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-0 sm:h-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 self-start sm:self-center">
            <div className="bg-[#90F5C8] p-1.5 sm:p-2 rounded-xl text-[#042F2E] shadow-inner">
              <Scissors size={20} className="sm:w-6 sm:h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic text-[#E6FFFA]">
              BlouseCraft
            </h1>
          </div>

          {/* Navigation Section */}
          <nav className="flex items-center w-full sm:w-auto bg-[#022C22]/50 p-1 rounded-2xl sm:bg-transparent sm:p-0">
            <button 
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                activeTab === 'calculator' 
                ? 'bg-[#90F5C8] text-[#042F2E] shadow-lg ring-2 ring-[#5EEAD4]/50' 
                : 'text-[#99F6E4] hover:text-[#E6FFFA] hover:bg-white/5'
              }`}
            >
              Calculator
            </button>
            <button 
              onClick={() => setActiveTab('formulas')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                activeTab === 'formulas' 
                ? 'bg-[#90F5C8] text-[#042F2E] shadow-lg ring-2 ring-[#5EEAD4]/50' 
                : 'text-[#99F6E4] hover:text-[#E6FFFA] hover:bg-white/5'
              }`}
            >
              Formulas
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
        {activeTab === 'calculator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
            {/* Input Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0F3D3E] p-6 sm:p-8 rounded-[2rem] shadow-2xl border-2 border-[#5EEAD4]/20">
                <div className="flex items-center space-x-2 mb-6 text-[#5EEAD4]">
                  <Calculator size={24} />
                  <h2 className="text-sm font-black uppercase tracking-[0.2em]">Bust Entry</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="bustSize" className="block text-[11px] font-extrabold text-[#5EEAD4] uppercase tracking-widest mb-3">
                      Bust Size (B)
                    </label>
                    <div className="relative group">
                      <input
                        id="bustSize"
                        type="text"
                        inputMode="decimal"
                        value={bustSize}
                        onChange={handleInputChange}
                        placeholder="40"
                        className="block w-full px-6 py-5 bg-[#042F2E] border-2 border-[#5EEAD4]/30 rounded-3xl text-4xl font-black focus:ring-8 focus:ring-[#5EEAD4]/20 focus:border-[#5EEAD4] outline-none transition-all placeholder:text-[#99F6E4]/10 text-[#E6FFFA]"
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#5EEAD4]/40 font-black text-xl">
                        in
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-[#022C22] rounded-3xl flex items-center justify-between border-2 border-[#5EEAD4]/20">
                    <div>
                      <p className="text-[10px] font-black text-[#5EEAD4] uppercase tracking-wider">Fit Profile</p>
                      <p className="text-[#E6FFFA] font-black italic text-lg">Perfect Fit 1.0</p>
                    </div>
                    <CheckCircle2 className="text-[#5EEAD4]" size={28} />
                  </div>
                </div>
              </div>

              <BlouseDiagram measurements={measurements} />
            </div>

            {/* Results Section */}
            <div className="lg:col-span-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#0F3D3E] rounded-full flex items-center justify-center border-2 border-[#5EEAD4] shadow-lg">
                    <Ruler className="text-[#5EEAD4]" size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-[#042F2E] uppercase tracking-tight italic leading-tight">Drafting Table</h2>
                </div>
                <div className="self-start sm:self-center text-[11px] font-black text-white bg-[#7A1F2B] px-5 py-2 rounded-full uppercase shadow-lg border border-white/20">
                  0.25" Master Accuracy
                </div>
              </div>

              {measurements.bustSize > 0 ? (
                <div className="space-y-8">
                  {/* Primary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <MeasurementCard 
                      label="Armhole Curve" 
                      value={measurements.armhole} 
                      icon={<CircleDashed size={20} />} 
                      description="(B / 8) + 1"
                    />
                    <MeasurementCard 
                      label="Shoulder Width" 
                      value={measurements.shoulderWidth} 
                      icon={<MoveHorizontal size={20} />} 
                      description="B / 12"
                    />
                    <MeasurementCard 
                      label="Apex Height (V)" 
                      value={measurements.apexVertical} 
                      icon={<ArrowDown size={20} />} 
                      description="B / 4"
                    />
                    <MeasurementCard 
                      label="Apex Span (H)" 
                      value={measurements.apexHorizontal} 
                      icon={<ArrowLeftRight size={20} />} 
                      description="(B / 6) + 1"
                    />
                    <MeasurementCard 
                      label="Neck Width" 
                      value={measurements.neckWidth} 
                      icon={<Menu size={20} className="rotate-90" />} 
                      description="(B / 18) + 0.5"
                    />
                    <MeasurementCard 
                      label="Sleeve Length" 
                      value={measurements.sleeveLength} 
                      icon={<Layers size={20} />} 
                      description="(B / 8) + 1"
                    />
                  </div>

                  {/* Detailing Section */}
                  <div className="pt-8 border-t-2 border-[#0F3D3E]/20">
                    <h3 className="text-sm font-black text-[#0F3D3E] uppercase tracking-[0.2em] mb-6">Cutting & Finishing</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <MeasurementCard 
                        label="Front Neck Depth" 
                        value={measurements.frontNeckDepth} 
                        icon={<ChevronRight size={20} className="rotate-90" />} 
                        description="(B / 12) + 3"
                      />
                      <MeasurementCard 
                        label="Back Neck Depth" 
                        value={measurements.backNeckDepth} 
                        icon={<ChevronRight size={20} className="rotate-90" />} 
                        description="(B / 12) + 6"
                      />
                      <MeasurementCard 
                        label="Dart Width" 
                        value={measurements.dartSize} 
                        icon={<Shrink size={20} />} 
                        description="B / 24"
                      />
                      <MeasurementCard 
                        label="Margin" 
                        value={measurements.seamMargin} 
                        icon={<CheckCircle2 size={20} />} 
                        description="Standard 1.5 in"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0F3D3E]/10 border-4 border-dashed border-[#0F3D3E]/30 rounded-[3rem] p-16 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-[#0F3D3E]/10 rounded-full flex items-center justify-center mb-6">
                    <Ruler size={40} className="text-[#0F3D3E]/40" />
                  </div>
                  <h3 className="text-[#042F2E] font-black text-xl uppercase">Input B-Size</h3>
                  <p className="text-[#042F2E] text-sm max-w-[240px] mt-2 font-medium uppercase tracking-tight opacity-70">A valid bust measurement is required to generate precision drafting data.</p>
                </div>
              )}

              <div className="mt-10 p-7 bg-[#042F2E] rounded-3xl border-l-8 border-[#7A1F2B] shadow-2xl">
                <h4 className="text-[#5EEAD4] font-black text-sm uppercase tracking-widest mb-4 flex items-center">
                  <Info size={18} className="mr-2" />
                  Technical Advisory
                </h4>
                <div className="space-y-2">
                  <p className="text-[#E6FFFA] text-xs leading-relaxed font-bold uppercase tracking-tight">
                    For Bust {bustSize || 'X'}: High-precision drafting applied at 0.25" intervals for master tailoring results.
                  </p>
                  <p className="text-[#99F6E4] text-[10px] leading-relaxed font-semibold uppercase tracking-wider opacity-90">
                    Calculations follow the standard boutique ratio method. Recommended for non-stretch woven fabrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Formulas View */
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-[#0F3D3E] p-10 rounded-[3rem] shadow-2xl border-2 border-[#5EEAD4]/10">
              <h2 className="text-2xl sm:text-3xl font-black mb-8 text-[#E6FFFA] italic uppercase tracking-tighter">Boutique Formula Set</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Armhole", formula: "(B / 8) + 1\"" },
                  { name: "Apex Vertical", formula: "B / 4" },
                  { name: "Apex Horizontal", formula: "(B / 6) + 1\"" },
                  { name: "Front Neck", formula: "(B / 12) + 3\"" },
                  { name: "Back Neck", formula: "(B / 12) + 6\"" },
                  { name: "Neck Width", formula: "(B / 18) + 0.5\"" },
                  { name: "Shoulder", formula: "B / 12" },
                  { name: "Sleeve Length", formula: "(B / 8) + 1\"" },
                ].map((item) => (
                  <div key={item.name} className="group flex justify-between items-center p-5 bg-[#042F2E] rounded-2xl border border-[#5EEAD4]/20 hover:border-[#5EEAD4] transition-all">
                    <span className="font-extrabold text-[#99F6E4] text-[11px] uppercase tracking-widest">{item.name}</span>
                    <code className="text-[#E6FFFA] font-black text-xs px-3 py-1.5 bg-[#022C22] rounded-lg border border-[#5EEAD4]/30">{item.formula}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#022C22] p-8 sm:p-10 rounded-[3rem] text-[#E6FFFA] border-4 border-[#5EEAD4]/30 shadow-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h3 className="font-black text-xl sm:text-2xl uppercase tracking-tighter italic text-[#5EEAD4]">Master Verification: Size 40</h3>
                <span className="bg-[#7A1F2B] text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 shadow-md">Verified Precision</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <div className="space-y-4 font-black uppercase tracking-tighter text-sm">
                  <div className="flex justify-between border-b-2 border-[#5EEAD4]/10 pb-2"><span>Armhole:</span> <span className="text-xl text-[#E6FFFA]">6.0"</span></div>
                  <div className="flex justify-between border-b-2 border-[#5EEAD4]/10 pb-2"><span>Apex Vert:</span> <span className="text-xl text-[#E6FFFA]">10.0"</span></div>
                  <div className="flex justify-between border-b-2 border-[#5EEAD4]/10 pb-2"><span>Apex Horz:</span> <span className="text-xl text-[#E6FFFA]">7.75"</span></div>
                  <div className="flex justify-between border-b-2 border-[#5EEAD4]/10 pb-2"><span>Shoulder:</span> <span className="text-xl text-[#E6FFFA]">3.25"</span></div>
                </div>
                <div className="space-y-4 font-black uppercase tracking-tighter text-sm">
                  <div className="flex justify-between border-b-2 border-[#5EEAD4]/10 pb-2"><span>Neck Width:</span> <span className="text-xl text-[#E6FFFA]">2.75"</span></div>
                  <div className="flex justify-between border-b-2 border-[#5EEAD4]/10 pb-2"><span>Front Neck:</span> <span className="text-xl text-[#E6FFFA]">6.25"</span></div>
                  <div className="flex justify-between border-b-2 border-[#5EEAD4]/10 pb-2"><span>Back Neck:</span> <span className="text-xl text-[#E6FFFA]">9.25"</span></div>
                  <div className="flex justify-between border-b-2 border-[#5EEAD4]/10 pb-2"><span>Sleeve:</span> <span className="text-xl text-[#E6FFFA]">6.0"</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
