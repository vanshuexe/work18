import { Fragment } from "react";
import SiteLink from "../SiteLink";
import company from "../../config/company";
import site from "../../config/site";
import { cssStyle, formatDate } from "../../lib/presentation";

function getCategoryIcon(key) {
  switch (key) {
    case "interior":
      return (
        <svg
          className="w-4 h-4 text-amber-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
          <path d="M19 8v5a2 2 0 0 1-2 2h-5v5a2 2 0 0 1-2 2H8" />
          <path d="M7 17h2" />
        </svg>
      );
    case "exterior":
      return (
        <svg
          className="w-4 h-4 text-sky-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "industrial":
      return (
        <svg
          className="w-4 h-4 text-orange-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "inks":
      return (
        <svg
          className="w-4 h-4 text-fuchsia-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <circle cx="12" cy="15" r="2" />
        </svg>
      );
    default:
      return null;
  }
}

function ProductSectionCard({ tile }) {
  return (
    <SiteLink
      href={tile.href}
      aria-label={tile.label}
      className={"home-product-card cursor-pointer" + (tile.cover ? " home-product-card--cover" : "")}
    >
      <img
        alt={tile.label}
        width={404}
        height={571}
        loading="lazy"
        src={tile.image}
      />
      {tile.cover ? (
        <span className="home-product-card__label">
          {tile.label}
          <span className="home-product-card__arrow" aria-hidden="true">&rarr;</span>
        </span>
      ) : null}
    </SiteLink>
  );
}

function PaintGridCard({ paint, style, compact = false }) {
  if (!paint) return null;
  return (
    <SiteLink
      href={paint.href}
      className={
        "group relative flex flex-col justify-end rounded-2xl md:rounded-3xl overflow-hidden bg-gray-900 border border-gray-200/80 hover:border-blue-400 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer block w-full"
      }
      style={style}
    >
      {/* Background Image */}
      <img
        alt={paint.label}
        loading={"lazy"}
        className={
          "object-cover absolute inset-0 w-full h-full transform group-hover:scale-108 transition-transform duration-700 ease-out"
        }
        src={paint.image}
      />

      {/* Layered Gradient for Contrast */}
      <div
        className={
          "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-75 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none"
        }
      />

      {/* Top-Right Hover Action Arrow */}
      <div
        className={
          "absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 shadow-md"
        }
      >
        <svg
          className={"w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"}
          fill={"none"}
          stroke={"currentColor"}
          viewBox={"0 0 24 24"}
          strokeWidth={"2.5"}
        >
          <path
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            d={"M14 5l7 7m0 0l-7 7m7-7H3"}
          />
        </svg>
      </div>

      {/* Bottom Content Area */}
      <div className={compact ? "relative z-10 p-3 text-left" : "relative z-10 p-4 sm:p-5 md:p-6 text-left"}>
        <h3
          className={
            compact
              ? "font-poppins font-bold text-white text-sm sm:text-base leading-snug drop-shadow-md group-hover:text-blue-300 transition-colors"
              : "font-poppins font-bold text-white text-lg sm:text-xl lg:text-2xl drop-shadow-md group-hover:text-blue-300 transition-colors"
          }
        >
          {paint.label}
        </h3>
      </div>
    </SiteLink>
  );
}

export default function HomePage({ home, countries } = {}) {
  const paintBy = Object.fromEntries(home.paints.map((paint) => [paint.label, paint]));
  const aboutParagraphs = company.company.find((section) => section.title === "About Us").paragraphs;
  const sectionHeading =
    "sm:text-3xl font-bold font-poppins text-black text-2xl md:text-3xl lg:text-4xl";
  const sectionStyle =
    "flex-shrink: 0; padding-top: 2rem; padding-bottom: 2rem";
  const inputClass =
    "w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200";
  const labelClass =
    "block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2";
  return (
    <>
      <div className={"bg-white"}>
        <div className={"w-full"} style={cssStyle("overflow-x: hidden")}>
          <div
            className={"w-full"}
            style={cssStyle("display: flex; flex-direction: column")}
          >
            {/* Hero slider */}
            <div style={cssStyle("flex-shrink: 0")}>
              <div
                data-slider=""
                data-interval={"5000"}
              >
                <section className={"hero-slider-section"}>
                  {home.hero.slides.map((src, i) => {
                    return (
                      <Fragment key={i}>
                        <div
                          data-slide=""
                          className={`absolute inset-0 bg-white transition-opacity duration-700 ${i === 0 ? "opacity-100" : "opacity-0"}`}
                        >
                          <img
                            alt={`Slide ${i + 1}`}
                            loading={i === 0 ? "eager" : "lazy"}
                            src={src}
                          />
                        </div>
                      </Fragment>
                    );
                  })}
                  <SiteLink
                    href={home.hero.button.href}
                    className={"absolute inset-0 z-10"}
                    aria-label={"Explore Products"}
                  />
                  <div
                    className={
                      "absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2"
                    }
                  >
                  {home.hero.slides.map((src, i) => {
                    return (
                      <Fragment key={i}>
                        <button
                          type={"button"}
                          data-slide-dot=""
                          aria-label={`Show slide ${i + 1}`}
                          className={`hero-dot w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 ${i === 0 ? "bg-[#512178]" : "bg-white bg-opacity-70 hover:bg-opacity-100 shadow-sm"}`}
                        ></button>
                      </Fragment>
                    );
                  })}
                  </div>
                </section>
              </div>
            </div>

            {/* About Aeropolish Section */}
            <section className={"w-full bg-gray-200"}>
              <div className={"mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"}>
                <div className={"grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"}>
                  <div>
                    <p className={"text-sm font-bold uppercase tracking-[0.2em] text-[#f47422]"}>About us</p>
                    <h2 className={`${sectionHeading} mt-3`}>About Aeropolish</h2>
                    <div className={"mt-5 text-[15px] leading-[1.7] text-gray-700 sm:text-base"}>
                      {/* Mobile responsive only: concise 2-3 liner */}
                      <p className={"block sm:hidden leading-relaxed"}>
                        Aeropolish is an emerging Indian paint and coatings company delivering reliable, high-performance solutions for decorative, commercial, and industrial applications.
                      </p>
                      {/* Desktop: full descriptive paragraphs */}
                      <div className={"hidden sm:block space-y-4 leading-[1.8]"}>
                        {aboutParagraphs.slice(0, 2).map((text) => (
                          <p key={text}>{text}</p>
                        ))}
                      </div>
                    </div>
                    <SiteLink
                      href={"/about-us"}
                      className={"mt-5 sm:mt-7 inline-flex min-h-[44px] sm:min-h-[48px] items-center rounded-xl bg-[#512178] px-6 text-sm font-bold text-white transition-colors hover:bg-[#431b64]"}
                    >
                      Read more about us
                    </SiteLink>
                  </div>
                  <div className={"mx-auto flex w-full max-w-[460px] items-end justify-center gap-5 rounded-3xl bg-gradient-to-b from-[#f8f4fc] to-[#efe7f6] p-6 sm:p-8 sm:gap-7 relative"}>
                    <div className={"product-3d-wrapper"}>
                      <img
                        src={"/new-images/about-industrial-tin.png"}
                        alt={"Aeropolish industrial quick drying paint, 20 litre drum"}
                        className={"float-product-1 w-full h-auto object-contain select-none cursor-pointer"}
                        width={"900"}
                        height={"1000"}
                        loading={"lazy"}
                      />
                      <div className={"product-ground-shadow float-shadow-1"} />
                    </div>
                    <div className={"product-3d-wrapper"}>
                      <img
                        src={"/new-images/about-interior-bucket.png"}
                        alt={"Aeropolish premium interior paint, 20 litre bucket"}
                        className={"float-product-2 w-full h-auto object-contain select-none cursor-pointer"}
                        width={"900"}
                        height={"1000"}
                        loading={"lazy"}
                      />
                      <div className={"product-ground-shadow float-shadow-2"} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div
              className={"home-products-section py-8"}
              style={cssStyle(
                "flex-shrink: 0; padding-top: 2rem; padding-bottom: 2rem",
              )}
            >
              <div className={"w-[96%] sm:w-[98%] mx-auto max-w-7xl"}>
                <section className={"relative w-full h-full flex flex-col"}>
                  <div
                    className={
                      "w-full flex-1 flex flex-col justify-center"
                    }
                    style={cssStyle("max-width: none")}
                  >
                    <div className={"text-center mb-6 md:mb-10 px-2"}>
                      <h2
                        className={
                          "home-products-title text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-gray-900 tracking-tight mb-3"
                        }
                      >
                        Products
                      </h2>
                      <p
                        className={
                          "text-sm sm:text-base lg:text-lg font-manrope text-center text-gray-600 max-w-2xl mx-auto leading-relaxed"
                        }
                      >
                        Explore{" "}
                        <SiteLink
                          className={
                            "text-orange-500 hover:text-orange-600 font-semibold hover:underline transition-colors"
                          }
                          href={"/interior-paints"}
                        >
                          Decorative
                        </SiteLink>
                        {" and "}
                        <SiteLink
                          className={
                            "text-orange-500 hover:text-orange-600 font-semibold hover:underline transition-colors"
                          }
                          href={"/industrial-paints"}
                        >
                          Industrial
                        </SiteLink>{" "}
                        formulated for durability, color brilliance, and protection.
                      </p>
                    </div>

                    {/* Desktop: 3 Columns Grid */}
                    <div
                      className={
                        "hidden lg:grid grid-cols-3 gap-6 w-full"
                      }
                    >
                      {home.productTiles.map((tile, index0) => (
                        <ProductSectionCard
                          key={tile.label || index0}
                          tile={tile}
                        />
                      ))}
                    </div>

                    {/* Tablet: 2 Columns Grid */}
                    <div
                      className={
                        "hidden md:grid lg:hidden grid-cols-2 gap-5 w-full"
                      }
                    >
                      {home.productTiles.map((tile, index1) => (
                        <ProductSectionCard
                          key={tile.label || index1}
                          tile={tile}
                        />
                      ))}
                    </div>

                    {/* Mobile: Horizontal Snap Carousel */}
                    <div
                      className={"md:hidden relative w-full"}
                      data-product-carousel=""
                    >
                      <div
                        className={
                          "flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory scrollbar-hide"
                        }
                        id={"home-product-carousel-track"}
                        data-product-track=""
                      >
                        {home.productTiles.map((tile, index2) => (
                          <div
                            key={tile.label || index2}
                            data-product-slide=""
                            className={
                              "flex-shrink-0 w-[84vw] sm:w-[320px] snap-center"
                            }
                          >
                            <ProductSectionCard tile={tile} />
                          </div>
                        ))}
                      </div>
                      <div className={"product-carousel-controls"}>
                        <button
                          type={"button"}
                          data-product-scroll={"previous"}
                          aria-label={"Previous products"}
                          aria-controls={"home-product-carousel-track"}
                          className={"product-carousel-button"}
                        >
                          <svg
                            aria-hidden={"true"}
                            viewBox={"0 0 24 24"}
                            fill={"none"}
                            stroke={"currentColor"}
                            strokeWidth={"2"}
                            strokeLinecap={"round"}
                            strokeLinejoin={"round"}
                          >
                            <path d={"m15 18-6-6 6-6"} />
                          </svg>
                        </button>
                        <button
                          type={"button"}
                          data-product-scroll={"next"}
                          aria-label={"Next products"}
                          aria-controls={"home-product-carousel-track"}
                          className={"product-carousel-button"}
                        >
                          <svg
                            aria-hidden={"true"}
                            viewBox={"0 0 24 24"}
                            fill={"none"}
                            stroke={"currentColor"}
                            strokeWidth={"2"}
                            strokeLinecap={"round"}
                            strokeLinejoin={"round"}
                          >
                            <path d={"m9 18 6-6-6-6"} />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Special Paint Effects */}
            <div className={"w-full"} style={cssStyle(sectionStyle)}>
              <div className={"text-center mb-6 md:mb-10 px-2"}>
                <h2
                  className={
                    "text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-gray-900 tracking-tight mb-3"
                  }
                >
                  Special Paint Effects
                </h2>
              </div>

              <div
                className={
                  "relative w-[96%] sm:w-[98%] mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-gray-100"
                }
                style={cssStyle(
                  "height: clamp(420px, 55vh, 600px); min-height: 420px",
                )}
              >
                <div
                  className={
                    "relative overflow-hidden h-full w-full rounded-2xl md:rounded-3xl group"
                  }
                >
                  {/* Background Showcase Image */}
                  <img
                    alt={"Special Paint Effects"}
                    loading={"lazy"}
                    className={
                      "object-cover object-center absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    }
                    src={home.images.smart}
                  />

                  {/* Gradient Vignette over left side for crystal-clear readability */}
                  <div
                    className={
                      "absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 md:via-black/45 to-transparent pointer-events-none"
                    }
                  />

                  {/* Left Content Container */}
                  <div
                    className={
                      "relative z-10 h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-16 max-w-xl lg:max-w-2xl text-left"
                    }
                  >
                    <div>
                      {/* Golden Smart Logo */}
                      <div className={"mb-3"}>
                        <img
                          alt={"Smart"}
                          className={
                            "h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-lg"
                          }
                          src={"/prodcuts-bg/smart.png"}
                        />
                      </div>

                      {/* Heading */}
                      <h3
                        className={
                          "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins text-white leading-tight drop-shadow-md"
                        }
                      >
                        Crafted for Durable Elegance
                      </h3>

                      {/* Description */}
                      <p
                        className={
                          "text-xs sm:text-sm md:text-base text-gray-200 font-manrope mt-3 leading-relaxed drop-shadow"
                        }
                      >
                        Elevate any living room, bedroom, or feature wall with
                        light-reflecting metallics, velvet tactile softness, and
                        natural stone-wash textures.
                      </p>

                    </div>

                    {/* Bottom CTA Button */}
                    <div className={"pt-6"}>
                      <SiteLink
                        href={
                          "/interior-paints?subcategory=Special%20Effects%20(Smart%20)"
                        }
                        className={
                          "inline-flex items-center gap-3 px-6 py-3.5 rounded-xl md:rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 group/btn"
                        }
                      >
                        <span>Explore Smart Effects</span>
                        <span
                          className={
                            "w-7 h-7 rounded-full bg-white/25 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform"
                          }
                        >
                          <svg
                            className={"w-4 h-4 text-white"}
                            fill={"none"}
                            stroke={"currentColor"}
                            viewBox={"0 0 24 24"}
                            strokeWidth={"2.5"}
                          >
                            <path
                              strokeLinecap={"round"}
                              strokeLinejoin={"round"}
                              d={"M14 5l7 7m0 0l-7 7m7-7H3"}
                            />
                          </svg>
                        </span>
                      </SiteLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discover Your Perfect Shade (colour trends) */}
            <div className={"w-full"} style={cssStyle(sectionStyle)}>
              <div className={"text-center px-4 max-w-3xl mx-auto mb-6 sm:mb-8"}>
                <h2 className={sectionHeading}>Discover Your Perfect Shade</h2>
              </div>

              <div
                className={
                  "relative w-[96%] sm:w-[98%] mx-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-amber-900/10 group"
                }
                style={cssStyle(
                  "height: clamp(480px, 60vh, 650px); min-height: 480px",
                )}
              >
                <div
                  className={
                    "relative overflow-hidden h-full w-full rounded-2xl md:rounded-3xl"
                  }
                >
                  {/* Background Image */}
                  <img
                    alt={"Color Trends 2026 - Discover Your Perfect Shade"}
                    loading={"lazy"}
                    className={
                      "object-cover object-left md:object-center absolute inset-0 w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    }
                    src={home.images.shiny}
                  />

                  {/* Atmospheric Warm Gradient Overlay */}
                  <div
                    className={
                      "absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent md:bg-gradient-to-l md:from-[#2c150c]/90 md:via-[#2c150c]/55 md:to-transparent pointer-events-none"
                    }
                  />

                  {/* Right-aligned Content Card */}
                  <div
                    className={
                      "relative z-10 h-full w-full flex flex-col justify-end md:justify-center items-start p-6 sm:p-10 md:p-12 lg:p-16 max-w-xl lg:max-w-2xl md:ml-auto text-left"
                    }
                  >
                    {/* Shiny Logo */}
                    <div className={"mb-3 sm:mb-4"}>
                      <img
                        alt={"Shiny"}
                        className={
                          "h-9 sm:h-11 md:h-12 w-auto object-contain drop-shadow-md"
                        }
                        src={"/home/shiny.png"}
                      />
                    </div>

                    {/* Heading */}
                    <h3
                      className={
                        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins text-white leading-tight drop-shadow-md"
                      }
                    >
                      Mocha Mousse &amp; Earth Tones
                    </h3>

                    {/* Subtitle */}
                    <p
                      className={
                        "text-xs sm:text-sm md:text-base text-gray-100 font-manrope mt-2 sm:mt-3 leading-relaxed drop-shadow max-w-lg"
                      }
                    >
                      {"Explore Aeropolish Paints' signature 2026 forecast — a grounding palette of velvety mocha, sun-baked terracotta, and soft sandstone designed to bring warmth and harmony home."}
                    </p>

                    {/* Color Swatch Chips */}
                    <div
                      className={
                        "flex flex-wrap items-center gap-2 sm:gap-2.5 mt-5"
                      }
                    >
                      <div
                        className={
                          "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium hover:bg-black/55 transition-colors"
                        }
                      >
                        <span
                          className={
                            "w-3.5 h-3.5 rounded-full shadow-inner border border-white/60 flex-shrink-0"
                          }
                          style={cssStyle("background-color: #9E6D53")}
                        />
                        <span>Mocha Mousse</span>
                      </div>

                      <div
                        className={
                          "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium hover:bg-black/55 transition-colors"
                        }
                      >
                        <span
                          className={
                            "w-3.5 h-3.5 rounded-full shadow-inner border border-white/60 flex-shrink-0"
                          }
                          style={cssStyle("background-color: #C87D55")}
                        />
                        <span>Terracotta Warmth</span>
                      </div>

                      <div
                        className={
                          "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium hover:bg-black/55 transition-colors"
                        }
                      >
                        <span
                          className={
                            "w-3.5 h-3.5 rounded-full shadow-inner border border-white/60 flex-shrink-0"
                          }
                          style={cssStyle("background-color: #D4A373")}
                        />
                        <span>Soft Sandstone</span>
                      </div>

                      <div
                        className={
                          "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium hover:bg-black/55 transition-colors"
                        }
                      >
                        <span
                          className={
                            "w-3.5 h-3.5 rounded-full shadow-inner border border-white/60 flex-shrink-0"
                          }
                          style={cssStyle("background-color: #4A2E2B")}
                        />
                        <span>Velvet Espresso</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className={"pt-6"}>
                      <SiteLink
                        href={"/color-trends"}
                        className={
                          "inline-flex items-center gap-3 px-6 py-3.5 rounded-xl md:rounded-2xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 hover:from-amber-700 hover:to-amber-950 text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/40 hover:-translate-y-0.5 transition-all duration-300 group/btn"
                        }
                      >
                        <span>Explore NCS Color Trends 2026</span>
                        <span
                          className={
                            "w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform"
                          }
                        >
                          <svg
                            className={"w-4 h-4 text-white"}
                            fill={"none"}
                            stroke={"currentColor"}
                            viewBox={"0 0 24 24"}
                            strokeWidth={"2.5"}
                          >
                            <path
                              strokeLinecap={"round"}
                              strokeLinejoin={"round"}
                              d={"M14 5l7 7m0 0l-7 7m7-7H3"}
                            />
                          </svg>
                        </span>
                      </SiteLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stronger Paints, Brighter Results */}
            <div
              className={"w-full"}
              style={cssStyle("flex-shrink: 0; padding-top: 3rem; padding-bottom: 2rem")}
            >
              <div className={"w-[96%] sm:w-[98%] mx-auto"}>
                <section className={"relative w-full py-2 md:py-6"}>
                  <div
                    className={
                      "relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-b from-slate-50 via-gray-50/70 to-white border border-gray-200/80 p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm"
                    }
                  >
                    {/* Header with Eyebrow Badge, SVG Icon, Heading and Subtitle */}
                    <div className={"text-center max-w-3xl mx-auto mb-8 md:mb-12"}>
                      <h2 className={sectionHeading}>
                        Stronger Paints, Brighter Results
                      </h2>
                    </div>

                    {/* Mobile Carousel */}
                    <div
                      className={
                        "flex md:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
                      }
                    >
                      {home.paints.map((paint, index3) => (
                        <div
                          key={index3}
                          className={"flex-shrink-0 snap-center w-[290px] h-[400px]"}
                        >
                          <PaintGridCard paint={paint} style={cssStyle("height: 100%")} />
                        </div>
                      ))}
                    </div>

                    {/* Desktop Balanced 3-Column Magazine Grid */}
                    <div
                      className={
                        "hidden md:grid grid-cols-1 gap-4 lg:gap-5 lg:[grid-template-columns:30%_40%_30%]"
                      }
                    >
                      {/* Left Column: Interior (Full height) */}
                      <div>
                        <PaintGridCard
                          paint={paintBy["Royal Velvet Interior Emulsion"]}
                          style={cssStyle("height: clamp(520px, 62vh, 640px)")}
                        />
                      </div>

                      {/* Middle Column: 2 x 2 grid */}
                      <div className={"grid grid-cols-2 gap-4 lg:gap-5"}>
                        {[
                          "Easy Clean Washable Paint",
                          "Industrial Quick Drying Paint",
                          "Exterior Emulsion",
                          "Water Based Home Paint",
                        ].map((label) => (
                          <PaintGridCard
                            key={label}
                            compact
                            paint={paintBy[label]}
                            style={cssStyle("height: clamp(248px, 29.5vh, 308px)")}
                          />
                        ))}
                      </div>

                      {/* Right Column: Exterior (Full height matching the left column) */}
                      <div>
                        <PaintGridCard
                          paint={paintBy["Weather Shield Acrylic Paint"]}
                          style={cssStyle("height: clamp(520px, 62vh, 640px)")}
                        />
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <div className={"text-center pt-8 md:pt-10 pb-2"}>
                      <SiteLink
                        href={"/interior-paints"}
                        className={
                          "inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 hover:from-blue-700 hover:to-violet-800 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/35 hover:-translate-y-0.5 transition-all duration-300 group/btn"
                        }
                      >
                        <span>Explore Our Paints</span>
                        <span
                          className={
                            "w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform"
                          }
                        >
                          <svg
                            className={"w-4 h-4 text-white"}
                            fill={"none"}
                            stroke={"currentColor"}
                            viewBox={"0 0 24 24"}
                            strokeWidth={"2.5"}
                          >
                            <path
                              strokeLinecap={"round"}
                              strokeLinejoin={"round"}
                              d={"M14 5l7 7m0 0l-7 7m7-7H3"}
                            />
                          </svg>
                        </span>
                      </SiteLink>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Paint Gallery (videos) */}
            <div className={"w-full"} style={cssStyle(sectionStyle)}>
              <div className={"text-center px-4 max-w-3xl mx-auto mb-8 sm:mb-12"}>
                <h2 className={sectionHeading}>Aeropolish Paint Gallery</h2>
                <p className={"mt-3 text-sm sm:text-base font-manrope text-gray-600"}>
                  Watch walls come alive with colour, finish and craftsmanship.
                </p>
              </div>
              <div className={"w-[96%] sm:w-[98%] mx-auto max-w-5xl"}>
                <div
                  className={
                    "flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
                  }
                >
                  {[
                    { src: "/videos/stylish-wall-painting.mp4", title: "Stylish Wall Painting" },
                    { src: "/videos/wall-painting-1.mp4", title: "Wall Painting in Action" },
                    { src: "/videos/wall-painting-2.mp4", title: "Wall Painting Finish" },
                  ].map((video) => (
                    <figure
                      key={video.src}
                      className={
                        "flex-shrink-0 snap-center w-[72vw] sm:w-[280px] md:w-auto overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm"
                      }
                    >
                      <video
                        className={"block w-full aspect-[9/16] object-cover"}
                        src={video.src}
                        controls
                        playsInline
                        preload={"metadata"}
                        aria-label={video.title}
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className={"w-full"} style={cssStyle(sectionStyle)}>
              <div className={"text-center px-4 max-w-3xl mx-auto mb-8 sm:mb-12"}>
                <h2 className={sectionHeading}>Get in Touch with Aeropolish</h2>
              </div>

              <div className={"w-[96%] sm:w-[98%] mx-auto"}>
                <section id={"contact"} className={"w-full"}>
                  <div
                    className={
                      "relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white"
                    }
                  >
                    <div
                      data-contact-layout=""
                      className={"flex flex-col lg:flex-row h-full"}
                    >
                      {/* Left Column: Corporate Building & Direct Channels */}
                      <div
                        className={
                          "w-full lg:w-[42%] relative min-h-[440px] lg:min-h-[640px] flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden text-left"
                        }
                      >
                        {/* Background Building Image */}
                        <img
                          alt={"Aeropolish Headquarters Building"}
                          loading={"lazy"}
                          className={
                            "object-cover object-center absolute inset-0 w-full h-full"
                          }
                          src={home.images.contact}
                        />

                        {/* Rich Dark Vignette Overlay */}
                        <div
                          className={
                            "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/75 to-slate-900/40 pointer-events-none"
                          }
                        />

                        {/* Top Badge & Heading */}
                        <div className={"relative z-10"}>
                          <div
                            className={
                              "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm"
                            }
                          >
                            <span className={"w-2 h-2 rounded-full bg-emerald-400 animate-pulse"} />
                            <span>Aeropolish Corporate Office</span>
                          </div>

                          <h3
                            className={
                              "text-2xl sm:text-3xl lg:text-4xl font-extrabold font-poppins text-white leading-tight drop-shadow-md"
                            }
                          >
                            Let&apos;s Build Something Exceptional Together
                          </h3>

                          <p
                            className={
                              "text-xs sm:text-sm md:text-base text-gray-200 font-manrope mt-3 leading-relaxed drop-shadow"
                            }
                          >
                            Whether you need guidance on heavy-duty industrial coatings or want to explore our color visualizer for an interior project, our experts are here to help.
                          </p>
                        </div>

                        {/* Bottom Direct Channels */}
                        <div className={"relative z-10 space-y-3 pt-8"}>
                          <div
                            className={
                              "flex items-center gap-3.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white"
                            }
                          >
                            <div
                              className={
                                "w-10 h-10 rounded-lg bg-purple-600/60 flex items-center justify-center flex-shrink-0 text-white shadow-sm"
                              }
                            >
                              <svg
                                className={"w-5 h-5"}
                                fill={"none"}
                                stroke={"currentColor"}
                                viewBox={"0 0 24 24"}
                                strokeWidth={"2"}
                              >
                                <path
                                  strokeLinecap={"round"}
                                  strokeLinejoin={"round"}
                                  d={
                                    "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  }
                                />
                              </svg>
                            </div>
                            <div>
                              <div className={"text-[11px] text-gray-300 font-medium uppercase tracking-wider"}>
                                Call Toll-Free
                              </div>
                              <div className={"text-sm sm:text-base font-bold font-poppins text-white"}>
                                +91 1800 234 5678
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              "flex items-center gap-3.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white"
                            }
                          >
                            <div
                              className={
                                "w-10 h-10 rounded-lg bg-blue-600/60 flex items-center justify-center flex-shrink-0 text-white shadow-sm"
                              }
                            >
                              <svg
                                className={"w-5 h-5"}
                                fill={"none"}
                                stroke={"currentColor"}
                                viewBox={"0 0 24 24"}
                                strokeWidth={"2"}
                              >
                                <path
                                  strokeLinecap={"round"}
                                  strokeLinejoin={"round"}
                                  d={
                                    "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                  }
                                />
                              </svg>
                            </div>
                            <div>
                              <div className={"text-[11px] text-gray-300 font-medium uppercase tracking-wider"}>
                                Email Inquiries
                              </div>
                              <div className={"text-sm sm:text-base font-bold font-poppins text-white"}>
                                contact@aeropolish.com
                              </div>
                            </div>
                          </div>

                          <div
                            className={
                              "flex items-center gap-3.5 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white"
                            }
                          >
                            <div
                              className={
                                "w-10 h-10 rounded-lg bg-amber-600/60 flex items-center justify-center flex-shrink-0 text-white shadow-sm"
                              }
                            >
                              <svg
                                className={"w-5 h-5"}
                                fill={"none"}
                                stroke={"currentColor"}
                                viewBox={"0 0 24 24"}
                                strokeWidth={"2"}
                              >
                                <path
                                  strokeLinecap={"round"}
                                  strokeLinejoin={"round"}
                                  d={
                                    "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  }
                                />
                                <path
                                  strokeLinecap={"round"}
                                  strokeLinejoin={"round"}
                                  d={"M15 11a3 3 0 11-6 0 3 3 0 016 0z"}
                                />
                              </svg>
                            </div>
                            <div>
                              <div className={"text-[11px] text-gray-300 font-medium uppercase tracking-wider"}>
                                Corporate Campus
                              </div>
                              <div className={"text-xs sm:text-sm font-semibold font-manrope text-white"}>
                                Aeropolish Complex, Phase 2, Industrial Hub
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: High-End Contact Form */}
                      <div
                        className={
                          "w-full lg:w-[58%] bg-gradient-to-br from-white via-slate-50/60 to-purple-50/20 flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14"
                        }
                      >
                        <div className={"w-full max-w-2xl mx-auto text-left"}>
                          <div className={"mb-6 md:mb-8"}>
                            <h3
                              className={
                                "text-xl sm:text-2xl md:text-3xl font-extrabold font-poppins text-gray-900"
                              }
                            >
                              Send Us a Message
                            </h3>
                            <p
                              className={
                                "text-xs sm:text-sm md:text-base text-gray-600 font-manrope mt-1"
                              }
                            >
                              Fill out the form below and our technical advisory team will get in touch within 24 hours.
                            </p>
                          </div>

                          <form
                            data-contact-form=""
                            action={"/api/contact"}
                            method={"post"}
                            className={"space-y-4 md:space-y-5"}
                            noValidate
                          >
                            <div>
                              <label htmlFor={"name"} className={labelClass}>
                                Full Name
                              </label>
                              <div className={"relative"}>
                                <input
                                  type={"text"}
                                  id={"name"}
                                  name={"name"}
                                  required
                                  className={inputClass}
                                  placeholder={"e.g. John Doe"}
                                />
                              </div>
                            </div>

                            <div
                              className={
                                "grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
                              }
                            >
                              <div>
                                <label htmlFor={"city"} className={labelClass}>
                                  City / Location
                                </label>
                                <input
                                  type={"text"}
                                  id={"city"}
                                  name={"city"}
                                  required
                                  className={inputClass}
                                  placeholder={"e.g. Mumbai, Delhi, Bengaluru"}
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={"category"}
                                  className={labelClass}
                                >
                                  Product Interest
                                </label>
                                <select
                                  id={"category"}
                                  name={"category"}
                                  required
                                  className={inputClass}
                                >
                                  <option value={""}>Select product category</option>
                                  {home.contactCategories.map((c, index4) => {
                                    return (
                                      <Fragment key={index4}>
                                        <option value={c.value}>
                                          {c.label}
                                        </option>
                                      </Fragment>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>

                            <div
                              className={
                                "grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
                              }
                            >
                              <div>
                                <label
                                  htmlFor={"email"}
                                  className={labelClass}
                                >
                                  Email Address
                                </label>
                                <input
                                  type={"email"}
                                  id={"email"}
                                  name={"email"}
                                  required
                                  className={inputClass}
                                  placeholder={"name@example.com"}
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={"phone"}
                                  className={labelClass}
                                >
                                  Phone Number
                                </label>
                                <div className={"grid grid-cols-5 gap-2"}>
                                  <select
                                    defaultValue={home.defaultCountryCode}
                                    id={"countryCode"}
                                    name={"countryCode"}
                                    className={
                                      "col-span-2 px-2 py-2 md:py-3 text-xs md:text-sm border border-gray-300 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 outline-none transition-all duration-200 bg-white"
                                    }
                                  >
                                    {countries.map((c, index5) => {
                                      return (
                                        <Fragment key={index5}>
                                          <option value={c.code}>
                                            {c.flag} {c.code}
                                          </option>
                                        </Fragment>
                                      );
                                    })}
                                  </select>
                                  <input
                                    type={"tel"}
                                    id={"phone"}
                                    name={"phone"}
                                    required
                                    className={
                                      "col-span-3 px-3 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 outline-none transition-all duration-200 bg-white"
                                    }
                                    placeholder={"Phone number"}
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor={"message"}
                                className={labelClass}
                              >
                                How Can We Help You?
                              </label>
                              <textarea
                                id={"message"}
                                name={"message"}
                                rows={"4"}
                                required
                                className={`${inputClass} resize-none`}
                                placeholder={"Tell us about your project requirements or question..."}
                              ></textarea>
                            </div>

                            <div
                              data-form-status=""
                              className={"form-status hidden"}
                              role={"status"}
                            ></div>

                            <div className={"pt-2 md:pt-4"}>
                              <button
                                type={"submit"}
                                className={
                                  "inline-flex items-center justify-center gap-3 rounded-2xl font-bold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 text-white active:scale-95 shadow-xl shadow-purple-900/20 hover:shadow-2xl hover:shadow-purple-900/30 hover:-translate-y-0.5 w-full text-base sm:text-lg py-3.5 px-6"
                                }
                                style={cssStyle(
                                  "background: linear-gradient(to right, #512178, #6d28d9, #4c1d95)",
                                )}
                              >
                                <span>Send Message</span>
                                <svg
                                  className={"w-5 h-5 text-white"}
                                  fill={"none"}
                                  stroke={"currentColor"}
                                  viewBox={"0 0 24 24"}
                                  strokeWidth={"2"}
                                >
                                  <path
                                    strokeLinecap={"round"}
                                    strokeLinejoin={"round"}
                                    d={
                                      "M14 5l7 7m0 0l-7 7m7-7H3"
                                    }
                                  />
                                </svg>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
