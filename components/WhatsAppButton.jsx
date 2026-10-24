// WhatsApp glyph (24x24).
export const WhatsAppIcon = ({ className = "h-6 w-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.95 9.95 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.89.9-3-.2-.31a8.1 8.1 0 1 1 6.8 3.73Zm4.44-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06a6.6 6.6 0 0 1-1.95-1.2 7.3 7.3 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

export const whatsappLink = (contact, message = contact.whatsapp.message) =>
  `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`;

// Floating chat button shown on every page.
export default function WhatsAppButton({ contact }) {
  return (
    <a
      href={whatsappLink(contact)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Aeropolish on WhatsApp"
      className="whatsapp-float"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
