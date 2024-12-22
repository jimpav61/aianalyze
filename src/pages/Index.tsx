import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SampleReport } from "@/components/SampleReport";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SampleReport />
      </main>
      <Footer />
    </div>
  );
};

export default Index;