import { Header } from "@/components/Header";
import { AnalysisContainer } from "@/components/AnalysisContainer";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isMobile={isMobile} />
      <main className="container mx-auto px-4 py-8">
        <AnalysisContainer />
      </main>
    </div>
  );
};

export default Index;