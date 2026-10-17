import { Fragment } from "react";
import SiteLink from "./SiteLink";
import site from "../config/site";
import { cssStyle, formatDate } from "../lib/presentation";

export default function ProductCard({ product, visible = true } = {}) {
  const tags = product.tags || [];
  const tagRows = [];
  for (let i = 0; i < tags.length; i += 3) tagRows.push(tags.slice(i, i + 3));
  const searchText = [
    product.productNameEn,
    product.productCode,
    product.subcategoryEn,
    ...tags,
  ]
    .join(" ")
    .toLowerCase();
  return (
    <>
      <div
        id={`product-${product._id}`}
        data-product-card=""
        data-subcategory={product.subcategory._id}
        data-search={searchText}
        className={`product-card ${typeof visible !== "undefined" && visible === false ? "hidden" : ""} bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full`}
        style={cssStyle("border: 2px solid rgba(79, 39, 119, 0.3)")}
      >
        <div
          className={
            "h-40 md:h-56 bg-gray-100 flex items-center justify-center relative"
          }
          style={cssStyle("background-color: rgba(79, 39, 119, 0.05)")}
        >
          <img
            alt={product.productNameEn}
            loading={"lazy"}
            className={"object-contain absolute inset-0 w-full h-full p-2.5"}
            src={product.imageLink}
          />
        </div>
        <div className={"p-2 md:p-4 flex flex-col flex-grow"}>
          <div className={"relative mb-2"}>
            <h3
              className={
                "text-center font-bold text-gray-900 mb-1 text-xs sm:text-base md:text-xl lg:text-2xl font-manrope"
              }
            >
              {product.productNameEn}
            </h3>
          </div>
          {tagRows.length ? (
            <>
              <div
                className={
                  "mb-2 flex w-full flex-col items-center justify-center overflow-visible gap-3"
                }
              >
                {tagRows.map((row, index0) => {
                  return (
                    <Fragment key={index0}>
                      <div
                        className={
                          "flex w-full flex-nowrap items-start justify-center gap-x-3 overflow-visible"
                        }
                      >
                        {row.map((tag, index1) => {
                          return (
                            <Fragment key={index1}>
                              <div
                                className={
                                  "group/tag relative z-0 flex flex-col items-center gap-0.5 transition-transform duration-200 ease-out will-change-transform hover:z-10 hover:scale-[1.3]"
                                }
                              >
                                <div
                                  className={
                                    "flex h-7 w-7 items-center justify-center rounded-full border-2 p-0.5"
                                  }
                                  style={cssStyle(
                                    "border-color: rgba(79, 39, 119, 0.3)",
                                  )}
                                >
                                  <img
                                    src={site.tagIcon(tag)}
                                    alt={tag}
                                    className={
                                      "tag-icon h-5 w-5 object-contain"
                                    }
                                  />
                                </div>
                                <span
                                  className={
                                    "max-w-[4.5rem] text-center text-[8px] font-medium leading-tight"
                                  }
                                  style={cssStyle("color: rgb(79, 39, 119)")}
                                >
                                  {tag}
                                </span>
                              </div>
                            </Fragment>
                          );
                        })}
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </>
          ) : null}
          <div className={"mt-auto pt-3 flex gap-2"}>
            {product.pdfLinkEn ? (
              <a
                href={product.pdfLinkEn}
                download={""}
                className={
                  "flex-1 text-center py-1.5 md:py-2 px-2 md:px-3 rounded-xl md:rounded-2xl text-xs md:text-sm transition-colors border-2 font-medium flex items-center justify-center gap-1"
                }
                style={cssStyle(
                  "border-color: rgb(244, 116, 34); color: rgb(244, 116, 34); background-color: transparent",
                )}
              >
                TDS
                <svg
                  className={"w-4 h-4"}
                  fill={"none"}
                  stroke={"currentColor"}
                  viewBox={"0 0 24 24"}
                >
                  <path
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    strokeWidth={"2"}
                    d={
                      "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    }
                  ></path>
                </svg>
              </a>
            ) : null}
            <SiteLink
              href={"/#contact"}
              className={
                "flex-1 text-center py-1.5 md:py-2 px-2 md:px-3 rounded-xl md:rounded-2xl text-xs md:text-sm transition-colors border-2 font-medium"
              }
              style={cssStyle(
                "border-color: rgb(0, 0, 0); color: rgb(0, 0, 0); background-color: rgb(255, 255, 255)",
              )}
            >
              Interested?
            </SiteLink>
          </div>
        </div>
      </div>
    </>
  );
}
