import React, { FunctionComponent, useState, useCallback } from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import NewToDoDialog from './NewToDoDialog';
import { useToDos } from '../provider/ToDoProvider';

const NewToDoButton: FunctionComponent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addToDo } = useToDos();

  const handleClose = useCallback(() => {
    setIsDialogOpen(false);
  }, [setIsDialogOpen]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    setIsDialogOpen(true);
  }, [setIsDialogOpen]);

  const handleSubmit = useCallback((msg: string) => {
    addToDo(msg);
  }, [addToDo]);

  return (
    <>
      <Fab color='primary' aria-label='add' onClick={ handleClick }>
        <AddIcon />
      </Fab>
      <NewToDoDialog
        open={ isDialogOpen }
        onClose={ handleClose }
        onSubmit={ handleSubmit }
      />
    </>
  )
};

export default NewToDoButton;
