import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import SubpageBanner from "../components/common/SubpageBanner";
import bannerImg from "../images/banners/subpage-banner.jpg";

export default function Error() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Error | Royal Spirit</title>
        <meta name="description" content="Error" />
      </Helmet>
      <SubpageBanner
        name="Error"
        indexpage="Home"
        indexvisit="/"
        activepage="Error"
        bgImg={bannerImg}
      />
      <div className="error-wrapper py-5">
        <div className="txt-wrapper">
          <p className="status-code py-2">404</p>
          <p className="subtext py-2">Oops, something went wrong!</p>
          <p className="description py-2">
            The page you are looking for was moved, removed, renamed or might
            never have existed.
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </div>
    </>
  );
}
