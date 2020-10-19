import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../layout/main';
import SEO from '../components/SEO/SEO';
import Footer from '../components/Footer/Footer';
import config from '../../data/SiteConfig';

export interface Props {
  data: any;
  pageContext: any;
}

const NoteTemplate: FunctionComponent<Props> = (props) => {
  const { data, pageContext } = props;
  const { slug } = pageContext;
  const noteNode = data.markdownRemark;
  const note = noteNode.frontmatter;
  if (!note.id) {
    note.id = slug;
  }

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${note.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={noteNode} postSEO />
        <div>
          <h1>{note.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: noteNode.html }} />
          <div className="post-meta"></div>
          <Footer config={config} />
        </div>
      </div>
    </Layout>
  );
};

export default NoteTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query NoteBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        date
        category
      }
      fields {
        slug
        date
      }
    }
  }
`;
