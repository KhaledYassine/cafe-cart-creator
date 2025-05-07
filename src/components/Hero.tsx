
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

interface HeroProps {
  scrollToMenu: () => void;
}

const Hero = ({ scrollToMenu }: HeroProps) => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cafe-brown/40 to-black/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
          alt="Cafe interior" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container relative z-20">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Welcome to Joe's Caffé
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Experience the perfect blend of flavor and ambiance. Our artisanal coffee and delicious menu items are crafted with passion.
          </p>
          <Button 
            size="lg" 
            className="gap-2 text-base"
            onClick={scrollToMenu}
          >
            <Coffee className="h-5 w-5" />
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
