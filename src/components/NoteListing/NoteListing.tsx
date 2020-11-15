import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { groupBy } from 'lodash';
import { Link } from 'gatsby';

export interface IProps {
  noteEdges: any;
}

const NoteListingWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 960px;
  margin: 0 auto;
  min-height: calc(100vh - 200px);

  & h1,
  h3 {
    font-family: 'PermanentMarker', Helvetica, Arial, sans-serif !important;
    text-decoration: underline;
    color: #d7f3fc;
  }

  & h1 {
    font-size: 3rem;
    padding: 0 0 2rem 0;
  }
  & h2 {
    padding: 1rem 0;
  }
`;

const CategoryList = styled.div`
  width: 100%;
  display: flex;

  & .note-title a {
    color: #d7f3fc;
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
      });
    });
    console.log(noteList);

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
      {Object.keys(notesByCategory).map((category: string) => {
        const noteList = notesByCategory[category];
        return (
          <>
            <h3>{category}</h3>
            <CategoryList>
              {noteList.map((note, index) => (
                <div className="note-title">
                  <Link to={note.path}>{note.title}</Link>
                </div>
              ))}
            </CategoryList>
          </>
        );
      })}
    </NoteListingWrapper>
  );
};

export default NoteListing;
