import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

export default function ProductFilters({
  availableSizes = [],
  selectedSizes = [],
  onSizesChange,
  minPrice = "",
  maxPrice = "",
  onMinPriceChange,
  onMaxPriceChange,
  sort = "",
  onSortChange,
  onApplyFilters,
  onClearFilters,
}) {
  const [open, setOpen] = useState(false);

  const hasActiveFilters =
    selectedSizes.length > 0 || minPrice || maxPrice || sort;

  const priceRangeError =
    minPrice !== "" &&
    maxPrice !== "" &&
    Number(maxPrice) < Number(minPrice);

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter((s) => s !== size));
    } else {
      onSizesChange([...selectedSizes, size]);
    }
  };

  return (
    <div className="mb-8">
      {/* Top bar — Sort + Filter toggle */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(!open)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center">
              !
            </span>
          )}
        </Button>

        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low → High</SelectItem>
            <SelectItem value="price-desc">Price: High → Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Collapsible filter panel */}
      {open && (
        <div className="rounded-lg border bg-card p-4 space-y-5">
          {/* Size filter */}
          {availableSizes.length > 0 && (
            <div>
              <Label className="text-sm font-semibold mb-2 block">Size</Label>
              <div className="flex flex-wrap gap-3">
                {availableSizes.map((size) => (
                  <label
                    key={size}
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => toggleSize(size)}
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price range */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">
              Price Range (CAD)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                className="w-28"
              />
              <span className="text-muted-foreground">—</span>
              <Input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                className={`w-28 ${priceRangeError ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
            </div>
            {priceRangeError && (
              <p className="text-xs text-red-500 mt-1">
                Max price must be greater than min price
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            <Button size="sm" onClick={onApplyFilters} disabled={priceRangeError}>
              Apply Filters
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="gap-1"
              >
                <X className="h-3 w-3" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
