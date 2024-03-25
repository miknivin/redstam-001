import React, { useEffect } from "react";

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);
  return (
    <div>
      <div className="bg-gray-950 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
        <p className="mb-4">
          Welcome to redstam.com, where we strive to make your shopping
          experience smooth and convenient. Below is our detailed shipping
          policy to guide you through the process:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>
            <span className="font-semibold">Shipping Destinations:</span> We are
            pleased to offer shipping services to both domestic and
            international customers. Whether you're located locally or across
            the globe, we aim to deliver your orders with efficiency and care.
            At present, we have not imposed any restrictions on specific
            countries that we do not ship to, allowing us to serve a wide range
            of customers worldwide.
          </li>
          <li>
            <span className="font-semibold">Shipping Carriers:</span> To ensure
            reliable and timely delivery of your orders, we primarily rely on
            local postal services. These carriers are chosen for their extensive
            reach and ability to handle a diverse range of shipments. While we
            predominantly utilize local postal services, we reserve the right to
            select alternative carriers when necessary to optimize shipping
            efficiency and meet specific customer requirements.
          </li>
          <li>
            <span className="font-semibold">Shipping Rates:</span> Our goal is
            to provide cost-effective shipping options for our valued customers.
            Orders exceeding Rs500 qualify for complimentary shipping, allowing
            you to enjoy added savings on your purchases. For orders below
            Rs500, a nominal shipping fee of Rs40 will be applied to cover
            handling and delivery costs. We believe in transparent pricing and
            strive to offer competitive rates that reflect our commitment to
            affordability and value.
          </li>
          <li>
            <span className="font-semibold">Estimated Delivery Time:</span> We
            aim to deliver your orders within 0-7 days from the date of order
            placement. Please note that delivery times may vary based on factors
            such as product availability, shipping destination, and unforeseen
            circumstances beyond our control.
          </li>
          <li>
            <span className="font-semibold">Order Tracking:</span> Stay informed
            every step of the way with our comprehensive order tracking system.
            Once your order has been dispatched, you will receive a unique
            tracking number via email or SMS, allowing you to monitor the
            progress of your delivery in real-time.
          </li>
          <li>
            <span className="font-semibold">Return and Refund Policy:</span>{" "}
            Your satisfaction is our top priority. For detailed information on
            our return and refund procedures, please refer to our dedicated{" "}
            <a
              href="https://www.redstam.com/return_and_refund"
              className="text-blue-500 hover:underline"
            >
              Return and Refund Policy
            </a>
            .
          </li>
          <li>
            <span className="font-semibold">Lost or Damaged Shipments:</span> In
            the rare event of a lost or damaged shipment, we follow standard
            industry procedures to initiate replacement or refund processes.
            Please contact our customer support team for assistance in such
            cases.
          </li>
          <li>
            <span className="font-semibold">International Shipping:</span> While
            we currently focus on serving domestic customers, we may explore
            international shipping options in the future. Any updates or
            developments regarding international shipping will be communicated
            on our website and through our official channels.
          </li>
          <li>
            <span className="font-semibold">Restricted Items:</span> We do not
            sell or ship hazardous or restricted items that may pose risks to
            our customers or violate applicable laws. You can shop with
            confidence knowing that all our products adhere to strict quality
            and safety standards.
          </li>
          <li>
            <span className="font-semibold">Out-of-Stock Items:</span> In the
            event that an item is temporarily out of stock, it will be marked as
            unavailable for purchase on our website. We apologize for any
            inconvenience this may cause and appreciate your patience as we work
            to restock popular items.
          </li>
        </ul>
        <p>
          Thank you for choosing redstam.com for your shopping needs. If you
          have any further questions or require assistance, please don't
          hesitate to reach out to our dedicated customer support team. We are
          here to assist you and ensure your shopping experience with us exceeds
          your expectations.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
