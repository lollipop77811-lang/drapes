import React, { useState } from 'react';
import { Play, Pause, Music, Heart, Star } from 'lucide-react';
import { SareeProduct } from '../types';

interface LookbookProps {
  products: SareeProduct[];
  onQuickView: (product: SareeProduct) => void;
}

export const Lookbook: React.FC<LookbookProps> = ({ products, onQuickView }) => {
  const [isPlayingLoomAudio, setIsPlayingLoomAudio] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [loves, setLoves] = useState<Record<string, number>>({
    'look-1': 142,
    'look-2': 389,
    'look-3': 245
  });
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const toggleLove = (id: string) => {
    setLiked(prev => {
      const wasLiked = !!prev[id];
      setLoves(l => ({
        ...l,
        [id]: wasLiked ? l[id] - 1 : l[id] + 1
      }));
      return {
        ...prev,
        [id]: !wasLiked
      };
    });
  };

  // Get 3 distinct products to highlight in lookbook
  const lookbookItems = [
    {
      id: 'look-1',
      title: 'The Structural Anomaly',
      product: products[0] || products[0],
      statement: '“Draped in asymmetrical tiers, this deep aubergine silk rejects flow in favor of absolute structure.”',
      image: 'https://images.pexels.com/photos/6842791/pexels-photo-6842791.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      photographer: 'Sakshi Patwa',
      location: 'Stockholm Studio'
    },
    {
      id: 'look-2',
      title: 'Liquid Terracotta',
      product: products[1] || products[0],
      statement: '“Raw silk that captures sunset rays and reflects them through heavy, block-geometric copper threads.”',
      image: 'https://images.pexels.com/photos/29049398/pexels-photo-29049398.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      photographer: 'Clio Silks',
      location: 'Varanasi Ghats'
    },
    {
      id: 'look-3',
      title: 'The Teal Rebellion',
      product: products[2] || products[0],
      statement: '“An aggressive clash of electric teal on traditional handspun silk. A statement of modern sovereignty.”',
      image: 'https://images.pexels.com/photos/17503287/pexels-photo-17503287.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      photographer: 'Prem GS',
      location: 'Mumbai Runway'
    }
  ];

  return (
    <section className="bg-parchment py-16 border-b border-subtle-grey overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lookbook Header with Ambient Synth Player */}
        <div className="border-b border-subtle-grey pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
              <Star size={12} />
              <span>INTERACTIVE HIGH-FASHION EXHIBIT</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-plum font-serif tracking-tight">
              Editorial <span className="italic font-normal text-teal">Lookbook</span> Vol. IV
            </h2>
            <p className="text-sm text-mauve max-w-xl font-sans">
              Explore our curated photographic plates. Pairings that celebrate unexpected color clashes—electric teal, deep aubergine, and raw parchment silk.
            </p>
          </div>

          {/* Interactive Ambient Synth Audio Player */}
          <div className="bg-elevated border border-subtle-grey p-4 flex items-center gap-4 max-w-sm w-full shadow-sm">
            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal flex-shrink-0">
              <Music size={18} className={isPlayingLoomAudio ? 'animate-pulse' : ''} />
            </div>
            <div className="flex-grow">
              <p className="text-[10px] uppercase tracking-widest text-mauve font-bold font-sans">
                Loom Ambient Soundscape
              </p>
              <p className="text-xs text-plum font-medium font-sans">
                {isPlayingLoomAudio ? 'Playing: Varanasi Guild Synth Loop' : 'Audio-Guided Visual Tour'}
              </p>
            </div>
            <button
              onClick={() => setIsPlayingLoomAudio(!isPlayingLoomAudio)}
              className={`p-2 rounded-none border transition-all duration-200 flex items-center justify-center ${
                isPlayingLoomAudio 
                  ? 'bg-plum text-parchment border-plum' 
                  : 'border-subtle-grey text-plum hover:bg-teal/5'
              }`}
              title={isPlayingLoomAudio ? 'Mute Ambient' : 'Play Ambient'}
            >
              {isPlayingLoomAudio ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
        </div>

        {/* Audio feedback banner */}
        {isPlayingLoomAudio && (
          <div className="bg-teal text-parchment text-[10px] uppercase tracking-widest py-1 px-4 text-center mb-6 animate-pulse">
            ♫ Listening to "Ancient Loom Shuttle Echoes & Contemporary Lo-fi Beats" (2026 Edit)
          </div>
        )}

        {/* Dynamic Year Selector */}
        <div className="flex gap-3 mb-8 text-xs font-sans font-bold uppercase tracking-widest">
          {['2024', '2025', '2026'].map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`pb-1 border-b-2 ${
                selectedYear === year ? 'border-teal text-teal' : 'border-transparent text-mauve'
              }`}
            >
              Vol. {year === '2026' ? 'IV (Current)' : year === '2025' ? 'III' : 'II'}
            </button>
          ))}
        </div>

        {/* Grid of Photographic Plates with interactive hotspots and products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {lookbookItems.map((item, idx) => (
            <div 
              key={item.id}
              className="bg-elevated border border-subtle-grey flex flex-col justify-between p-6 space-y-6 shadow-sm group"
            >
              {/* Plate Header */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-mauve">
                  PLATE 0{idx + 1} • {item.location}
                </span>
                <span className="text-[10px] font-serif italic text-terracotta font-bold">
                  {selectedYear} Edition
                </span>
              </div>

              {/* Big Photo Frame with Hover Overlay details */}
              <div className="relative h-[360px] bg-parchment overflow-hidden border border-subtle-grey">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-plum/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-xs text-parchment font-sans">
                    Photographed by <strong className="text-teal">{item.photographer}</strong>
                  </p>
                </div>

                </div>

              {/* Editorial Statement */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-plum font-serif">
                  {item.title}
                </h3>
                <p className="text-xs text-plum leading-relaxed italic font-serif">
                  {item.statement}
                </p>
              </div>

              {/* Action Row */}
              <div className="border-t border-subtle-grey pt-4 flex items-center justify-between">
                <button
                  onClick={() => toggleLove(item.id)}
                  className="flex items-center gap-1.5 text-xs font-sans text-mauve hover:text-terracotta transition-colors"
                >
                  <Heart size={14} className={liked[item.id] ? 'fill-terracotta text-terracotta' : ''} />
                  <span>{loves[item.id]} appreciations</span>
                </button>

                {item.product && (
                  <button
                    onClick={() => onQuickView(item.product)}
                    className="text-[10px] font-bold uppercase tracking-widest text-teal hover:text-plum transition-colors"
                  >
                    EXHIBIT PRODUCT &rarr;
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* High-Fashion Manifesto Banner */}
        <div className="mt-12 bg-plum text-parchment p-8 md:p-12 text-center space-y-6 border-2 border-teal">
          <span className="text-[10px] uppercase tracking-[0.3em] text-teal font-bold block">
            SAAREEDRAPES EDITORIAL MANIFESTO
          </span>
          <p className="text-xl md:text-3xl font-light font-serif italic max-w-3xl mx-auto leading-relaxed">
            “We strive to create garments that occupy 3D space with elegance, treating the six-yard handloom silk not as a historical relic, but as an interactive armor of contemporary color.”
          </p>
          <div className="w-16 h-0.5 bg-teal mx-auto" />
          <span className="text-xs uppercase tracking-widest text-mauve block">
            Signed: The 24 Master Guilds of Bengal & Varanasi, 2026
          </span>
        </div>

      </div>
    </section>
  );
};
