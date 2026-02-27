function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
        .then((res) => {
        if (!res.ok)
            throw new Error("Network error");
        return res.json();
    })
        .then((data) => console.log("Products loaded:", data.length))
        .catch((err) => console.error("Fetch failed:", err.message))
        .finally(() => console.log("Operation complete."));
}
fetchProducts();
export {};
