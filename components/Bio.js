import React from "react";
import clsx from "clsx";
import Image from "./Image";
import { getSiteMetaData } from "utils/helpers";

export default function Bio({ className }) {
  const { author, social } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <Image
        className="flex-shrink-0 mb-0 mr-3 rounded-full w-14 h-14"
        src={require("../content/assets/thanhle.jpeg")}
        webpSrc={require("../content/assets/thanhle.jpeg?webp")}
        previewSrc={require("../content/assets/thanhle.jpeg?lqip")}
        alt="Profile"
      />
      <p className="text-base leading-7">
        Written by <b className="font-semibold">{author.name}</b>{" "}
        {author.summary}{" "}
        <a href={`https://twitter.com/${social.twitter}`}>
          Follow me on twitter
        </a>
      </p>
    </div>
  );
}
