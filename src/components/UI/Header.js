import React, {Fragment} from 'react'
import AppBar from "@material-ui/core/AppBar"
import {makeStyles, Toolbar} from "@material-ui/core"
import logo from '../../images/logo.svg'

const useStyles = makeStyles(theme => ({
    logo: {
        maxWidth: '10em',
        maxHeight: '6em'
    },
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '1em'
    }
}))

const Header = () => {
    const classes = useStyles()
    return (
        <Fragment>
            <AppBar position='fixed'>
                <Toolbar>
                        <img src={logo} alt="project manager logo"  className={classes.logo}/>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}/>
        </Fragment>
    )
}

export default Header