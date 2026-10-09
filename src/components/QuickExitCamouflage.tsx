import React, { useState } from 'react';
import { Calculator, FileText, CloudSun, ShieldCheck, ArrowLeft } from 'lucide-react';

interface QuickExitCamouflageProps {
  onDeactivate: () => void;
}

export const QuickExitCamouflage: React.FC<QuickExitCamouflageProps> = ({ onDeactivate }) => {
  const [activeDisguise, setActiveDisguise] = useState<'calc' | 'notes' | 'weather'>('calc');
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [clearNext, setClearNext] = useState(false);
  const [notes, setNotes] = useState(
    "Weekly Grocery & Tasks:\n- Whole wheat bread\n- Organic almond milk\n- Olive oil\n- Call dentist appointment on Tuesday\n- Check car tire pressure"
  );

  const handleNum = (num: string) => {
    if (display === '0' || clearNext) {
      setDisplay(num);
      setClearNext(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOp = (op: string) => {
    setPrevVal(parseFloat(display));
    setOperator(op);
    setClearNext(true);
  };

  const handleEqual = () => {
    if (prevVal === null || operator === null) return;
    const current = parseFloat(display);
    let result = 0;
    if (operator === '+') result = prevVal + current;
    if (operator === '-') result = prevVal - current;
    if (operator === '×') result = prevVal * current;
    if (operator === '÷') result = current !== 0 ? prevVal / current : 0;
    setDisplay(result.toString());
    setPrevVal(null);
    setOperator(null);
    setClearNext(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOperator(null);
    setClearNext(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900 text-stone-100 flex flex-col font-sans select-none">
      {/* Harmless disguised top bar */}
      <div className="bg-stone-800 border-b border-stone-700 px-4 py-2.5 flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveDisguise('calc')}
            className={`px-2.5 py-1 rounded transition-colors ${activeDisguise === 'calc' ? 'bg-stone-700 text-stone-200' : 'hover:bg-stone-700/50'}`}
          >
            <Calculator className="w-3.5 h-3.5 inline mr-1" /> Calculator
          </button>
          <button
            onClick={() => setActiveDisguise('notes')}
            className={`px-2.5 py-1 rounded transition-colors ${activeDisguise === 'notes' ? 'bg-stone-700 text-stone-200' : 'hover:bg-stone-700/50'}`}
          >
            <FileText className="w-3.5 h-3.5 inline mr-1" /> Quick Notes
          </button>
          <button
            onClick={() => setActiveDisguise('weather')}
            className={`px-2.5 py-1 rounded transition-colors ${activeDisguise === 'weather' ? 'bg-stone-700 text-stone-200' : 'hover:bg-stone-700/50'}`}
          >
            <CloudSun className="w-3.5 h-3.5 inline mr-1" /> Weather
          </button>
        </div>

        {/* Subtle, disguised unlock button */}
        <button
          onClick={onDeactivate}
          title="Safe return"
          className="text-stone-500 hover:text-emerald-400 text-xs flex items-center gap-1.5 px-2 py-1 rounded border border-transparent hover:border-stone-700 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/70" />
          <span>Resume App</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-stone-950">
        {activeDisguise === 'calc' && (
          <div className="w-full max-w-xs bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-2xl">
            <div className="bg-stone-950 rounded-xl p-4 text-right mb-4 border border-stone-800/80">
              <span className="text-3xl font-mono tracking-wider font-semibold text-stone-100">
                {display}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <button onClick={handleClear} className="col-span-2 p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-rose-400 font-medium">C</button>
              <button onClick={() => setDisplay((parseFloat(display) * -1).toString())} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300">±</button>
              <button onClick={() => handleOp('÷')} className="p-3.5 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white font-bold">÷</button>

              <button onClick={() => handleNum('7')} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-lg">7</button>
              <button onClick={() => handleNum('8')} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-lg">8</button>
              <button onClick={() => handleNum('9')} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-lg">9</button>
              <button onClick={() => handleOp('×')} className="p-3.5 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white font-bold">×</button>

              <button onClick={() => handleNum('4')} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-lg">4</button>
              <button onClick={() => handleNum('5')} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-lg">5</button>
              <button onClick={() => handleNum('6')} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-lg">6</button>
              <button onClick={() => handleOp('-')} className="p-3.5 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white font-bold">-</button>

              <button onClick={() => handleNum('1')} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-lg">1</button>
              <button onClick={() => handleNum('2')} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-lg">2</button>
              <button onClick={() => handleNum('3')} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-lg">3</button>
              <button onClick={() => handleOp('+')} className="p-3.5 rounded-xl bg-amber-600/80 hover:bg-amber-600 text-white font-bold">+</button>

              <button onClick={() => handleNum('0')} className="col-span-2 p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-lg">0</button>
              <button onClick={() => !display.includes('.') && setDisplay(display + '.')} className="p-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200">.</button>
              <button onClick={handleEqual} className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">=</button>
            </div>
          </div>
        )}

        {activeDisguise === 'notes' && (
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-2">Scratchpad</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-64 bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-200 font-mono text-sm resize-none focus:outline-none focus:border-stone-700"
            />
            <p className="text-xs text-stone-500 mt-2">Saved locally</p>
          </div>
        )}

        {activeDisguise === 'weather' && (
          <div className="w-full max-w-xs bg-stone-900 border border-stone-800 rounded-2xl p-6 text-center shadow-2xl">
            <CloudSun className="w-14 h-14 text-amber-400 mx-auto mb-2" />
            <h2 className="text-4xl font-light text-stone-100">68°F</h2>
            <p className="text-stone-400 text-sm mt-1">Partly Cloudy</p>
            <div className="mt-6 pt-4 border-t border-stone-800 text-xs text-stone-500 flex justify-between">
              <span>Humidity: 48%</span>
              <span>Wind: 6 mph NW</span>
            </div>
          </div>
        )}
      </div>

      <div className="py-2 text-center text-xs text-stone-600">
        Tap "Resume App" above when you are in a safe, private space.
      </div>
    </div>
  );
};
