import React from 'react'
import footerAdornment from '../../assets/images/footerAdornment.svg'
import {makeStyles} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.common.blue
    },
    footerAdornment: {
        maxWidth: '15em',
        marginBottom: '-0.45em'
    }
}))


const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.footer}>
            <img className={classes.footerAdornment} src={footerAdornment} alt="footer adornment"/>
        </div>
    )
}

export default Footer