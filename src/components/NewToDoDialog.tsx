import React, { FunctionComponent, useState, useCallback } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type Props = {
  onClose: () => void,
  onSubmit: (text: string) => void,
  open?: boolean
}

const NewToDoDialog: FunctionComponent<Props> = ({ onSubmit, onClose, open = false }) => {
  const [textValue, setTextValue] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  }, [setTextValue]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    onSubmit(textValue);
    setTextValue('');
    onClose();
  }, [onSubmit, onClose, textValue, setTextValue])

  const handleClose = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onClose();
  }, [onClose]);

  return (
    <Dialog open={ open }>
      <form onSubmit={ handleSubmit }>
        <DialogTitle>New ToDo</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new ToDo context below:</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='text'
            name='text'
            fullWidth
            label='ToDo Content'
            value={ textValue }
            onChange={ handleChange }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } type='button' color='secondary'>Cancel</Button>
          <Button type='submit' color='primary'>Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
};

export default NewToDoDialog;
