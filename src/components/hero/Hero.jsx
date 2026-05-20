import { ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center gap-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center flex flex-col gap-0 md:gap-4 dark:text-white">
        Book Your Game. <span className="text-[#00C853]">Play Your Way.</span>
      </h1>
      <p className="text-lg text-center max-w-150">
        Find and reserve the best sports facilities near you. From premium
        football turfs to international standard badminton courts, SportNest
        connects you to your game instantly.
      </p>
      <Link href="/all-facilities">
        <button className="bg-[#00C853] text-white px-6 py-3 rounded-md font-bold hover:bg-[#009624] transition-colors flex items-center gap-2">
          Explore Facilities <ArrowRight />
        </button>
      </Link>
    </div>
  );
};

export default Hero;
