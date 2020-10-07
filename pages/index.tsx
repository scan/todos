import * as React from 'react';
import { NextPage } from 'next';

import Container from '@material-ui/core/Container';

import ToDoList from 'components/ToDoList';
import NewToDoButton from 'components/NewToDoButton';

const Index: NextPage = () => {
  return (
    <Container>
      <ToDoList />
      <NewToDoButton />
    </Container>
  );
};

export default Index;
