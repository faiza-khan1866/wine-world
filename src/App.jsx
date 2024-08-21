import React, { Suspense, lazy, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import ApCss from "./App.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import Loader from "./components/Loader/Loader";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import FloatingIcon from "./components/common/FloatingIcon.jsx";
import Home from "./pages/Home.jsx";

// const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Shop = lazy(() => import("./pages/Shop"));
const OurChoice = lazy(() => import("./pages/OurChoice.jsx"));
const ProductsDetails = lazy(() => import("./pages/ProductsDetails"));
const Corporate = lazy(() => import("./pages/Corporate"));
// const Gifts = lazy(() => import("./pages/Gifts"));
// const GiftsProducts = lazy(() => import("./pages/GiftsProducts"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogInner = lazy(() => import("./pages/BlogInner"));
const News = lazy(() => import("./pages/News"));
const NewsInner = lazy(() => import("./pages/NewsInner"));
const Faq = lazy(() => import("./pages/Faq"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const ReturnRefund = lazy(() => import("./pages/ReturnRefund"));
const ShippingDelivery = lazy(() => import("./pages/ShippingDelivery"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Account = lazy(() => import("./pages/Account"));
const Profile = lazy(() => import("./pages/Profile"));
const Orders = lazy(() => import("./pages/Orders"));
const AgePopUp = lazy(() => import("./components/common/AgePopUp"));
const Register = lazy(() => import("./components/profile/Register"));
const ForgetPassword = lazy(() =>
  import("./components/profile/ForgetPassword")
);
const VerifyAccount = lazy(() => import("./components/profile/VerifyAccount"));
// const Error = lazy(() => import("./pages/Error"));

const App = () => {
  const [isView, setIsView] = React.useState(false);
  const isUserLogIn = useSelector((state) => state.user.isUser);
  const user_type = useSelector((state) => state.user.User_Data.user_type);
  const forgetPasswordPopUpShow = useSelector(
    (state) => state?.user?.forgetPasswordPopUpShow
  );
  const registerPopUpShow = useSelector(
    (state) => state?.user?.registerPopUpShow
  );
  const verifyAccountPopUpShow = useSelector(
    (state) => state?.user?.verifyAccountPopUpShow
  );
  const queryClient = new QueryClient();

  useEffect(() => {
    setTimeout(() => {
      setIsView(true);
    }, 18000);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={""}>
          <Router>
            {isView ? (
              <>
                <AgePopUp key={"39x323"} />
              </>
            ) : null}
            {forgetPasswordPopUpShow && <ForgetPassword key={"39x332"} />}
            {registerPopUpShow && <Register key={"3931wx3"} />}
            {verifyAccountPopUpShow && <VerifyAccount key={"c2139x3"} />}
          </Router>
        </Suspense>
        {/* // */}

        {/*//  */}
        <Suspense fallback={<Loader />}>
          <Router>
            <Header key={"39x3"} />
            <ToastContainer
              // position="top-left"
              closeOnClick={true}
              hideProgressBar={true}
              pauseOnHover={false}
            />

            <Routes>
              <Route exact="true" path="/" element={<Home />} />
              <Route exact="true" path="/about" element={<About />} />
              <Route exact="true" path="/shop/:cat" element={<Shop />} />
              <Route
                exact="true"
                path="/shop/:cat/:subcat"
                element={<Shop />}
              />
              <Route
                exact="true"
                path="/our-choice/:choice"
                element={<OurChoice />}
              />
              <Route
                exact="true"
                path="/product/:id"
                element={<ProductsDetails />}
              />
              {/* <Route
                exact="true"
                path="/product/:cat/:id"
                element={<ProductsDetails />}
              /> */}
              <Route exact="true" path="/corporate" element={<Corporate />} />
              {/* <Route exact="true" path="/gift" element={<Gifts />} /> */}
              {/* <Route exact="true" path="/gift/:cat" element={<GiftsProducts />} /> */}
              <Route exact="true" path="/blog" element={<Blog />} />
              <Route exact="true" path="/blog/:cat" element={<Blog />} />
              <Route
                exact="true"
                path="/blog/:cat/:id"
                element={<BlogInner />}
              />
              <Route exact="true" path="/news" element={<News />} />
              <Route exact="true" path="/news/:id" element={<NewsInner />} />
              <Route exact="true" path="/faq" element={<Faq />} />
              <Route exact="true" path="/contact" element={<Contact />} />
              <Route
                exact="true"
                path="/privacy-policy"
                element={<PrivacyPolicy />}
              />
              <Route
                exact="true"
                path="/terms-conditions"
                element={<TermsConditions />}
              />
              <Route
                exact="true"
                path="/return-refund"
                element={<ReturnRefund />}
              />
              <Route
                exact="true"
                path="/shipping-delivery"
                element={<ShippingDelivery />}
              />
              {user_type !== "corporate" && (
                <>
                  <Route exact="true" path="/cart" element={<Cart />} />
                  <Route exact="true" path="/wishlist" element={<Wishlist />} />
                  <Route exact="true" path="/checkout" element={<Checkout />} />
                </>
              )}

              {isUserLogIn && (
                <>
                  <Route exact="true" path="/account" element={<Account />} />
                  <Route
                    exact="true"
                    path="/account/profile"
                    element={<Profile />}
                  />
                  {user_type !== "corporate" && (
                    <Route
                      exact="true"
                      path="/account/orders"
                      element={<Orders />}
                    />
                  )}
                </>
              )}
              {/* <Route path="*" element={<Error />} /> */}
            </Routes>
            <FloatingIcon key={"391x3c2s"} />
            <Footer key={"3222s9x3"} />
          </Router>
        </Suspense>
      </QueryClientProvider>
    </>
  );
};

export default App;
