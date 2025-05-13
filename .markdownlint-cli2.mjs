import relativeLinksRule, { markdownIt } from "markdownlint-rule-relative-links"

const config = {
  config: {
    extends: "markdownlint/style/prettier",
    default: true,
    "relative-links": true,
    "no-duplicate-heading": false,
    "no-inline-html": false,
  },
  globs: ["**/*.md"],
  ignores: ["**/node_modules"],
  customRules: [relativeLinksRule],
  markdownItFactory: () => {
    return markdownIt
  },
}

export default config
