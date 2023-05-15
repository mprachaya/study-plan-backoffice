import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

export default function CreateFormDialog(props) {
  const { open, handleClose, mode } = props;
  const { handleSnackbar, handleCreate, SubjectTypeSelection } = props;
  const [validate, setValidate] = useState({
    groupTypeName: false,
  });

  const [state, setState] = useState({
    groupTypeName: '',
    subjectTypeId: Math.max(...SubjectTypeSelection.map(cate => cate.subject_type_id), 0),
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const validationForm = () => {
    if (state.groupTypeName === '') {
      setValidate((pre) => ({
        ...pre, groupTypeName: true
      }));
    } else {
      handleCreate(state);
      handleSnackbar('create');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Group Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'groupTypeName'}
            name={'groupTypeName'}
            label={'Type Name*'}
            type={'text'}
            defaultValue=""
            value={state.groupTypeName}
            onChange={(e) => handleChange(e)}
            helperText={validate.groupTypeName ? 'please enter group name' : ''}
            error={validate.groupTypeName}
            fullWidth />

          <FormControl variant="standard" margin="dense" sx={{ marginRight: 1 }} fullWidth>
            <InputLabel htmlFor="subjectTypeId">Subject Type</InputLabel>
            <Select
              variant="standard"
              value={state.subjectTypeId}
              onChange={(e) => handleChange(e)}
              name={'subjectTypeId'}
              id={'subjectTypeId'}
              defaultValue={''}>
              {SubjectTypeSelection !== undefined ? Object.values(SubjectTypeSelection).map((cateMenu) => (
                <MenuItem key={cateMenu.subject_type_id} value={cateMenu.subject_type_id}>{cateMenu.subject_type_name}</MenuItem>
              )) : null}
            </Select>
          </FormControl>

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
  SubjectTypeSelection: PropTypes.array.isRequired,
};
