export const HeroHeader = () => {
  return (
    <div className="space-y-4 mb-8 animate-[fadeIn_0.8s_ease-out]">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#f65228] to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
        Free AI Business Analysis
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        See how AI can revolutionize your operations and drive growth
      </p>
      <div className="flex justify-center gap-2 text-sm text-gray-500">
        <span>✓ No credit card required</span>
        <span>•</span>
        <span>✓ Instant results</span>
      </div>
    </div>
  );
};