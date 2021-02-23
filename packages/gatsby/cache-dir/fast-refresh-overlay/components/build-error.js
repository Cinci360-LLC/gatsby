import * as React from "react"
import { Overlay, Header, Body, Footer, HeaderOpenClose } from "./overlay"
import { CodeFrame } from "./code-frame"
import { prettifyStack, openInEditor } from "../utils"

export function BuildError({ error }) {
  console.log({ buildError: error })
  // Incoming build error shape is like this:
  // ./relative-path-to-file
  // Additional information (sometimes empty line => handled in "prettifyStack" function)
  // /absolute-path-to-file
  // Errors/Warnings
  const [file, ...rest] = error.split(`\n`)
  const decoded = prettifyStack(rest)

  return (
    <Overlay>
      <Header data-gatsby-error-type="build-error">
        <div data-gatsby-overlay="header__cause-file">
          <h1 id="gatsby-overlay-labelledby">Failed to compile</h1>
          <span>{file}</span>
        </div>
        <HeaderOpenClose open={() => openInEditor(file, 1)} dismiss={false} />
      </Header>
      <Body>
        <h2>Source</h2>
        <CodeFrame decoded={decoded} />
      </Body>
      <Footer id="gatsby-overlay-describedby">
        This error occurred during the build process and can only be dismissed
        by fixing the error.
      </Footer>
    </Overlay>
  )
}
