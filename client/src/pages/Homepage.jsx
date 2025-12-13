import { useState, useRef } from "react";
import brand1 from "../logos/brand1.png";
import brand2 from "../logos/brand2.avif";
import brand3 from "../logos/brand3.png";
import heroImg from "../assets/registration pc.jpg";
import heroImgSm from "../assets/registration.jpg";
import { registerStall, registerUser } from "../api/userApi";
import { toast } from "sonner";
import skybertech_logo from "../logos/skybertech_logo.png";
import xyvin_logo from "../logos/Xyvin_logo.png";
import footer_trade_expo from "../assets/footer_trade_expo_.png"
import ImageCropper from "../components/ImageCropper";


function Homepage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    place: "",
    cName: "",
    cType: "",
  });

  const [stallData, setStallData] = useState({
    name: "",
    companyName: "",
    position: "",
    phone: "",
    email: "",
    place: "",
  });

  const formRef = useRef(null);
  const photoRef = useRef(null);
  const [activeForm, setActiveForm] = useState("event");
  const [showCropper, setShowCropper] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorsStall, setErrorsStall] = useState({});

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  //validations of event form
  const validateEventForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Enter 10 digit number";

    // if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   newErrors.email = "Enter a valid email";
    // }

    if (!formData.place.trim()) newErrors.place = "Place is required";
    if (!formData.photo) newErrors.photo = "Upload a photo";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  //validation of stall form
  const validateStallForm = () => {
    let newErrors = {};

    if (!stallData.name.trim()) newErrors.name = "Full Name is required";
    if (!stallData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!stallData.position.trim()) newErrors.position = "Position is required";

    if (!stallData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(stallData.phone)) {
      newErrors.phone = "Enter 10 digit number";
    }

    if (stallData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stallData.email))
      newErrors.email = "Enter valid email";

    if (!stallData.place.trim()) newErrors.place = "Place is required";

    setErrorsStall(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field while typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStallChange = (e) => {
    const { name, value } = e.target;
    setStallData((prev) => ({ ...prev, [name]: value }));
    // clear error instantly on typing
    setErrorsStall((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEventForm()) return;
    try {
      const fd = new FormData();

      // Append all text fields
      fd.append("name", formData.name);
      fd.append("phone", formData.phone);
      // fd.append("email", formData.email);
      fd.append("place", formData.place);
      // fd.append("cName", formData.cName);
      // fd.append("cType", formData.cType);

      // Append photo file
      if (formData.photo) {
        fd.append("photo", formData.photo);
      }

      const res = await registerUser(fd); // send FormData
      console.log(res.data);

      toast.success("Registration successful!");

      //redirect to card page
      window.location.href = `/card/${res.data.userId}`;

      // Reset fields
      setFormData({
        name: "",
        phone: "",
        email: "",
        place: "",
        cName: "",
        cType: "",
        photo: null,
      });
      if (photoRef.current) {
        photoRef.current.value = "";
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error submitting form");
    }
  };


  const handleStallSubmit = async (e) => {
    e.preventDefault();
    if (!validateStallForm()) return;
    try {
      const res = await registerStall(stallData);
      console.log(res.data);
      toast.success("Stall booking submitted!");

      // Reset form
      setStallData({
        name: "",
        companyName: "",
        position: "",
        phone: "",
        email: "",
        place: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit stall booking");
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
          backgroundPosition: window.innerWidth < 800 ? "top center" : "top center",
          height: "100vh",
          width: "100%",
        }}
      >
        <div className="mt-85 sm:-mt-14 md:-mt-70 ">
          <h1
            className="
    font-extrabold tracking-widest text-white
    drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]
    text-lg
    sm:text-3xl
    md:text-5xl
    whitespace-nowrap
  "
          >
            <span className="inline sm:block">KERALA&apos;S</span>{" "}
            <span className="inline sm:block text-2xl sm:text-6xl md:text-8xl">
              LARGEST
            </span>{" "}
            <span className="block">TRADE EXPO</span>
          </h1>

          <button
            onClick={scrollToForm}
            className="
              relative mt-3
              px-6 py-2 text-sm
              sm:px-10 sm:py-3 sm:text-base
              font-extrabold text-black rounded-full
              overflow-hidden group cursor-pointer
              "
          >
            <span className="absolute inset-0 bg-linear-to-r from-yellow-300 to-green-400 rounded-full transition-transform duration-1500 ease-in-out group-hover:rotate-180"></span>
            <span className="relative z-10 transform scale-100 transition-all duration-1000 ease-in-out group-hover:scale-140 group-hover:tracking-wider">
              BOOK YOUR TICKET NOW
            </span>
          </button>
        </div>
      </section>

      {/* Booking Form Section */}
      <section ref={formRef} >
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 py-6 sm:py-10">
          {showCropper && (
            <ImageCropper
              photo={selectedPhoto}

              onCancel={() => {
                setShowCropper(false);
                setSelectedPhoto(null);
              }}

              onCropDone={(croppedFile) => {
                setFormData((prev) => ({ ...prev, photo: croppedFile }));
                setShowCropper(false);
              }}
            />
          )}
          {/* ======= EVENT | STALL SWITCHER ======= */}
          <div className="flex items-center gap-6 mb-6 sm:mb-10">
            <button
              onClick={() => setActiveForm("event")}
              className={`
              text-xl sm:text-4xl font-extrabold uppercase tracking-tight transition-all duration-300
              ${activeForm === "event"
                  ? "text-black translate-y-0 cursor-default"
                  : "text-gray-400 cursor-pointer hover:-translate-y-1 hover:text-black"
                }
    `}
            >
              Event
            </button>

            <span className="text-gray-400 text-xl sm:text-6xl -translate-y sm:-translate-y-1">|</span>

            <button
              onClick={() => setActiveForm("stall")}
              className={`
              text-xl sm:text-4xl font-extrabold uppercase tracking-tight transition-all duration-300
              ${activeForm === "stall"
                  ? "text-black translate-y-0 cursor-default"
                  : "text-gray-400 cursor-pointer hover:-translate-y-1 hover:text-black"
                }
    `}
            >
              Stall
            </button>
          </div>
          {/* =================== EVENT FORM =================== */}
          {activeForm === "event" && (
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl py-3 sm px-10 sm:p-10 animate-fadeIn">

              <div className="text-center mb-0 sm:mb-10">
                <h2 className="text-2xl sm:text-7xl font-extrabold text-gray-800 mb-3 py-2 uppercase tracking-tight">
                  Book Your Ticket Now
                </h2>
                <p className="text-gray-600 font-extralight mb-5 text-sm sm:text-base max-w-lg mx-auto">
                  Fill in your details and secure your spot at Kerala’s Largest Trade Expo.
                  Our team will get in touch with you soon.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>

                <div className="grid grid-cols-1">

                  <label className="block text-sm font-extrabold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane D'Souza"

                    className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                    focus:bg-white focus:border-blue-400 hover:bg-white   focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errors.name ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
                  />
                </div>

                <div className="grid grid-cols-1">
                  <label className="block text-sm font-extrabold text-gray-700 mb-1">
                    Whatsapp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 99999 88888"
                    className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
                  />

                </div>


                <div className="grid grid-cols-1">
                  {/* <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="yourname@company.com"
                      className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errors.email ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
                    />
                  </div> */}


                  <label className="block text-sm font-extrabold text-gray-700 mb-1">
                    Place <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    placeholder="Kochi"
                    className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errors.place ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
                  />

                </div>


                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="cName"
                      value={formData.cName}
                      onChange={handleChange}
                      placeholder="Innovate Solutions Pvt. Ltd."
                      className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errors.cName ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Company Type
                    </label>
                    <input
                      type="text"
                      name="cType"
                      value={formData.cType}
                      onChange={handleChange}
                      placeholder="IT, Manufacturing, or Retail"
                      className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                    />
                  </div>
                </div> */}
                <div className="mb-6">
                  <label className="block text-sm font-extrabold text-gray-700 mb-1">
                    Upload Your Photo <span className="text-red-500">*</span>
                  </label>

                  <div
                    className={`flex items-center w-full rounded-lg overflow-hidden
                    transition-all duration-300
                    ${errors.photo ? "border border-red-500 bg-red-50" : "border border-gray-300 bg-white"}`}
                  >
                    {/* Upload Button */}
                    <button
                      type="button"
                      onClick={() => photoRef.current.click()}
                      className="bg-gray-600 text-white px-4 py-2 text-sm hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
                    >
                      Upload File
                    </button>

                    {/* File Name */}
                    <span
                      className={`px-3 py-2 text-sm
                      ${errors.photo ? "text-red-600" : "text-gray-600"}`}
                    >
                      {formData.photo ? formData.photo.name : "No file chosen"}
                    </span>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      ref={photoRef}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        // Clear error instantly when selecting a new image
                        setErrors((prev) => ({ ...prev, photo: "" }));

                        setSelectedPhoto(file);
                        setShowCropper(true);
                      }}
                      className="hidden"
                    />
                  </div>

                  {errors.photo && (
                    <p className="text-xs text-red-600 mt-1">{errors.photo}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6 text-center">
                  <button
                    type="submit"
                    className="relative inline-block px-10 py-3 cursor-pointer rounded-full overflow-hidden group focus:outline-none"
                  >
                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-yellow-300 to-green-400 transition-opacity 
                    duration-700 ease-in-out opacity-100 group-hover:opacity-0" />

                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-green-400 to-yellow-300 transition-opacity 
                    duration-700 ease-in-out opacity-0 group-hover:opacity-100" />

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
          )}

          {/* =================== STALL BOOKING FORM =================== */}
          {activeForm === "stall" && (
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl py-3 sm px-10 sm:p-10 animate-fadeIn">
              <div className="text-center mb-0 sm:mb-10">
                <h2 className="text-2xl sm:text-7xl font-extrabold text-gray-800 mb-3 py-2 uppercase tracking-tight">
                  Book Your Stall Now
                </h2>
                <p className="text-gray-600 font-extralight mb-5 text-sm sm:text-base max-w-lg mx-auto">
                  Fill in your details and reserve your stall at Kerala’s Largest Trade Expo.
                  Our team will get in touch with you soon.
                </p>
              </div>

              <form className="space-y-8" onSubmit={handleStallSubmit}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={stallData.name}
                      onChange={handleStallChange}
                      placeholder="John Mathew"
                      className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errorsStall.name ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={stallData.companyName}
                      onChange={handleStallChange}
                      placeholder="Tech Innovations Pvt Ltd"
                      className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errorsStall.companyName ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Position <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={stallData.position}
                      onChange={handleStallChange}
                      placeholder="CEO / Founder"
                      className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errorsStall.position ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Whatsapp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      name="phone"
                      value={stallData.phone}
                      onChange={handleStallChange}
                      placeholder="+91 98765 43210"
                      className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errorsStall.phone ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
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
                      value={stallData.email}
                      onChange={handleStallChange}
                      placeholder="yourmail@domain.com"
                      className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errorsStall.email ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
                    />
                  </div>

                  {/* Place */}
                  <div>
                    <label className="block text-sm font-extrabold text-gray-700 mb-2">
                      Place <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="place"
                      value={stallData.place}
                      onChange={handleStallChange}
                      placeholder="Kozhikode"
                      className={`w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-300 
                focus:bg-white focus:border-blue-400 hover:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none
                ${errorsStall.place ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}
                `}
                    />
                  </div>
                </div>
                {/* Button */}
                <div className="pt-6 text-center">
                  <button
                    type="submit"
                    className="relative inline-block px-10 py-3 cursor-pointer rounded-full overflow-hidden group focus:outline-none"
                  >
                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-yellow-300 to-green-400 transition-opacity 
              duration-700 ease-in-out opacity-100 group-hover:opacity-0" />

                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-green-400 to-yellow-300 transition-opacity 
              duration-700 ease-in-out opacity-0 group-hover:opacity-100" />

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
          )}

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
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-y-15 sm:gap-8 text-center">
          {[
            { value: "6000+", label: "Visitors" },
            { value: "200+", label: "B2B Stalls" },
            { value: "100000 Sq. Ft.", label: "Programme Hall" },
            { value: "50", label: "Expert Speakers" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-start">
              <div className="h-10 sm:h-12 flex items-end justify-center">
                <h3 className="text-3xl sm:text-4xl font-bold text-orange-500 leading-none">
                  {item.value}
                </h3>
              </div>
              <p className="uppercase text-xs sm:text-sm tracking-wider text-gray-200 mt-1 leading-tight">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured brand and footer section */}
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
          <div className="flex flex-wrap justify-center items-start
           gap-x-15 sm:gap-y-10 sm:gap-x-20 max-w-6xl">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-start w-30 sm:w-56"
              >

                <div className="flex flex-col items-center justify-end h-24 sm:h-36">
                  <img
                    src={logo.img}
                    alt={logo.name}
                    className={`h-16 sm:h-24 object-contain grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500 ease-in-out ${index === 0 ? "translate-y-1 sm:translate-y-0" : ""
                      }`}
                  />
                </div>
                <h3 className="mt-1 text-sm sm:text-lg font-medium text-gray-700 text-center leading-tight h-10 flex items-start">
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