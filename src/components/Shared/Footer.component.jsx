import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import visa from "../../assets/visa.png";
import oo from "../../assets/oo.png";
import Paypal from "../../assets/Paypal.png";
import tamara from "../../assets/tamara.png"
import tabby from "../../assets/tabby.png"
import x from "../../assets/x.png"
import { Link } from "react-router-dom";

function FooterComponent() {
    return (
        <div className="bg-slate-100 p-3">
            <div className="flex justify-between lg:hidden">
                <div className="m-4 ">
                    <h1 className="text-xl font-bold">Customer Care</h1>
                    <h3>FAQ</h3>
                    <h3>Contact us</h3>
                    <h3>My Account</h3>
                    <h3>Privacy Policy</h3>
                    <h3>Terms and Conditions</h3>
                    <h3>About us</h3>
                </div>
                <div className="m-4">
                    <h1 className="text-xl font-bold">Category</h1>
                    <h3>Sun Glasses</h3>
                    <h3>Frames</h3>
                    <h3>Color contact Lenses</h3>
                    <h3>Clear Contact Lenses</h3>
                </div>
            </div>
            <div className="w-[90%] h-[.5px] bg-slate-300 mx-auto my-2 "></div>
            <div className="text-center sm:text-left sm:flex justify-evenly border-b-2">
                <div className="flex flex-col  gap-10">
                    <h1 className="text-xl font-bold">Do You Need Help ?</h1>
                    <p>
                        Autoseligen syr. Nek diarask fröbomba. <br />
                        Nör antipol kynoda nynat. Pressa<br /> fåmoska.
                    </p>
                    <div className="flex gap-3 flex-row lg:flex-col">
                        <div className="flex items-center sm:gap-10 justify-center">
                            <MdOutlinePhoneInTalk className="text-3xl text-black" />
                            <div>
                                <h4>Monday-Friday: 08am-9pm</h4>
                                <h1 className="text-sm sm:text-2xl font-bold"> 0 800 300-353</h1>
                            </div>

                        </div>
                        <div className="flex items-center sm:gap-10 justify-center">
                            <IoMail className="text-3xl" />

                            <div>
                                <h4> Need help with your order?</h4>
                                <h1 className="text-sm sm:text-2xl font-bold"> info@example.com</h1>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="m-4 hidden lg:block">
                    <h1 className="text-xl font-bold">Customer Care</h1>
                    <h3>FAQ</h3>
                    <h3>Contact us</h3>
                    <h3>My Account</h3>
                    <h3>Privacy Policy</h3>
                    <h3>Terms and Conditions</h3>
                    <h3>About us</h3>
                </div>
                <div className="m-4 hidden lg:block">
                    <h1 className="text-xl font-bold">Category</h1>
                    <h3>Sun Glasses</h3>
                    <h3>Frames</h3>
                    <h3>Color contact Lenses</h3>
                    <h3>Clear Contact Lenses</h3>
                </div>
                <div className="hidden lg:block">
                    <h4>Follow us on social media:</h4>
                    <div className="flex gap-2 items-center">
                        <FaFacebookF className="text-blue-600 text-xl" /><img src={x} alt="x" />
                        <IoLogoInstagram className="text-red-600 text-xl" />
                        <FaLinkedinIn className="text-blue-600  text-xl" />

                    </div>
                </div>
            </div>
            <div className="block lg:hidden text-center">
                <h4>Follow us on social media:</h4>
                <div className="flex gap-2 items-center justify-center">
                    <FaFacebookF className="text-blue-600 text-xl" /><img src={x} alt="x" />
                    <IoLogoInstagram className="text-red-600 text-xl" />
                    <FaLinkedinIn className="text-blue-600  text-xl" />

                </div>
            </div>
            <div className="flex items-center justify-between flex-col sm:flex-row ">
                <div >
                    <div className="hidden sm:block">Copyright {new Date().getFullYear()} © Basari Opticals</div>

                    <div className="flex h-4 my-4">
                        <img src={visa} alt="visa" className="mx-2 h-4" />
                        <img src={oo} alt="oo" className="mx-2 h-4" />
                        <img src={Paypal} alt="paypal" className="mx-2 h-4" />
                        <img src={tamara} alt="tamara" className="mx-2 h-4" />
                        <img src={tabby} alt="tabby" className="mx-2 h-4" />

                    </div>

                </div>
                <div className="flex gap-3 text-blue-400 underline">
                    <Link to={"/Terms-And-Conditions"}>Terms and Conditions</Link>
                    <Link to={"/Privacy-Policy"}>Privacy Policy</Link>
                </div>
            </div>
            <div className="sm:hidden text-center">Copyright {new Date().getFullYear()} © Basari Opticals</div>
        </div>
    )
}

export default FooterComponent