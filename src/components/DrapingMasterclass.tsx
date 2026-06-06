import React, { useState } from 'react';
import { Scissors, ChevronRight } from 'lucide-react';

export const DrapingMasterclass: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState<'nivi' | 'bengali' | 'modern-mermaid'>('nivi');
  const [currentStep, setCurrentStep] = useState(0);

  // Fabric estimator states
  const [heightCm, setHeightCm] = useState(165);
  const [hipsInches, setHipsInches] = useState(38);
  const [calculatedLength, setCalculatedLength] = useState<number | null>(null);

  const drapingStyles = {
    nivi: {
      name: 'The Classic Nivi Drape',
      origin: 'Deccan Region',
      difficulty: 'Beginner Friendly',
      description: 'The globally recognized saree drape. Excellent for displaying heavy, solid-color palla silk panels.',
      steps: [
        'Blouse and Petticoat Check: Secure your structured top and an adjustable underskirt firmly around the waist.',
        'The Initial Tuck: Start tucking the plain end of the saree at the right waist, wrapping it once completely counter-clockwise.',
        'The Pleating Phase: Gather 6 to 8 neat pleats (about 5 inches each) with your fingers. Tuck them facing left, neat and aligned.',
        'The Pallu Cast: Drape the remaining fabric over the chest and let it rest over the left shoulder, leaving about 1.5 meters flowing behind.'
      ]
    },
    bengali: {
      name: 'The Athpouria (Bengali Traditional)',
      origin: 'Bengal Province',
      difficulty: 'Intermediate',
      description: 'A signature box-pleated style without a bottom tuck, offering unmatched volume and luxury presence.',
      steps: [
        'The Base Wrap: Start by tucking the saree at the right side of the waist and make one complete round back to the right.',
        'The Broad Box Pleats: Fold the fabric into large box pleats instead of the standard narrow ones, keeping the pleats wide and flat.',
        'Right Shoulder Pallu: Take the pallu from behind and drape it over the right shoulder from back to front.',
        'The Key Bun Weight: Throw the corner over your left shoulder. Classically, a family heirloom key ring was tied to this corner to keep it anchored.'
      ]
    },
    'modern-mermaid': {
      name: 'The Modern Belted Column',
      origin: 'Contemporary Runway',
      difficulty: 'Master Class',
      description: 'An ultra-slick editorial silhouette. Creates an elongated column look that flatters high heels.',
      steps: [
        'High-Waist Base: Tuck the saree tightly with an emphasis on keeping it flush against the hips (no bulk).',
        'Fitted Wrap: Instead of front pleats, wrap the fabric tightly around the legs to mimic a mermaid skirt silhouette.',
        'Slim Pallu: Pleat the pallu into a very narrow band (3 inches max) and secure with safety pins.',
        'Accentuating Corset Belt: Wrap a modern leather, metallic, or electric teal belt around the waist over the draped pleats.'
      ]
    }
  };

  const handleCalculateLength = (e: React.FormEvent) => {
    e.preventDefault();
    // High fashion formula: Base 5.5 meters, adjusting for height and hips
    let base = 5.5;
    if (heightCm > 175) base += 0.3;
    if (hipsInches > 40) base += 0.2;
    if (activeStyle === 'bengali') base += 0.4; // Bengali style consumes more fabric due to box pleats
    
    setCalculatedLength(parseFloat(base.toFixed(2)));
  };

  const selectedStyleData = drapingStyles[activeStyle];

  return (
    <section className="bg-parchment py-16 border-b border-subtle-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold tracking-[0.3em] text-teal uppercase block">
            ACADEMIC HERITAGE SERIES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-plum font-serif tracking-tight">
            The Saree <span className="italic font-normal text-terracotta font-serif">Draping Masterclass</span>
          </h2>
          <p className="text-sm text-mauve font-sans">
            Draping is an interactive, three-dimensional sculpture. Choose a style below and master the configuration of the six-yard weave.
          </p>
        </div>

        {/* Main masterclass layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left side: Active style picker and steps (7 cols) */}
          <div className="lg:col-span-7 bg-elevated border border-subtle-grey p-6 md:p-8 space-y-6">
            
            {/* Style buttons selector */}
            <div className="flex flex-wrap gap-2 border-b border-subtle-grey pb-6">
              {(Object.keys(drapingStyles) as Array<keyof typeof drapingStyles>).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveStyle(key);
                    setCurrentStep(0);
                  }}
                  className={`text-xs font-bold uppercase tracking-widest px-4 py-2.5 transition-colors duration-200 ${
                    activeStyle === key
                      ? 'bg-teal text-parchment'
                      : 'bg-parchment hover:bg-subtle-grey text-plum border border-subtle-grey/50'
                  }`}
                >
                  {drapingStyles[key].name}
                </button>
              ))}
            </div>

            {/* Selected Style Info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-terracotta font-sans">
                  REGION OF ANCESTRY: {selectedStyleData.origin}
                </span>
                <span className="text-[11px] uppercase tracking-wider bg-plum text-parchment px-2.5 py-0.5 font-bold font-sans">
                  {selectedStyleData.difficulty}
                </span>
              </div>

              <p className="text-sm text-plum font-serif italic leading-relaxed">
                {selectedStyleData.description}
              </p>
            </div>

            {/* Steps Progress visualization */}
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center text-xs font-bold text-mauve font-sans uppercase">
                <span>Step {currentStep + 1} of {selectedStyleData.steps.length}</span>
                <span>{Math.round(((currentStep + 1) / selectedStyleData.steps.length) * 100)}% Completed</span>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-subtle-grey w-full">
                <div 
                  className="h-1 bg-teal transition-all duration-300" 
                  style={{ width: `${((currentStep + 1) / selectedStyleData.steps.length) * 100}%` }}
                />
              </div>

              {/* Current step instruction */}
              <div className="bg-parchment border-l-4 border-teal p-6 space-y-3 min-h-[140px] flex flex-col justify-between">
                <p className="text-sm md:text-base text-plum font-sans leading-relaxed font-medium">
                  {selectedStyleData.steps[currentStep]}
                </p>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                    className={`text-xs uppercase font-bold tracking-wider ${
                      currentStep === 0 ? 'text-mauve/40 cursor-not-allowed' : 'text-plum hover:text-teal'
                    }`}
                  >
                    &larr; Previous
                  </button>
                  
                  <button
                    onClick={() => setCurrentStep(prev => Math.min(selectedStyleData.steps.length - 1, prev + 1))}
                    disabled={currentStep === selectedStyleData.steps.length - 1}
                    className={`text-xs uppercase font-bold tracking-wider ${
                      currentStep === selectedStyleData.steps.length - 1 ? 'text-mauve/40 cursor-not-allowed' : 'text-teal hover:text-plum'
                    }`}
                  >
                    Next Step &rarr;
                  </button>
                </div>
              </div>

              {/* Step indicators bubbles */}
              <div className="flex justify-center gap-2 pt-2">
                {selectedStyleData.steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                      currentStep === index ? 'bg-teal scale-125' : 'bg-subtle-grey hover:bg-mauve'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>

          {/* Right side: Bespoke fabric length estimator tool (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Fabric Estimator */}
            <div className="bg-elevated border border-subtle-grey p-6 space-y-4">
              <div className="flex items-center gap-2 text-plum border-b border-subtle-grey pb-3">
                <Scissors size={16} className="text-terracotta" />
                <h3 className="text-xs font-bold tracking-widest uppercase font-sans">
                  BESPOKE FABRIC WIDTH CALCULATOR
                </h3>
              </div>

              <p className="text-[11px] text-mauve leading-relaxed font-sans">
                Unlike Western ready-to-wear, the perfect saree is sized to coordinate with your physical height and hip frame to guarantee flawless box-pleating fold counts.
              </p>

              <form onSubmit={handleCalculateLength} className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-plum uppercase tracking-wider block mb-1 font-sans">
                    Your Physical Height ({heightCm} cm)
                  </label>
                  <input
                    type="range"
                    min="145"
                    max="190"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-[9px] text-mauve font-sans">
                    <span>145 cm (4'9")</span>
                    <span>190 cm (6'3")</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-plum uppercase tracking-wider block mb-1 font-sans">
                    Hip Measurement ({hipsInches} inches)
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="52"
                    value={hipsInches}
                    onChange={(e) => setHipsInches(Number(e.target.value))}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-[9px] text-mauve font-sans">
                    <span>30 in</span>
                    <span>52 in</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-plum hover:bg-teal text-parchment font-sans font-bold text-xs tracking-widest uppercase py-3 transition-colors duration-200"
                >
                  CALCULATE OPTIMAL FABRIC METERS
                </button>
              </form>

              {calculatedLength && (
                <div className="bg-parchment p-4 border border-teal/40 text-center space-y-1 animate-fade-in">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-teal font-bold block">
                    CURATOR-ESTIMATED REQUIREMENT
                  </span>
                  <p className="text-3xl font-extrabold text-plum font-serif">
                    {calculatedLength} <span className="text-lg font-medium font-sans text-mauve">meters</span>
                  </p>
                  <p className="text-[10px] text-mauve leading-snug font-sans">
                    Includes 1.0 meter matching unstitched raw silk blouse piece. Drapes perfectly for <strong className="text-plum font-serif">{selectedStyleData.name}</strong> folds.
                  </p>
                </div>
              )}
            </div>

            {/* Additional Video Guide Card */}
            <div className="bg-plum text-parchment p-6 space-y-4">
              <span className="text-[9px] uppercase tracking-[0.25em] text-teal font-bold block">
                PRIVATE VIRTUAL ASSISTANT
              </span>
              <h4 className="text-lg font-bold font-serif">
                Still hesitant about the pleat count?
              </h4>
              <p className="text-xs text-parchment/80 leading-relaxed font-sans">
                Every Drapes with Grace parcel ships with a private QR link to our video guide library. You can also schedule a complimentary 15-minute Zoom session with an in-house master stylist.
              </p>
              <div className="border-t border-parchment/15 pt-3 flex justify-between items-center text-[10px] font-bold font-sans tracking-wider text-teal">
                <span>BOOK COMPLIMENTARY SESSION</span>
                <ChevronRight size={12} />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
