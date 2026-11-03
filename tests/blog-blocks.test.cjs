const { test } = require("node:test");
const assert = require("node:assert/strict");
const { blocksFromContent, prepareBlogsForEditor } = require("../lib/blog-blocks.cjs");

test("legacy blog copy becomes editable paragraph and list blocks", () => {
  assert.deepEqual(blocksFromContent("First paragraph.\n\n- One\n- Two\n\n1. First\n2. Second"), [
    { type: "paragraph", text: "First paragraph.", color: "", fontSize: "" },
    { type: "list", ordered: false, items: ["One", "Two"], color: "" },
    { type: "list", ordered: true, items: ["First", "Second"], color: "" },
  ]);
});

test("blog editor migration keeps existing section text and adds style controls", () => {
  const prepared = prepareBlogsForEditor({
    posts: [{
      title: "Test post",
      sections: [{ title: "Section", content: "Existing content" }],
    }],
  });
  const [post] = prepared.posts;
  assert.equal(post.titleColor, "");
  assert.equal(post.excerptColor, "");
  assert.equal(post.sections[0].titleColor, "");
  assert.deepEqual(post.sections[0].blocks, [
    { type: "paragraph", text: "Existing content", color: "", fontSize: "" },
  ]);
  assert.equal("content" in post.sections[0], false);
});
