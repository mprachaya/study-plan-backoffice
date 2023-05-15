import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function FormDialog(props) {
  // const [open, setOpen] = React.useState(false);
  const { open, handleClose, mode } = props;
  const { formName, fieldValue } = props;

  const [state, setState] = useState({
    id: fieldValue.id,
    nameTh: fieldValue.nameTh,
    nameEn: fieldValue.nameEn,
    faculty: fieldValue.faculty,
    group: fieldValue.group,
    year: fieldValue.year,
  });

  useEffect(() => {

  }, [open]);

  const handleChange = (event) => {
    const { value } = event.target.value;
    setState({
      ...state,
      [event.target.name]: value
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{formName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'nameTh'}
            label={'nameTh'}
            name={'nameTh'}
            type={'text'}
            value={state.nameTh}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'nameEn'}
            name={'nameEn'}
            label={'nameEn'}
            type={'text'}
            value={state.nameEn}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'faculty'}
            name={'faculty'}
            label={'faculty'}
            type={'text'}
            value={state.faculty}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'group'}
            name={'group'}
            label={'group'}
            type={'text'}
            value={state.group}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'year'}
            name={'year'}
            label={'year'}
            type={'text'}
            value={state.year}
            onChange={(e) => handleChange(e)}
            fullWidth />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary">
            {mode === 'edit' ? 'save change' : 'create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  fieldValue: PropTypes.array.isRequired,
};
