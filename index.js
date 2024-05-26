document.addEventListener("DOMContentLoaded", () => {
  const apiEndpoint = "https://fakestoreapi.com/products";
  let products = [];
  let displayedProducts = [];
  let currentIndex = 0;
  const productsPerLoad = 10;

  const productsContainer = document.getElementById("products");
  const shimmerContainer = document.getElementById("shimmer");
  const loadMoreButton = document.getElementById("load-more");
  const searchInput = document.getElementById("search");
  const filterCategoryContainer = document.getElementById("filter-categories");
  const priceRangeInput = document.getElementById("price-range");
  const priceRangeValue = document.getElementById("price-range-value");
  const sortSelect = document.getElementById("sort");
  const menu = document.getElementById("mobile-hide");
  const filterShow = document.getElementById("filter");
  const sortingShow = document.getElementById("sorting");
  const totalCount = document.getElementById("totalCount");

  async function fetchProducts() {
    try {
      showShimmer();
      const response = await fetch(apiEndpoint);
      if (!response.ok) {
        throw new Error("Network Issue");
      }
      products = await response.json();
      displayedProducts = [...products];
      populateFilterCategories();
      displayProducts();
    } catch (error) {
      console.error("Fetching products failed:", error);
      alert("Failed to load products. Please try again later.");
    } finally {
      hideShimmer();
    }
  }

  function populateFilterCategories() {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    categories.forEach((category) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="checkbox" value="${category}">
        ${category}
      `;
      filterCategoryContainer.appendChild(label);
    });

    filterCategoryContainer.addEventListener("change", filterProducts);
  }

  function displayProducts() {
    const fragment = document.createDocumentFragment();
    const slicedProducts = displayedProducts.slice(
      currentIndex,
      currentIndex + productsPerLoad
    );
    slicedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
      <div class="image-holder"><img src="${product.image}" alt="${product.title}"></div>
        <h2>${product.title}</h2>
        <p class="desc">${product.description}</p>
        <p>$${product.price}</p>
      `;      
      fragment.appendChild(productCard);
    });
    productsContainer.appendChild(fragment);
    currentIndex += productsPerLoad;
    if (currentIndex >= displayedProducts.length) {
      loadMoreButton.style.display = "none";
    } else {
      loadMoreButton.style.display = "block";
    }
  }

  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategories = Array.from(
      filterCategoryContainer.querySelectorAll("input:checked")
    ).map((checkbox) => checkbox.value);
    const sortedValue = sortSelect.value;
    const priceRange = parseInt(priceRangeInput.value, 10);

    displayedProducts = products.filter((product) => {
      return (
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        product.title.toLowerCase().includes(searchTerm) &&
        product.price <= priceRange
      );
    });

    if (sortedValue === "price-asc") {
      displayedProducts.sort((a, b) => a.price - b.price);
    } else if (sortedValue === "price-desc") {
      displayedProducts.sort((a, b) => b.price - a.price);
    }

    currentIndex = 0;
    productsContainer.innerHTML = "";
    displayProducts();
  }

  function showShimmer() {
    shimmerContainer.innerHTML = "";
    for (let i = 0; i < productsPerLoad; i++) {
      const shimmerCard = document.createElement("div");
      shimmerCard.className = "shimmer-card";
      shimmerCard.innerHTML = `
        <div class="shimmer shimmer-img"></div>
        <div class="shimmer-text"></div>
        <div class="shimmer-text"></div>
        <div class="shimmer-text"></div>
      `;
      shimmerContainer.appendChild(shimmerCard);
    }
    shimmerContainer.style.display = "grid";
  }

  function hideShimmer() {
    shimmerContainer.style.display = "none";
  }

  loadMoreButton.addEventListener("click", () => {
    showShimmer();
    setTimeout(() => {
      displayProducts();
      hideShimmer();
    }, 500);
  });

  searchInput.addEventListener("input", filterProducts);
  sortSelect.addEventListener("change", filterProducts);
  priceRangeInput.addEventListener("input", () => {
    priceRangeValue.textContent = "$" + `${priceRangeInput.value}`;
    filterProducts();
  });

  fetchProducts();


  

  /** Mobile Actions  *** */

  document.getElementById("menu-open").addEventListener("click", function () {
    menu.className = "mobile-show";
  });

  document.getElementById("menu-close").addEventListener("click", function () {
    menu.className = "mobile-hide";
  });

  document.getElementById("filter-show").addEventListener("click", function () {
    if (filterShow.classList.contains("mobile-hide")) {
      filterShow.classList.add("mobile-show");
      filterShow.classList.remove("mobile-hide");
    } else {
      filterShow.classList.add("mobile-hide");
      filterShow.classList.remove("mobile-show");
    }
  });

  document.getElementById("sorting-show").addEventListener("click", function () {
    if (sortingShow.classList.contains("mobile-hide")) {
      sortingShow.classList.add("mobile-show");
      sortingShow.classList.remove("mobile-hide");
    } else {
      sortingShow.classList.add("mobile-hide");
      sortingShow.classList.remove("mobile-show");
    }
  });

});
