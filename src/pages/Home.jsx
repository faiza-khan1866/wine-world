import React, { useEffect, memo, useState } from "react";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import useWishlist from "../Hooks/useWishlist";
import { useInView } from "react-intersection-observer";
import "aos/dist/aos.css";
import SimpleLoader from "../components/Loader/SimpleLoader";
const HomeBanner = lazy(() => import("../components/Home/HomeBanner"));
const OfferHome = lazy(() => import("../components/Home/OfferHome"));
const BestsellingHome = lazy(() =>
  import("../components/Home/BestsellingHome")
);
const FeaturedProdcuts = lazy(() =>
  import("../components/Home/FeaturedProdcuts")
);
const DownloadApp = lazy(() => import("../components/Home/DownloadApp"));
const PlatniumMembrForm = lazy(() =>
  import("../components/Home/PlatniumMembrForm")
);

const Home = () => {
  const [refetchWishlist, setrefetchWishlist] = useState(null);

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });
  const { getWishlistItems, GetWishlistData } = useWishlist();

  let wishLIstData = GetWishlistData();

  useEffect(() => {
    // getWishlistItems();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Best Online Liquor Store in Abu Dhabi | Royal Spirit</title>
        <meta
          name="description"
          content="Discover Abu Dhabi's top online liquor shop. From timeless classics to rare finds, Royal Spirit offers the best in beer, spirit and wine selections. Shop now!"
        />
        <link rel="canonical" href="https://royalspirit.ae/" />
      </Helmet>
      <HomeBanner />
      <section className="total-body d-block offerHOme">
        <OfferHome />
      </section>
      <section
        className="total-body d-block"
        ref={ref}
        style={{ minHeight: "240px" }}
      >
        {inView ? (
          <>
            <Suspense fallback={<SimpleLoader />}>
              <FeaturedProdcuts
                wishlistItems={wishLIstData}
                key="FeaturedPds-32"
                setrefetchWishlist={setrefetchWishlist}
              />
              <BestsellingHome
                wishlistItems={wishLIstData}
                key="beslitl-322"
                setrefetchWishlist={setrefetchWishlist}
              />
              <PlatniumMembrForm />
              <DownloadApp />
            </Suspense>
          </>
        ) : null}
      </section>
    </>
  );
};

export default memo(Home);
