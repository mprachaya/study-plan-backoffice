import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function CreateFormDialog(props) {
  const { open, handleClose, mode } = props;
  const { handleSnackbar, handleCreate, refCurriculum } = props;
  const { groupSelection } = props;
  const [validate, setValidate] = useState({
    subject_code: false,
    subject_name_th: false,
    subject_name_en: false,
    credit_qty: false,
  });

  const [state, setState] = useState({
    curriculum_id: refCurriculum,
    group_type_id: 1,
    subject_code: '',
    subject_name_th: '',
    subject_name_en: '',
    credit_qty: 3,
    subject_description: '',
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const validationForm = () => {
    if (state.subject_code === '') {
      setValidate((pre) => ({
        ...pre, subject_code: true
      }));
    } else if (state.subject_name_th === '') {
      setValidate((pre) => ({
        ...pre, subject_name_th: true
      }));
    } else if (state.subject_name_en === '') {
      setValidate((pre) => ({
        ...pre, subject_name_en: true
      }));
    } else if (state.credit_qty === '') {
      setValidate((pre) => ({
        ...pre, credit_qty: true
      }));
    } else {
      handleCreate(state);
      handleSnackbar('create');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Subject {refCurriculum}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'subject_code'}
            label={'subject code'}
            name={'subject_code'}
            type={'text'}
            helperText={validate.subject_code ? 'please enter subject code' : ''}
            error={validate.subject_code}
            value={state.subject_code}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            margin="dense"
            id={'subject_name_th'}
            name={'subject_name_th'}
            label={'subject name (th)'}
            type={'text'}
            value={state.subject_name_th}
            error={validate.subject_name_th}
            helperText={validate.subject_name_th ? 'please enter subject name (th)' : ''}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            margin="dense"
            id={'subject_name_en'}
            name={'subject_name_en'}
            label={'subject name (en)'}
            type={'text'}
            value={state.subject_name_en}
            error={validate.subject_name_en}
            helperText={validate.subject_name_en ? 'please enter subject name (en)' : ''}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <FormControl variant="standard" margin="dense" sx={{ marginRight: 1 }}>
            <InputLabel htmlFor="group_type_id">Subject Group</InputLabel>
            <Select
              variant="standard"
              value={state.group_type_id}
              onChange={(e) => handleChange(e)}
              name={'group_type_id'}
              id={'group_type_id'}
            >
              {groupSelection !== undefined ? Object.values(groupSelection).map((grpMenu) => (
                <MenuItem key={grpMenu.group_type_id} value={grpMenu.group_type_id}>{grpMenu.group_type_name}</MenuItem>
              )) : null}
            </Select>

          </FormControl>
          <TextField
            sx={{ width: '20%' }}
            variant="standard"
            margin="dense"
            id={'credit_qty'}
            name={'credit_qty'}
            label={'credit'}
            type={'number'}
            value={state.credit_qty}
            error={validate.credit_qty}
            helperText={validate.credit_qty ? 'please enter credit' : ''}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            id={'subject_description'}
            name={'subject_description'}
            value={state.subject_description}
            multiline
            rows={3}
            margin='normal'
            variant='outlined'
            sx={{ width: '100%' }}
            onChange={(e) => handleChange(e)}
            defaultValue={state.subject_description}
          />

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
  refCurriculum: PropTypes.number.isRequired,
  groupSelection: PropTypes.array.isRequired,
};
