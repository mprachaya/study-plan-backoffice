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

export default function EditFormDialog(props) {
  // const [open, setOpen] = React.useState(false);
  const { open, handleClose, mode } = props;
  const { formName, fieldValue, handleUpdate } = props;
  const { facultySelection, GroupSelection } = props;
  const { handleSnackbar } = props;

  const [state, setState] = useState({
    curiculumId: fieldValue.curiculumId,
    facultyId: fieldValue.facultyId,
    studentCurGroupId: fieldValue.studentCurGroupId,
    curriculumNameTh: fieldValue.curriculumNameTh,
    curriculumNameEn: fieldValue.curriculumNameEn,
    year: fieldValue.year,
  });

  const [validate, setValidate] = useState({
    curriculum_name_th: false,
    curriculum_name_en: false,
    curriculum_year: false,
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

  const {
    classes
  } = useStyles();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
    // console.log(event.target.value);
  };

  const validationForm = () => {
    if (state.curriculumNameTh === '') {
      setValidate((pre) => ({
        ...pre, curriculum_name_th: true
      }));
    } else if (state.curriculumNameEn === '') {
      setValidate((pre) => ({
        ...pre, curriculum_name_en: true
      }));
    } else if (state.year === '') {
      setValidate((pre) => ({
        ...pre, curriculum_year: true
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
            id={'curriculumNameTh'}
            label={'nameTh'}
            name={'curriculumNameTh'}
            type={'text'}
            helperText={validate.curriculum_name_th ? 'please enter curriculum name(th)' : ''}
            error={validate.curriculum_name_th}
            value={state.curriculumNameTh}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <TextField
            variant="standard"
            margin="dense"
            id={'curriculumNameEn'}
            name={'curriculumNameEn'}
            label={'nameEn'}
            type={'text'}
            value={state.curriculumNameEn}
            error={validate.curriculum_name_en}
            helperText={validate.curriculum_name_en ? 'please enter curriculum name(en)' : ''}
            onChange={(e) => handleChange(e)}
            fullWidth />

          <FormControl variant="standard" margin="dense" fullWidth>
            <InputLabel htmlFor="faculty">Faculty</InputLabel>
            <Select
              variant="standard"
              value={state.facultyId}
              onChange={(e) => handleChange(e)}
              name={'facultyId'}
              id={'facultyId'}
              className={classes.selectEmpty}>
              {Object.values(facultySelection).map((faculty) => (
                <MenuItem key={faculty.faculty_id} value={faculty.faculty_id}>{faculty.faculty_name_th}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" margin="dense" fullWidth>
            <InputLabel htmlFor="group">Current Group</InputLabel>
            <Select
              defaultValue={-1}
              variant="standard"
              value={state.studentCurGroupId}
              onChange={(e) => handleChange(e)}
              name={'studentCurGroupId'}
              id={'studentCurGroupId'}
              label={'Group'}
              className={classes.selectEmpty}>
              {Object.values(GroupSelection).map((group) => (
                <MenuItem key={group.student_cur_group_id} value={group.student_cur_group_id}>{group.group_name_th}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            variant="standard"
            margin="dense"
            id={'year'}
            name={'year'}
            label={'year'}
            type={'number'}
            error={validate.curriculum_year}
            value={state.year}
            helperText={validate.curriculum_year ? 'please enter curriculum year' : ''}
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
  facultySelection: PropTypes.object.isRequired,
  GroupSelection: PropTypes.object.isRequired,
  handleSnackbar: PropTypes.func.isRequired,
};
