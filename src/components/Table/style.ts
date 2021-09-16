import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  table: {
    minHeight: '100%',
    minWidth: 650,
    tableLayout: 'fixed',
    borderTop: '1px solid #e0e0e0',
    '& td ~ td, th ~ th': {
      borderLeft: '1px solid #e0e0e0',
    },
    '& td': {
      verticalAlign: 'top',
      overflow: 'hidden',
      padding: '8px 4px',
    },
  },
});
