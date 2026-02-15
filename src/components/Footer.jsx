import { Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto" style={{ backgroundColor: "#8B4447" }}>
      <div className="flex flex-col items-center justify-center px-6 py-16 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-6">
          WANT TO SELL YOUR SHIRTS?
        </h2>
        <p className="text-lg mb-4">Contact Us at</p>

        <a
          href="mailto:dominicmeneses2001@gmail.com"
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-4"
        >
          <Mail className="h-5 w-5" />
          <span>dominicmeneses2001@gmail.com</span>
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white/90 hover:text-white transition-colors"
        >
          <Instagram className="h-6 w-6" />
        </a>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} Casual Football Kits. All rights reserved.
      </div>
    </footer>
  );
}
