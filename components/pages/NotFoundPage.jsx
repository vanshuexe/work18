import { Fragment } from "react";
import SiteLink from "../SiteLink";
import site from "../../config/site";
import { cssStyle, formatDate } from "../../lib/presentation";

export default function NotFoundPage({} = {}) {
  return (
    <>
      <div
        className={
          "bg-gray-50 min-h-screen flex items-center justify-center px-4"
        }
        style={cssStyle("padding-top: 120px")}
      >
        <div className={"text-center"}>
          <h1
            className={
              "font-poppins text-3xl md:text-5xl font-bold text-gray-800 mb-4"
            }
          >
            Page not found
          </h1>
          <p className={"font-manrope text-sm md:text-lg text-gray-600 mb-8"}>
            The page you are looking for doesn't exist or has been moved.
          </p>
          <SiteLink
            href={"/"}
            className={
              "inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
            }
          >
            Back to Home
          </SiteLink>
        </div>
      </div>
    </>
  );
}
