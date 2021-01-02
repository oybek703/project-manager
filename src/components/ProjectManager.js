import React, {useEffect, useState} from 'react'
import {
    Button,
    Container,
    makeStyles,
    Radio,
    Typography, useMediaQuery, Zoom
} from "@material-ui/core"
import FormGroup from "@material-ui/core/FormGroup"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import AddIcon from '@material-ui/icons/Add'
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import Grid from "@material-ui/core/Grid"
import DialogContent from "@material-ui/core/DialogContent"
import RadioGroup from "@material-ui/core/RadioGroup"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import {format} from 'date-fns'
import EnhancedTable from "./UI/EnhancedTable"
import Tooltip from "@material-ui/core/Tooltip"

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
        paddingBottom: '10em'
    },
    adornment: {
        color: theme.palette.common.blue
    },
    marginBottom: {
        marginBottom: '2em',
        [theme.breakpoints.down('md')]: {
            marginBottom: '1em'
        }
    },
    radio: {
        fontWeight: 300
    }
}))

const createData = (name, date, service, feature, complexity, platforms, users, total, filtered = true) =>
    ({name, date, service, feature, complexity, platforms, users, total, filtered})

const platformOptions = ['Web', 'iOS',  'Android']
const featuresOptions = ['Photo/Videos', 'GPS',  'File Transfer', 'Users/Authentication', 'Biometrics', 'Push Notifications']
const websiteOptions = ['Basic', 'Interactive', 'E-commerce']

