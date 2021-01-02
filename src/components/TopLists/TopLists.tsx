import React, { FunctionComponent, useState } from 'react';
import styled from '@emotion/styled';
import { Transition, animated } from 'react-spring/renderprops';

import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

const lists = [
  {
    title: 'Top 5 movies',
    list: [
      'Pulp Fiction',
      'Battle Royale',
      'saodoasidhasdas',
      'asdouasudhsaodhasoudhas',
      'asdpjsaiodjhsaiodj',
    ],
  },
  {
    title: 'Top 5 albums',
    list: [
      'Pulp Fiction',
      'Battle Royale',
      'saodoasidhasdas',
      'asdouasudhsaodhasoudhas',
      'asdpjsaiodjhsaiodj',
    ],
  },
  {
    title: 'Top 5 PS4 games',
    list: [
      'Pulp Fiction',
      'Battle Royale',
      'saodoasidhasdas',
      'asdouasudhsaodhasoudhas',
      'asdpjsaiodjhsaiodj',
    ],
  },
];
const Wrapper = styled.div``;
const Title = styled.h3`
  padding: 0.5rem 0;
  text-align: center;
`;
const List = styled.section`
  display: flex;
  justify-content: center;

  & ol {
    text-align: left;
    list-style-type: decimal;
    list-style-position: inside;
  }
`;
const ListTitle = styled.h4`
  font-weight: bold;
`;
const Arrow = styled.div`
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TopLists: FunctionComponent = () => {
  const [listStep, setListStep] = useState(0);
  const [prevAction, setPrevAction] = useState<'next' | 'prev'>('next');

  const list = lists[listStep];

  const nextList = () => {
    if (listStep + 1 === lists.length) {
      setListStep(0);
    } else {
      setListStep(listStep + 1);
    }
    setPrevAction('next');
  };
  const prevList = () => {
    if (listStep === 0) {
      setListStep(lists.length - 1);
    } else {
      setListStep(listStep - 1);
    }
    setPrevAction('prev');
  };

  return (
    <Wrapper>
      <Title>USELESS TOP 5 LISTS</Title>
      <List>
        <Arrow onClick={prevList}>
          <FaAngleLeft />
        </Arrow>
        <Transition
          items={listStep}
          from={{
            transform: `translateX(${
              prevAction === 'next' ? '-400px' : '400px'
            })`,
            opacity: 0,
            position: 'absolute',
          }}
          enter={{
            transform: 'translateX(0)',
            opacity: 1,
            position: 'static',
          }}
          leave={{
            transform: `translateX(${
              prevAction === 'next' ? '400px' : '-400px'
            })`,
            opacity: 0,
            position: 'absolute',
          }}
          unique
          native
          reset
        >
          {(index) => (props) => (
            <animated.div
              style={{
                width: '300px',
                textAlign: 'center',
                ...props,
              }}
            >
              <ListTitle>{list.title}</ListTitle>
              <ol>
                {list.list.map((rank, index) => (
                  <li key={index}>{rank}</li>
                ))}
              </ol>
            </animated.div>
          )}
        </Transition>
        <Arrow onClick={nextList}>
          <FaAngleRight />
        </Arrow>
      </List>
    </Wrapper>
  );
};

export default TopLists;
