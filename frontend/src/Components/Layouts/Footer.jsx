import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="footer p-10 max-w-screen-xl mx-auto text-gray-200">
        <aside>
          <img
            width={150}
            className=" -ms-2"
            src="https://ik.imagekit.io/c1jhxlxiy/REDSTAM.webp?updatedAt=1710827797429"
            alt=""
          />
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
          <a href="tel:8075 666 099" className="link link-hover">
            <span>
              <i className="fa-solid fa-phone me-1"></i>+91 8075 666 099
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
