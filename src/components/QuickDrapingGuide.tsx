import React, { useState } from 'react';
import { X, Compass, ArrowUpRight } from 'lucide-react';

interface QuickDrapingGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickDrapingGuide: React.FC<QuickDrapingGuideProps> = ({ isOpen, onClose }) => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(0);

  if (!isOpen) return null;

  const questions = [
    {
      q: "I am draping a saree for the first time. Which design do you recommend?",
      a: "We suggest starting with our lighter options like the 'Forest Echo Handloom Cotton-Silk' or 'Monochrome Nocturne Organza'. Lightweight fabrics are easier to wrap and do not slide off. Also, they have less bulk around the waist, making tucking exceptionally simple for beginners."
    },
    {
      q: "What exactly is 'Zari' thread? Does it make the silk stiff?",
      a: "Traditional Zari consists of fine silver or gold wire wound around silk threads. In our Neo-Heritage series, we twist the Zari with high-stretch organic cotton which prevents the classic stiff, cardboard feel. Instead, it yields a fluid, metallic curtain-like drape that moves beautifully with your posture."
    },
    {
      q: "Is the blouse fabric included, and how does sizing work?",
      a: "Yes! Every single saree package includes a coordinated 1.0-meter premium unstitched raw silk blouse panel. You can choose to take it to a local designer, or order custom pre-stitched blouse options (Size S to XL) directly in our Quick View customizer."
    },
    {
      q: "How do I wash and store my raw heritage silk?",
      a: "Never machine wash. Dry clean only. Store your saree wrapped in dry unbleached cotton fabric (or select our Heritage Cedarwood Box option at checkout). Avoid hanging silk sarees on metal hangers for extended periods, as the weight of the heavy zari can distort the weave structure."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-plum/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-parchment w-full max-w-lg border-2 border-teal shadow-2xl p-6 relative animate-scale-in">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-plum hover:text-teal transition-colors"
          aria-label="Close Guide"
        >
          <X size={20} />
        </button>

        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-subtle-grey pb-3">
            <Compass className="text-teal animate-pulse" size={20} />
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-plum font-sans">
                DRAPING Q&A HELPER
              </h3>
              <p className="text-[10px] text-mauve uppercase font-sans">
                SaareeDrapes High-Fashion Curators
              </p>
            </div>
          </div>

          <p className="text-xs text-plum leading-relaxed font-sans">
            We believe luxury is about absolute clarity. Click any common question below to reveal an instant resolution curated by our loom masters.
          </p>

          {/* Accordion */}
          <div className="space-y-2">
            {questions.map((item, index) => (
              <div key={index} className="border border-subtle-grey bg-elevated">
                <button
                  onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                  className="w-full text-left p-3.5 flex justify-between items-center gap-4 transition-colors duration-150 hover:bg-teal/5 text-xs font-bold text-plum font-sans"
                >
                  <span>{item.q}</span>
                  <span className="text-teal text-lg">{activeQuestion === index ? '−' : '+'}</span>
                </button>
                
                {activeQuestion === index && (
                  <div className="p-3.5 pt-0 border-t border-subtle-grey/50 text-xs text-mauve leading-relaxed font-sans">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-teal/5 p-3.5 border-l-4 border-teal flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase tracking-wider text-teal font-bold">
                WANT A PRIVATE VIDEO CALL?
              </p>
              <p className="text-[11px] text-plum font-sans font-medium">
                Our studio stylists are available 24/7.
              </p>
            </div>
            <a
              href="tel:+1800722733"
              className="bg-teal hover:bg-plum text-parchment text-[9px] font-bold uppercase tracking-widest py-2 px-3 flex items-center gap-1 transition-colors"
            >
              CALL NOW
              <ArrowUpRight size={10} />
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-plum hover:bg-teal text-parchment font-sans font-bold text-xs tracking-widest uppercase py-3 transition-colors"
          >
            CLOSE GUIDE
          </button>

        </div>

      </div>
    </div>
  );
};
