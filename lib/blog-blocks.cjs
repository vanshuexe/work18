function blocksFromContent(content) {
  const paragraphs = String(content || "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return paragraphs.map((paragraph) => {
    const lines = paragraph.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.every((line) => /^[-•]\s+/.test(line))) {
      return {
        type: "list",
        ordered: false,
        items: lines.map((line) => line.replace(/^[-•]\s+/, "")),
        color: "",
      };
    }
    if (lines.every((line) => /^\d+[.)]\s+/.test(line))) {
      return {
        type: "list",
        ordered: true,
        items: lines.map((line) => line.replace(/^\d+[.)]\s+/, "")),
        color: "",
      };
    }
    return { type: "paragraph", text: paragraph, color: "", fontSize: "" };
  });
}

function prepareBlogsForEditor(value) {
  const blogs = { ...value };
  blogs.posts = (Array.isArray(value.posts) ? value.posts : []).map((post) => ({
    ...post,
    titleColor: post.titleColor || "",
    excerptColor: post.excerptColor || "",
    sections: (Array.isArray(post.sections) ? post.sections : []).map((section) => {
      const normalized =
        typeof section === "string"
          ? { title: "", image: "", content: section }
          : { ...section };
      normalized.titleColor = normalized.titleColor || "";
      normalized.blocks = Array.isArray(normalized.blocks)
        ? normalized.blocks
        : blocksFromContent(normalized.content);
      delete normalized.content;
      return normalized;
    }),
  }));
  return blogs;
}

module.exports = { blocksFromContent, prepareBlogsForEditor };
