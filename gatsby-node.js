/* eslint "no-console": "off" */

const path = require('path');
const _ = require('lodash');
const dayjs = require('dayjs');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    const collection = getNode(node.parent).sourceInstanceName;

    createNodeField({
      name: `slug`,
      node,
      value: `/${collection}${slug}`,
    });

    createNodeField({
      node,
      name: 'collection',
      value: collection,
    });

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
      const date = dayjs(node.frontmatter.date, 'DD-MM-YYYY');
      if (!date.isValid)
        console.warn(`WARNING: Invalid date.`, node.frontmatter);

      createNodeField({ node, name: 'date', value: date.toISOString() });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve('src/templates/post.tsx');
  const notePage = path.resolve('src/templates/note.tsx');
  const tagPage = path.resolve('src/templates/tag.tsx');
  const categoryPage = path.resolve('src/templates/category.tsx');
  const listingPage = path.resolve('./src/templates/listing.tsx');
  const indexPage = path.resolve('./src/pages/index.tsx');

  // Get a full list of markdown posts
  const postsMarkdownQueryResult = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { collection: { eq: "posts" } } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
              category
              date
            }
          }
        }
      }
    }
  `);
  if (postsMarkdownQueryResult.errors) {
    console.error(postsMarkdownQueryResult.errors);
    throw postsMarkdownQueryResult.errors;
  }

  // Get a full list of markdown notes
  const notesMarkdownQueryResult = await graphql(`
    {
      allMarkdownRemark(filter: { fields: { collection: { eq: "notes" } } }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
              category
              date
              sources
            }
          }
        }
      }
    }
  `);
  if (notesMarkdownQueryResult.errors) {
    console.error(notesMarkdownQueryResult.errors);
    throw notesMarkdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = postsMarkdownQueryResult.data.allMarkdownRemark.edges;

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = dayjs(postA.node.frontmatter.date, 'DD-MM-YYYY');

    const dateB = dayjs(postB.node.frontmatter.date, 'DD-MM-YYYY');

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Paging
  const postsPerPage = 7;
  if (postsPerPage) {
    const pageCount = Math.ceil(postsEdges.length / postsPerPage);

    [...Array(pageCount)].forEach((_val, pageNum) => {
      createPage({
        path: pageNum === 0 ? `/` : `/${pageNum + 1}/`,
        component: listingPage,
        context: {
          limit: postsPerPage,
          skip: pageNum * postsPerPage,
          pageCount,
          currentPageNum: pageNum + 1,
        },
      });
    });
  } else {
    // Load the index page instead
    createPage({
      path: `/`,
      component: indexPage,
    });
  }

  // Post page creating
  postsEdges.forEach((edge, index) => {
    // Generate a list of tags
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    // Generate a list of categories
    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category);
    }

    // Create post pages
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      },
    });
  });

  const notesEdges = notesMarkdownQueryResult.data.allMarkdownRemark.edges;

  // Note page creating
  notesEdges.forEach((edge, index) => {
    createPage({
      path: edge.node.fields.slug,
      component: notePage,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  //  Create tag pages
  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: { tag },
    });
  });

  // Create category pages
  categorySet.forEach((category) => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: { category },
    });
  });
};
