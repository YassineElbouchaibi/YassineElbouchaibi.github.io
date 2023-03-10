import * as React from "react"

import { Bio, Seo } from "@/components/common"
import Layout from "@/components/Layout"
import { PageProps } from "@/definitions"
import { graphql } from "gatsby"

const BlogIndex: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="About" />
        <div className="flex flex-col items-center w-full h-full">
          <Bio />
        </div>
        
      </Layout>
    )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`