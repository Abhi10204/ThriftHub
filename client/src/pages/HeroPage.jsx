// import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "../assets/thrift-hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(20, 20, 20, 0.65), rgba(20, 20, 20, 0.75)), url(${heroImage})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container px-4 text-center">
        {/* Top label */}
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="h-8 w-8 text-[#FFB249] mr-2 animate-pulse" />
          <span className="text-[#FFB249] font-semibold uppercase tracking-wider text-sm">
            Discover Hidden Treasures
          </span>
        </div>

        {/* Main heading with inline gradient */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[hsl(0,0%,100%)] via-[#FFB249] to-[hsl(25,90%,55%)] bg-clip-text text-transparent">
          Vintage Finds,
          <br />
          <span className="text-[#FFB249]">Modern Style</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-2xl text-[#C9B79C] mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover unique second-hand treasures that tell a story. From vintage
          fashion to retro home decor, find your next favorite piece at
          unbeatable prices.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="text-lg px-8 py-3 bg-gradient-to-r from-[#FFB54B] via-[#FFB249] to-[hsl(25,90%,55%)] text-black hover:bg-yellow-300 rounded-full flex items-center transition cursor-pointer hover:shadow-lg hover:shadow-[#FFB249]/30">
            Start Shopping
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button  className="text-lg px-8 py-3 border-2 border-[#FFB84C] bg-black text-[#FFB84C] hover:bg-[#FFB84C] hover:text-black rounded-full transition cursor-pointer hover:shadow-lg hover:shadow-[#FFB249]/30">
            Browse Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
