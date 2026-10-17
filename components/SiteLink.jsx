import Link from "next/link";

export default function SiteLink({ href = "", children, ...props }) {
  if (
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.startsWith("/#") &&
    props.target !== "_blank"
  ) {
    return (
      <Link href={href} prefetch={false} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
