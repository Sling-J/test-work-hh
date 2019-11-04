import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Copyright: React.FC = () => {
   return (
      <Typography variant="body2" color="textSecondary" align="center">
         {'Copyright © '}
         <Link color="inherit" href="#">
            Ваш сайт
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
};

export default Copyright;
