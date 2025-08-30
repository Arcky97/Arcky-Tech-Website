import { defaultRules, inlineRegex } from "simple-markdown";
import { MarkdownRule } from "../helpers";

export const strikthrough: MarkdownRule = {
  ...defaultRules.del,
  match: inlineRegex(/^~~([\S\s]+?)~~(?!_)/)
};