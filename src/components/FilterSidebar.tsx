import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  selectedFabric: string;
  setSelectedFabric: (fabric: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
  selectedOrigin: string;
  setSelectedOrigin: (origin: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  fabrics: string[];
  origins: string[];
  difficulties: string[];
  resetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedFabric,
  setSelectedFabric,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedOrigin,
  setSelectedOrigin,
  sortBy,
  setSortBy,
  fabrics,
  origins,
  difficulties,
  resetFilters,
}) => {
  return (
    <div className="bg-elevated border border-subtle-grey p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-subtle-grey">
        <span className="text-xs font-bold tracking-widest uppercase text-plum flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-teal" />
          FILTER SYSTEM
        </span>
        <button
          onClick={resetFilters}
          className="text-[10px] font-bold text-terracotta hover:text-plum transition-colors flex items-center gap-1"
        >
          <RotateCcw size={10} />
          RESET ALL
        </button>
      </div>

      {/* Sort Selector */}
      <div>
        <label className="text-[11px] font-bold tracking-wider text-mauve uppercase block mb-2">
          SORT COLLECTION
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-parchment border border-subtle-grey text-plum text-xs py-2 px-3 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal font-sans"
        >
          <option value="curated">Curated Selection</option>
          <option value="price-asc">Price: Elegant to Extravagant</option>
          <option value="price-desc">Price: Extravagant to Elegant</option>
          <option value="name-asc">Alphabetical (A-Z)</option>
        </select>
      </div>

      {/* Fabric Filters */}
      <div>
        <label className="text-[11px] font-bold tracking-wider text-mauve uppercase block mb-2">
          AUTHENTIC FABRIC WEAVE
        </label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedFabric('all')}
            className={`text-xs px-3 py-1.5 transition-all duration-200 font-sans ${
              selectedFabric === 'all'
                ? 'bg-teal text-parchment font-semibold'
                : 'bg-parchment text-plum hover:bg-subtle-grey border border-subtle-grey/40'
            }`}
          >
            All Weaves
          </button>
          {fabrics.map((fabric) => (
            <button
              key={fabric}
              onClick={() => setSelectedFabric(fabric)}
              className={`text-xs px-3 py-1.5 transition-all duration-200 font-sans ${
                selectedFabric === fabric
                  ? 'bg-teal text-parchment font-semibold'
                  : 'bg-parchment text-plum hover:bg-subtle-grey border border-subtle-grey/40'
              }`}
            >
              {fabric}
            </button>
          ))}
        </div>
      </div>

      {/* Weaving Origin Filters */}
      <div>
        <label className="text-[11px] font-bold tracking-wider text-mauve uppercase block mb-2">
          REGIONAL ANCESTRY / ORIGIN
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedOrigin('all')}
            className={`w-full text-left text-xs py-1.5 px-2 transition-colors ${
              selectedOrigin === 'all'
                ? 'text-teal font-bold bg-teal/5 border-l-2 border-teal'
                : 'text-plum hover:text-teal border-l-2 border-transparent'
            }`}
          >
            All Ancient Guilds
          </button>
          {origins.map((origin) => (
            <button
              key={origin}
              onClick={() => setSelectedOrigin(origin)}
              className={`w-full text-left text-xs py-1.5 px-2 transition-colors block ${
                selectedOrigin === origin
                  ? 'text-teal font-bold bg-teal/5 border-l-2 border-teal'
                  : 'text-plum hover:text-teal border-l-2 border-transparent'
              }`}
            >
              {origin}
            </button>
          ))}
        </div>
      </div>

      {/* Draping Difficulty Filters */}
      <div>
        <label className="text-[11px] font-bold tracking-wider text-mauve uppercase block mb-2">
          DRAPING COMPLEXITY
        </label>
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`text-[11px] py-2 text-center transition-colors ${
              selectedDifficulty === 'all'
                ? 'bg-plum text-parchment font-bold'
                : 'bg-parchment hover:bg-subtle-grey border border-subtle-grey/40 text-plum'
            }`}
          >
            All
          </button>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`text-[11px] py-2 text-center transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-plum text-parchment font-bold'
                  : 'bg-parchment hover:bg-subtle-grey border border-subtle-grey/40 text-plum'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-mauve mt-2 italic">
          Beginner-level sarees feature lighter silk weaves that drape beautifully with less weight.
        </p>
      </div>

      {/* High Fashion Sidebar Editorial Quote Block */}
      <div className="bg-plum text-parchment p-4 space-y-2 border border-teal/30">
        <span className="text-[9px] uppercase tracking-[0.2em] text-teal font-bold block">
          CURATOR NOTE
        </span>
        <p className="text-[11px] italic leading-relaxed text-parchment/90 font-serif">
          “True editorial style lives in high contrast. Try pairing the Electric Teal Banarasi with an obsidian black silk corsetry.”
        </p>
      </div>
    </div>
  );
};
