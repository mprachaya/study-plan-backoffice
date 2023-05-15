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
    facultyId: fieldValue.facultyId,
    facultyNameTh: fieldValue.facultyNameTh,
    facultyNameEn: fieldValue.facultyNameEn,
  });

  const [validate, setValidate] = useState({
    faculty_name_th: false,
    faculty_name_en: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
    // console.log(event.target.value);
  };

  const validationForm = () => {
    if (state.facultyNameTh === '') {
      setValidate((pre) => ({
        ...pre, faculty_name_th: true
      }));
    } else if (state.facultyNameEn === '') {
      setValidate((pre) => ({
        ...pre, faculty_name_en: true
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
            id={'facultyNameTh'}
            label={'nameTh'}
            name={'facultyNameTh'}
            type={'text'}
            helperText={validate.faculty_name_th ? 'please enter curriculum name(th)' : ''}
            error={validate.faculty_name_th}
            value={state.facultyNameTh}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            margin="dense"
            id={'facultyNameEn'}
            name={'facultyNameEn'}
            label={'nameEn'}
            type={'text'}
            value={state.facultyNameEn}
            error={validate.faculty_name_en}
            helperText={validate.faculty_name_en ? 'please enter curriculum name(en)' : ''}
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
