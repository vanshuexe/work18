// Banner used at the top of content pages (same look as the Careers page header).
export default function PageBanner({ image, title, tagline, tall = false, as: Tag = "h2" }) {
  return (
    <div
      className={`relative mx-auto flex w-full max-w-[1500px] items-center justify-center rounded-xl bg-cover bg-center bg-no-repeat ${tall ? "min-h-[260px] md:min-h-[340px]" : "min-h-[200px] md:min-h-[240px]"}`}
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="absolute inset-0 rounded-xl bg-black/40" />
      <div className="relative z-10 px-4 py-10 text-center text-white">
        <Tag className="font-poppins text-3xl font-bold md:text-4xl lg:text-5xl">{title}</Tag>
        {tagline && <p className="mx-auto mt-3 max-w-2xl text-sm opacity-90 sm:text-base lg:text-lg">{tagline}</p>}
      </div>
    </div>
  );
}
