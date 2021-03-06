import * as React from 'react';
import {connect} from "react-redux";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useStyles} from './style';

import Copyright from "./Copyright";
import {login} from "../ducks/authSaga";
import {AppState, ILoginParams, IUserData} from "../models";
import {MessageBox} from "./style";

type AuthProps = {
   login: (dataOfForm: ILoginParams) => void;
   loadingOfForm: boolean;
   errorMessage: string | {} | null;
   userData: IUserData | null;
}

const Auth: React.FC<AuthProps> = props => {
   const [email, setEmail] = React.useState<string>('');
   const [password, setPassword] = React.useState<string>('');
   const [hidden, setHidden] = React.useState<boolean>(true);
   const [inputError, setInputError] = React.useState<{email: boolean, password: boolean}>({
      email: false,
      password: false
   });
   const classes = useStyles();

   const {login, errorMessage, loadingOfForm, userData} = props;

   const handleSubmit = (event: { preventDefault: () => void; }): void => {
      event.preventDefault();

      if (email.length === 0 && password.length === 0) {
         setInputError({
            email: true,
            password: true
         })
      } else if (email.length === 0 && password.length !== 0) {
         setInputError({
            email: true,
            password: false
         })
      } else if (email.length !== 0 && password.length === 0) {
         setInputError({
            email: false,
            password: true
         })
      } else {
         setInputError({
            email: false,
            password: false
         });
         login({email, password});
      }
   };

   React.useEffect(() => {
      if (errorMessage) {
         setPassword('');
      }
   }, [errorMessage]);

   const RenderMessage = () =>
      (errorMessage) ? <p className="message">Ошибка входа. Проверьте данные и повторите попытку.</p> :
         (userData) ? <p className="message">Вы успешно авторизовались</p> : null;

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline/>
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
               Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
               <TextField
                  error={inputError.email}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Почта"
                  name="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  helperText="Обязательное поле"
                  autoFocus
               />
               <div className={classes.textFieldBox}>
                  <TextField
                     error={inputError.password}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Пароль"
                     type={hidden ? 'password' : 'text'}
                     value={password}
                     onChange={event => setPassword(event.target.value)}
                     helperText="Обязательное поле"
                  />
                  <IconButton className={classes.hiddenPass} onClick={() => setHidden(!hidden)}>
                     {hidden ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                  </IconButton>
               </div>
               <FormControlLabel
                  control={<Checkbox value="remember" color="primary"/>}
                  label="Запомнить меня"
               />
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  {loadingOfForm ?
                     <CircularProgress size={24}/> :
                     'Войти в аккаунт'
                  }
               </Button>
               <Grid container>
                  <Grid item xs>
                     <Link className={classes.link} href="#" variant="body2">
                        Забыли пароль?
                     </Link>
                  </Grid>
                  <Grid item>
                     <Link className={classes.link} href="#" variant="body2">
                        Ещё нет аккаунта? Регистрация
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>

         <MessageBox err={errorMessage}>
            <RenderMessage/>
         </MessageBox>

         <Box mt={8}>
            <Copyright/>
         </Box>
      </Container>
   );
};

export default connect((state: AppState) => ({
   loadingOfForm: state.auth.loadingOfForm,
   errorMessage: state.auth.errorMessage,
   userData: state.auth.userData
}), {
   login
})(Auth);
