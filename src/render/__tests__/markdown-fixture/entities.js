React.createElement("root", null, React.createElement("paragraph", null, "Lots of entities are supported: ", " ", ", ", "&", ", ", "©", ", ", "Æ", ",\n", "Ď", ", ", "¾", ", ", "ℋ", ", ", "ⅆ", ",\n", "∲", ", &c.  Even some entities with a missing\nterminal semicolon are parsed correctly (as per the HTML5 spec):\n", "ÿ", ", ", "á", ", ", "©", ", and ", "&", "."), React.createElement("paragraph", null, "However, &MadeUpEntities; are kept in the document."), React.createElement("paragraph", null, "Entities even work in the language flag of fenced code blocks:"), React.createElement("code", null, "alert('Hello');\n"), React.createElement("paragraph", null, "Or in ", React.createElement("link", {
  "href": "~/some%E2%80%94file",
  "title": "in some plæce"
}, "l", "í", "nks")), React.createElement("paragraph", null, "Or in ", React.createElement("image", {
  "src": "~/an%E2%80%93image.png",
  "alt": "ímages",
  "title": "© Someone"
})), React.createElement("paragraph", null, "But, entities are not interpreted in ", React.createElement("inline-code", null, "inline c&ouml;de"), ", or in\ncode blocks:"), React.createElement("code", null, "C&Ouml;DE block.\n"))
