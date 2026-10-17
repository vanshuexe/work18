import { Fragment } from "react";
import SiteLink from "../SiteLink";
import site from "../../config/site";
import { cssStyle, formatDate } from "../../lib/presentation";

export default function NewsPage({ posts } = {}) {
  const userIcon = (
    <svg
      className={"w-3 h-3 md:w-4 md:h-4"}
      fill={"none"}
      stroke={"currentColor"}
      viewBox={"0 0 24 24"}
    >
      <path
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
        d={
          "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        }
      ></path>
    </svg>
  );
  const calendarIcon = (
    <svg
      className={"w-3 h-3 md:w-4 md:h-4"}
      fill={"none"}
      stroke={"currentColor"}
      viewBox={"0 0 24 24"}
    >
      <path
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
        d={
          "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        }
      ></path>
    </svg>
  );
  return (
    <>
      <div className={"min-h-screen bg-gray-50"}>
        <div
          className={
            "relative text-center mb-12 h-[40vh] md:h-[50vh] flex items-center justify-center rounded-xl overflow-hidden w-[96%] sm:w-[98%] mx-auto"
          }
          style={cssStyle("padding-top: calc(60px + 2vh); margin-top: 2vh")}
        >
          <div className={"absolute inset-0"}>
            <img
              alt={""}
              className={"object-cover absolute inset-0 w-full h-full"}
              src={
                "https://storage.googleapis.com/pachin/about-us/hero/about-us-pachin.webp"
              }
            />
          </div>
          <div className={"absolute inset-0 bg-black bg-opacity-30"}></div>
          <div className={"relative z-10 text-white px-4"}>
            <h1
              className={
                "font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4"
              }
            >
              Latest News &amp; Updates
            </h1>
            <p
              className={
                "font-manrope text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto mb-4 md:mb-6 px-2"
              }
            >
              Stay informed with the latest news, updates, and insights from
              Aeropolish
            </p>
          </div>
        </div>

        <div className={"py-12"}>
          <div className={"space-y-0 w-full px-4 lg:px-0"}>
            {!posts.length ? (
              <>
                <p className={"text-center font-manrope text-gray-500 py-12"}>
                  No news available at the moment.
                </p>
              </>
            ) : null}
            {posts.map((post, i) => {
              const reversed = i % 2 === 1;
              return (
                <Fragment key={i}>
                  <article
                    className={`relative shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden rounded-2xl lg:rounded-none my-4 lg:my-0 flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} w-full`}
                  >
                    <div className={"lg:w-1/2 relative h-80 lg:h-96"}>
                      <img
                        alt={post.title}
                        loading={"lazy"}
                        className={
                          "object-cover absolute inset-0 w-full h-full"
                        }
                        src={post.mainImage}
                      />
                      <div
                        className={"absolute inset-0"}
                        style={cssStyle(
                          `background: linear-gradient(to ${reversed ? "right" : "left"}, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0) 100%)`,
                        )}
                      ></div>
                    </div>
                    <div
                      className={
                        "lg:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col justify-center bg-black text-white"
                      }
                    >
                      {post.tags && post.tags.length ? (
                        <>
                          <div
                            className={
                              "flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4"
                            }
                          >
                            {post.tags.map((tag, index0) => {
                              return (
                                <Fragment key={index0}>
                                  <span
                                    className={
                                      "px-2.5 md:px-3 py-1 bg-white/90 text-gray-800 text-xs md:text-sm font-medium rounded-full shadow-sm"
                                    }
                                  >
                                    {tag}
                                  </span>
                                </Fragment>
                              );
                            })}
                          </div>
                        </>
                      ) : null}
                      <h2
                        className={
                          "font-poppins text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4"
                        }
                      >
                        {post.title}
                      </h2>
                      <div
                        className={
                          "flex items-center gap-2 md:gap-4 text-xs md:text-sm text-white text-opacity-90 mb-4 md:mb-6 flex-wrap"
                        }
                      >
                        <span className={"flex items-center gap-1"}>
                          {userIcon}
                          {post.author}
                        </span>
                        <span className={"flex items-center gap-1"}>
                          {calendarIcon}
                          {formatDate(post.datePublished)}
                        </span>
                      </div>
                      <p
                        className={
                          "font-manrope text-xs sm:text-sm md:text-base lg:text-lg text-white text-opacity-90 mb-4 md:mb-6 leading-relaxed"
                        }
                      >
                        {post.briefText}
                      </p>
                      <div
                        className={"flex items-center gap-2 md:gap-3 flex-wrap"}
                      >
                        <SiteLink
                          className={
                            "inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-200 text-sm md:text-base lg:text-lg font-semibold"
                          }
                          href={`/news/${post._id}`}
                        >
                          Read More
                          <svg
                            className={"w-4 h-4 md:w-5 md:h-5"}
                            fill={"none"}
                            stroke={"currentColor"}
                            viewBox={"0 0 24 24"}
                          >
                            <path
                              strokeLinecap={"round"}
                              strokeLinejoin={"round"}
                              strokeWidth={"2"}
                              d={"M9 5l7 7-7 7"}
                            ></path>
                          </svg>
                        </SiteLink>
                      </div>
                    </div>
                  </article>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
