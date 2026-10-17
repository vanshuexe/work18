import { Fragment } from "react";
import SiteLink from "../SiteLink";
import site from "../../config/site";
import { cssStyle, formatDate } from "../../lib/presentation";

export default function NewsDetailPage({ post } = {}) {
  const backIcon = (size) => (
    <svg
      className={`${size}`}
      fill={"none"}
      stroke={"currentColor"}
      viewBox={"0 0 24 24"}
    >
      <path
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
        d={"M10 19l-7-7m0 0l7-7m-7 7h18"}
      ></path>
    </svg>
  );
  return (
    <>
      <div className={"min-h-screen bg-gray-50"}>
        <div className={"pt-20 bg-white"}>
          <div className={"container mx-auto px-4 py-12"}>
            <div className={"max-w-4xl mx-auto"}>
              <SiteLink
                className={
                  "inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-8 transition-colors duration-200"
                }
                href={"/news"}
              >
                {backIcon("w-4 h-4")}Back to News
              </SiteLink>
              {post.tags && post.tags.length ? (
                <>
                  <div className={"flex flex-wrap gap-2 mb-6"}>
                    {post.tags.map((tag, index0) => {
                      return (
                        <Fragment key={index0}>
                          <span
                            className={
                              "px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full"
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
              <h1
                className={
                  "sm:text-4xl lg:text-6xl font-poppins text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                }
              >
                {post.title}
              </h1>
              <div className={"flex items-center gap-6 text-gray-600 mb-8"}>
                <span className={"flex items-center gap-2"}>
                  <svg
                    className={"w-5 h-5"}
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
                  {post.author}
                </span>
                <span className={"flex items-center gap-2"}>
                  <svg
                    className={"w-5 h-5"}
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
                  {formatDate(post.datePublished)}
                </span>
              </div>
              <div
                className={
                  "relative h-64 md:h-96 w-full mb-8 rounded-2xl overflow-hidden"
                }
              >
                <img
                  alt={post.title}
                  className={"object-cover absolute inset-0 w-full h-full"}
                  src={post.mainImage}
                />
              </div>
              <div className={"bg-orange-50 p-6 rounded-2xl mb-8"}>
                <p
                  className={
                    "sm:text-base lg:text-xl font-manrope text-[13px] md:text-lg text-gray-800 font-medium"
                  }
                >
                  {post.briefText}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={"py-12"}>
          <div className={"container mx-auto px-4"}>
            <div className={"max-w-4xl mx-auto"}>
              {(post.sections || []).map((section, index1) => {
                return (
                  <Fragment key={index1}>
                    <div className={"mb-12"}>
                      {section.title ? (
                        <>
                          <h2
                            className={
                              "sm:text-3xl md:text-4xl lg:text-4xl font-poppins text-2xl font-bold text-gray-900 mb-6"
                            }
                          >
                            {section.title}
                          </h2>
                        </>
                      ) : null}
                      {section.image ? (
                        <>
                          <div
                            className={
                              "relative h-64 md:h-80 w-full mb-6 rounded-2xl overflow-hidden"
                            }
                          >
                            <img
                              alt={section.title || post.title}
                              loading={"lazy"}
                              className={
                                "object-cover absolute inset-0 w-full h-full"
                              }
                              src={section.image}
                            />
                          </div>
                        </>
                      ) : null}
                      <div className={"prose prose-lg max-w-none"}>
                        <p
                          className={
                            "sm:text-base lg:text-xl font-manrope text-[13px] md:text-base text-gray-700 leading-relaxed whitespace-pre-line"
                          }
                        >
                          {section.content}
                        </p>
                      </div>
                      {section.buttonText && section.buttonLink ? (
                        <>
                          <SiteLink
                            href={section.buttonLink}
                            className={
                              "inline-flex items-center gap-2 mt-6 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200"
                            }
                          >
                            {section.buttonText}
                          </SiteLink>
                        </>
                      ) : null}
                    </div>
                  </Fragment>
                );
              })}

              {post.extraImages && post.extraImages.length ? (
                <>
                  <div className={"mt-12"}>
                    <h2
                      className={
                        "sm:text-3xl md:text-4xl lg:text-4xl font-poppins text-2xl font-bold text-gray-900 mb-6"
                      }
                    >
                      Gallery
                    </h2>
                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                      {post.extraImages.map((src, i) => {
                        return (
                          <Fragment key={i}>
                            <div
                              className={
                                "relative h-64 rounded-2xl overflow-hidden"
                              }
                            >
                              <img
                                alt={`Gallery image ${i + 1}`}
                                loading={"lazy"}
                                className={
                                  "object-cover absolute inset-0 w-full h-full"
                                }
                                src={src}
                              />
                            </div>
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : null}

              <div className={"mt-12 text-center"}>
                <SiteLink
                  className={
                    "inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200 text-lg"
                  }
                  href={"/news"}
                >
                  {backIcon("w-5 h-5")}Back to All News
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
