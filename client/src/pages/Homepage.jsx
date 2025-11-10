import { useState, useRef } from "react";
import brand1 from "../logos/brand1.png";
import brand2 from "../logos/brand2.avif";
import brand3 from "../logos/brand3.png";
import heroImg from "../assets/expo 16x9.jpg";
import heroImgSm from "../assets/trade expo 393x852.jpg";
import { registerUser } from "../api/userApi";
import { toast } from "sonner";
import skybertech_logo from "../logos/skybertech_logo.png";
import xyvin_logo from "../logos/Xyvin_logo.png";
import footer_trade_expo from "../assets/footer_trade_expo_.png"


function Homepage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    place: "",
  });
  const formRef = useRef(null);

  // Scroll to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      console.log(res.data);
      toast.success("Registration successful!")
      setFormData({ name: "", phone: "", email: "", place: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error submitting form");
    }
  };

  const logos = [
    { name: "Co-Sponsor & Partner", img: brand1 },
    { name: "Digital Marketing Partner", img: brand2 },
    { name: "Venue Partner", img: brand3 },
  ];

  return (
    <div className="w-full h-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: `url(${window.innerWidth < 800 ? heroImgSm : heroImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: window.innerWidth < 800 ? "top center" : "center center",
          height: "100vh",
          width: "100%",
        }}
      >
        <div className="-mb-40 sm:-mt-14 md:-mt-90">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-lg cursor-default tracking-widest text-yellow-900 sm:text-white">
            KERALA'S
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold drop-shadow-lg cursor-default tracking-widest text-gray-800 sm:text-white">
            LARGEST
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-lg cursor-default tracking-widest text-lime-800 sm:text-white">
            TRADE EXPO
          </h1>

          <button
            onClick={scrollToForm}
            className="relative mt-3 px-10 py-3 font-extrabold text-black rounded-full overflow-hidden group cursor-pointer"
          >
            <span className="absolute inset-0 bg-linear-to-r from-yellow-300 to-green-400 rounded-full transition-transform duration-1500 ease-in-out group-hover:rotate-180"></span>
            <span className="relative z-10 transform scale-100 transition-all duration-1000 ease-in-out group-hover:scale-140 group-hover:tracking-wider">
              BOOK YOUR TICKET NOW
            </span>
          </button>
        </div>
      </section>

      {/* Booking Form Section — always visible */}
      <section ref={formRef}>
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 py-6 sm:py-16">
          <div className="text-center mb-0 sm:mb-10">
            <h2 className="text-2xl sm:text-7xl font-extrabold text-gray-800 mb-3 py-2 uppercase tracking-tight">
              Book Your Ticket Now
            </h2>
            <p className="text-gray-600 font-extralight mb-5 text-sm sm:text-base max-w-lg mx-auto">
              Fill in your details and secure your spot at Kerala’s Largest Trade Expo.
              Our team will get in touch with you soon.
            </p>
          </div>

          <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-10">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    Whatsapp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="youremail@example.com"
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    Place <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    placeholder="Your location"
                    required
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                  />
                </div>
              </div>

              {/* <div className="flex items-center space-x-3">
                <input type="checkbox" className="border border-gray-400" required />
                <label className="text-sm text-gray-600">
                  I confirm I’m 18 years of age or older
                </label>
              </div> */}

              <div className="pt-6 text-center">
                <button
                  type="submit"
                  className="relative inline-block px-10 py-3 cursor-pointer rounded-full overflow-hidden group focus:outline-none"
                >

                  <span className="absolute inset-0 rounded-full bg-linear-to-r from-yellow-300 to-green-400 transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0" />


                  <span className="absolute inset-0 rounded-full bg-linear-to-r from-green-400 to-yellow-300 transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100" />


                  <span className="relative z-10 text-black font-semibold text-sm">
                    Register
                  </span>
                </button>
              </div>

              <p className="text-xs text-center text-gray-500 mt-4">
                * Required fields. We respect your privacy and never share your information.
              </p>
            </form>
          </div>
        </div>
      </section>


      {/* About Section */}
      {/* <section className="bg-white py-24 sm:py-36 px-4 sm:px-8 md:px-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          About
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">
          Our event management platform brings your ideas to life with
          precision, creativity, and care. Whether it's a corporate gathering,
          concert, or private celebration, we craft experiences that leave a
          lasting impression.
        </p>
      </section> */}

      {/* Stats Section */}
      <section
        className="relative text-white py-16 sm:py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://wallpapercat.com/w/full/d/3/1/1419131-3840x2160-desktop-4k-new-york-at-night-background-image.jpg')",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            { value: "6000+", label: "Visitors" },
            { value: "200+", label: "B2B Stalls" },
            { value: "100000 Sq. Ft.", label: "Programme Hall" },
            { value: "50", label: "Expert Speakers" },
          ].map((item, index) => (
            <div key={index}>
              <h3 className="text-3xl sm:text-4xl font-bold text-orange-500">
                {item.value}
              </h3>
              <p className="uppercase text-xs sm:text-sm tracking-wider text-gray-200">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-screen bg-white flex flex-col items-center text-center">
        {/* Top content */}
        <div className="flex flex-col justify-center items-center grow w-full">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-3 uppercase tracking-tight">
            Featured Brands
          </h2>
          <p className="text-gray-600 mb-8 sm:mb-16 text-base sm:text-lg max-w-2xl">
            Discover the leading brands and partners joining our event
          </p>

          {/* Logos + Names */}
          <div className="flex flex-wrap justify-center items-start gap-y-6 gap-x-10 sm:gap-y-10 sm:gap-x-20 max-w-6xl">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start w-28 sm:w-56"
              >

                <div className="flex flex-col items-center justify-end h-24 sm:h-36">
                  <img
                    src={logo.img}
                    alt={logo.name}
                    className="h-16 sm:h-24 object-contain grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500 ease-in-out"
                  />
                </div>
                <h3 className="mt-3 text-sm sm:text-lg font-medium text-gray-700 text-center leading-tight h-10 flex items-start">
                  {logo.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <footer>
          <div className="w-full mt-16">
            <img
              src={footer_trade_expo}
              alt="Footer Banner"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="w-full my-3 sm:my-0">
            <div className="flex sm:flex-row items-center justify-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-lg font-medium">
              <span>Technology Partner</span>
              <a
                href="https://skybertech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <img
                  src={skybertech_logo}
                  alt="SkyberTech"
                  className="h-4 sm:h-6 object-contain hover:opacity-80 transition-opacity duration-300"
                />
              </a>

              <span>in association with</span>

              {/* Xyvin Logo */}
              <a
                href="https://www.xyvin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <img
                  src={xyvin_logo}
                  alt="Xyvin"
                  className="h-4 sm:h-6 object-contain hover:opacity-80 transition-opacity duration-300"
                />
              </a>
            </div>
          </div>
        </footer>

      </section>
    </div>
  );
}

export default Homepage;