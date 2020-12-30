import React, {useState} from 'react'
import {Container, makeStyles, Typography} from "@material-ui/core"
import FormGroup from "@material-ui/core/FormGroup"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import AddIcon from '@material-ui/icons/Add'
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

const useStyles = makeStyles(theme => ({
    textField: {
        maxWidth: '25em',
        margin: '1em 0'
    },
}))

const ProjectManager = () => {
    const classes = useStyles()
    const [websites, setWebsites] = useState(false)
    const [iOS, setIOS] = useState(false)
    const [android, setAndroid] = useState(false)
    const [software, setSoftware] = useState(false)
    return (
        <Container>
            <Typography variant='h4' color='primary'>Projects</Typography>
            <FormGroup>
                <TextField className={classes.textField} placeholder='Search or create new project'
                    InputProps={{endAdornment: <InputAdornment position='end'><AddIcon/></InputAdornment>}}/>
            </FormGroup>
            <FormGroup row>
                <FormControlLabel
                    control={<Switch checked={websites} onChange={() => setWebsites(!websites)}   color='primary'/>}
                    label='Websites'
                    labelPlacement='start'/>
                <FormControlLabel
                    control={<Switch checked={iOS} onChange={() => setIOS(!iOS)}   color='primary'/>}
                    label='iOS Apps'
                    labelPlacement='start'/>
                <FormControlLabel
                    control={<Switch checked={android} onChange={() => setAndroid(!android)}   color='primary'/>}
                    label='Android Apps'
                    labelPlacement='start'/>
                <FormControlLabel
                    control={<Switch checked={software} onChange={() => setSoftware(!software)}   color='primary'/>}
                    label='Software'
                    labelPlacement='start'/>
            </FormGroup>
        </Container>
    )
}

export default ProjectManager