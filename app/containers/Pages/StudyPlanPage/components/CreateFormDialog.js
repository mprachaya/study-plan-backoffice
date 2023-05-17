import React, { useEffect, useState } from 'react';
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
  const { open, handleClose } = props;
  const { curriculum, data } = props;
  const { handleSnackbar } = props;
  // const { handleSnackbar, handleCreate, SubjectTypeSelection } = props;
  const [validate, setValidate] = useState({
    planName: false,
  });

  const [state, setState] = useState({
    planName: '',
    curriculumId: 0,
    version: 0,
  });

  const handleChange = (event, mode) => {
    if (mode !== 'curriculum') {
      setState({
        ...state,
        [event.target.name]: event.target.value
      });
    } else {
      const foundDuplicate = data.filter(ele => ele.curriculum_id === event.target.value);
      console.log(foundDuplicate);
      if (foundDuplicate) {
        setState({
          curriculumId: event.target.value,
          version: Math.max(...foundDuplicate.map(ele2 => ele2.study_plan_version), 0) + 1
        });
      } else {
        setState({
          ...state,
          [event.target.name]: event.target.value,
          version: 1
        });
      }
    }
  };

  useEffect(() => {
    if (open === true) {
      const foundDuplicate = data.filter(ele => ele.curriculum_id === Math.max(...curriculum.map(curri => curri.curriculum_id), 0));
      console.log(foundDuplicate);
      if (foundDuplicate) {
        setState({
          planName: '',
          curriculumId: Math.max(...curriculum.map(curri => curri.curriculum_id), 0),
          version: Math.max(...foundDuplicate.map(ele2 => ele2.study_plan_version), 0) + 1
        });
      } else {
        setState({
          planName: '',
          curriculumId: Math.max(...curriculum.map(curri => curri.curriculum_id), 0),
          version: 1
        });
      }
    }
  }, [open]);
  // useEffect(() => {
  // }, [state]);

  const validationForm = () => {
    if (state.planName === '') {
      setValidate((pre) => ({
        ...pre, planName: true
      }));
    } else {
      // handleCreate(state);
      handleSnackbar('create');
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Study Plan (มคอ.2)</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'planName'}
            name={'planName'}
            label={'Plan Name*'}
            type={'text'}
            value={state.planName || ''}
            onChange={(e) => handleChange(e)}
            helperText={validate.planName ? 'please enter plan name' : ''}
            error={validate.planName}
            fullWidth />

          <FormControl variant="standard" margin="dense" sx={{ marginRight: 1 }} fullWidth>
            <InputLabel htmlFor="curriculumId">Curriculum</InputLabel>
            <Select
              variant="standard"
              value={state.curriculumId}
              onChange={(e) => handleChange(e, 'curriculum')}
              name={'curriculumId'}
              id={'curriculumId'}
              defaultValue={''}>
              {curriculum !== undefined ? Object.values(curriculum).map((menu) => (
                <MenuItem key={menu.curriculum_id} value={menu.curriculum_id}>{menu.group_short_name_th + ' ' + menu.curriculum_year}</MenuItem>
              )) : null}
            </Select>
          </FormControl>
          <TextField
            disabled
            margin="dense"
            id="plsn"
            label="Version"
            value={state.version || ''}
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={validationForm} color="primary">
            {'create'}
          </Button>
          {/* <Button color="primary">
            {'create'}
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
CreateFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleCreate: PropTypes.func,
  handleSnackbar: PropTypes.func,
  SubjectTypeSelection: PropTypes.array,
  curriculum: PropTypes.array,
  data: PropTypes.any,
};
