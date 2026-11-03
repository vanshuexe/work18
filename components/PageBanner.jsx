// Banner used at the top of content pages (same look as the Careers page header).
export default function PageBanner({ image, mobileImage, title, tagline, tall = false, overlay = true, fitImage = false, className = "", as: Tag = "h2" }) {
  return (
    <div
      className={`relative mx-auto flex w-full max-w-[1500px] items-center justify-center overflow-hidden rounded-xl ${fitImage ? "" : "bg-cover bg-center bg-no-repeat"} ${fitImage ? "" : tall ? "min-h-[260px] md:min-h-[340px]" : "min-h-[200px] md:min-h-[240px]"} ${className}`}
      style={fitImage || mobileImage ? undefined : { backgroundImage: `url('${image}')` }}
    >
      {fitImage || mobileImage ? (
        <picture className={fitImage ? "block w-full" : "absolute inset-0"}>
          {mobileImage ? <source media="(max-width: 640px)" srcSet={mobileImage} /> : null}
          <img
            src={image}
            alt=""
            className={fitImage ? "block h-auto w-full" : "h-full w-full object-cover"}
          />
        </picture>
      ) : null}
      {overlay ? <div className="absolute inset-0 rounded-xl bg-black/40" /> : null}
      <div className={`${fitImage ? "absolute inset-0 flex flex-col items-center justify-center" : "relative"} z-10 px-4 py-10 text-center text-white`}>
        <Tag className="font-poppins text-3xl font-bold md:text-4xl lg:text-5xl">{title}</Tag>
        {tagline && <p className="mx-auto mt-3 max-w-2xl text-sm opacity-90 sm:text-base lg:text-lg">{tagline}</p>}
      </div>
    </div>
  );
}
