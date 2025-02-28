import AnimationWrapper from "@/components/AnimationWrapper";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function LandingPage() {
  return (
    <AnimationWrapper>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <Features />
        <CallToAction />
        <Footer />
      </div>
    </AnimationWrapper>
  );
}
