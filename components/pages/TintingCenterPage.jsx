import { Fragment } from "react";
import SiteLink from "../SiteLink";
import site from "../../config/site";
import { cssStyle, formatDate } from "../../lib/presentation";

export default function TintingCenterPage({ centers, cities } = {}) {
  const heroImages = [
    "/new-images/tinting-1.svg",
    "/new-images/tinting-2.svg",
    "/new-images/tinting-3.svg",
  ];
  const selectClass =
    "w-full p-3 md:p-3.5 text-sm md:text-base border-2 border-purple-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 text-gray-800 font-medium shadow-sm";
  const pinIcon = (size) => (
    <svg
      className={`${size} text-purple-600 flex-shrink-0`}
      fill={"none"}
      stroke={"currentColor"}
      viewBox={"0 0 24 24"}
    >
      <path
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
        d={
          "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        }
      ></path>
      <path
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
        d={"M15 11a3 3 0 11-6 0 3 3 0 016 0z"}
      ></path>
    </svg>
  );
  const phoneIcon = (size) => (
    <svg
      className={`${size} text-purple-600 flex-shrink-0`}
      fill={"none"}
      stroke={"currentColor"}
      viewBox={"0 0 24 24"}
    >
      <path
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
        d={
          "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        }
      ></path>
    </svg>
  );
  const mapIcon = (size) => (
    <svg
      className={`${size} flex-shrink-0`}
      fill={"none"}
      stroke={"currentColor"}
      viewBox={"0 0 24 24"}
      strokeWidth={"2"}
    >
      <path
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        d={
          "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        }
      ></path>
    </svg>
  );
  return (
    <>
      <div className={"min-h-screen bg-gray-50 overflow-x-hidden"}>
        <div className={"w-full pb-8"}>
          <div
            data-slider=""
            data-interval={"5000"}
            className={
              "w-[96%] md:w-[98%] h-[40vh] md:h-[50vh] rounded-xl flex items-center justify-center relative overflow-hidden ml-[2%] md:ml-[1%] mr-[2%] md:mr-[1%]"
            }
            style={cssStyle("padding-top: calc(60px + 2vh); margin-top: 2vh")}
          >
            {heroImages.map((src, i) => {
              return (
                <Fragment key={i}>
                  <div
                    data-slide=""
                    className={`absolute inset-0 transition-opacity duration-1000 rounded-xl ${i === 0 ? "opacity-100" : "opacity-0"}`}
                  >
                    <img
                      alt={`Tinting Center ${i + 1}`}
                      loading={"lazy"}
                      className={
                        "object-cover rounded-xl absolute inset-0 w-full h-full"
                      }
                      src={src}
                    />
                  </div>
                </Fragment>
              );
            })}
            <div
              className={"absolute inset-0 bg-black bg-opacity-40 rounded-xl"}
            ></div>
            <div className={"relative z-10 text-center text-white px-4"}>
              <h1
                className={
                  "font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4"
                }
              >
                Tinting Centers
              </h1>
              <p
                className={
                  "font-manrope text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl opacity-90 mb-4 md:mb-6 px-2"
                }
              >
                Find our tinting centers near you
              </p>
            </div>
            <div
              className={
                "absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2"
              }
            >
              {heroImages.map((src, i) => {
                return (
                  <Fragment key={i}>
                    <button
                      type={"button"}
                      data-slide-dot=""
                      data-active-class={"bg-white"}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${i === 0 ? "bg-white" : "bg-white bg-opacity-50 hover:bg-opacity-75"}`}
                      aria-label={`Go to slide ${i + 1}`}
                    ></button>
                  </Fragment>
                );
              })}
            </div>
          </div>

          <div className={"py-12"}>
            <div
              id={"tinting-centers-section"}
              data-centers-page=""
              className={
                "flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 h-auto sm:h-[90vh] w-[96%] md:w-[98%] ml-[2%] md:ml-[1%] mr-[2%] md:mr-[1%]"
              }
            >
              <div
                className={
                  "w-full lg:w-[45%] flex flex-col border-2 border-gray-200 rounded-xl bg-gray-50 p-3 sm:p-4 shadow-md max-h-[50vh] sm:max-h-none lg:max-h-none"
                }
              >
                <div
                  className={
                    "rounded-xl shadow-md p-4 md:p-5 mb-4 space-y-4 border border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50/80 to-purple-100/60"
                  }
                >
                  <div className={"relative"}>
                    <input
                      data-center-search=""
                      type={"search"}
                      placeholder={"Search by name, city, area, or phone..."}
                      className={
                        "w-full p-3 md:p-3.5 pl-10 md:pl-12 text-sm md:text-base border-2 border-purple-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all shadow-sm"
                      }
                    />
                    <svg
                      className={
                        "absolute left-3 md:left-4 top-3.5 md:top-4 w-5 h-5 md:w-6 md:h-6 text-purple-600"
                      }
                      fill={"none"}
                      stroke={"currentColor"}
                      viewBox={"0 0 24 24"}
                    >
                      <path
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                        strokeWidth={"2"}
                        d={"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}
                      ></path>
                    </svg>
                  </div>
                  <div className={"grid grid-cols-2 gap-3 md:gap-4"}>
                    <select
                      data-center-city=""
                      aria-label={"City"}
                      className={selectClass}
                    >
                      <option value={""}>All Cities</option>
                      {cities.map((city, index0) => {
                        return (
                          <Fragment key={index0}>
                            <option value={city}>{city}</option>
                          </Fragment>
                        );
                      })}
                    </select>
                    <select
                      data-center-area=""
                      aria-label={"Area"}
                      disabled
                      className={selectClass}
                    >
                      <option value={""}>All Areas</option>
                    </select>
                  </div>
                </div>

                <div
                  className={
                    "flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide -mx-2 px-2"
                  }
                >
                  {centers.map((center, index1) => {
                    const place = [center.city, center.area]
                      .filter(Boolean)
                      .join(", ");
                    return (
                      <Fragment key={index1}>
                        <div
                          data-center=""
                          className={"center-card transition-all"}
                          data-city={center.city}
                          data-area={center.area}
                          data-search={[
                            center.name,
                            center.city,
                            center.area,
                            center.phone,
                          ]
                            .join(" ")
                            .toLowerCase()}
                        >
                          <div
                            className={
                              "relative rounded-xl border border-purple-200 shadow-md hover:shadow-xl hover:border-purple-400 transition-all duration-300 overflow-hidden group bg-gradient-to-br from-purple-50 via-pink-50/80 to-purple-100/60"
                            }
                          >
                            <div className={"flex flex-col gap-3 p-3 md:p-4"}>
                              <h3
                                className={
                                  "text-base md:text-xl font-bold text-gray-900 leading-tight break-words"
                                }
                              >
                                {center.name}
                              </h3>
                              <div
                                className={
                                  "space-y-2 md:space-y-2.5 text-xs md:text-base text-gray-700"
                                }
                              >
                                <div
                                  className={
                                    "flex items-center gap-1.5 md:gap-2"
                                  }
                                >
                                  {pinIcon("w-3.5 h-3.5 md:w-5 md:h-5")}
                                  <span
                                    className={
                                      "font-semibold text-gray-800 break-words"
                                    }
                                  >
                                    {place}
                                  </span>
                                </div>
                                {center.phone ? (
                                  <>
                                    <div
                                      className={
                                        "flex items-center gap-1.5 md:gap-2"
                                      }
                                    >
                                      {phoneIcon("w-3.5 h-3.5 md:w-5 md:h-5")}
                                      <SiteLink
                                        href={`tel:${center.phone.replace(/\s+/g, "")}`}
                                        className={
                                          "text-blue-700 hover:text-blue-900 hover:underline font-semibold break-all"
                                        }
                                      >
                                        {center.phone}
                                      </SiteLink>
                                    </div>
                                  </>
                                ) : null}
                                {center.mapDirection ? (
                                  <>
                                    <div className={"pt-2 pb-1"}>
                                      <SiteLink
                                        href={center.mapDirection}
                                        target={"_blank"}
                                        rel={"noopener noreferrer"}
                                        className={
                                          "inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-lg font-semibold text-xs md:text-sm shadow-md hover:shadow-lg transition-all duration-200 w-full md:w-auto"
                                        }
                                        style={cssStyle("min-width: 140px")}
                                      >
                                        {mapIcon("w-3.5 h-3.5 md:w-4 md:h-4")}
                                        <span>View on Map</span>
                                      </SiteLink>
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                  <p
                    data-centers-empty=""
                    className={"hidden text-center text-gray-500 py-8"}
                  >
                    No tinting centers match your search.
                  </p>
                </div>
              </div>

              <div
                className={
                  "w-full lg:w-[55%] h-[50vh] sm:h-[60vh] lg:h-full rounded-xl overflow-hidden shadow-lg bg-gray-200"
                }
              >
                <iframe
                  src={
                    "https://www.google.com/maps/d/embed?mid=1LmRXFJ0khu3MkWGTwW5kL8xpf4A&ehbc=2E312F&ll=30.192618%2C31.45454399999999&z=14"
                  }
                  width={"100%"}
                  height={"100%"}
                  allowFullScreen
                  loading={"lazy"}
                  referrerPolicy={"no-referrer-when-downgrade"}
                  title={"Aeropolish Tinting Centers Map"}
                  style={cssStyle(
                    "border: 0; border-radius: 12px; min-height: 500px",
                  )}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