const ProjectManager = () => {
    const classes = useStyles()
    const matchXS = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const [websites, setWebsites] = useState(false)
    const [iOS, setIOS] = useState(false)
    const [android, setAndroid] = useState(false)
    const [software, setSoftware] = useState(false)
    const [open, setOpen] = useState(false)
    const [rows, setRows] = useState([
        createData('John Doe', '30/12/2020', 'Websites', 'Push Notifications','High', 'iOS, Android', '0-10', '1500', true),
        createData('Alex Smith', '30/12/2022', 'Custom Software', 'Push Notifications, GPS','Medium', 'iOS', '10-100', '1600', true),
        createData('Elon Musk', '20/12/2023', 'Custom Software', 'Biometrics, GPS','Low', 'Android', '0-10', '1700', true),
        createData('Oybek Yoriqulov', '20/12/2021', 'Mobile Apps', 'Biometrics, GPS, Push Notifications','Low', 'Android', '0-10', '1700', true),
        createData('Bill Gates', '20/12/2022', 'Custom Software', 'GPS, Push Notifications','High', 'iOS', '100+', '1200', true),
        createData('Mark Zuckerberg', '20/12/2023', 'Mobile Apps', 'GPS','Medium', 'Web', '0-10', '1300', true),
    ])
    const [date, setDate] = useState(new Date())
    const [name, setName] = useState('')
    const [total, setTotal] = useState('')
    const [services, setServices] = useState('')
    const [complexity, setComplexity] = useState('')
    const [users, setUsers] = useState('')
    const [platforms, setPlatforms] = useState([])
    const [features, setFeatures] = useState([])
    const [search, setSearch] = useState('')
    const addBtnDisabled = services === 'Websites'
        ? !name.length || !total.length || features.length !== 1
        : !name.length || !total.length || !complexity.length || !users.length || !platforms.length || !features.length
    const radioDisabled = services === 'Websites'
    const addProject = () => {
        setRows(rows => [...rows, {
            name,
            date: format(date, 'MM/yy/dd'),
            service: services,
            feature: features.join(','),
            complexity: complexity || 'N/A',
            platforms: platforms.join(',') || 'N/A',
            users: users || 'N/A',
            total,
            filtered: true
        }])
        setName('')
        setDate(new Date())
        setTotal('')
        setServices('')
        setComplexity('')
        setUsers('')
        setPlatforms([])
        setFeatures([])
    }
    const handleChange = event => {
        const {value} = event.target
        setSearch(value)
        const newRows = JSON.parse(JSON.stringify(rows)).map(row => {
            const rowStr = Object.values(row).join(' ').toLowerCase()
            if(!value) {
                row.filtered = true
            } else if(rowStr.indexOf(value.toLowerCase()) >= 0) {
               row.filtered = true
           } else {
                row.filtered = false
            }
           return row
        })
        setRows(newRows)
    }
    useEffect(() => {
        setFeatures([])
        if(services === 'Websites') {
            setComplexity('')
            setUsers('')
        }
    }, [services])
    const filterState = websites || android || iOS || software
    const switchesFilter = () => {
        let newRows = JSON.parse(JSON.stringify(rows))
        if(websites && android && iOS && software) {
            return newRows
        }
        newRows = websites ? newRows.map(row => row.service === 'Websites' && row).filter(r => r) : newRows
        newRows = android ? newRows.map(row => row.platforms.includes('Android') && row).filter(r => r) : newRows
        newRows = iOS ? newRows.map(row => row.platforms.includes('iOS') && row).filter(r => r) : newRows
        newRows = software ? newRows.map(row => row.service === 'Custom Software' && row).filter(r => r) : newRows
        return newRows
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Container>
                <Typography variant='h4' align='center' className={classes.marginBottom} color='primary'>Project Manager</Typography>
                <FormGroup>
                    <TextField value={search} onChange={handleChange} className={classes.textField} placeholder='Search or create new project'
                               InputProps={{endAdornment: <Tooltip placement={matchXS ? 'left' : 'top'} TransitionComponent={Zoom} title='Create new project'><InputAdornment style={{cursor: 'pointer'}} onClick={() => setOpen(true)} className={classes.adornment} position='end'><AddIcon/></InputAdornment></Tooltip>}}/>
                </FormGroup>
                <FormGroup row>
                    <FormControlLabel
                        control={<Switch checked={websites} onChange={() => setWebsites(!websites)}   color='primary'/>}
                        label='Websites'
                        labelPlacement={matchXS ? 'end' : 'start'}/>
                    <FormControlLabel
                        control={<Switch checked={iOS} onChange={() => setIOS(!iOS)}   color='primary'/>}
                        label='iOS Apps'
                        labelPlacement={matchXS ? 'end' : 'start'}/>
                    <FormControlLabel
                        control={<Switch checked={android} onChange={() => setAndroid(!android)}   color='primary'/>}
                        label='Android Apps'
                        labelPlacement={matchXS ? 'end' : 'start'}/>
                    <FormControlLabel
                        control={<Switch checked={software} onChange={() => setSoftware(!software)}   color='primary'/>}
                        label='Software'
                        labelPlacement={matchXS ? 'end' : 'start'}/>
                </FormGroup>
                <Grid className={`${classes.tpMargin} ${classes.table}`}>
                    <EnhancedTable filterState={filterState} setRows={setRows} rows={switchesFilter()}/>
                </Grid>
            </Container>
            <Dialog fullWidth fullScreen={matchXS} maxWidth='md' open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    <Typography gutterBottom variant='h5' component='span'  color='primary' align='center'>Add new project</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container justify='space-between'>
                        <Grid item className={classes.marginBottom}>
                            <TextField label='Name' value={name} onChange={e => setName(e.target.value)}/>
                        </Grid>
                        <Grid item className={classes.marginBottom}>
                            <DateTimePicker
                                ampm={false}
                                label="Date"
                                value={date}
                                onChange={setDate}
                                disablePast
                                format="yyyy/MM/dd HH:mm"
                            />
                        </Grid>
                        <Grid item className={classes.marginBottom}>
                            <TextField
                                type='number'
                                label='Total' value={total}
                                onChange={e => setTotal(e.target.value)}
                                InputProps={{startAdornment: <InputAdornment position='start'>$ </InputAdornment>}}/>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.tpMargin}>
                        <Grid sm className={classes.marginBottom} item>
                            <Typography variant='h5'  color='primary'>Services</Typography>
                            <RadioGroup value={services} onChange={e => setServices(e.target.value)}>
                                <FormControlLabel classes={{label:classes.radio}} value='Websites' control={<Radio/>} label='Websites'/>
                                <FormControlLabel classes={{label:classes.radio}} value='Mobile Apps' control={<Radio/>} label='Mobile Apps'/>
                                <FormControlLabel classes={{label:classes.radio}} value='Custom Software' control={<Radio/>} label='Custom Software'/>
                            </RadioGroup>
                        </Grid>
                        <Grid sm className={classes.marginBottom} item>
                            <Grid container direction='column' alignItems='center'>
                                <Typography variant='h5'  color='primary'>Complexity</Typography>
                                <RadioGroup color='primary' value={complexity} onChange={e => setComplexity(e.target.value)}>
                                    {
                                        ['Low', 'Medium', 'High'].map(c => (
                                            <FormControlLabel key={c} classes={{label:classes.radio}} value={c} disabled={radioDisabled} control={<Radio/>} label={c}/>
                                        ))
                                    }
                                </RadioGroup>
                            </Grid>
                        </Grid>
                        <Grid sm className={classes.marginBottom} item>
                            <Grid container direction='column' alignItems='center'>
                                <Typography variant='h5' color='primary'>Users</Typography>
                                <RadioGroup color='primary' value={users} onChange={e => setUsers(e.target.value)}>
                                    {
                                        ['0-10', '10-100', '100+'].map(u => (
                                            <FormControlLabel key={u} disabled={radioDisabled} classes={{label:classes.radio}} value={u} control={<Radio/>} label={u}/>
                                        ))
                                    }
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justify='space-around'>
                        <Grid item className={classes.marginBottom}>
                            <Select multiple value={platforms}
                                    disabled={services === 'Websites'}
                                    onChange={e => setPlatforms(e.target.value)}
                                    displayEmpty
                                    style={{width: '12em'}}
                                    renderValue={selected => !platforms.length ? 'Platforms' : selected.join(',')}>
                                {
                                    platformOptions.map(option => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item className={classes.marginBottom}>
                            <Select multiple value={features}
                                    onChange={e => setFeatures(e.target.value)}
                                    displayEmpty
                                    style={{width: '12em'}}
                                    renderValue={selected => !features.length ? 'Features' : selected.join(',')}>
                                {
                                    (services === 'Websites' ? websiteOptions : featuresOptions).map(option => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid container justify='space-evenly' className={classes.tpMargin}>
                        <Button variant='outlined' color='primary' onClick={() => setOpen(false)}>Cancel</Button>
                        <Button
                            onClick={() => {setOpen(false); addProject()}}
                            endIcon={<AddIcon/>}
                            variant='contained'
                            color='secondary'
                            disabled={addBtnDisabled}>
                            Add Project
                        </Button>
                    </Grid>
                </DialogContent>
            </Dialog>
        </MuiPickersUtilsProvider>
    )
}

export default ProjectManager