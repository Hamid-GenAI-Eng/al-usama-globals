import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import BentoGrid from "@/components/BentoGrid";
import AnalyticsSection from "@/components/AnalyticsSection";
import WorkflowSection from "@/components/WorkflowSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <TrustBar />
    <BentoGrid />
    <AnalyticsSection />
    <WorkflowSection />
    <TestimonialsSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
