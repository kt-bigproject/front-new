import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function DialogAlert({errorMessage, handleAgree, handleClose}) {
  
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <Alert severity="error" sx={{ width: 300 }}>
                {errorMessage}
            <DialogActions>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
            <CloseIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={handleAgree}
              sx={{
                position: 'absolute',
                right: 50,
                top: 8,
                color: '#d32f2f',
              }}
            >
            <DeleteRoundedIcon />
            </IconButton>
            {/* <Button onClick={handleAgree} autoFocus>삭제</Button> */}
            </DialogActions>            
          </Alert>
      </Dialog>
    </div>
  );
}
