import React, { useState } from 'react';
import { BookResource, TraumaTrack } from '../types';
import { READING_MATERIALS } from '../data/books';
import { BookOpen, ExternalLink, AlertTriangle, CheckCircle, ShoppingBag, Library, Headphones } from 'lucide-react';

interface ReadingLibraryProps {
  activeTrack: TraumaTrack;
}

export const ReadingLibrary: React.FC<ReadingLibraryProps> = ({ activeTrack }) => {
  const [filterTrack, setFilterTrack] = useState<string>('all');

  const filteredBooks = READING_MATERIALS.filter((b) => {
    if (filterTrack === 'all') return true;
    return b.primaryTrack === filterTrack;
  });

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
              <BookOpen className="w-4 h-4" />
            </span>
            <h2 className="font-serif-title text-xl font-semibold text-stone-900">
              Survivor Reading Sanctuary & Bookstore
            </h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Curated literature with trauma trigger ratings and direct independent purchase links.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
          {[
            { id: 'all', label: 'All Books' },
            { id: 'ptsd', label: 'PTSD' },
            { id: 'stockholm', label: 'Stockholm & Coercion' },
            { id: 'sexual_abuse', label: 'Sexual Trauma' },
            { id: 'substance_abuse', label: 'Substance & Recovery' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTrack(tab.id)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
                filterTrack === tab.id
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBooks.map((book) => {
          return (
            <div
              key={book.id}
              className="p-5 rounded-2xl border border-stone-200/90 bg-stone-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Book header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif-title font-bold text-base text-stone-900 leading-snug">
                    {book.title}
                  </h3>
                </div>

                <p className="text-xs font-semibold text-teal-800 mb-2">
                  By {book.author}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  {book.description}
                </p>

                {/* Key Takeaway */}
                <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-100 mb-3 text-xs">
                  <span className="font-semibold text-teal-900 block mb-0.5">
                    💡 Key Survivor Takeaway:
                  </span>
                  <p className="text-stone-700 italic">
                    "{book.keyTakeaway}"
                  </p>
                </div>

                {/* Safety Trigger Note */}
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 mb-4">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Content Guidance ({book.triggerRating}): </span>
                    <span>{book.triggerWarningNote}</span>
                  </div>
                </div>
              </div>

              {/* Where to Purchase / Access */}
              <div className="pt-3 border-t border-stone-200">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                  Where to Purchase & Read:
                </span>

                <div className="flex flex-wrap gap-2">
                  {book.purchaseLinks.map((link, idx) => {
                    const iconMap = {
                      indie: <ShoppingBag className="w-3 h-3 text-teal-600" />,
                      library: <Library className="w-3 h-3 text-blue-600" />,
                      audio: <Headphones className="w-3 h-3 text-purple-600" />,
                      general: <ExternalLink className="w-3 h-3 text-stone-600" />
                    };

                    return (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-teal-400 text-stone-700 hover:text-teal-900 text-xs font-medium shadow-sm transition-colors"
                      >
                        {iconMap[link.type]}
                        <span>{link.name}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
