import { Callout } from "../Callout"
import { InlineCode } from "../CodeBlock"
import { TextColor } from "../TextColor"

export const DocsPokeMarketSpeeches = ({speech}: {speech: string}) => {
  return (
    <>
      <br/>
      <p className="text-white text-base font-normal text-left">Just like with <InlineCode>IntroText</InlineCode>, you can define multiple entries, and the script will randomly choose one each time.</p>
      <Callout type="attention">
        Unlike <InlineCode>IntroText</InlineCode>, <InlineCode>{speech}</InlineCode> <strong><TextColor color="red-600">does not support</TextColor></strong> Time and Day variations — this is intentionally kept simpler.
      </Callout>
    </>
  )
}