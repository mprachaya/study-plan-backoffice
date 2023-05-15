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
  const { handleSnackbar, handleCreate, CategorySelection } = props;
  const [validate, setValidate] = useState({
    subjectTypeName: false,
  });

  const [state, setState] = useState({
    subjectTypeName: '',
    subjectCategoryId: Math.max(...CategorySelection.map(cate => cate.subject_category_id), 0),
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const validationForm = () => {
    if (state.subjectTypeName === '') {
      setValidate((pre) => ({
        ...pre, subjectTypeName: true
      }));
    } else {
      handleCreate(state);
      handleSnackbar('create');
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Subject Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>

          <TextField
            variant="standard"
            autoFocus
            margin="dense"
            id={'subjectTypeName'}
            name={'subjectTypeName'}
            label={'Type Name*'}
            type={'text'}
            defaultValue=""
            value={state.subjectTypeName}
            onChange={(e) => handleChange(e)}
            helperText={validate.subjectTypeName ? 'please enter type name' : ''}
            error={validate.subjectTypeName}
            fullWidth />

          <FormControl variant="standard" margin="dense" sx={{ marginRight: 1 }} fullWidth>
            <InputLabel htmlFor="subjectCategoryId">Category</InputLabel>
            <Select
              variant="standard"
              value={state.subjectCategoryId}
              onChange={(e) => handleChange(e)}
              name={'subjectCategoryId'}
              id={'subjectCategoryId'}
              defaultValue={''}>
              {CategorySelection !== undefined ? Object.values(CategorySelection).map((cateMenu) => (
                <MenuItem key={cateMenu.subject_category_id} value={cateMenu.subject_category_id}>{cateMenu.subject_category_name}</MenuItem>
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
  CategorySelection: PropTypes.array.isRequired,
};
