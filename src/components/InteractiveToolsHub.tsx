import React from 'react';
import { Eye, Wind, Activity, Compass, ShieldAlert, Sparkles } from 'lucide-react';

interface InteractiveToolsHubProps {
  onOpenTool: (tool: 'grounding' | 'breathing' | 'body_scan' | 'reframer' | 'panic') => void;
}

export const InteractiveToolsHub: React.FC<InteractiveToolsHubProps> = ({ onOpenTool }) => {
  const tools = [
    {
      id: 'grounding' as const,
      title: '5-4-3-2-1 Grounding',
      subtitle: 'Sensory reality anchor',
      icon: <Eye className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200/80',
    },
    {
      id: 'breathing' as const,
      title: 'Somatic Box Breath',
      subtitle: 'Lotus vagus calming pacer',
      icon: <Wind className="w-5 h-5 text-teal-600" />,
      bg: 'bg-teal-50 hover:bg-teal-100/80 border-teal-200/80',
    },
    {
      id: 'body_scan' as const,
      title: 'Somatic Tension Map',
      subtitle: 'Release trauma in tissue',
      icon: <Activity className="w-5 h-5 text-indigo-600" />,
      bg: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200/80',
    },
    {
      id: 'reframer' as const,
      title: 'Trauma Thought Reframe',
      subtitle: 'Replace shame with truth',
      icon: <Compass className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200/80',
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200/80">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="font-serif-title text-xl font-semibold text-stone-900">
              Interactive Somatic Regulation Tools
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Innovative, trauma-informed exercises to soothe hypervigilance, panic, and dissociation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onOpenTool(tool.id)}
            className={`p-4 rounded-2xl border text-left transition-all hover:scale-101 hover:shadow-md flex flex-col justify-between ${tool.bg}`}
          >
            <div className="p-2.5 rounded-xl bg-white/80 w-fit shadow-xs mb-3">
              {tool.icon}
            </div>
            <div>
              <h3 className="font-serif-title font-bold text-sm text-stone-900 leading-tight">
                {tool.title}
              </h3>
              <p className="text-[11px] text-stone-600 mt-1">
                {tool.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
