import { Phone, Mail } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import visa from "../../assets/visa.png";
import oo from "../../assets/oo.png";
import Paypal from "../../assets/Paypal.png";
import tamara from "../../assets/tamara.png";
import tabby from "../../assets/tabby.png";
import x from "../../assets/x.png";
import { Link } from "react-router-dom";
import { Instagram, LinkedCamera, Twitter } from "@mui/icons-material";

const navigationSections = {
  customerCare: {
    title: "Customer Care",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact us" },
      { href: "/account", label: "My Account" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms and Conditions" },
      { href: "/return-policy", label: "Return & Refund Policy" },
    ],
  },
  category: {
    title: "Category",
    links: [
      { href: "/sunglasses", label: "Sun Glasses" },
      { href: "/frames", label: "Frames" },
      { href: "/color-contacts", label: "Color contact Lenses" },
      { href: "/clear-contacts", label: "Clear Contact Lenses" },
    ],
  },
};

const socialIcons = {
  facebook: <FaFacebookF />,
  twitter: <Twitter />,
  instagram: <Instagram />,
  linkedin: <FaLinkedinIn />,
};

const ContactInfo = () => (
  <div className="space-y-4 border-1 ">
    <h3 className="font-semibold text-lg text-gray-900">Do You Need Help?</h3>
    <p className="text-sm text-gray-600">
      ﻣﺪﻳﻨﺔ اﻟﺸﺎرﻗﺔ ﻟﻺﻋﻼم – اﻟﺸﺎرﻗﺔ – إ ع م Eye Store LLC , Sharjah Media City
    </p>
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Phone className="h-5 w-5 text-gray-600" />
        <div>
          <p className="text-sm text-gray-600">
            Monday-Friday: 9.00 AM - 5.00 PM
          </p>
          <p className="font-semibold text-gray-900">+971 528405129</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <Mail className="h-5 w-5 text-gray-600" />
        <div>
          <p className="text-sm text-gray-600">Need help with your order?</p>
          <p className="font-semibold text-gray-900 whitespace-nowrap">
            support@eyestore.ae
          </p>
        </div>
      </div>
    </div>
  </div>
);

const NavigationLinks = ({ section }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg text-gray-900">{section.title}</h3>
    <ul className="space-y-2">
      {section.links.map((link) => (
        <li key={link.href}>
          <Link
            to={link.href}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLinks = () => (
  <div className="flex gap-4 items-center flex-wrap">
    <Link
      to="https://facebook.com"
      className="text-blue-600 hover:text-blue-700"
    >
      {socialIcons.facebook}
    </Link>
    <Link
      to="https://twitter.com"
      className="text-gray-600 hover:text-gray-900"
    >
      {socialIcons.twitter}
    </Link>
    <Link
      to="https://instagram.com"
      className="text-pink-600 hover:text-pink-700"
    >
      {socialIcons.instagram}
    </Link>
    <Link
      to="https://linkedin.com"
      className="text-blue-700 hover:text-blue-800"
    >
      {socialIcons.linkedin}
    </Link>
  </div>
);

const PaymentMethods = () => (
  <div className="flex items-center gap-2 flex-wrap">
    <img src={visa} alt="Visa" className="h-4 w-auto" />
    <img src={oo} alt="Mastercard" className="h-4 w-auto" />
    <img src={Paypal} alt="PayPal" className="h-4 w-auto" />
    <img src={tamara} alt="tamara" className="h-4 w-auto" />
    <img src={tabby} alt="tabby" className="h-4 w-auto" />
  </div>
);

// Main Footer Component
const FooterComponent = () => {
  return (
    <footer className="bg-[#F3F4F6] p-5">
      {/* Desktop Footer */}
      <div className="hidden md:block max-w-7xl mx-auto py-12 px-4  border-t border-gray-300 border-b ">
        <div className="grid grid-cols-4 gap-8">
          <ContactInfo />
          <NavigationLinks section={navigationSections.customerCare} />
          <NavigationLinks section={navigationSections.category} />
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">
              Follow us on social media:
            </h3>
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden px-4 py-8">
        <div className="space-y-8">
          <div className="flex gap-9 ">
            <NavigationLinks section={navigationSections.customerCare} />
            <NavigationLinks section={navigationSections.category} />
          </div>
          <div className="border-t  border-gray-300  p-2">
            <ContactInfo />
          </div>
          <div className="space-y-4 border-b  border-gray-300  p-3">
            <p className="text-sm font-semibold text-gray-900">
              Follow us on social media:
            </p>
            <SocialLinks />
          </div>
        </div>
      </div>

      <div className="">
        <div className=" mx-auto w-full h-[180px] md:h-[90px] p-4">
          <div className="flex flex-col md:flex-row gap-4 md:justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-600">
                Copyright 2024 © basari opticals
              </p>
              <PaymentMethods />
            </div>
            <div className="flex gap-4 text-sm">
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                Terms and Conditions
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
