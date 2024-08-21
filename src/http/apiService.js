import { useQuery } from "react-query";
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const axios = setupCache(Axios);

const api = axios.create({
  // baseURL: "https://prismcloudhosting.com/ROYAL_SPIRIT_APIs/public/v1/api",
  // baseURL: "https://lovettonazareth.com/ROYAL_SPIRIT_APIs/public/v1/api",
  // baseURL: "https://royalspirit.ae/ROYAL_SPIRIT_APIs/public/v1/api",
  baseURL: "https://api.royalspirit.ae/public/v1/api",
});

export const fetchOthersDropDownData = () => {
  return api.get("/other-drop-down");
};

export const useFetchOthersDropDownData = (queryCache) => {
  return useQuery("dropdownData", () => fetchOthersDropDownData(), {
    cache: queryCache,
    keepPreviousData: true,
    staleTime: 300000,
    cacheTime: 300000,
  });
};

export const fetchHeaderSearchData = (query) => {
  return api.post("/global-search", query);
};

export const fetchFeaturedOnData = () => {
  return api.get("/featured-brand");
};

export const useFetchFeaturedOnData = (queryCache) => {
  return useQuery("featuredOnList", () => fetchFeaturedOnData(), {
    cache: queryCache,
    keepPreviousData: true,
    staleTime: 3000000,
    cacheTime: 3000000,
  });
};

export const fetchBestSellingProductsData = () => {
  return api.get("/home-best-selling");
};

export const useFetchBestSellingProductsData = (queryCache) => {
  return useQuery("bestSellingData", () => fetchBestSellingProductsData(), {
    cache: queryCache,
    keepPreviousData: true,
    staleTime: 3000000,
    cacheTime: 3000000,
  });
};

export const fetchOurChoicesProductsData = () => {
  return api.get("front-our-choices");
};
export const useFetchOurChoicesProductsData = (queryCache) => {
  return useQuery("OurChoicesData", () => fetchOurChoicesProductsData(), {
    cache: queryCache,
    keepPreviousData: true,
    staleTime: 3000000,
    cacheTime: 3000000,
  });
};
export const fetchFeaturedProductsData = () => {
  return api.get("/home-featured-product");
};
export const fetchSalesProductsData = (currentPage) => {
  return api.get(`/product-on-sale?page=${currentPage}`);
};

export const createFeaturedProductsFilterData = (formData) => {
  return api.post("/home-filter", formData);
};

export const fetchTestimonialsData = () => {
  return api.get("/home-testimonial");
};

export const useFetchTestimonialsData = (queryCache) => {
  return useQuery("testimonialData", () => fetchTestimonialsData(), {
    cache: queryCache,
    keepPreviousData: true,
    staleTime: 3000000,
    cacheTime: 3000000,
  });
};

export const fetchHomeBlogsData = () => {
  return api.get("/home-blog");
};

export const useFetchHomeBlogsDataData = (queryCache) => {
  return useQuery("homeBlogData", () => fetchHomeBlogsData(), {
    cache: queryCache,
    keepPreviousData: true,
    staleTime: 3000000,
    cacheTime: 3000000,
  });
};

export const createJoinClubData = (formData) => {
  return api.post("/platinum-club", formData);
};

export const createSubscribeData = (formData) => {
  return api.post("/subscribers", formData);
};

export const createContactData = (formData) => {
  return api.post("/contact-us", formData);
};

// Faqs APIS

export const fetchFaqData = (currentPage) => {
  return api.get(`/faq-page?page=${currentPage}`);
};

export const useFetchFaqData = (queryCache) => {
  return useQuery("faqPageData", () => fetchFaqData(), {
    cache: queryCache,
    keepPreviousData: true,
    staleTime: 3000000,
    cacheTime: 3000000,
  });
};

export const fetchAboutFaqData = () => {
  return api.get("/about-faq");
};

export const useFetchAboutFaqData = (queryCache) => {
  return useQuery("aboutFaqData", () => fetchAboutFaqData(), {
    cache: queryCache,
    keepPreviousData: true,
    staleTime: 3000000,
    cacheTime: 3000000,
  });
};

export const fetchCorporateFaqData = () => {
  return api.get("/corporate");
};

export const useFetchCorporateFaqData = (queryCache) => {
  return useQuery("corporateFaqData", () => fetchCorporateFaqData(), {
    cache: queryCache,
    keepPreviousData: true,
    staleTime: 3000000,
    cacheTime: 3000000,
  });
};

export const createCorporateOrderFormData = (formData, header) => {
  return api.post("/product-quotation", formData, header);
};

// Blogs API

export const fetchBlogData = () => {
  return api.get("/blog-list");
};

export const fetchBlogDeatilsData = (id) => {
  return api.get(`/blog-detail/${id}`);
};

export const fetchBlogCategoryFilterData = (id) => {
  return api.get(`/blog-category-filter/${id}`);
};

export const createBlogCommentsData = (formData) => {
  return api.post("/comments", formData);
};

// News API

export const fetchNewsData = () => {
  return api.get("/news-list");
};

export const fetchNewsDeatilsData = (id) => {
  return api.get(`/news-detail/${id}`);
};

// Gifts API

export const fetchGiftTypesData = () => {
  return api.get("/front-gift-list");
};

export const fetchGiftProductsData = (catRoute) => {
  return api.get(`/gift-products/${catRoute}`);
};

export const createGiftProductFilterData = (formData) => {
  return api.post("/gift-product-filter", formData);
};

