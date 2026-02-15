import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { searchProducts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductFilters from "@/components/ProductFilters";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter / sort state
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    size: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  const fetchData = (page, filters) => {
    if (!query.trim()) return;
    setLoading(true);
    searchProducts({ q: query, page, ...filters })
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts);
        setAvailableSizes(data.availableSizes || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(currentPage, appliedFilters);
  }, [query, currentPage, appliedFilters]);

  // Reset filters when query changes
  useEffect(() => {
    setSelectedSizes([]);
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setAppliedFilters({ size: "", minPrice: "", maxPrice: "", sort: "" });
  }, [query]);

  const goToPage = (page) => {
    const params = { q: query };
    if (page > 1) params.page = String(page);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApplyFilters = () => {
    const filters = {
      size: selectedSizes.join(","),
      minPrice,
      maxPrice,
      sort,
    };
    setAppliedFilters(filters);
    setSearchParams({ q: query }); // reset to page 1
  };

  const handleClearFilters = () => {
    setSelectedSizes([]);
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setAppliedFilters({ size: "", minPrice: "", maxPrice: "", sort: "" });
    setSearchParams({ q: query });
  };

  const handleSortChange = (value) => {
    setSort(value);
    const filters = {
      size: selectedSizes.join(","),
      minPrice,
      maxPrice,
      sort: value,
    };
    setAppliedFilters(filters);
    setSearchParams({ q: query }); // reset to page 1
  };

  if (!query.trim()) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Search</h1>
        <p className="text-muted-foreground">Enter a search term to find products.</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Search results for &ldquo;{query}&rdquo;
      </h1>
      <p className="text-center text-sm text-muted-foreground mb-8">
        {totalProducts} result{totalProducts !== 1 && "s"}
      </p>

      <ProductFilters
        availableSizes={availableSizes}
        selectedSizes={selectedSizes}
        onSizesChange={setSelectedSizes}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        sort={sort}
        onSortChange={handleSortChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      {loading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-muted-foreground">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group rounded-lg border bg-card overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-3/4 overflow-hidden bg-muted">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Size: {product.size}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    ${product.price.toFixed(2)} CAD
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
