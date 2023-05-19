import React, { useEffect, useState } from 'react';
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

export default function EditFormDialog(props) {
  const { open, handleClose } = props;
  const { formName, fieldValue, handleUpdate } = props;
  const { handleSnackbar, curriculumSelection } = props;

  const [state, setState] = useState({
    planId: fieldValue.planId,
    planName: fieldValue.planName,
    curriculumId: fieldValue.curriculumId,
    version: fieldValue.version,
  });

  const [validate, setValidate] = useState({
    planName: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
    // console.log(event.target.value);
  };

  const validationForm = () => {
    if (state.planName === '') {
      setValidate((pre) => ({
        ...pre,
        planName: true,
      }));
    } else {
      handleUpdate(state);
      handleSnackbar('update');
    }
  };

  useEffect(() => {
    if (open !== false) {
      setState((pre) => ({
        ...pre,
        planId: fieldValue.planId,
        planName: fieldValue.planName,
        curriculumId: fieldValue.curriculumId,
        version: fieldValue.version,
      }));
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{formName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>

          <TextField
            variant='standard'
            margin='dense'
            id={'planName'}
            label={'Plan Name'}
            name={'planName'}
            type={'text'}
            helperText={validate.planName ? 'please enter Plan Name' : ''}
            error={validate.planName}
            value={state.planName}
            onChange={(e) => handleChange(e)}
            fullWidth
          />
          <FormControl
            variant='standard'
            margin='dense'
            sx={{ marginRight: 1 }}>
            <InputLabel htmlFor='curriculumId'>Curriculum</InputLabel>
            <Select
              disabled
              variant='standard'
              value={state.curriculumId}
              onChange={(e) => handleChange(e)}
              name={'curriculumId'}
              id={'curriculumId'}>
              {curriculumSelection !== undefined
                ? Object.values(curriculumSelection).map((grpMenu) => (
                  <MenuItem
                    key={grpMenu.curriculum_id}
                    value={grpMenu.curriculum_id}>
                    {grpMenu.group_short_name_th
                    + ' '
                    + grpMenu.curriculum_year}
                  </MenuItem>
                ))
                : null}
            </Select>
          </FormControl>
          <TextField
            variant='standard'
            margin='dense'
            id={'version'}
            name={'version'}
            label={'Plan version'}
            type={'text'}
            value={state.version}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => validationForm()}
            color='primary'>
            save change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
EditFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  fieldValue: PropTypes.any,
  handleUpdate: PropTypes.func,
  handleSnackbar: PropTypes.func,
  curriculumSelection: PropTypes.array,
};
