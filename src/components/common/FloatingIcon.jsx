import React from "react";
import whatsappgif from "../../images/icons/whatsapp1.webp";

const FloatingIcon = () => {
  return (
    <div className="floating_icon_wrape">
      <a
        href={"https://wa.me/+971569812858"}
        className="contact-pannel-btn text-decoration-none"
        target={"_blank"}
        rel="noopener noreferrer"
      >
        <figure>
          <img src={whatsappgif} alt="whatsapp" />
        </figure>
      </a>
    </div>
  );
};

export default FloatingIcon;
