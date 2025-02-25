import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="px-10 pt-8 pb-8 text-gray-800 max-w-auto mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="mb-4">
        At <span className="font-semibold">Eyestore</span>, we prioritize the protection of your privacy and maintain a robust security policy. When you entrust us with your information as a customer, you can be confident that your personal details are held securely. We have a stringent policy against leasing or selling any data collected from our website to third-party entities. Nevertheless, to ensure the seamless processing of your orders, we may share your information with other organizations either owned by or in partnership with Eyestore, specifically for order fulfillment purposes.
      </p>

      <p className="mb-4">
        We highly value staying connected with our esteemed customers through our newsletters. You can anticipate receiving emails from us several times a month, featuring topics such as limited-time offers, new arrivals, and updates related to your account. However, you always retain the option to unsubscribe from our email communications. If you share our commitment to preserving the well-being of your eyes, we extend an invitation to subscribe to our newsletter.
      </p>

      <h2 className="text-2xl font-semibold mb-4">How We Handle Your Information</h2>
      <p className="mb-4">
        When you make a purchase from our store, as part of the buying and selling process, we collect the personal information you provide, such as your name, address, and email address. If applicable, we may also use your permission to send you emails concerning our store, new products, and other updates.
      </p>

      <p className="mb-4">
        Please note that any purchase, dispute, or claim related to this website will be subject to the laws of the <span className="font-semibold">United Arab Emirates (UAE)</span>. Users of this website who are minors or under the age of 18 are not permitted to register or engage in transactions on the website (in accordance with the applicable legal age of consent).
      </p>

      <h2 className="text-2xl font-semibold mb-4">Method of Payment</h2>
      <p className="mb-4">
        We accept online payments using <span className="font-semibold">Visa, MasterCard credit/debit cards, and PayPal</span>, exclusively in AED and USD. Additionally, we offer Cash on Delivery within the United Arab Emirates region.
      </p>

      <p className="mb-4">
        Please rest assured that all credit/debit card details and personally identifiable information are never stored, sold, shared, rented, or leased to any third parties.
      </p>

      <p className="mb-4">
        Our Website Policies and Terms & Conditions may undergo occasional changes or updates to meet evolving requirements and standards. Therefore, we encourage our customers to regularly visit these sections to stay informed about any alterations to the website's policies. Any modifications will take effect on the day they are posted.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Third-Party Disclosure Links</h2>
      <p className="mb-4">
        The{" "}
        <a
          href="https://eyestore.ae/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://eyestore.ae/
        </a>{" "}
        is not responsible for the privacy policies of websites to which it links. If you provide any information to such third parties, different rules regarding the collection and use of your personal information may apply. You should contact these entities directly if you have any questions about their use of the information that they collect.
      </p>

      <p className="text-gray-600 text-sm">
        This Privacy Policy is effective as of <span className="font-semibold">January 20, 2025</span>.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
