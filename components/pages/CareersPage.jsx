import { Fragment } from "react";
import SiteLink from "../SiteLink";
import site from "../../config/site";
import { cssStyle, formatDate } from "../../lib/presentation";

export default function CareersPage({
  jobs,
  types,
  locations,
  departments,
  countries,
} = {}) {
  const selectClass =
    "appearance-none px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 bg-white border-2 border-gray-200 rounded-full text-xs md:text-sm lg:text-base xl:text-lg font-medium text-gray-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 w-full sm:min-w-[140px] md:min-w-[180px] lg:min-w-[220px]";
  const inputClass =
    "w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent outline-none";
  const icon = (d, size = "w-4 h-4") => (
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
        d={`${d}`}
      ></path>
    </svg>
  );
  const icons = {
    type: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    location:
      "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
    department:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    calendar:
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  };
  const filters = [
    { key: "type", label: "All Types", options: types },
    { key: "location", label: "All Locations", options: locations },
    { key: "department", label: "All Departments", options: departments },
  ];
  return (
    <>
      <div className={"bg-gray-50"}>
        <div className={"w-[98%] mx-auto pb-8"} data-careers-page="">
          <div
            className={
              "w-[96%] sm:w-[98%] h-[42vh] min-h-[260px] md:h-[55vh] lg:h-[60vh] rounded-xl bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
            }
            style={cssStyle(
              "padding-top: calc(60px + 1.5vh); margin-top: 1.5vh; background-image: url('/new-images/careers.svg')",
            )}
          >
            <div
              className={"absolute inset-0 bg-black bg-opacity-40 rounded-xl"}
            ></div>
            <div className={"relative z-10 text-center text-white px-4"}>
              <h1
                className={
                  "font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4"
                }
              >
                Careers
              </h1>
              <p
                className={
                  "font-manrope text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl opacity-90 mb-4 md:mb-6 px-2"
                }
              >
                Join our team and build the future of paint and coating
                solutions
              </p>
            </div>
          </div>

          <div className={"w-full py-4"}>
            <div
              className={
                "flex flex-col lg:flex-row gap-4 items-center mb-6 px-4 md:px-6 lg:px-[10%]"
              }
            >
              <div className={"flex-1 w-full lg:w-auto"}>
                <div className={"relative"}>
                  <input
                    data-job-search=""
                    placeholder={"Search job opportunities..."}
                    type={"search"}
                    className={
                      "w-full p-3 md:p-4 pl-10 md:pl-12 text-sm md:text-base lg:text-lg border-2 border-gray-200 rounded-2xl md:rounded-3xl focus:outline-none focus:border-gray-200 transition-colors"
                    }
                  />
                  <div
                    className={
                      "absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2"
                    }
                  >
                    <svg
                      className={"w-5 h-5 md:w-6 md:h-6 text-gray-400"}
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
                </div>
              </div>
              <div
                className={
                  "flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto"
                }
              >
                {filters.map((filter, index0) => {
                  return (
                    <Fragment key={index0}>
                      <div className={"relative w-full sm:w-auto"}>
                        <select
                          data-job-filter={filter.key}
                          aria-label={filter.label}
                          className={selectClass}
                        >
                          <option value={""}>{filter.label}</option>
                          {filter.options.map((option, index1) => {
                            return (
                              <Fragment key={index1}>
                                <option value={option}>{option}</option>
                              </Fragment>
                            );
                          })}
                        </select>
                        <svg
                          className={
                            "w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700"
                          }
                          fill={"none"}
                          stroke={"currentColor"}
                          viewBox={"0 0 24 24"}
                        >
                          <path
                            strokeLinecap={"round"}
                            strokeLinejoin={"round"}
                            strokeWidth={"2"}
                            d={"M19 9l-7 7-7-7"}
                          ></path>
                        </svg>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={"w-full pb-12"}>
            <div className={"w-full px-[10%]"}>
              <div className={"text-center mb-6 md:mb-8 px-2"}>
                <h2
                  data-jobs-heading=""
                  className={
                    "font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2"
                  }
                >
                  Job Opportunities ({jobs.length})
                </h2>
              </div>
              <div className={"space-y-6"}>
                {jobs.map((job, index2) => {
                  return (
                    <Fragment key={index2}>
                      <div
                        data-job=""
                        data-type={job.type}
                        data-location={job.location}
                        data-department={job.department}
                        data-search={[
                          job.title,
                          job.type,
                          job.location,
                          job.department,
                          job.description,
                        ]
                          .join(" ")
                          .toLowerCase()}
                        className={
                          "bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden w-full"
                        }
                      >
                        <div className={"p-4 md:p-6 lg:p-8"}>
                          <button
                            type={"button"}
                            data-job-toggle=""
                            aria-expanded={"false"}
                            className={
                              "w-full text-left flex flex-col sm:flex-row justify-between items-start gap-3"
                            }
                          >
                            <div className={"flex-1"}>
                              <h3
                                className={
                                  "text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2"
                                }
                              >
                                {job.title}
                              </h3>
                              <div
                                className={
                                  "flex flex-wrap items-center gap-2 md:gap-4 text-xs sm:text-sm text-gray-600"
                                }
                              >
                                {["type", "location", "department"].map(
                                  (key, index3) => {
                                    if (!job[key]) return null;
                                    return (
                                      <Fragment key={index3}>
                                        <span
                                          className={"flex items-center gap-1"}
                                        >
                                          {icon(icons[key])}
                                          {job[key]}
                                        </span>
                                      </Fragment>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                            <div
                              className={
                                "flex flex-col gap-1 text-xs text-gray-500"
                              }
                            >
                              {job.postedDate ? (
                                <>
                                  <span className={"flex items-center gap-1"}>
                                    {icon(icons.calendar, "w-3 h-3")}Posted:{" "}
                                    {formatDate(job.postedDate)}
                                  </span>
                                </>
                              ) : null}
                              {job.deadline ? (
                                <>
                                  <span className={"flex items-center gap-1"}>
                                    {icon(icons.clock, "w-3 h-3")}Deadline:{" "}
                                    {formatDate(job.deadline)}
                                  </span>
                                </>
                              ) : null}
                            </div>
                          </button>

                          <div
                            data-job-details=""
                            className={
                              "hidden mt-6 border-t border-gray-200 pt-6 space-y-4 text-sm md:text-base text-gray-700"
                            }
                          >
                            {job.description ? (
                              <>
                                <div>
                                  <h4
                                    className={
                                      "font-semibold text-gray-900 mb-1"
                                    }
                                  >
                                    Job Description
                                  </h4>
                                  <p className={"whitespace-pre-line"}>
                                    {job.description}
                                  </p>
                                </div>
                              </>
                            ) : null}
                            {job.requirements && job.requirements.length ? (
                              <>
                                <div>
                                  <h4
                                    className={
                                      "font-semibold text-gray-900 mb-1"
                                    }
                                  >
                                    Requirements:
                                  </h4>
                                  <ul className={"list-disc pl-5 space-y-1"}>
                                    {[]
                                      .concat(job.requirements)
                                      .map((r, index4) => {
                                        return (
                                          <Fragment key={index4}>
                                            <li>{r}</li>
                                          </Fragment>
                                        );
                                      })}
                                  </ul>
                                </div>
                              </>
                            ) : null}
                            {job.benefits && job.benefits.length ? (
                              <>
                                <div>
                                  <h4
                                    className={
                                      "font-semibold text-gray-900 mb-1"
                                    }
                                  >
                                    Benefits:
                                  </h4>
                                  <ul className={"list-disc pl-5 space-y-1"}>
                                    {[]
                                      .concat(job.benefits)
                                      .map((b, index5) => {
                                        return (
                                          <Fragment key={index5}>
                                            <li>{b}</li>
                                          </Fragment>
                                        );
                                      })}
                                  </ul>
                                </div>
                              </>
                            ) : null}
                            {job.experience ? (
                              <>
                                <p>
                                  <strong>Experience Required:</strong>{" "}
                                  {job.experience}
                                </p>
                              </>
                            ) : null}
                            {job.salary ? (
                              <>
                                <p>
                                  <strong>Salary:</strong> {job.salary}
                                </p>
                              </>
                            ) : null}

                            <form
                              data-apply-form=""
                              action={"/api/jobs/apply"}
                              method={"post"}
                              encType={"multipart/form-data"}
                              className={
                                "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4"
                              }
                            >
                              <input
                                type={"hidden"}
                                name={"jobId"}
                                defaultValue={job._id}
                              />
                              <input
                                name={"name"}
                                required
                                placeholder={"Name *"}
                                className={inputClass}
                              />
                              <input
                                name={"email"}
                                type={"email"}
                                required
                                placeholder={"Email *"}
                                className={inputClass}
                              />
                              <select
                                defaultValue={"+20"}
                                name={"countryCode"}
                                className={inputClass}
                              >
                                {countries.map((c, index6) => {
                                  return (
                                    <Fragment key={index6}>
                                      <option value={c.code}>
                                        {c.flag} {c.name} ({c.code})
                                      </option>
                                    </Fragment>
                                  );
                                })}
                              </select>
                              <input
                                name={"phone"}
                                type={"tel"}
                                required
                                placeholder={"Phone *"}
                                className={inputClass}
                              />
                              <label
                                className={
                                  "sm:col-span-2 text-sm text-gray-700"
                                }
                              >
                                CV (PDF or Word, max 5 MB) *
                                <input
                                  name={"cv"}
                                  type={"file"}
                                  required
                                  accept={".pdf,.doc,.docx"}
                                  className={"block mt-1 text-sm"}
                                />
                              </label>
                              <div
                                data-form-status=""
                                className={"form-status hidden sm:col-span-2"}
                                role={"status"}
                              ></div>
                              <button
                                type={"submit"}
                                className={
                                  "sm:col-span-2 rounded-full text-white font-semibold py-3 disabled:opacity-50"
                                }
                                style={cssStyle("background-color: #512178")}
                              >
                                Apply Now
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
              <div
                data-jobs-empty=""
                className={`${jobs.length ? "hidden" : ""} text-center py-8 md:py-12 px-2`}
              >
                <p
                  className={
                    "font-manrope text-xs sm:text-sm md:text-base lg:text-lg text-gray-500"
                  }
                >
                  {jobs.length
                    ? "No jobs found matching your search."
                    : "No job opportunities available at the moment."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
