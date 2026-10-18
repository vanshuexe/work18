// Inline markup for long-form copy: **bold** and ==bold orange==.
export default function Rich({ text }) {
  return text.split(/(==[^=]+==|\*\*[^*]+\*\*)/).map((part, index) => {
    if (part.startsWith("==")) {
      return (
        <strong key={index} className="font-bold text-[#f47422]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("**")) {
      return (
        <strong key={index} className="font-bold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

// Wraps the given phrases of a text in bold ("**") or bold-orange ("==") markup.
export function mark(text, { bold = [], orange = [] } = {}) {
  let out = text;
  for (const phrase of bold) out = out.replace(phrase, `**${phrase}**`);
  for (const phrase of orange) out = out.replace(phrase, `==${phrase}==`);
  return out;
}
