import {Fragment} from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MainDrawer from './menu/MainDrawer';

const makeUserName = ({user_fName, user_mName, user_lName}) => {

    const middleName = () => user_mName === undefined ? '' :
                               (user_mName.length === 1 ? `${user_mName}.` : user_mName);

    return `${user_fName} ${middleName()} ${user_lName}`;
};

export default function App({ user, logoutAction }) {
    console.log("User object:", user); 
    const mainPageTitle = "Draught Services";

    return (
                <MainDrawer title={mainPageTitle}
                            user={makeUserName(user)}
                            logoutAction={logoutAction}/>
    )

}

