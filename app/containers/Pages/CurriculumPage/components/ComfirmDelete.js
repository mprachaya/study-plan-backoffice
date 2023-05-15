import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

export default function ComfirmDelete(props) {
  const { header, nameTh, handleSnackbar } = props;
  const { open, handleClose, handleDelete } = props;
  const { year } = props;

  const deleteData = () => {
    handleSnackbar('delete');
    handleDelete();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {header}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ต้องการลบ {nameTh}({year}) ใช่หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={deleteData} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
ComfirmDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  nameTh: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSnackbar: PropTypes.func.isRequired,
};
