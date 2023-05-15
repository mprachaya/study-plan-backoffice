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
import { makeStyles } from 'tss-react/mui';

export default function CreateFormDialog(props) {
  const { open, handleClose, mode } = props;
  const { curriculumSelection, facultySelection, GroupSelection } = props;
  const { handleSnackbar, handleCreate } = props;
  const [validate, setValidate] = useState({
    curriculum_name_th: false,
    curriculum_name_en: false,
    curriculum_year: false,
  });

  const [state, setState] = useState({
    student_cur_group_id: 1,
    faculty_id: 3,
    curriculum_name_th: '',
    curriculum_name_en: '',
    curriculum_year: '',
    ref_curriculum_id: 3,
  });

  const useStyles = makeStyles()((theme) => ({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 180,
    },
  }));

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const {
    classes
  } = useStyles();

  const validationForm = () => {
    if (state.curriculum_name_th === '') {
      setValidate((pre) => ({
        ...pre, curriculum_name_th: true
      }));
    } else if (state.curriculum_name_en === '') {
      setValidate((pre) => ({
        ...pre, curriculum_name_en: true
      }));
    } else if (state.curriculum_year === '') {
      setValidate((pre) => ({
        ...pre, curriculum_year: true
      }));
    } else {
      handleCreate(state);
      handleSnackbar('create');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Curriculum</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'curriculum_name_th'}
            name={'curriculum_name_th'}
            label={'NameTh*'}
            type={'text'}
            defaultValue=""
            value={state.curriculum_name_th}
            onChange={(e) => handleChange(e)}
            helperText={validate.curriculum_name_th ? 'please enter curriculum name(th)' : ''}
            error={validate.curriculum_name_th}
            fullWidth />

          <TextField
            variant="standard"
            margin="dense"
            id={'curriculum_name_en'}
            name={'curriculum_name_en'}
            label={'NameEn*'}
            type={'text'}
            defaultValue=""
            value={state.curriculum_name_en}
            onChange={(e) => handleChange(e)}
            helperText={validate.curriculum_name_en ? 'please enter curriculum name(en)' : ''}
            error={validate.curriculum_name_en}
            fullWidth />

          <FormControl variant="standard" margin="dense" fullWidth>
            <InputLabel htmlFor="group">Faculty*</InputLabel>
            <Select
              variant="standard"
              value={state.faculty_id}
              onChange={(e) => handleChange(e)}
              name={'faculty_id'}
              id={'faculty_id'}
              defaultValue={3}
              className={classes.selectEmpty}>
              {Object.values(facultySelection).map((faculty) => (
                <MenuItem key={faculty.faculty_id} value={faculty.faculty_id}>{faculty.faculty_name_th}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" margin="dense" fullWidth>
            <InputLabel htmlFor="group">Current Group*</InputLabel>
            <Select
              variant="standard"
              value={state.student_cur_group_id}
              onChange={(e) => handleChange(e)}
              name={'student_cur_group_id'}
              id={'student_cur_group_id'}
              defaultValue={1}
              className={classes.selectEmpty}>
              {Object.values(GroupSelection).map((group) => (
                <MenuItem key={group.student_cur_group_id} value={group.student_cur_group_id}>{group.group_name_th}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            variant="standard"
            margin="dense"
            id={'curriculum_year'}
            name={'curriculum_year'}
            label={'Curriculum Year*'}
            type={'number'}
            value={state.curriculum_year}
            onChange={(e) => handleChange(e)}
            helperText={validate.curriculum_year ? 'please enter curriculum year' : ''}
            error={validate.curriculum_year}
          />
          <FormControl variant="standard" margin="dense" fullWidth>
            <InputLabel htmlFor="duplicate">Duplicate Subjects*</InputLabel>
            <Select
              variant="standard"
              value={state.ref_curriculum_id}
              onChange={(e) => handleChange(e)}
              name={'ref_curriculum_id'}
              id={'ref_curriculum_id'}
              label={'คัดลอกวิชาในหลักสูตร'}
              className={classes.selectEmpty}
            >
              {Object.values(curriculumSelection).map((curriculum) => (
                <MenuItem key={curriculum.curriculum_id} value={curriculum.curriculum_id}>{curriculum.curriculum_name_th} {curriculum.curriculum_year}</MenuItem>
              ))}
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
  facultySelection: PropTypes.object.isRequired,
  GroupSelection: PropTypes.object.isRequired,
  handleSnackbar: PropTypes.func.isRequired,
  curriculumSelection: PropTypes.object.isRequired,
};
