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
            รายวิชานี้มีการกำหนดความสัมพันธ์กับรายวิชาอื่นคุณแน่ใจว่าต้องการลบ {nameTh} ใช่หรือไม่?
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
  handleDelete: PropTypes.func.isRequired,
  handleSnackbar: PropTypes.func.isRequired,
};
