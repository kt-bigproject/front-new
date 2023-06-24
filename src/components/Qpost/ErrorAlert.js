import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ErrorAlert({parentState}) {

  const [errorMessage, setErrorMessage] = parentState;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage(false);
  };

  return (
    <>
      {errorMessage && 
        <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={handleClose}>
          <Alert  onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            <strong>{errorMessage}</strong>
          </Alert>
        </Snackbar>
      }
    </>
  )
};