import styled from "styled-components";
import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%',
      marginTop: theme.spacing(1),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#2196f3',
      '&:hover': {
         backgroundColor: '#2F80ED'
      }
   },
   link: {
      color: '#2196f3'
   }
}));

export const MessageBox = styled("div")<{err: any}>`
   position: relative;
   
   .message {
      text-align: center;
      position: absolute;
      width: 100%;
      top: 10px;
      color: ${props => props.err ? '#ff6347' : '#4cbb16'};
   }
`;
