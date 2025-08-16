import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import SortOptions from "./components/SortOptions";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // small local UI state
  const [favorites, setFavorites] = useState([]); // array of product ids
  const [cart, setCart] = useState([]); // array of product ids (simple count)

  // Debounce search for smoother UX
  useEffect(() => {
    const t = setTimeout(
      () => setDebouncedSearch(search.trim().toLowerCase()),
      300
    );
    return () => clearTimeout(t);
  }, [search]);

  // Fetch products
  useEffect(() => {
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        // artificial delay so spinner/skeleton is visible
        await sleep(700);

        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle search, category & sorting
  useEffect(() => {
    let temp = [...products];

    if (category) {
      temp = temp.filter((p) => p.category === category);
    }

    if (debouncedSearch) {
      const q = debouncedSearch;
      temp = temp.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sort === "lowToHigh") temp.sort((a, b) => a.price - b.price);
    else if (sort === "highToLow") temp.sort((a, b) => b.price - a.price);
    else if (sort === "categoryAsc")
      temp.sort((a, b) => a.category.localeCompare(b.category));
    else if (sort === "categoryDesc")
      temp.sort((a, b) => b.category.localeCompare(a.category));

    setFiltered(temp);
  }, [debouncedSearch, sort, category, products]);

  const categories = [
    "",
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addToCart = (id) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setCategory("");
    setSort("");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-400 text-white py-4 shadow-md backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="Product Store logo"
                className="w-8 h-8 rounded-md object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Product Store
              </h1>
              <p className="text-xs text-white/90">
                Curated deals & smart picks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 bg-white/10 px-3 py-1 rounded-full">
              <button
                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/20 transition"
                aria-label="Favorites"
                title="Favorites"
              >
                <svg
                  className="w-5 h-5 text-amber-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21s-7.5-4.35-10-7.3C-1.1 9.8 2.2 4 7.6 4 10 4 12 5.3 12 5.3S14 4 16.4 4C21.8 4 25.1 9.8 22 13.7 19.5 16.65 12 21 12 21z" />
                </svg>
                <span className="text-sm">{favorites.length}</span>
              </button>

              <button
                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/20 transition"
                aria-label="Cart"
                title="Cart"
              >
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                </svg>
                <span className="text-sm">{cart.length}</span>
              </button>
            </div>

            <div className="hidden sm:block">
              <button
                onClick={clearFilters}
                className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-10 max-w-7xl mx-auto px-6">
        {/* Controls */}
        <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full">
              <SearchBar search={search} setSearch={setSearch} />
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <SortOptions sort={sort} setSort={setSort} />
              <div className="text-sm text-gray-600 hidden sm:block">
                <span className="font-semibold">{filtered.length}</span> results
              </div>
            </div>
          </div>

          {/* Category chips */}
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
              Categories
            </p>
            <div className="flex flex-wrap gap-2 overflow-x-auto py-1">
              {categories.map((cat) => {
                const isActive = category === cat;
                return (
                  <button
                    key={cat || "all"}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded-full text-sm transition-shadow transform active:scale-95 focus:outline-none ${
                      isActive
                        ? "bg-teal-600 text-white shadow-lg ring-2 ring-teal-300"
                        : "bg-gray-100 text-gray-700 hover:shadow-sm hover:translate-y-[-2px]"
                    }`}
                    aria-pressed={isActive}
                    aria-label={
                      cat ? `Filter by ${cat}` : "Show all categories"
                    }
                  >
                    {cat === "" ? "All" : cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Status / Empty / Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-sm animate-pulse flex gap-3 items-center"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-md" />
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="mx-auto mb-4 w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-teal-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="1.5"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold mb-2">No products found</p>
            <p className="text-sm text-gray-500">
              Try clearing filters or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onFavoriteToggle={() => toggleFavorite(product.id)}
                isInCart={cart.includes(product.id)}
                onAddToCart={() => addToCart(product.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductList;
