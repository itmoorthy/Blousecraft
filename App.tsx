
import React, { useState, useMemo, useEffect } from 'react';
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
  ArrowDown,
  Download,
  AlertCircle
} from 'lucide-react';

const App: React.FC = () => {
  const [bustSize, setBustSize] = useState<string>('40');
  const [activeTab, setActiveTab] = useState<'calculator' | 'formulas'>('calculator');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('Install prompt is ready');
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install: Open the SHARED link in Chrome, tap 3-dots, and select 'Install app'.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

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
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-0 sm:h-24 flex flex-col justify-center">
          <div className="flex items-center justify-between w-full mb-3 sm:mb-2">
            <div className="flex items-center space-x-3">
              <div className="bg-[#90F5C8] p-1.5 sm:p-2 rounded-xl text-[#042F2E] shadow-inner">
                <Scissors size={18} className="sm:w-6 sm:h-6" />
              </div>
              <h1 className="text-lg sm:text-2xl font-black tracking-tighter uppercase italic text-[#E6FFFA]">
                BlouseCraft
              </h1>
            </div>

            <button 
              onClick={handleInstallClick}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${
                deferredPrompt 
                ? 'bg-[#5EEAD4] text-[#042F2E] animate-bounce' 
                : 'bg-white/10 text-white/40 border border-white/10'
              }`}
            >
              <Download size={14} />
              <span>{deferredPrompt ? 'Get App' : 'App Ready'}</span>
            </button>
          </div>

          <nav className="flex items-center w-full bg-[#022C22]/50 p-1 rounded-2xl sm:max-w-xs">
            <button 
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
                activeTab === 'calculator' 
                ? 'bg-[#90F5C8] text-[#042F2E] shadow-lg ring-2 ring-[#5EEAD4]/50' 
                : 'text-[#99F6E4] hover:text-[#E6FFFA]'
              }`}
            >
              Calculator
            </button>
            <button 
              onClick={() => setActiveTab('formulas')}
              className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 ${
                activeTab === 'formulas' 
                ? 'bg-[#90F5C8] text-[#042F2E] shadow-lg ring-2 ring-[#5EEAD4]/50' 
                : 'text-[#99F6E4] hover:text-[#E6FFFA]'
              }`}
            >
              Formulas
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'calculator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
            {/* Input Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0F3D3E] p-6 rounded-[2rem] shadow-2xl border-2 border-[#5EEAD4]/20">
                <div className="flex items-center space-x-2 mb-4 text-[#5EEAD4]">
                  <Calculator size={18} />
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Bust Entry</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="bustSize" className="block text-[10px] font-extrabold text-[#5EEAD4] uppercase tracking-widest mb-2">
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
                        className="block w-full px-5 py-4 bg-[#042F2E] border-2 border-[#5EEAD4]/30 rounded-2xl text-4xl font-black focus:ring-4 focus:ring-[#5EEAD4]/20 focus:border-[#5EEAD4] outline-none transition-all placeholder:text-[#99F6E4]/10 text-[#E6FFFA]"
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[#5EEAD4]/40 font-black text-lg">
                        in
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <BlouseDiagram measurements={measurements} />
            </div>

            {/* Results Section */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#0F3D3E] rounded-full flex items-center justify-center border-2 border-[#5EEAD4] shadow-lg">
                    <Ruler className="text-[#5EEAD4]" size={20} />
                  </div>
                  <h2 className="text-xl font-black text-[#042F2E] uppercase tracking-tight italic">Drafting Table</h2>
                </div>
                <div className="text-[9px] font-black text-white bg-[#7A1F2B] px-3 py-1.5 rounded-full uppercase shadow-lg border border-white/20">
                  0.25" Precision
                </div>
              </div>

              {measurements.bustSize > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <MeasurementCard 
                      label="Armhole Curve" 
                      value={measurements.armhole} 
                      icon={<CircleDashed size={18} />} 
                      description="(B / 8) + 1"
                    />
                    <MeasurementCard 
                      label="Shoulder Width" 
                      value={measurements.shoulderWidth} 
                      icon={<MoveHorizontal size={18} />} 
                      description="B / 12"
                    />
                    <MeasurementCard 
                      label="Apex Height (V)" 
                      value={measurements.apexVertical} 
                      icon={<ArrowDown size={18} />} 
                      description="B / 4"
                    />
                    <MeasurementCard 
                      label="Apex Span (H)" 
                      value={measurements.apexHorizontal} 
                      icon={<ArrowLeftRight size={18} />} 
                      description="(B / 6) + 1"
                    />
                    <MeasurementCard 
                      label="Neck Width" 
                      value={measurements.neckWidth} 
                      icon={<Menu size={18} className="rotate-90" />} 
                      description="(B / 18) + 0.5"
                    />
                    <MeasurementCard 
                      label="Sleeve Length" 
                      value={measurements.sleeveLength} 
                      icon={<Layers size={18} />} 
                      description="(B / 8) + 1"
                    />
                  </div>

                  <div className="pt-6 border-t-2 border-[#0F3D3E]/20">
                    <h3 className="text-[10px] font-black text-[#0F3D3E] uppercase tracking-[0.2em] mb-4">Cutting & Finishing</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <MeasurementCard 
                        label="Front Neck Depth" 
                        value={measurements.frontNeckDepth} 
                        icon={<ChevronRight size={18} className="rotate-90" />} 
                        description="(B / 12) + 3"
                      />
                      <MeasurementCard 
                        label="Back Neck Depth" 
                        value={measurements.backNeckDepth} 
                        icon={<ChevronRight size={18} className="rotate-90" />} 
                        description="(B / 12) + 6"
                      />
                      <MeasurementCard 
                        label="Dart Width" 
                        value={measurements.dartSize} 
                        icon={<Shrink size={18} />} 
                        description="B / 24"
                      />
                      <MeasurementCard 
                        label="Margin" 
                        value={measurements.seamMargin} 
                        icon={<CheckCircle2 size={18} />} 
                        description="Standard 1.5 in"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0F3D3E]/10 border-4 border-dashed border-[#0F3D3E]/30 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center">
                  <Ruler size={32} className="text-[#0F3D3E]/40 mb-4" />
                  <h3 className="text-[#042F2E] font-black text-lg uppercase tracking-tight">Enter B-Size</h3>
                </div>
              )}

              <div className="mt-8 p-6 bg-[#042F2E] rounded-3xl border-l-4 border-[#7A1F2B] shadow-2xl">
                <h4 className="text-[#5EEAD4] font-black text-[10px] uppercase tracking-widest mb-2 flex items-center">
                  <Info size={14} className="mr-2" />
                  Technical Advisory
                </h4>
                <p className="text-[#E6FFFA] text-[10px] leading-relaxed font-bold uppercase tracking-tight">
                  Drafting at 0.25" intervals for master tailoring. Follows standard boutique ratios.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Install Helper */}
            <div className="bg-[#7A1F2B] p-6 rounded-3xl border-2 border-white/20 shadow-xl text-white">
              <div className="flex items-center space-x-3 mb-3">
                <AlertCircle size={20} />
                <h3 className="font-black uppercase tracking-widest text-sm italic">Installation Pro-Tip</h3>
              </div>
              <p className="text-xs font-bold leading-relaxed opacity-90 uppercase tracking-tight">
                To access this app like a real app on your phone:
              </p>
              <ol className="mt-3 space-y-2 text-[10px] font-black uppercase tracking-wider list-decimal list-inside opacity-80">
                <li>Use the SHARED link (not the editor URL)</li>
                <li>Tap the 3 dots in Chrome</li>
                <li>Select "Install App" or "Add to Home Screen"</li>
                <li>This ensures the icon opens ONLY BlouseCraft.</li>
              </ol>
            </div>

            <div className="bg-[#0F3D3E] p-8 rounded-[2.5rem] shadow-2xl border-2 border-[#5EEAD4]/10">
              <h2 className="text-xl font-black mb-6 text-[#E6FFFA] italic uppercase tracking-tighter">Boutique Formula Set</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <div key={item.name} className="flex justify-between items-center p-4 bg-[#042F2E] rounded-xl border border-[#5EEAD4]/10">
                    <span className="font-extrabold text-[#99F6E4] text-[9px] uppercase tracking-widest">{item.name}</span>
                    <code className="text-[#E6FFFA] font-black text-[10px] px-2 py-1 bg-[#022C22] rounded border border-[#5EEAD4]/20">{item.formula}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
