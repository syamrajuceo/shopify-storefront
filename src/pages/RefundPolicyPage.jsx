import React, { useEffect } from "react";
import ScrollToTop from "../utils/ScrollToTop";


export const RefundPolicyPage = () => {
  // useEffect(() => {
  //   ScrollToTop();
  // }, []);
  
  
  return (
    <div className="px-[60px] pt-[30px] pb-[30px] text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Return & Refund Policy</h1>

      <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
      <p className="mb-4">
        We want you to be happy with our product, and if anything is less than
        perfect, we are happy to exchange your product completely. You are
        requested to meet with the following conditions:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          You can raise a request within 48 hours of the receipt of the product.
        </li>
        <li>
          You need to mention your order number, the date of order, and your
          date of receipt.
        </li>
        <li>
          The price tag and any other identification tag, the invoice, and the
          original packing must be intact and sent back.
        </li>
        <li>The product should be in the same condition as received.</li>
        <li>
          Ensure that the return package is appropriately sealed and sent to the
          company as any damage in transit will be your responsibility, and this
          policy will cease to be applicable.
        </li>
      </ul>
      <p className="mb-4">
        We will collect back from your location up until 48 hours post receiving
        the exchange request. You could exchange the purchased product for a
        different product of the same value or a higher value. No difference
        will be paid in case the exchange is made for a product of a lower
        value.
      </p>

      <h2 className="text-2xl font-semibold mb-4">How do I exchange them?</h2>
      <p className="mb-4">
        It's really simple. If you want to exchange the product, please reach
        out to us at{" "}
        <a href="mailto:support@eyestore.ae" className="text-blue-600">
          support@eyestore.ae
        </a>{" "}
        and tell us the product that you want in return. We will deliver it to
        your address and pick up the original product from your house.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        How long will the exchange process take?
      </h2>
      <p className="mb-4">
        Exchange orders are typically processed within 10 to 15 working days
        after your request is received.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Refund</h2>
      <p className="mb-4">
        If you are looking for a refund, the same is allowed within 48 hours of
        your purchase. You could either get a refund of cash or exchange it for
        a voucher on our website with one-year validity. Refunds will be made
        onto the original mode of payment and will be processed within 10 to 45
        days depending on the bank.
      </p>

      <h3 className="text-xl font-semibold mb-3">Conditions for Refund:</h3>
      <ul className="list-disc list-inside mb-4">
        <li>The wrong product was sent by the merchant.</li>
        <li>The product is defective.</li>
        <li>The product was damaged in shipping.</li>
        <li>The product is tampered.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        How do I raise a request for a refund?
      </h2>
      <p className="mb-4">
        Just reach out to us at{" "}
        <a href="mailto:support@eyestore.ae" className="text-blue-600">
          support@eyestore.ae
        </a>
        . Once you have submitted the refund request, we will respond within 24
        hours, and the amount will be credited back within 2-3 working days. The
        option will be communicated either via email or through the contact
        number you have provided. The company is not responsible for incorrect
        or misleading contact details.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Other Information</h2>
      <p className="mb-4">
        The refund process will be initiated only after we have received the
        product in the mentioned condition.
      </p>
      <p className="mb-4">
        If you need help, you can first make a time request. Exchanges are
        available in-store and on the website.
      </p>
      <p className="mb-4">
        For COD customers, refunds will be processed through the bank only.
      </p>
      <p className="mb-4">
        This policy is only for customers in the United Arab Emirates, and we
        won't be able to provide exchanges or refunds to our international
        customers due to prohibitive shipping costs.
      </p>
    </div>
  );
};
