import React, { useState, useRef, useEffect } from "react";

import brand1 from "../logos/logo_01.png";
import brand2 from "../logos/logo_02.png";
import brand3 from "../logos/logo_03.png";
import brand4 from "../logos/logo_04.png";
import brand5 from "../logos/logo_05.png";
import brand6 from "../logos/logo_06.png";
import brand7 from "../logos/logo_07.png";
import brand8 from "../logos/logo_08.png";
import brand9 from "../logos/logo_09.png";
import brand10 from "../logos/logo_10.png";

import backgroundImg from "../assets/ChatGPT Image Jan 3, 2026, 12_56_48 PM.png";
import backgroundImgMobile from "../assets/website banner  1080 ×1500-01.png";

import { registerStall, registerUser, registerAward } from "../api/userApi";
import { toast } from "sonner";
import skybertech_logo from "../logos/skybertech_logo.png";
import xyvin_logo from "../logos/Xyvin_logo.png";
import footerBannerDesktop from "../assets/website banner 2500 × 300-01.jpg";
import footerBannerMobile from "../assets/mobile footer  banner 1080 × 400-01.png";
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

  const [awardData, setAwardData] = useState({
    name: "",
    companyName: "",
    position: "",
    phone: "",
    email: "",
    place: "",
    category: "",
    yearsInBusiness: "",
    reason: "",
  });

  const formRef = useRef(null);
  const photoRef = useRef(null);
  const [activeForm, setActiveForm] = useState("event");
  const [showBooking, setShowBooking] = useState(false);
  const [showBookingChooser, setShowBookingChooser] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorsStall, setErrorsStall] = useState({});
  const [errorsAward, setErrorsAward] = useState({});
  const [highlightsVisible, setHighlightsVisible] = useState(false);

  const highlightsRef = useRef(null);

  const scrollToForm = () => {
    setShowBookingChooser(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    // if (!formData.photo) newErrors.photo = "Upload a photo";

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

  const validateAwardForm = () => {
    let newErrors = {};

    if (!awardData.name.trim()) newErrors.name = "Full Name is required";
    if (!awardData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!awardData.position.trim()) newErrors.position = "Position is required";

    if (!awardData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(awardData.phone)) {
      newErrors.phone = "Enter 10 digit number";
    }

    if (awardData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(awardData.email)) {
      newErrors.email = "Enter valid email";
    }

    // Place is now optional for award nominations

    setErrorsAward(newErrors);
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

  const handleAwardChange = (e) => {
    const { name, value } = e.target;
    setAwardData((prev) => ({ ...prev, [name]: value }));
    setErrorsAward((prev) => ({ ...prev, [name]: "" }));
  };

  // Scroll-reveal for Event Highlights section
  useEffect(() => {
    if (!highlightsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHighlightsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(highlightsRef.current);

    return () => {
      if (highlightsRef.current) {
        observer.unobserve(highlightsRef.current);
      }
    };
  }, []);

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
        place: "",
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

      if (res.data && res.data.userId) {
        window.location.href = `/card/${res.data.userId}`;
      }

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

  const handleAwardSubmit = async (e) => {
    e.preventDefault();
    if (!validateAwardForm()) {
      toast.error("Please fill all required fields in the award form correctly.");
      return;
    }

    try {
      const payload = {
        ...awardData,
        phone: awardData.phone.startsWith("91")
          ? awardData.phone
          : `91${awardData.phone}`,
      };

      const res = await registerAward(payload);
      toast.success("Business award nomination submitted!");

      if (res.data && res.data.userId) {
        window.location.href = `/card/${res.data.userId}`;
      }

      setAwardData({
        name: "",
        companyName: "",
        position: "",
        phone: "",
        email: "",
        place: "",
        category: "",
        yearsInBusiness: "",
        reason: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit award nomination");
    }
  };

  const logos = [
    { name: "Main Brand", img: brand1 }, // main associate partner
    { name: "Brand 2", img: brand2 },
    { name: "Brand 3", img: brand3 },
    { name: "Brand 4", img: brand4 },
    { name: "Brand 5", img: brand5 },
    { name: "Brand 6", img: brand6 },
    { name: "Brand 7", img: brand7 },
    { name: "Brand 8", img: brand8 },
    { name: "Brand 9", img: brand9 },
    { name: "Brand 10", img: brand10 },
   
  ];

  return (
    <div className="w-full h-full overflow-x-hidden">
      <style>{`
        @keyframes flipInY {
          0% {
            transform: perspective(1000px) rotateY(-90deg);
            opacity: 0;
          }
          60% {
            transform: perspective(1000px) rotateY(10deg);
            opacity: 1;
          }
          100% {
            transform: perspective(1000px) rotateY(0deg);
            opacity: 1;
          }
        }
      `}</style>

      {/* Hero Section - Poster Background (image only) */}
      <section className="relative w-full bg-black">
        {/* Banner image */}
        <div className="relative w-full">
          {/* Mobile banner */}
          <img
            src={backgroundImgMobile}
            alt="IT & Business Kerala Conclave banner mobile"
            className="block sm:hidden w-full h-auto object-contain"
          />
          {/* Desktop / tablet banner */}
          <img
            src={backgroundImg}
            alt="IT & Business Kerala Conclave banner"
            className="hidden sm:block w-full h-auto object-contain"
          />

          {/* Very subtle overlay on mobile only, to keep image bright */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent sm:hidden" />
        </div>
      </section>

      {/* Desktop / tablet horizontal bar */}
      <div className="hidden sm:flex w-full bg-slate-50 text-black text-sm lg:text-base px-4 md:px-8 lg:px-12 py-4 md:py-5 lg:py-7">
        <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-6 lg:gap-10">

          {/* Title */}
          <div className="flex-1 min-w-[180px] md:min-w-[200px]">
            <h2 className="text-base md:text-lg lg:text-xl font-bold tracking-wide leading-snug">
              IT &amp; Business Kerala Conclave
            </h2>
          </div>

          {/* Date / Venue / Time - evenly spaced */}
          <div className="flex flex-[2] flex-wrap md:flex-nowrap justify-between gap-4 md:gap-6 lg:gap-10 text-xs md:text-sm lg:text-base">
            <div className="flex flex-col items-start min-w-[90px]">
              <p className="uppercase tracking-[0.22em] text-gray-500 text-[0.7rem] md:text-[0.72rem] lg:text-xs">Date</p>
              <p className="mt-1 text-sm md:text-base lg:text-lg font-semibold">25 April 2026</p>
            </div>
            <div className="flex flex-col items-start min-w-[120px]">
              <p className="uppercase tracking-[0.22em] text-gray-500 text-[0.7rem] md:text-[0.72rem] lg:text-xs">Venue</p>
              <p className="mt-1 text-sm md:text-base lg:text-lg font-semibold whitespace-nowrap">Lulu Twin Tower, Kochi</p>
            </div>
            <div className="flex flex-col items-start min-w-[120px]">
              <p className="uppercase tracking-[0.22em] text-gray-500 text-[0.7rem] md:text-[0.72rem] lg:text-xs">Time</p>
              <p className="mt-1 text-sm md:text-base lg:text-lg font-semibold">9:00 AM - 7:00 PM</p>
            </div>
          </div>

          {/* Book Now button (desktop/tablet opens form directly) */}
          <div className="flex-1 flex items-center justify-end min-w-[180px] mt-2 md:mt-0">
            <button
              onClick={() => setShowBooking(true)}
              className="w-full md:w-auto px-6 md:px-8 lg:px-10 py-3 text-xs md:text-sm lg:text-base font-semibold tracking-[0.22em] uppercase rounded-full text-center bg-[#0f766e] text-white shadow-sm transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/40 hover:bg-[#0d5f59] active:scale-95"
            >
              Book Your Ticket 
            </button>
          </div>

        </div>
      </div>

      {/* Mobile event CTA under banner (button only) */}
      <section className="w-full bg-slate-50 sm:hidden pt-6 pb-8">
        <div className="max-w-4xl mx-auto px-6 text-black text-center">
          <button
            onClick={() => setShowBookingChooser(true)}
            className="inline-flex items-center justify-center w-full rounded-full bg-[#0f766e] text-white py-3.5 text-xs font-semibold tracking-[0.26em] uppercase shadow-sm transform transition-all duration-300 active:scale-95"
          >
            Book Your Ticket
          </button>
        </div>
      </section>

      {/* Booking Type Chooser Popup - mobile only */}
      <section
        className={`sm:hidden fixed inset-0 z-30 flex items-center justify-center px-4 transition-opacity duration-300 ease-out ${
          showBookingChooser ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 transition-opacity duration-300"
          onClick={() => setShowBookingChooser(false)}
        />

        <div
          className={`relative w-full max-w-xl transform transition-transform duration-300 ease-out ${
            showBookingChooser ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
          }`}
        >
          <div className="relative rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl px-6 sm:px-8 py-6 sm:py-8">
            {/* Close button for chooser */}
            <button
              type="button"
              onClick={() => setShowBookingChooser(false)}
              className="absolute top-3 right-4 text-slate-400 hover:text-slate-600 text-lg leading-none"
              aria-label="Close booking options"
            >
              ×
            </button>
            <div className="text-center mb-5 sm:mb-7">
              <p className="text-[0.7rem] sm:text-xs font-semibold tracking-[0.3em] text-emerald-700 uppercase mb-2">
                Booking Options
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                What do you want to book?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Choose the experience you’d like to sign up for. You can register for the event, nominate for the business awards, or book a business stall.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Event Ticket */}
              <button
                type="button"

                onClick={() => {
                  setActiveForm("event");
                  setShowBooking(true);
                  setShowBookingChooser(false);
                }}
                className="group flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-4 sm:py-5 text-center shadow-sm hover:shadow-md hover:border-emerald-500 hover:bg-white transition-all duration-200 active:scale-[0.98]"
              >
                <div className="text-center">
                  <p className="text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.24em] text-emerald-700 uppercase mb-1">
                    Attend
                  </p>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">
                    Event Ticket
                  </h3>
                  <p className="text-[0.7rem] sm:text-xs text-slate-500">
                    Reserve your seat for the Kerala IT &amp; Business Conclave sessions.
                  </p>
                </div>
              </button>

              {/* Business Award Nomination */}
              <button
                type="button"
                onClick={() => {
                  setActiveForm("award");
                  setShowBooking(true);
                  setShowBookingChooser(false);
                }}
                className="group flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-4 sm:py-5 text-center shadow-sm hover:shadow-md hover:border-emerald-500 hover:bg-white transition-all duration-200 active:scale-[0.98]"
              >
                <div className="text-center">
                  <p className="text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.24em] text-amber-700 uppercase mb-1">
                    Nominate
                  </p>

                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">
                    Business Award
                  </h3>
                  <p className="text-[0.7rem] sm:text-xs text-slate-500">
                    Submit a nomination for the Business Star recognition.
                  </p>
                </div>
              </button>

              {/* Stall Booking */}
              <button
                type="button"
                onClick={() => {
                  setActiveForm("stall");
                  setShowBooking(true);
                  setShowBookingChooser(false);
                }}
                className="group flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-4 sm:py-5 text-center shadow-sm hover:shadow-md hover:border-emerald-500 hover:bg-white transition-all duration-200 active:scale-[0.98]"
              >
                <div className="text-center">
                  <p className="text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[0.24em] text-sky-700 uppercase mb-1">
                    Showcase
                  </p>

                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">
                    Stall Booking
                  </h3>
                  <p className="text-[0.7rem] sm:text-xs text-slate-500">
                    Set up a stall to showcase your products and services.
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Overlay */}

      <section
        className={`fixed inset-0 z-20 flex items-center justify-center px-4 transition-opacity duration-300 ease-out ${
          showBooking ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 transition-opacity duration-300"
          onClick={() => setShowBooking(false)}
        />
        <div
          className={`relative w-full max-w-3xl transform transition-transform duration-300 ease-out ${
            showBooking ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
          }`}
        >
          <div className="relative flex flex-col items-center justify-start rounded-3xl bg-white/90 backdrop-blur-md shadow-2xl px-6 sm:px-10 py-6 sm:py-8">
            {/* Close button for forms */}

            <button
              type="button"
              onClick={() => setShowBooking(false)}
              className="absolute top-3 right-4 text-slate-400 hover:text-slate-600 text-lg sm:text-xl leading-none"
              aria-label="Close booking form"
            >
              ×
            </button>
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

            {/* EVENT | AWARD | STALL SWITCHER */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 mb-4 sm:mb-6">
              <button
                onClick={() => setActiveForm("event")}
                className={`text-base sm:text-xl font-extrabold uppercase tracking-[0.18em] transition-all duration-300 ${
                  activeForm === "event"
                    ? "text-slate-900 translate-y-0 cursor-default"
                    : "text-slate-400 cursor-pointer hover:-translate-y-0.5 hover:text-slate-900"
                }`}
              >
                Event
              </button>

              <span className="inline text-slate-300 text-lg sm:text-3xl -translate-y sm:-translate-y-0.5">
                |
              </span>

              <button
                onClick={() => setActiveForm("award")}
                className={`text-base sm:text-xl font-extrabold uppercase tracking-[0.18em] transition-all duration-300 ${
                  activeForm === "award"
                    ? "text-slate-900 translate-y-0 cursor-default"
                    : "text-slate-400 cursor-pointer hover:-translate-y-0.5 hover:text-slate-900"
                }`}
              >
                Business Award
              </button>

              <span className="inline text-slate-300 text-lg sm:text-3xl -translate-y sm:-translate-y-0.5">
                |
              </span>

              <button
                onClick={() => setActiveForm("stall")}
                className={`text-base sm:text-xl font-extrabold uppercase tracking-[0.18em] transition-all duration-300 ${
                  activeForm === "stall"
                    ? "text-slate-900 translate-y-0 cursor-default"
                    : "text-slate-400 cursor-pointer hover:-translate-y-0.5 hover:text-slate-900"
                }`}
              >
                Stall
              </button>
            </div>

            {/* EVENT FORM */}
            {activeForm === "event" && (
              <div
                className="w-full animate-fadeIn transition-transform duration-500 ease-out transform"
                style={{ animation: "flipInY 0.6s ease-out" }}
              >
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-1 sm:mb-2 py-1 uppercase tracking-[0.22em]">
                    Book Your Ticket Now
                  </h2>
                  <p className="text-slate-500 font-light mb-4 text-xs sm:text-sm max-w-lg mx-auto">
                    Fill in your details and reserve your seat at the IT & Business Kerala Conclave.
                    Our team will get in touch with you soon.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 tracking-wide">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane D'Souza"
                      maxLength={19}
                      className={`w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 
                focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base
                ${errors.name ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"}
                `}
                    />
                  </div>

                  <div className="grid grid-cols-1">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 tracking-wide">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 99999 88888"
                      className={`w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 
                focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base
                ${errors.phone ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"}
                `}
                    />
                  </div>

                  <div className="grid grid-cols-1">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 tracking-wide">
                      Place <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="place"
                      value={formData.place}
                      onChange={handleChange}
                      placeholder="Kochi"
                      className={`w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 
                focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base
                ${errors.place ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"}
                `}
                    />
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      className="relative inline-block px-10 py-3 cursor-pointer rounded-full overflow-hidden group focus:outline-none shadow-md"
                    >
                      <span className="absolute inset-0 bg-linear-to-r from-emerald-400 to-lime-300 rounded-full transition-opacity 
                duration-700 ease-in-out opacity-100 group-hover:opacity-0" />

                      <span className="absolute inset-0 bg-linear-to-r from-lime-300 to-emerald-500 rounded-full transition-opacity 
                duration-700 ease-in-out opacity-0 group-hover:opacity-100" />

                      <span className="relative z-10 text-slate-900 font-semibold text-xs sm:text-sm tracking-wide">
                        Register
                      </span>
                    </button>
                  </div>

                  <p className="text-[0.65rem] sm:text-xs text-center text-slate-400 mt-3">
                    * Required fields. We respect your privacy and never share your information.
                  </p>
                </form>
              </div>
            )}

            {/* STALL BOOKING FORM */}
            {activeForm === "stall" && (
              <div
                className="w-full max-w-md sm:max-w-lg mx-auto animate-fadeIn transition-transform duration-500 ease-out transform"
                style={{ animation: "flipInY 0.6s ease-out" }}
              >
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mb-2 py-1 uppercase tracking-[0.22em]">
                    Book Your Stall Now
                  </h2>
                  <p className="text-slate-500 font-light mb-4 text-xs sm:text-sm max-w-lg mx-auto">
                    Fill in your details and reserve your stall at the IT & Business Kerala Conclave.
                    Our team will get in touch with you soon.
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleStallSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 tracking-wide">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={stallData.name}
                        onChange={handleStallChange}
                        placeholder="John Mathew"
                        className={`w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 
                focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base
                ${errorsStall.name ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"}
                `}
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 tracking-wide">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={stallData.companyName}
                        onChange={handleStallChange}
                        placeholder="Tech Innovations Pvt Ltd"
                        className={`w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 
                focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base
                ${errorsStall.companyName ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"}
                `}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 tracking-wide">
                        Position <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={stallData.position}
                        onChange={handleStallChange}
                        placeholder="CEO / Founder"
                        className={`w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 
                focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base
                ${errorsStall.position ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"}
                `}
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 tracking-wide">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        name="phone"
                        value={stallData.phone}
                        onChange={handleStallChange}
                        placeholder="+91 98765 43210"
                        className={`w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 
                focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base
                ${errorsStall.phone ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"}
                `}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2 tracking-wide">
                        Place <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="place"
                        value={stallData.place}
                        onChange={handleStallChange}
                        placeholder="Kozhikode"
                        className={`w-full border border-slate-200 bg-slate-50 rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 
                focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base
                ${errorsStall.place ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"}
                `}
                      />
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      className="relative inline-block px-10 py-3 cursor-pointer rounded-full overflow-hidden group focus:outline-none shadow-md"
                    >
                      <span className="absolute inset-0 rounded-full bg-linear-to-r from-emerald-400 to-lime-300 transition-opacity 
                duration-700 ease-in-out opacity-100 group-hover:opacity-0" />

                      <span className="absolute inset-0 rounded-full bg-linear-to-r from-lime-300 to-emerald-500 transition-opacity 
                duration-700 ease-in-out opacity-0 group-hover:opacity-100" />

                      <span className="relative z-10 text-slate-900 font-semibold text-xs sm:text-sm tracking-wide">
                        Register
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* BUSINESS AWARD NOMINATION FORM */}
            {activeForm === "award" && (
              <div
                className="w-full animate-fadeIn transition-transform duration-500 ease-out transform"
                style={{ animation: "flipInY 0.6s ease-out" }}
              >
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-2 py-1 uppercase tracking-[0.22em]">
                    Business Award Nomination
                  </h2>
                  <p className="text-slate-500 font-light mb-4 text-xs sm:text-sm max-w-xl mx-auto">
                    Nominate a leading business at the IT & Business Kerala Conclave and celebrate their impact and innovation.
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleAwardSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 tracking-wide">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={awardData.name}
                        onChange={handleAwardChange}
                        placeholder="John Mathew"
                        className={`w-full border rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base ${
                          errorsAward.name ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 tracking-wide">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={awardData.companyName}
                        onChange={handleAwardChange}
                        placeholder="Tech Innovations Pvt Ltd"
                        className={`w-full border rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base ${
                          errorsAward.companyName ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 tracking-wide">
                        Position <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={awardData.position}
                        onChange={handleAwardChange}
                        placeholder="Founder / CEO"
                        className={`w-full border rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base ${
                          errorsAward.position ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1 tracking-wide">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        name="phone"
                        value={awardData.phone}
                        onChange={handleAwardChange}
                        placeholder="91 98765 43210"
                        className={`w-full border rounded-lg px-4 py-2.5 text-slate-800 placeholder-slate-300 focus:bg-white focus:border-emerald-400 hover:bg-white focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none text-sm sm:text-base ${
                          errorsAward.phone ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      className="relative inline-block px-10 py-3 cursor-pointer rounded-full overflow-hidden group focus:outline-none shadow-md"
                    >
                      <span className="absolute inset-0 rounded-full bg-linear-to-r from-emerald-400 to-lime-300 transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0" />
                      <span className="absolute inset-0 rounded-full bg-linear-to-r from-lime-300 to-emerald-500 transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100" />
                      <span className="relative z-10 text-slate-900 font-semibold text-xs sm:text-sm tracking-wide">
                        Submit Nomination
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      
      {/* Key Event Highlights - white & green corporate theme */}
      <section ref={highlightsRef} className="relative py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Event Highlights
            </h2>
            <div className="mt-3 flex justify-center">
              <span className="h-1 w-20 rounded-full bg-emerald-600" />
            </div>
            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
              A focused line-up of knowledge sessions, launch platforms, recognition forums,
              and high-quality networking designed for decision-makers and growth-focused teams.
            </p>
          </div>

          {/* Cards grid - 3x2 layout */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 transition-opacity duration-700 ease-out ${
              highlightsVisible ? "opacity-100" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Business Seminar */}
            <div
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-md px-5 py-5 sm:px-7 sm:py-7
              mx-2 sm:mx-0 transition-all duration-300 ease-out
              hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/70 hover:bg-white hover:shadow-emerald-100
              active:scale-[0.98] active:shadow-md"
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 text-center">
                Business Seminar
              </h3>
              <p className="text-sm sm:text-[0.95rem] leading-relaxed text-slate-600 transition-colors duration-300 hover:text-emerald-700">
                Focused sessions on IT, business strategy, and digital transformation trends
                shaping tomorrow&apos;s enterprises.
              </p>
            </div>

            {/* Panel Discussions */}
            <div
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-md px-5 py-5 sm:px-7 sm:py-7
              mx-2 sm:mx-0 transition-all duration-300 ease-out
              hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/70 hover:bg-white hover:shadow-emerald-100
              active:scale-[0.98] active:shadow-md"
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 text-center">
                Panel Discussions
              </h3>
              <p className="text-sm sm:text-[0.95rem] leading-relaxed text-slate-600 transition-colors duration-300 hover:text-emerald-700">
                Expert conversations with industry leaders offering clear perspectives on
                technology, markets, and the evolving business landscape.
              </p>
            </div>

            {/* Business Training Programs */}
            <div
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-md px-5 py-5 sm:px-7 sm:py-7
              mx-2 sm:mx-0 transition-all duration-300 ease-out
              hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/70 hover:bg-white hover:shadow-emerald-100
              active:scale-[0.98] active:shadow-md"
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 text-center">
                Business Training Programs
              </h3>
              <p className="text-sm sm:text-[0.95rem] leading-relaxed text-slate-600 transition-colors duration-300 hover:text-emerald-700">
                Practical programs designed to strengthen leadership, operations, and
                technology adoption in growing organisations.
              </p>
            </div>

            {/* Product Launch Sessions */}
            <div
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-md px-5 py-5 sm:px-7 sm:py-7
              mx-2 sm:mx-0 transition-all duration-300 ease-out
              hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/70 hover:bg-white hover:shadow-emerald-100
              active:scale-[0.98] active:shadow-md"
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 text-center">
                Product Launch Sessions
              </h3>
              <p className="text-sm sm:text-[0.95rem] leading-relaxed text-slate-600 transition-colors duration-300 hover:text-emerald-700">
                Dedicated launch showcases for new products, platforms, and solutions in
                front of a relevant business audience.
              </p>
            </div>

            {/* Brand Awards & Recognition */}
            <div
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-md px-5 py-5 sm:px-7 sm:py-7
              mx-2 sm:mx-0 transition-all duration-300 ease-out
              hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/70 hover:bg-white hover:shadow-emerald-100
              active:scale-[0.98] active:shadow-md"
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 text-center">
                Brand Awards &amp; Recognition
              </h3>
              <p className="text-sm sm:text-[0.95rem] leading-relaxed text-slate-600 transition-colors duration-300 hover:text-emerald-700">
                Formal recognition of outstanding business achievers and brands creating
                measurable impact across sectors.
              </p>
            </div>

            {/* Business Networking Sessions */}
            <div
              className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-md px-5 py-5 sm:px-7 sm:py-7
              mx-2 sm:mx-0 transition-all duration-300 ease-out
              hover:-translate-y-1 hover:shadow-lg hover:border-emerald-500/70 hover:bg-white hover:shadow-emerald-100
              active:scale-[0.98] active:shadow-md"
            >
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 text-center">
                Business Networking Sessions
              </h3>
              <p className="text-sm sm:text-[0.95rem] leading-relaxed text-slate-600 transition-colors duration-300 hover:text-emerald-700">
                Structured opportunities for high-value networking between founders,
                professionals, investors, and ecosystem partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats background section */}
      <section
        className="relative text-white py-16 sm:py-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://wallpapercat.com/w/full/6/3/1/2012732-2560x1173-desktop-dual-monitors-riyadh-wallpaper.jpg')",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Top row with main stats (from your new points) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 sm:gap-8 text-center">
            {[
              { value: "20+", label: "Product Launching" },
              { value: "100+", label: "Brand Awards" },
              { value: "40+", label: "Business Stalls" },
              { value: "500+", label: "Participants" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-start">
                <div className="h-10 sm:h-12 flex items-end justify-center">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white leading-none">
                    {item.value}
                  </h3>
                </div>
                <p className="uppercase text-xs sm:text-sm tracking-wider text-white mt-1 leading-tight">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands section */}
      <section className="bg-white flex flex-col items-center text-center py-12 sm:py-16">
        {/* Top content */}
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
            Featured Brands
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-10 text-base sm:text-lg max-w-2xl">
            Discover the leading brands and partners joining our event
          </p>

          {/* Logos grid */}
          <div className="w-full max-w-6xl px-6 sm:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 sm:gap-8 items-start justify-items-center">
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-start h-24 sm:h-32 w-24 sm:w-32"
                >
                  <img
                    src={logo.img}
                    alt={logo.name}
                    className="max-h-full max-w-full object-contain grayscale-0 sm:grayscale sm:hover:grayscale-0 hover:scale-105 transition-all duration-500 ease-in-out"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer section with partners */}
      <section className="bg-white flex flex-col items-center text-center">
        <footer>
          <div className="w-full mt-0 sm:mt-0">
            {/* Mobile footer banner */}
            <img
              src={footerBannerMobile}
              alt="Footer Banner Mobile"
              className="block sm:hidden w-full h-auto object-cover"
            />

            {/* Desktop / tablet footer banner */}
            <img
              src={footerBannerDesktop}
              alt="Footer Banner Desktop"
              className="hidden sm:block w-full h-auto object-cover"
            />
          </div>

          {/* Legal links */}
          <div className="w-full mt-3">
            <div className="flex items-center justify-center gap-3 text-gray-500 text-[10px] sm:text-sm font-medium">
              <a href="/terms" className="hover:text-gray-700 underline-offset-2 hover:underline">
                Terms &amp; Conditions
              </a>
              <span className="text-gray-400">|</span>
              <a href="/privacy" className="hover:text-gray-700 underline-offset-2 hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="w-full mt-3 mb-6">
    <div className="flex items-center justify-center gap-4 text-[11px] sm:text-sm text-gray-400">
      <a
        href="/terms-and-conditions"
        className="hover:text-gray-700 transition-colors duration-300 cursor-pointer"
      >
        Terms & Conditions
      </a>

      <span className="opacity-40 cursor-default">|</span>

      <a
        href="/privacy-policy"
        className="hover:text-gray-700 transition-colors duration-300 cursor-pointer"
      >
        Privacy Policy
      </a>
    </div>
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