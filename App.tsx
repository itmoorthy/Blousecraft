
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
  AlertCircle,
  Smartphone,
  ShieldAlert,
  Copy,
  Check,
  Share2
} from 'lucide-react';

const App: React.FC = () => {
  const [bustSize, setBustSize] = useState<string>('36');
  const [activeTab, setActiveTab] = useState<'calculator' | 'formulas'>('calculator');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      setShowInstallGuide(true);
    }
  };

  const measurements = useMemo(() => {
    const size = parseFloat(bustSize) || 0;
    return calculateBlouseMeasurements(size);
  }, [bustSize]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setBustSize(value);
    }
  };

  return (
    <div className="min-h-screen bg-[#90F5C8] text-[#042F2E] pb-10 font-['Inter'] selection:bg-[#042F2E] selection:text-[#90F5C8]">
      {/* Installation Guide Modal */}
      {showInstallGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="bg-[#0F3D3E] text-white w-full max-w-sm rounded-[3rem] p-8 shadow-2xl border-2 border-[#5EEAD4]/30 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-[#5EEAD4] p-4 rounded-3xl text-[#042F2E] shadow-xl">
                <Smartphone size={32} />
              </div>
              <button onClick={() => setShowInstallGuide(false)} className="text-[#5EEAD4] opacity-50 hover:opacity-100 font-black text-2xl px-2">✕</button>
            </div>
            
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 text-[#5EEAD4]">
              Install Mobile App
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-[#7A1F2B] rounded-2xl border border-white/20">
                <p className="text-[10px] font-black uppercase tracking-widest flex items-center mb-1">
                  <AlertCircle size={14} className="mr-2" /> Installation Steps
                </p>
                <p className="text-[11px] font-bold leading-tight opacity-90 uppercase">
                  Follow these steps to install BlouseCraft as a standalone app on your phone.
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-between bg-[#042F2E] p-4 rounded-2xl border border-[#5EEAD4]/30 active:scale-95 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-[#5EEAD4]" />}
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {copied ? 'Link Copied!' : '1. Copy Shared URL'}
                    </span>
                  </div>
                </button>
                <div className="flex items-center space-x-4 bg-[#042F2E] p-4 rounded-2xl border border-white/5 opacity-70">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black">2</div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Paste in NEW Chrome Tab</p>
                </div>
                <div className="flex items-center space-x-4 bg-[#042F2E] p-4 rounded-2xl border border-white/5 opacity-70">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-black">3</div>
                  <p className="text-[10px] font-black uppercase tracking-widest">Menu → Install App</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowInstallGuide(false)}
              className="w-full mt-8 py-5 bg-[#5EEAD4] text-[#042F2E] rounded-[1.5rem] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all text-sm"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

      <header className="bg-[#042F2E] border-b-4 border-[#0F3D3E] sticky top-0 z-30 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:h-24 flex flex-col justify-center">
          <div className="flex items-center justify-between w-full mb-3 sm:mb-2">
            <div className="flex items-center space-x-3">
              <div className="bg-[#90F5C8] p-2 rounded-xl text-[#042F2E]">
                <Scissors size={20} />
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic text-[#E6FFFA]">
                BlouseCraft
              </h1>
            </div>

            <button 
              onClick={handleInstallClick}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                deferredPrompt
                ? 'bg-[#5EEAD4] text-[#042F2E] ring-4 ring-[#5EEAD4]/20 animate-pulse' 
                : 'bg-white/10 text-white/80 border border-white/10'
              }`}
            >
              <Download size={14} />
              <span>{deferredPrompt ? 'Install App' : 'Get App'}</span>
            </button>
          </div>

          <nav className="flex items-center w-full bg-[#022C22]/50 p-1 rounded-2xl sm:max-w-xs">
            <button 
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'calculator' 
                ? 'bg-[#90F5C8] text-[#042F2E] shadow-lg' 
                : 'text-[#99F6E4]'
              }`}
            >
              Calculator
            </button>
            <button 
              onClick={() => setActiveTab('formulas')}
              className={`flex-1 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === 'formulas' 
                ? 'bg-[#90F5C8] text-[#042F2E] shadow-lg' 
                : 'text-[#99F6E4]'
              }`}
            >
              Formulas
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'calculator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0F3D3E] p-7 rounded-[2.5rem] shadow-2xl border-2 border-[#5EEAD4]/20">
                <div className="flex items-center space-x-2 mb-6 text-[#5EEAD4]">
                  <Calculator size={20} />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em]">Measurement Input</h2>
                </div>

                <div>
                  <label htmlFor="bustSize" className="block text-[10px] font-black text-[#5EEAD4] uppercase tracking-widest mb-3">
                    Bust Size (B)
                  </label>
                  <div className="relative">
                    <input
                      id="bustSize"
                      type="text"
                      inputMode="decimal"
                      value={bustSize}
                      onChange={handleInputChange}
                      placeholder="36"
                      className="block w-full px-6 py-5 bg-[#042F2E] border-2 border-[#5EEAD4]/30 rounded-3xl text-5xl font-black focus:ring-8 focus:ring-[#5EEAD4]/10 focus:border-[#5EEAD4] outline-none transition-all text-[#E6FFFA]"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#5EEAD4]/30 font-black text-xl">IN</div>
                  </div>
                </div>
              </div>

              <BlouseDiagram measurements={measurements} />
            </div>

            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-[#042F2E] uppercase tracking-tighter italic">Stitching Guide</h2>
                <div className="flex items-center space-x-2 bg-[#7A1F2B] text-white px-4 py-2 rounded-full shadow-lg border border-white/10">
                  <CheckCircle2 size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Master Fit</span>
                </div>
              </div>

              {measurements.bustSize > 0 ? (
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
                    label="Apex Span (Fold)" 
                    value={measurements.apexHorizontal} 
                    icon={<ArrowLeftRight size={20} />} 
                    description="(B / 12) + 0.5"
                  />
                  <MeasurementCard 
                    label="Apex Point (V)" 
                    value={measurements.apexVertical} 
                    icon={<ArrowDown size={20} />} 
                    description="B / 4"
                  />
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
                    label="Neck Width" 
                    value={measurements.neckWidth} 
                    icon={<Menu size={20} className="rotate-90" />} 
                    description="(B / 18) + 0.5"
                  />
                  <MeasurementCard 
                    label="Dart Width" 
                    value={measurements.dartSize} 
                    icon={<Shrink size={20} />} 
                    description="B / 24"
                  />
                </div>
              ) : (
                <div className="h-64 bg-[#0F3D3E]/5 border-4 border-dashed border-[#0F3D3E]/20 rounded-[3rem] flex flex-col items-center justify-center text-[#042F2E]">
                  <Ruler size={40} className="opacity-20 mb-4" />
                  <p className="font-black uppercase tracking-widest text-sm">Waiting for input...</p>
                </div>
              )}
              
              <div className="mt-8 p-6 bg-[#042F2E] rounded-3xl border-l-4 border-[#7A1F2B] shadow-2xl">
                <h4 className="text-[#5EEAD4] font-black text-[10px] uppercase tracking-widest mb-2 flex items-center">
                  <Info size={14} className="mr-2" />
                  Technical Advisory
                </h4>
                <p className="text-[#E6FFFA] text-[10px] leading-relaxed font-bold uppercase tracking-tight">
                  All horizontal measurements (Apex Span, Shoulder, Neck Width) reflect the folded fabric width. Drafting at 0.25" intervals for master tailoring.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-[#0F3D3E] p-10 rounded-[3rem] shadow-2xl border-2 border-[#5EEAD4]/10">
              <h2 className="text-2xl font-black mb-8 text-[#E6FFFA] italic uppercase tracking-tighter">Boutique Logic (Folded)</h2>
              <div className="space-y-4">
                {[
                  { name: "Armhole", formula: "(Bust / 8) + 1 inch" },
                  { name: "Neck Width (Fold)", formula: "(Bust / 18) + 0.5 inch" },
                  { name: "Shoulder (Fold)", formula: "Bust / 12" },
                  { name: "Apex Span (Fold)", formula: "(Bust / 12) + 0.5 inch" },
                  { name: "Apex Height", formula: "Bust / 4" },
                  { name: "Front Depth", formula: "(Bust / 12) + 3 inches" },
                  { name: "Back Depth", formula: "(Bust / 12) + 6 inches" },
                ].map((item) => (
                  <div key={item.name} className="flex justify-between items-center p-5 bg-[#042F2E] rounded-2xl border border-[#5EEAD4]/10">
                    <span className="font-extrabold text-[#99F6E4] text-xs uppercase tracking-widest">{item.name}</span>
                    <span className="text-[#E6FFFA] font-black text-sm">{item.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-[#7A1F2B] rounded-[2.5rem] shadow-xl text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Share2 size={24} />
                <h3 className="font-black uppercase tracking-widest text-lg italic">Master Tailor Tips</h3>
              </div>
              <p className="text-xs font-bold leading-relaxed opacity-90 uppercase tracking-tight">
                This app uses the 'Golden Ratio' for Indian blouses. When cutting on folded fabric, always use the 'Fold' measurements directly on the cloth without dividing them further.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
