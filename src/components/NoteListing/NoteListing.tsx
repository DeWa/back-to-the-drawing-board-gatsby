import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { groupBy } from 'lodash';
import { Link } from 'gatsby';
import media from '../../helpers/media';

export interface IProps {
  noteEdges: any;
}

const NoteListingWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  min-height: calc(100vh - 200px);

  & h1,
  h3 {
    font-family: 'PermanentMarker', Helvetica, Arial, sans-serif !important;
  }

  & h1 {
    text-decoration: underline;
    color: #d7f3fc;
    font-size: 3rem;
    padding: 0 0 2rem 0;
  }

  & h3 {
    padding: 1rem 0;
  }

  ${media['lg']} {
    width: 1040px;
  }
`;

const NoteListingContent = styled.section`
  background: rgb(240, 240, 240);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  margin: 10px;
  border-radius: 5px;
  padding: 1rem 2rem 2rem 2rem;
  width: 100%;
  margin: 0 auto;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;

  ${media['lg']} {
    width: 1040px;
  }
`;

const CategoryList = styled.div`
  width: 100%;
  display: flex;

  & .note-title a {
    color: #000;
    font-family: 'Arvo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    text-decoration: none;
    font-size: 1.15rem;

    &:hover {
      color: #8fa3aa;
    }
  }
`;

interface NoteType {
  id: string;
  path: string;
  title: string;
  date: string;
  category: string;
  sources: string[];
}

const NoteListing: FunctionComponent<IProps> = (props) => {
  const getNotesByCategory = () => {
    const noteList: NoteType[] = [];

    props.noteEdges.forEach((noteEdge) => {
      noteList.push({
        id: noteEdge.node.id,
        path: noteEdge.node.fields.slug,
        title: noteEdge.node.frontmatter.title,
        date: noteEdge.node.fields.date,
        category: noteEdge.node.frontmatter.category,
        sources: noteEdge.node.frontmatter.sources,
      });
    });

    const notesByCategory = groupBy(
      noteList,
      (note: NoteType) => note.category
    );

    return notesByCategory;
  };
  const notesByCategory = getNotesByCategory();

  return (
    <NoteListingWrapper>
      <h1>Notes</h1>
      <NoteListingContent>
        {Object.keys(notesByCategory).map((category: string) => {
          const noteList = notesByCategory[category];
          return (
            <React.Fragment key={category}>
              <h3>{category}</h3>
              <CategoryList>
                {noteList.map((note, index) => (
                  <div key={note.id} className="note-title">
                    <Link to={note.path}>{note.title}</Link>
                  </div>
                ))}
              </CategoryList>
            </React.Fragment>
          );
        })}
      </NoteListingContent>
    </NoteListingWrapper>
  );
};

export default NoteListing;
