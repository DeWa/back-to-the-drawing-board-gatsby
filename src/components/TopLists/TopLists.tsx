import React, { FunctionComponent, useState } from 'react';
import styled from '@emotion/styled';
import { Transition, animated } from 'react-spring/renderprops';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import lists from './lists';

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

  & .tooltip {
    background: #f2f2f2;
    bottom: 100%;
    color: #1f1f1f;
    font-size: 0.75rem;
    display: block;
    left: -20px;
    margin-bottom: 15px;
    opacity: 0;
    padding: 0.25rem 0.75rem;
    pointer-events: none;
    position: absolute;
    width: 100%;
    transform: translateY(10px);
    transition: all 0.25s ease-out;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
  }

  /* This bridges the gap so you can mouse into the tooltip without it disappearing */
  & .tooltip:before {
    bottom: -20px;
    content: ' ';
    display: block;
    height: 20px;
    left: 0;
    position: absolute;
    width: 100%;
  }

  /* CSS Triangles - see Trevor's post */
  & .tooltip:after {
    border-left: solid transparent 10px;
    border-right: solid transparent 10px;
    border-top: solid #f2f2f2 10px;
    bottom: -10px;
    content: ' ';
    height: 0;
    left: 50%;
    margin-left: -13px;
    position: absolute;
    width: 0;
  }

  & .tooltipable {
    color: #18548c;
    font-weight: bold;
    cursor: pointer;
  }

  & li:hover > .tooltip {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0px);
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
      <Title>RANDOM TOP 5 LISTS</Title>
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
                  <>
                    <li
                      key={index}
                      className={list.tooltips[index] !== '' && 'tooltipable'}
                    >
                      {rank}
                      {list.tooltips[index] !== '' && (
                        <div className="tooltip">{list.tooltips[index]}</div>
                      )}
                    </li>
                  </>
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
