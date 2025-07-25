import { InlineCode } from "../CodeBlock"

export const DocsShelfSpeeches = ({speech}: {speech: string}) => {
  return (
    <>
      <br/>
      <p className="text-white text-base font-normal text-left">Just like <InlineCode>IntroText</InlineCode> and any other <strong className="text-blue-300">Seller Class Speeches</strong>, <InlineCode>{speech}</InlineCode> allows you to define multiple entries, and the script will randomly choose one each time.</p>
      <br/>
    </>
  )
}