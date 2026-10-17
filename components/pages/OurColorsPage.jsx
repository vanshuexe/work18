import { Fragment } from "react";
import SiteLink from "../SiteLink";
import site from "../../config/site";
import { cssStyle, formatDate } from "../../lib/presentation";

export default function OurColorsPage({ colors } = {}) {
  // Black or white label text depending on how light the swatch is
  const labelColor = (hex) => {
    const n = parseInt(String(hex).replace("#", ""), 16);
    const lum =
      (0.299 * ((n >> 16) & 255) +
        0.587 * ((n >> 8) & 255) +
        0.114 * (n & 255)) /
      255;
    return lum > 0.6 ? "#000000" : "#ffffff";
  };
  const copyIcon = (
    <svg
      className={"w-4 h-4 text-gray-700"}
      fill={"none"}
      stroke={"currentColor"}
      viewBox={"0 0 24 24"}
    >
      <path
        strokeLinecap={"round"}
        strokeLinejoin={"round"}
        strokeWidth={"2"}
        d={
          "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
        }
      ></path>
    </svg>
  );
  const rainbow =
    "linear-gradient(45deg, #ef4444, #f97316, #84cc16, #22c55e, #14b8a6, #3b82f6, #8b5cf6)";
  return (
    <>
      <div className={"bg-gray-50 min-h-screen pb-6"} data-colors-page="">
        <div
          className={
            "relative flex flex-col md:flex-row gap-4 rounded-[20px] overflow-hidden p-3 md:p-4"
          }
          style={cssStyle(
            "width: 96%; margin: 12vh auto 0; min-height: 85vh; background-color: #f0f0f0; background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0, 0, 0, 0.01) 2px, rgba(0, 0, 0, 0.01) 4px), repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0, 0, 0, 0.03) 2px, rgba(0, 0, 0, 0.03) 4px)",
          )}
        >
          {/* Colour family filters */}
          <div
            className={
              "flex md:flex-col gap-2 md:gap-3 overflow-x-auto scrollbar-hide md:w-[180px] lg:w-[220px] flex-shrink-0 md:pt-6 md:px-4"
            }
          >
            <button
              type={"button"}
              data-color-filter={""}
              className={
                "color-filter is-active flex items-center gap-2 md:gap-3 flex-shrink-0 px-3 md:px-4 py-2 md:py-3 rounded-full bg-white transition-all duration-200"
              }
              style={cssStyle("border: 2px solid #e5e7eb")}
            >
              <span
                className={
                  "flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border border-white"
                }
                style={cssStyle(`background: ${rainbow}`)}
              ></span>
              <span
                className={
                  "text-xs md:text-sm font-medium text-black whitespace-nowrap"
                }
              >
                ALL COLORS
              </span>
            </button>
            {site.colorFamilies.map((family, index0) => {
              return (
                <Fragment key={index0}>
                  <button
                    type={"button"}
                    data-color-filter={family.type}
                    data-label={family.label.toUpperCase()}
                    className={
                      "color-filter flex items-center gap-2 md:gap-3 flex-shrink-0 px-3 md:px-4 py-2 md:py-3 rounded-full transition-all duration-200"
                    }
                    style={cssStyle(
                      `border: 2px solid #e5e7eb; background-color: ${family.swatch}`,
                    )}
                  >
                    <span
                      className={
                        "flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white"
                      }
                    ></span>
                    <span
                      className={
                        "text-xs md:text-sm font-medium whitespace-nowrap"
                      }
                      style={cssStyle(`color: ${labelColor(family.swatch)}`)}
                    >
                      {family.label.toUpperCase()}
                    </span>
                  </button>
                </Fragment>
              );
            })}
          </div>

          {/* Colour grid */}
          <div
            className={
              "flex-1 flex flex-col bg-white rounded-2xl md:rounded-3xl overflow-hidden"
            }
            style={cssStyle("border: 2px solid #e5e7eb")}
          >
            <div
              className={
                "flex flex-col sm:flex-row items-center justify-center gap-3 px-4 pt-4 pb-2"
              }
            >
              <h1
                data-colors-heading=""
                className={
                  "text-base md:text-xl lg:text-2xl font-bold text-black text-center"
                }
              >
                ALL COLORS ({colors.length})
              </h1>
              <div
                data-selected-color=""
                className={
                  "hidden items-center gap-2 rounded-[20px] py-1.5 px-3"
                }
                style={cssStyle(
                  "background-color: #fef3e7; border: 2px solid #e5e7eb",
                )}
              >
                <span
                  data-selected-swatch=""
                  className={"w-5 h-5 rounded-full border border-white shadow"}
                ></span>
                <span
                  data-selected-name=""
                  className={"text-sm font-bold text-black"}
                ></span>
                <button
                  type={"button"}
                  data-copy-color=""
                  title={"Copy color code"}
                  className={
                    "inline-flex items-center justify-center p-1 bg-white/90 hover:bg-white rounded shadow-sm border border-gray-200 w-6 h-6"
                  }
                >
                  {copyIcon}
                </button>
              </div>
            </div>
            <div
              data-colors-scroll=""
              className={"flex-1 overflow-y-auto p-3 md:p-6"}
              style={cssStyle("max-height: 75vh")}
            >
              <div
                className={
                  "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1.5 md:gap-2"
                }
              >
                {colors.map((color, index1) => {
                  return (
                    <Fragment key={index1}>
                      <button
                        type={"button"}
                        data-swatch=""
                        data-type={color.colorType}
                        data-name={color.dataColorname}
                        data-hex={color.hexCode}
                        title={`${color.dataColorname} (${color.hexCode})`}
                        className={
                          "swatch rounded-md md:rounded-lg h-12 md:h-14 flex items-end justify-center pb-1 shadow-sm"
                        }
                        style={cssStyle(`background-color: ${color.hexCode}`)}
                      >
                        <span
                          className={
                            "text-[9px] sm:text-[10px] md:text-xs font-medium leading-tight"
                          }
                          style={cssStyle(
                            `color: ${labelColor(color.hexCode)}`,
                          )}
                        >
                          {color.dataColorname}
                        </span>
                      </button>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
