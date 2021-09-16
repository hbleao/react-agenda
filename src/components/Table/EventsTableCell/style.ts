import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  dayOfMonth: {
    fontWeight: 500,
    marginBottom: '4px',
  },
  eventClass: {
    display: 'block',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    margin: '4px 0',
  },
  bgDescription: {
    display: 'block',
    color: '#fff',
    padding: '4px',
    borderRadius: '4px',
  },
});
