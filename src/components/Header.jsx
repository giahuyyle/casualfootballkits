import { Link } from "react-router";
import { Instagram, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <>
      {/* Announcement banner */}
      <div className="bg-black text-white text-xs tracking-widest overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block py-2">
          <span className="mx-8">FREE SHIPPING WORLDWIDE ON ORDERS OVER 150 CAD</span>
          <span className="mx-8">—</span>
          <span className="mx-8">FREE SHIPPING WORLDWIDE ON ORDERS OVER 150 CAD</span>
          <span className="mx-8">—</span>
          <span className="mx-8">FREE SHIPPING WORLDWIDE ON ORDERS OVER 150 CAD</span>
          <span className="mx-8">—</span>
          <span className="mx-8">FREE SHIPPING WORLDWIDE ON ORDERS OVER 150 CAD</span>
        </div>
      </div>

      {/* Header with logo + icons */}
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-foreground hover:text-muted-foreground transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </a>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight uppercase">
            Casual Football Kits
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label="Cart"
            className="text-foreground hover:text-muted-foreground transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
