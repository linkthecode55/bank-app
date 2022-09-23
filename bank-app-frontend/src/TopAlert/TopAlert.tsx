import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TopAlert() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState<AlertColor>('info');

  const handleClose = () => {
    setOpen(false);
  };

  const setAlertMessageAndOpen = (message: string, severity?: AlertColor) => {
    setMessage(message);
    if (severity) {
      setSeverity(severity);
    }
    setOpen(true);
  };

  return {
    TopAlertComponent: (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    ),
    setAlertMessageAndOpen,
  };
}
