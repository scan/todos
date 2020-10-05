import React, { FunctionComponent, useCallback } from 'react';
import { formatRelative } from 'date-fns';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

type Props = {
  message: string;
  createdAt: Date;
  onRemove?: () => void;
}

const ToDoItem: FunctionComponent<Props> = ({ message, createdAt, onRemove }) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    if (onRemove) {
      onRemove();
    }
  }, [onRemove]);

  return (
    <Card variant='elevation'>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          { formatRelative(createdAt, new Date()) }
        </Typography>
        <Typography variant="h5" component="h2">
          { message }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={ handleClick }>
          Remove
        </Button>
      </CardActions>
    </Card>
  )
};

export default ToDoItem;
