import React from "react";
import { Heart, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 text-rose-600">
            <Heart className="fill-current" size={18} />
            <span className="font-bold text-gray-900">WeddingCrasher</span>
          </div>
          <p className="text-xs text-gray-500">A fun Project</p>
        </div>

        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/adarshsachan01/"
            className="text-gray-400 hover:text-rose-500 transition-colors"
            target="_blank"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/theadarsh1m/ShaadiCrasher"
            className="text-gray-400 hover:text-rose-500 transition-colors"
            target="_blank"
          >
            <Github size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
