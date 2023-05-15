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
    group_name_th: false,
    group_name_en: false,
    group_short_name_th: false,
    group_short_name_en: false,
  });

  const [state, setState] = useState({
    group_name_th: '',
    group_name_en: '',
    group_short_name_th: '',
    group_short_name_en: '',
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const validationForm = () => {
    if (state.group_name_th === '') {
      setValidate((pre) => ({
        ...pre, group_name_th: true
      }));
    } else if (state.group_name_en === '') {
      setValidate((pre) => ({
        ...pre, group_name_en: true
      }));
    } else if (state.group_short_name_th === '') {
      setValidate((pre) => ({
        ...pre, group_short_name_th: true
      }));
    } else if (state.group_short_name_en === '') {
      setValidate((pre) => ({
        ...pre, group_short_name_en: true
      }));
    } else {
      handleCreate(state);
      handleSnackbar('create');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Student Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'group_name_th'}
            name={'group_name_th'}
            label={'NameTh*'}
            type={'text'}
            defaultValue=""
            value={state.group_name_th}
            onChange={(e) => handleChange(e)}
            helperText={validate.group_name_th ? 'please enter group name(th)' : ''}
            error={validate.group_name_th}
            fullWidth />

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'group_name_en'}
            name={'group_name_en'}
            label={'NameEn*'}
            type={'text'}
            defaultValue=""
            value={state.group_name_en}
            onChange={(e) => handleChange(e)}
            helperText={validate.group_name_en ? 'please enter group name(en)' : ''}
            error={validate.group_name_en}
            fullWidth />

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'group_short_name_th'}
            name={'group_short_name_th'}
            label={'ShortNameTh*'}
            type={'text'}
            defaultValue=""
            value={state.group_short_name_th}
            onChange={(e) => handleChange(e)}
            helperText={validate.group_short_name_th ? 'please enter group short name(th)' : ''}
            error={validate.group_short_name_th}
            fullWidth />

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'group_short_name_en'}
            name={'group_short_name_en'}
            label={'ShortNameEn*'}
            type={'text'}
            defaultValue=""
            value={state.group_short_name_en}
            onChange={(e) => handleChange(e)}
            helperText={validate.group_short_name_en ? 'please enter group short name(en)' : ''}
            error={validate.group_short_name_en}
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
