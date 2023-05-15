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
    studentGroupId: fieldValue.studentGroupId,
    groupNameTh: fieldValue.groupNameTh,
    groupNameEn: fieldValue.groupNameEn,
    groupShortNameTh: fieldValue.groupShortNameTh,
    groupShortNameEn: fieldValue.groupShortNameEn,
  });

  const [validate, setValidate] = useState({
    group_name_th: false,
    group_name_en: false,
    group_short_name_th: false,
    group_short_name_en: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const validationForm = () => {
    if (state.groupNameTh === '') {
      setValidate((pre) => ({
        ...pre, group_name_th: true
      }));
    } else if (state.groupNameEn === '') {
      setValidate((pre) => ({
        ...pre, group_name_en: true
      }));
    } else if (state.groupShortNameTh === '') {
      setValidate((pre) => ({
        ...pre, group_short_name_th: true
      }));
    } else if (state.groupShortNameEn === '') {
      setValidate((pre) => ({
        ...pre, group_short_name_en: true
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
            id={'groupNameTh'}
            label={'nameTh'}
            name={'groupNameTh'}
            type={'text'}
            helperText={validate.group_name_th ? 'please enter group name(th)' : ''}
            error={validate.group_name_th}
            value={state.groupNameTh}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            margin="dense"
            id={'groupNameEn'}
            name={'groupNameEn'}
            label={'nameEn'}
            type={'text'}
            value={state.groupNameEn}
            error={validate.group_name_en}
            helperText={validate.group_name_en ? 'please enter group name(en)' : ''}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            margin="dense"
            id={'groupShortNameTh'}
            name={'groupShortNameTh'}
            label={'group short name Th'}
            type={'text'}
            value={state.groupShortNameTh}
            error={validate.group_short_name_th}
            helperText={validate.group_short_name_th ? 'please enter group short name(th)' : ''}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            margin="dense"
            id={'groupShortNameEn'}
            name={'groupShortNameEn'}
            label={'group short name En'}
            type={'text'}
            value={state.groupShortNameEn}
            error={validate.group_short_name_en}
            helperText={validate.group_short_name_en ? 'please enter group short name(en)' : ''}
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
