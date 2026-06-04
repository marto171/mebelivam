import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import Showcase from "@/components/sections/showcase";
import Services from "@/components/sections/services";
import Info from "@/components/sections/info";
import ContactFormButton from "@/components/ui/contact-form-button";
import About from "@/components/sections/about";
import Testimonials from "@/components/sections/testimonials";
import FAQ from "@/components/sections/faq";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Page() {
  return (
    <>
      <Hero />
      <Stats />
      <Showcase />
      <section id="services" className="section">
        <Services />
      </section>
      <section id="info" className="section">
        <Info />
      </section>
      <ContactFormButton />
      <section id="about" className="section">
        <About />
      </section>
      <Testimonials />
      <section id="faq" className="section">
        <FAQ />
      </section>
      <section id="contact" className="section">
        <Contact />
      </section>
      <Footer />
    </>
  );
}
