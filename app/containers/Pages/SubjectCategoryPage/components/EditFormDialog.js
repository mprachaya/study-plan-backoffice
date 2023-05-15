import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function EditFormDialog(props) {
  const { open, handleClose, mode } = props;
  const { formName, fieldValue, handleUpdate } = props;
  const { handleSnackbar } = props;

  const [state, setState] = useState({
    subjectCategoryId: fieldValue.subjectCategoryId,
    subjectCategoryName: fieldValue.subjectCategoryName,
  });

  const [validate, setValidate] = useState({
    subjectCategoryName: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
    // console.log(event.target.value);
  };

  const validationForm = () => {
    if (state.subjectCategoryName === '') {
      setValidate((pre) => ({
        ...pre, subjectCategoryName: true
      }));
    } else {
      handleUpdate(state);
      handleSnackbar('update');
    }
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
            id={'subjectCategoryName'}
            label={'category name'}
            name={'subjectCategoryName'}
            type={'text'}
            helperText={validate.subjectCategoryName ? 'please enter category name' : ''}
            error={validate.subjectCategoryName}
            value={state.subjectCategoryName}
            onChange={(e) => handleChange(e)}
            fullWidth />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => validationForm()} color="primary">
            {mode === 'edit' ? 'save change' : 'create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
EditFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  fieldValue: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleSnackbar: PropTypes.func.isRequired,
};
