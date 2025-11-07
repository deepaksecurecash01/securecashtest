"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const ContentScroll = ({ isExpanded, scrollData, toggleContent }) =>
{
  const [mounted, setMounted] = useState(false);

  // ✅ Avoid hydration mismatch by rendering only after mount
  useEffect(() =>
  {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevents SSR/UI mismatch entirely

  return (
    <ul className={`list-none ${isExpanded ? "block" : "hidden"}`}>
      {scrollData.map((data, index) => (
        <div
          key={data.id}
          className="item-box w-full mx-auto text-left mt-[40px]"
        >
          <h4 className="text-[20px] flex flex-row items-center gap-2 mb-4 leading-[1.6em] font-bold text-black font-montserrat">
            <Image
              className="h-[40px] w-auto"
              src={data.icon}
              alt={data.title.toLowerCase()}
              width={40}
              height={40}
            />
            {data.title}
          </h4>

          <p className="text-[16px] leading-[2rem] text-left font-light font-montserrat">
            {data.description}&nbsp;
            {index === scrollData.length - 1 && (
              <button
                className="inline text-[#957433] text-[16px] font-bold font-montserrat hover:underline"
                onClick={toggleContent}
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </p>
        </div>
      ))}
    </ul>
  );
};

export default ContentScroll;