// Products API

export const fetchProductData = (catRoute, subCatRoute, currentPage) => {
  if (subCatRoute) {
    return api.get(
      `/product-list/${catRoute}/${subCatRoute}?page=${currentPage}`
    );
  } else if (catRoute === "premium") {
    return api.get(`/premium-products?page=${currentPage}`);
  } else if (catRoute === "promotion") {
    return api.get(`/promotion-product?page=${currentPage}`);
  } else {
    return api.get(`/product-list/${catRoute}?page=${currentPage}`);
  }
};
export const fetchProductLowToHighData = (formData) => {
  return api.get(`/low-to-high/${formData}`);
};
export const fetchProductHighToLowData = (formData) => {
  return api.get(`/high-to-low/${formData}`);
};
export const fetchProductCategoryProductList = (formData) => {
  return api.get(`/product-list-get/${formData}`);
};
export const fetchOriginSubCategoryData = (catRoute) => {
  return api.get(`/filter-list/${catRoute}`);
};

export const createProductFilterData = (formData) => {
  return api.post("/filter-product", formData);
};
export const createProductFilterTestData = (formData) => {
  return api.post("test-filter-product", formData);
};

export const createProductSearchData = (formData) => {
  return api.post("/product-search", formData);
};

export const fetchProductDetailData = (prodRoute) => {
  return api.get(`/product-detail/${prodRoute}`);
};

export const createProductReviewData = (formData) => {
  return api.post("/reviews", formData);
};
// our choices api
export const fetchOurChoicesProductData = (mainRoute, currentPage) => {
  return api.get(`/front-our-choices-list/${mainRoute}?page=${currentPage}`);
};
export const fetchOurChoiceFilter = () => {
  return api.get(`/choices-category-list`);
};
// user Registration
export const registerUserData = (formData) => {
  return api.post("/auth/register", formData);
};
// verity otp
export const verifyUserOtp = (formData) => {
  return api.post("/auth/email-verification", formData);
};
// user login
export const userLogin = (formData) => {
  return api.post("/auth/login", formData);
};
// user forgetpassword
export const forgetPassword = (formData) => {
  return api.post("/forget-password", formData);
};

// profile sections api
export const fetchUserData = (header) => {
  return api.get("/auth/me", header);
};

export const createUpdateProfileData = (formData, header) => {
  return api.post("/auth/update-profile", formData, header);
};

export const createChangePasswordData = (formData, header) => {
  return api.post("/auth/change-password", formData, header);
};

export const fetchAddressesData = (userId, header) => {
  return api.get(`/addresses/${userId}`, header);
};

export const createAddAddressData = (formData, header) => {
  return api.post("/addresses", formData, header);
};

export const setDefaultAddressData = (id, formData, header) => {
  return api.put(`/set-default/${id}`, formData, header);
};

export const fetchSingleAddressData = (id, header) => {
  return api.get(`/address-detail/${id}`, header);
};

export const deleteAddressData = (id, header) => {
  return api.delete(`/addresses/${id}`, header);
};

export const fetchOrdersData = (userId, header) => {
  return api.get(`/auth/orders/${userId}`, header);
};

export const fetchOrderDetailsData = (orderId, header) => {
  return api.get(`/auth/order-detail/${orderId}`, header);
};

export const fetchTrackOrderData = (orderNum, header) => {
  return api.get(`/auth/order-track/${orderNum}`, header);
};

// checkout API
export const createCheckoutData = (formData, header) => {
  return api.post("/auth/make-order", formData, header);
};
export const UpdateAddress = (formData, header) => {
  return api.post("/auth/update-addresses", formData, header);
};
export const fetchAddressDetails = (formData, header) => {
  return api.get(`/auth/view-addresses/${formData}`, header);
};
export const DeleteAddress = (formData, header) => {
  return api.delete(`/auth/delete-addressess/${formData}`, header);
};
export const uploadCheckId = (formData, header) => {
  return api.post("/auth/upload-eid", formData, header);
};
export const addUserAddress = (formData, header) => {
  return api.post("/auth/add-address", formData, header);
};
export const getUserAddresses = (useId, header) => {
  return api.get(`auth/user-addresses/${useId}`, header);
};
// Coupon API
export const createCouponData = (formData) => {
  return api.post("/check-available-coupon", formData);
};

export const fetchCouponsData = () => {
  return api.get("/coupons");
};

// cart update according to stock status
export const createStockData = (formData) => {
  return api.post("/check-stock", formData);
};

// wishlist API

export const createWishlistData = (formData, header) => {
  return api.post("/auth/wishlist", formData, header);
};

export const fetchWishlistData = (id, header) => {
  return api.get(`/auth/wishlist/${id}`, header);
};

export const deleteWishlistData = (id, header) => {
  return api.delete(`/auth/wishlist/${id}`, header);
};

export const clearWishlistData = (id, header) => {
  return api.delete(`/auth/remove-wishlist/${id}`, header);
};

// cart API

export const createCartData = (formData, header) => {
  return api.post("/auth/carts", formData, header);
};

export const updateCartData = (formData, header) => {
  return api.post("/auth/update-cart", formData, header);
};

export const fetchCartData = (id, header) => {
  return api.get(`/auth/carts/${id}`, header);
};

export const deleteCartData = (id, header) => {
  return api.delete(`/auth/remove-cart/${id}`, header);
};

// Add more API calls as needed
