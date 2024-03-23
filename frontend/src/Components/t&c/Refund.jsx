import React, { useEffect } from "react";

const Refund = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);
  return (
    <div>
      <div className="container mx-auto px-4 py-8 bg-gray-950 p-8">
        <h1 className="text-3xl font-bold mb-6">Return and Refund Policy</h1>
        <div className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-4">
            1. Eligibility for Returns:
          </h2>
          <p className="mb-4">
            - We accept returns for physical goods purchased directly from
            Genfor Global Private Limited within 30 days of the original
            purchase date.
          </p>
          <p className="mb-8">
            - Products must be unused, in their original packaging, and in the
            same condition as when you received them.
          </p>
          <h2 className="text-xl font-bold mb-4">2. Process for Returns:</h2>
          <p className="mb-8">
            - To initiate a return, please contact our customer service team at{" "}
            <a href="mailto:info@redstam.com" className="text-blue-400">
              info@redstam.com
            </a>
            .
          </p>
          <h2 className="text-xl font-bold mb-4">3. Refunds:</h2>
          <p className="mb-4">
            - Refunds will be issued to the original payment method used for the
            purchase.
          </p>
          <p className="mb-8">
            - Please allow 7 business days for the refund to appear in your
            account, depending on your financial institution.
          </p>
          <h2 className="text-xl font-bold mb-4">4. Exclusions:</h2>
          <p className="mb-4">
            - We do not accept returns for products that have been used or
            damaged after receipt.
          </p>
          <p className="mb-8">
            - Prescription healthcare products are non-returnable for safety and
            regulatory reasons.
          </p>
          <h2 className="text-xl font-bold mb-4">5. Time Limits:</h2>
          <p className="mb-8">
            - Returns must be initiated within 30 days of the original purchase
            date. Returns received after this period may not be accepted.
          </p>
          <h2 className="text-xl font-bold mb-4">6. Proof of Purchase:</h2>
          <p className="mb-8">
            - A copy of the order invoice or confirmation email must accompany
            all returns.
          </p>
          <h2 className="text-xl font-bold mb-4">7. Change of Mind:</h2>
          <p className="mb-4">
            - If you've had a change of mind about a purchase, you may return
            the product within 30 days for a refund, provided it meets the
            eligibility criteria outlined above.
          </p>
          <p>
            - Please note that return shipping costs will be the responsibility
            of the customer.
          </p>
        </div>
        <p className="text-sm text-gray-400">
          If you have any questions or concerns about our return and refund
          policy, please don't hesitate to contact us at{" "}
          <a href="mailto:info@redstam.com" className="text-blue-400">
            info@redstam.com
          </a>
          . Our customer service team is here to assist you.
        </p>
      </div>
    </div>
  );
};

export default Refund;
