import { useState, useRef } from "react";
import brand1 from "../logos/brand1.png"
import brand2 from "../logos/brand2.avif"
import brand3 from "../logos/brand3.png"
import axios from "axios";


function Homepage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    place: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const toggleForm = () => {
    setShowForm((prev) => {
      const newValue = !prev;
      if (!prev) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
      return newValue;
    });
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
      const res = await axios.post("http://localhost:8080/api/users/register", formData);
      console.log(res.data);
      setSubmitted(true);
      alert("Registration successful!");
      setFormData({ name: "", phone: "", email: "", place: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error submitting form");
    }
  };


  const logos = [
    {
      name: "Co-Sponsor & Partner",
      img: brand1,
    },
    {
      name: "Digital Marketing Partner",
      img: brand2,
    },
    {
      name: "Venue Partner",
      img: brand3,
    },
  ];

  return (
    <div className="w-full h-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://www.dazed.me/wp-content/uploads/sites/6/2025/04/Copy-of-RJ-17-scaled.webp')",
        }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold drop-shadow-lg tracking-widest">
          KERALA'S
        </h1>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold drop-shadow-lg tracking-widest">
          LARGEST
        </h1>
        <h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold drop-shadow-lg tracking-widest">
          TRADE EXPO
        </h1>
        {/* <p className="mt-4 text-base sm:text-lg md:text-xl max-w-xl drop-shadow-md">
          BOOK YOUR STALL NOW
        </p> */}

        <button
          onClick={toggleForm}
          className="relative mt-3 px-10 py-3 font-extrabold text-black rounded-full overflow-hidden group"
        >
          <span className="absolute inset-0 bg-linear-to-r from-yellow-300 to-green-400 rounded-full transition-transform duration-1500 ease-in-out group-hover:rotate-180"></span>
          <span className="relative z-10 transform scale-100 transition-all duration-1000 ease-in-out group-hover:scale-140 group-hover:tracking-wider">
            BOOK YOUR STALL NOW
          </span>
        </button>
      </section>

      {/* Booking Form Section */}
      <section>
        <div
          ref={formRef}
          className={`transition-all duration-700 ease-in-out overflow-hidden ${showForm ? "max-h-[2000px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
            }`}
        >
          <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 py-16">

            {/* Heading outside the box */}
            <div className="text-center mb-10">
              <h2 className="text-7xl font-extrabold text-gray-800 mb-3 py-2 uppercase tracking-tight">
                Book Your Stall
              </h2>
              <p className="text-gray-600 font-extralight mb-5 text-sm sm:text-base max-w-lg mx-auto">
                Fill in your details and secure your spot at Kerala’s Largest Trade Expo.
                Our team will get in touch with you soon.
              </p>
            </div>

            {/* Form Box */}
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-10">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Full Name & Whatsapp */}
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

                {/* Email & Place */}
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
                      className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 
                    focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300  outline-none"
                    />
                  </div>
                </div>

                {/* Age Confirmation */}
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="border border-gray-400" required />
                  <label className="text-sm text-gray-600">
                    I confirm I’m 18 years of age or older
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-6 text-center">
                  <button
                    type="submit"
                    className="bg-linear-to-r from-indigo-500 to-blue-500 text-white text-sm font-semibold px-10 py-3 rounded-full shadow-lg hover:opacity-90 transition duration-200"
                  >
                    Register
                  </button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  * Required fields. We respect your privacy and never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section className="bg-white py-24 sm:py-36 px-4 sm:px-8 md:px-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          About
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base sm:text-lg">
          Our event management platform brings your ideas to life with
          precision, creativity, and care. Whether it's a corporate gathering,
          concert, or private celebration, we craft experiences that leave a
          lasting impression.
        </p>
      </section>

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

      {/* Featured Brands Section */}
      <section className="min-h-screen bg-white flex flex-col justify-center items-center text-center px-4 sm:px-6">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 uppercase tracking-tight">
          Featured Brands
        </h2>
        <p className="text-gray-600 mb-12 sm:mb-16 text-base sm:text-lg max-w-2xl">
          Discover the leading brands and partners joining our event
        </p>

        {/* Logos + Names */}
        <div className="flex flex-wrap justify-center items-end gap-12 sm:gap-32 max-w-6xl">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-end w-28 sm:w-72"
            >
              <div className="flex items-end justify-center h-36 sm:h-44">
                <img
                  src={logo.img}
                  alt={logo.name}
                  className="w-full h-auto object-contain grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500 ease-in-out"
                />
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-700 text-center">
                {logo.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Homepage;