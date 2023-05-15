import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function CreateFormDialog(props) {
  const { open, handleClose, mode } = props;
  const { handleSnackbar, handleCreate } = props;
  const [validate, setValidate] = useState({
    subjectCategoryName: false,
  });

  const [state, setState] = useState({
    subjectCategoryName: '',
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const validationForm = () => {
    if (state.subjectCategoryName === '') {
      setValidate((pre) => ({
        ...pre, faculty_name_th: true
      }));
    } else {
      handleCreate(state);
      handleSnackbar('create');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Subject Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'subjectCategoryName'}
            name={'subjectCategoryName'}
            label={'Category Name*'}
            type={'text'}
            defaultValue=""
            value={state.subjectCategoryName}
            onChange={(e) => handleChange(e)}
            helperText={validate.subjectCategoryName ? 'please enter category name' : ''}
            error={validate.subjectCategoryName}
            fullWidth />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={validationForm} color="primary">
            {mode === 'edit' ? 'save change' : 'create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
CreateFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleSnackbar: PropTypes.func.isRequired,
};
