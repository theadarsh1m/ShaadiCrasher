import React from "react";
import { Heart, Calendar } from "lucide-react";
import {LiquidButton} from "../Components/ui/LiquidButton"

export default function Hero() {
  return (
    <main className="max-w-5xl mx-auto px-6 pt-12 pb-20 lg:pt-24 lg:flex lg:items-center lg:gap-12">
      <div className="lg:w-1/2 space-y-8">
        <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
          Find the <span className="text-rose-600">wedding</span> & Have
          free food.
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Found an invite? Or looking for free food nearby? Upload invitation
          cards and discover venues.
        </p>

        <LiquidButton variant="rose" size="lg">
          Get Started <span className=""></span>
        </LiquidButton>
      </div>

      {/* Hero Graphic */}
      <div className="lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-linear-to-tr from-rose-100 to-orange-50 rounded-full blur-3xl opacity-60 -z-10"></div>
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <div className="h-40 bg-rose-100 rounded-xl mb-4 flex items-center justify-center">
            <Heart size={48} className="text-rose-300 fill-white" />
          </div>
          <div className="h-4 w-3/4 bg-gray-100 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
        </div>
      </div>
    </main>
  );
}
