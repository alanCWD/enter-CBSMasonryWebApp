import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

const Index = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGetQuote={() => setQuoteOpen(true)} />
      <main>
        <Hero onGetQuote={() => setQuoteOpen(true)} />
        <TrustBar />
        <Services />
        <About />
        <Gallery />
        <Reviews />
        <CTABanner onGetQuote={() => setQuoteOpen(true)} />
      </main>
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
};

export default Index;
