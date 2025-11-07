"use client";
import React, { useState } from "react";
import Image from "next/image";
import ScrollableSection from "@/components/layout/ScrollbarSection";
import ContentScroll from "./ContentScroll";
import VimeoLite from "@/components/common/VimeoLite";
import Container from "@/components/layout/Container";

const servicesData = [
  {
    id: 1,
    title: "Cash Collection Services",
    icon: "/images/contentpageicons/cashcollection.png",
    description:
      'Our plain clothes staff will visit your premises at an agreed time, pick up and secure your takings, drive them to your bank in one of our unmarked vehicles and deposit them in your account. At a later time, we will deliver the bank deposit records back to your office.',
  },
  {
    id: 2,
    title: "Cash Delivery Services",
    icon: "/images/contentpageicons/cashdelivery.png",
    description:
      'When you want cash delivered to your organisation, just order our cash delivery service.',
  },
  {
    id: 3,
    title: "Cash Counting Services",
    icon: "/images/contentpageicons/cashcounting.png",
    description:
      "If you don't want your staff to deal with counting the takings, our cash counting service can assist.",
  },
];

const WelcomeSection = () =>
{
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => setIsExpanded((p) => !p);

  return (
    <div className="w-full bg-content-bg bg-no-repeat bg-center 1366px:bg-cover inline-block mt-10">
      <Container className="max-[1440px]:max-w-[1280px]">

        <div id="welcome" className="min-h-[400px] w-full 992px:w-auto mx-auto">

          <div className="center-content pb-0 block w-[82%] 768px:w-[80%] 992px:w-[70%] mx-auto mb-[40px] 992px:mb-0">

            <h4 className="text-[32px] text-center mx-auto font-prata-regular">
              Welcome to
            </h4>

            <Image
              src="/images/SecureCash.webp"
              alt="SecureCash Logo"
              width={320}
              height={0}
              priority
              className="max-w-full h-auto block mx-auto"
            />

            <hr className="w-[100px] mt-3 mb-6 h-[4px] rounded-[5px] border-0 mx-auto bg-primary" />

            <p className="text-[16px] leading-[2rem] text-center mb-[12px] mt-[16px] 992px:text-center 480px:mb-0 font-light font-montserrat">
              Do you need cash in transit services? SecureCash specialises in
              picking up your money and banking it…
            </p>

          </div>

          <div className="pt-0 block text-left mt-[40px] 768px:mt-0 992px:w-[95%] 992px:mx-auto 1366px:w-full 992px:flex 992px:pt-[80px] items-center">

            <div className="mb-[40px] 992px:mb-0 text-left w-full 992px:w-1/2 mx-auto">

              <ScrollableSection
                className="h-auto w-[82%] 992px:w-full mx-auto p-0 992px:h-[290px] 1024px:h-[290px] 1200px:h-[320px] 1366px:h-[390px] bg-white 992px:px-[40px]"
                style={{ direction: "rtl" }}
              >
                <div className="scrollable-content mt-2" style={{ direction: "ltr" }}>

                  <h3 className="text-[22px] font-bold leading-[1.6em] text-center mt-2.5 mb-5 480px:text-[26px] 992px:text-left 768px:mb-4 768px:leading-[1.6rem] font-montserrat">
                    Our Cash In Transit Services
                  </h3>

                  <p className="text-[16px] leading-[2rem] text-left 768px:mb-3 992px:mb-4 480px:mb-0 font-light font-montserrat">
                    What cash in transit service does your business need?
                    <button
                      className={`${isExpanded ? "hidden" : "inline"} 768px:hidden text-[#957433] text-[16px] font-bold font-[Montserrat] hover:underline`}
                      onClick={toggleContent}
                    >
                      Read More
                    </button>
                  </p>

                  <ContentScroll
                    isExpanded={isExpanded}
                    scrollData={servicesData}
                    toggleContent={toggleContent}
                  />

                </div>
              </ScrollableSection>
            </div>

            <div className="rightside-column pb-0 w-full 992px:w-1/2 mx-auto my-0">
              <VimeoLite videoId="312442368" />
            </div>

          </div>

        </div>

      </Container>
    </div>
  );
};

export default WelcomeSection;
