import HeroSection from "@/components/HeroSection";
import HeadlineSection from "@/components/HeadlineSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ImpactStatsSection from "@/components/ImpactStatsSection";
import WhyItMattersSection from "@/components/WhyItMattersSection";
import CommunitySection from "@/components/CommunitySection";
import JoinSection from "@/components/JoinSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Headline Section */}
      <HeadlineSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Impact Statistics Section */}
      <ImpactStatsSection />

      {/* Why It Matters Section */}
      <WhyItMattersSection />

      {/* Community Section */}
      <CommunitySection />

      {/* Join Section */}
      <JoinSection />
    </main>
  );
}
