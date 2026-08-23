import Header from './components/Header';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import ServicesSection from './sections/ServicesSection';
import WorkSection from './sections/WorkSection';
import ResultsSection from './sections/ResultsSection';
import IndustriesSection from './sections/IndustriesSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ background: '#15110D', overflowX: 'clip' }}>
      <Header />
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <WorkSection />
      <ResultsSection />
      <IndustriesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
