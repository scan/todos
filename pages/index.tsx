import * as React from 'react';
import { NextPage } from 'next';

import Container from '@material-ui/core/Container';

import ToDoList from 'components/ToDoList';

const Index: NextPage = () => {
  return <Container>
    <ToDoList />
  </Container>;
};

export default Index;
