import React, {useState} from 'react'
import {
    Container,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core"
import FormGroup from "@material-ui/core/FormGroup"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import AddIcon from '@material-ui/icons/Add'
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import TableCell from "@material-ui/core/TableCell"

const useStyles = makeStyles(theme => ({
    textField: {
        maxWidth: '25em',
        margin: '1em 0'
    },
    tpMargin: {
        marginTop: '2em',
        marginBottom: '1em'
    },
    table: {
        marginBottom: '15em'
    },
    adornment: {
        color: theme.palette.common.blue
    }
}))

const createData = (name, date, service, feature, complexity, platforms, users, total) =>
    ({name, date, service, feature, complexity, platforms, users, total})

const ProjectManager = () => {
    const classes = useStyles()
    const [websites, setWebsites] = useState(false)
    const [iOS, setIOS] = useState(false)
    const [android, setAndroid] = useState(false)
    const [software, setSoftware] = useState(false)
    const [rows, setRows] = useState([
        createData('John Doe', '30/12/2020', 'Website', 'Push Notifications','severe', 'iOS, Android', '0-10', '$1500')
    ])
    return (
        <Container>
            <Typography variant='h4' color='primary'>Projects</Typography>
            <FormGroup>
                <TextField className={classes.textField} placeholder='Search or create new project'
                    InputProps={{endAdornment: <InputAdornment className={classes.adornment} position='end'><AddIcon/></InputAdornment>}}/>
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
            <TableContainer component={Paper} className={`${classes.tpMargin} ${classes.table}`}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Service</TableCell>
                            <TableCell>Features</TableCell>
                            <TableCell>Complexity</TableCell>
                            <TableCell>Platforms</TableCell>
                            <TableCell>Users</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody>
                            {
                                rows.map((row, index) => (
                                    <TableRow key={index} >
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.service}</TableCell>
                                        <TableCell>{row.feature}</TableCell>
                                        <TableCell>{row.complexity}</TableCell>
                                        <TableCell>{row.platforms}</TableCell>
                                        <TableCell>{row.users}</TableCell>
                                        <TableCell>{row.total}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default ProjectManager