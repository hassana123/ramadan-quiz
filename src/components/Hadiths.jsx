import React, { useState, useEffect, useLayoutEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hadiths = () => {
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // useEffect(() => {
  //   const apiUrl =
  //     "https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$tnZg9fSjcp8ceOQjkRdiO4wJHhSFnKEBpzeZfzeq6X9n9LHRR4Xa ";
  //   fetch(apiUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.hadiths);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey =
          "$2y$10$tnZg9fSjcp8ceOQjkRdiO4wJHhSFnKEBpzeZfzeq6X9n9LHRR4Xa";
        const apiUrl = `https://www.hadithapi.com/api/hadiths?apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        console.log(response);
        const data = await response.json();
        console.log(data);
        const first25Hadiths = data.hadiths.data;
        console.log(first25Hadiths);
        setHadiths(first25Hadiths);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const settings = {
    autoplay: true,
    swipeToSlide: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    // Adjust this value based on your design
  };
  const handleContinueReading = (index) => {
    setExpandedIndex(index);
  };
  const handleSeeLess = () => {
    setExpandedIndex(null);
  };
  const isLargeScreen = window.innerWidth > 768;

  if (isLargeScreen) {
    // Apply centerMode and centerPadding for larger screens
    settings.centerMode = true;
    settings.centerPadding = "25%";
  }
  return (
    <section id="hadith" className="text-black">
      <h1 className="text-center text-[24px] font-bold text-secondary">
        {" "}
        Daily Hadith
      </h1>
      <div className="w-[90%] mx-auto my-5 mb-20">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Slider {...settings}>
            {hadiths.map((hadith, index) => (
              <div key={index} className="md:px-5">
                <div
                  key={index}
                  className={`p-10 bg-[#F5F4F4] shadow-lg md:w-[80%]- h-[45vh] overflow-hidden rounded-[10px] ${
                    expandedIndex === index
                      ? "overflow-y-auto max-h-[500px]"
                      : ""
                  }`}
                >
                  <h1 className="my-5 text-center text-[24px] text-secondary">
                    Day {hadith.hadithNumber}
                  </h1>
                  <p className="my-5">
                    {expandedIndex === index
                      ? hadith.hadithEnglish
                      : hadith.hadithEnglish.split(" ").slice(0, 20).join(" ")}
                    {expandedIndex !== index && (
                      <button
                        className="text-secondary text-[12px] cursor-pointer"
                        onClick={() => handleContinueReading(index)}
                      >
                        ...Continue Reading
                      </button>
                    )}
                  </p>
                  <p className="text-right my-5">
                    {expandedIndex === index
                      ? hadith.hadithArabic
                      : hadith.hadithArabic.split(" ").slice(0, 20).join(" ")}
                  </p>
                  {expandedIndex === index && (
                    <button
                      className="text-secondary text-[12px] cursor-pointer"
                      onClick={handleSeeLess}
                    >
                      See Less
                    </button>
                  )}
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default Hadiths;
