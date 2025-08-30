import { createParser } from "./helpers";
import { autolink } from "./rules/autolinks";
import { blockQuote } from "./rules/blockQuote";
import { codeBlock } from "./rules/codeBlocks";
import { emphasis } from "./rules/emphasis";
import { escape } from "./rules/escape";
import { inlineCode } from "./rules/inlineCode";
import { lineBreak } from "./rules/lineBreak";
import { link } from "./rules/link";
import { mention } from "./rules/mention";
import { newline } from "./rules/newline";
import { paragraph } from "./rules/paragraph";
import { spoiler } from "./rules/spoiler";
import { strikthrough } from "./rules/strikthrough";
import { strong } from "./rules/strong";
import { text } from "./rules/text";
import { underline } from "./rules/underline";
import { url } from "./rules/url";

export const parsers = {
  content: createParser({
    autolink,
    blockQuote,
    codeBlock,
    emphasis,
    escape,
    inlineCode,
    lineBreak,
    link,
    mention,
    newline,
    paragraph,
    spoiler,
    strikthrough,
    strong,
    text,
    underline,
    url
  }),
  header: createParser({
    autolink,
    blockQuote,
    emphasis,
    escape,
    inlineCode,
    spoiler,
    strikthrough,
    strong,
    text,
    underline,
    url
  })
};