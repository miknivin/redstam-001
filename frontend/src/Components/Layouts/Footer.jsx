import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="!bg-slate-950">
      <footer className="footer p-10 max-w-screen-xl mx-auto text-gray-200 font-calibri">
        <aside>
          <img
            width={150}
            className=" -ms-2"
            src="https://ik.imagekit.io/c1jhxlxiy/REDSTAM%20LOGO.png?updatedAt=1712393715806"
            alt="footer logo"
          />
          <div className="flex gap-4 flex-wrap -ml-3 mt-3">
            <a
              href="https://x.com/REDSTAM_?t=WmXOGmMRdnvdm54rTVjbng&s=08"
              target="blank"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61558302530575&mibextid=ZbWKwL"
              target="blank"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/redstam_?igsh=aDdlMHQwbWE2Y29p"
              target="blank"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
          {/* <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p> */}
        </aside>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/about" className="link link-hover">
            About
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/terms_and_conditions" className="link link-hover">
            Terms of use
          </Link>
          <Link to="/privacy_policy" className="link link-hover">
            Privacy policy
          </Link>
          <Link to="/return_and_refund" className="link link-hover">
            Return & Refund policy
          </Link>
          <Link to="/shipping_and_delivery" className="link link-hover">
            Shipping & Delivery
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Contact</h6>
          <a href="tel:07902 922 229" className="link link-hover">
            <span>
              <i className="fa-solid fa-phone me-1"></i>07902 922 229
            </span>
          </a>
          <a href="mailto:info@redstam.com" className="link link-hover">
            <span>
              <i className="fa-solid fa-envelope me-1"></i>info@redstam.com
            </span>
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
