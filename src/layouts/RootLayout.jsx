import { Link, Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <nav className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            CFK
          </Link>
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Casual Football Kits
      </footer>
    </div>
  );
}
