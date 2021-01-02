import React, {Fragment, useEffect, useState} from 'react'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import Snackbar from "@material-ui/core/Snackbar"
import Button from "@material-ui/core/Button"
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import Grid from "@material-ui/core/Grid"
import {InputAdornment, useMediaQuery} from "@material-ui/core"
import UndoIcon from '@material-ui/icons/Undo'
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import Chip from "@material-ui/core/Chip"

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    });
    return stabilizedThis.map((el) => el[0])
}

const headCells = [
    { id: 'name', label: 'Name'},
    { id: 'date', label: 'Date'},
    { id: 'service', label: 'Service'},
    { id: 'feature', label: 'Features'},
    { id: 'complexity', label: 'Complexity'},
    { id: 'platforms', label: 'Platforms'},
    { id: 'users', label: 'Users'},
    { id: 'total', label: 'Total'}
]

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='center'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight: theme.palette.type === 'light' ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            } : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    menu: {
        '&:hover': {
            backgroundColor: 'white'
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'white'
        }
    }
}))

const EnhancedTableToolbar = ({numSelected, handleDelete, filterState, setAnchorEl}) => {
    const classes = useToolbarStyles()
    return (
        <Toolbar>
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (<Typography className={classes.title} color='primary' variant="h6" id="tableTitle" component="div">
                    Projects
                </Typography>)}

            {numSelected > 0 ? (
                <Fragment>
                    {
                        filterState ? (
                            <Tooltip title="Cannot delete during filtering.Please turn off all switches">
                                <span>
                                    <IconButton disabled={filterState} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        ) : (<Tooltip title="Delete">
                            <IconButton onClick={handleDelete} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>)
                    }
                </Fragment>
            ) : (<IconButton color='secondary' aria-label="filter list" onClick={event => setAnchorEl(event.currentTarget.parentNode)}>
                        <Tooltip title="Click for filtering by total price">
                            <FilterListIcon />
                        </Tooltip>
                    </IconButton>)}
        </Toolbar>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}))

export default function EnhancedTable({rows, setRows, filterState}) {
    const classes = useStyles()
    const [order, setOrder] = React.useState('asc')
    const [orderBy, setOrderBy] = React.useState('calories')
    const [selected, setSelected] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [undo, setUndo] = useState([])
    const [snackbar, setSnackbar] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [totalFilter, setTotalFilter] = useState('<')
    const [total, setTotal] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const matchXS = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name)
            setSelected(newSelecteds)
            return;
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }

        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleDelete = () => {
        setSnackbar(true)
        const removedRows = []
        const newRows = rows.map(row => {
            if(selected.includes(row.name)) {
                removedRows.push(JSON.parse(JSON.stringify(row)))
                row.filtered = false
            }
            return row
        })
        setUndo(removedRows)
        setRows(newRows)
        setSelected([])
        setTimeout(() => {setUndo([])}, 5000)
    }

    const handleUndo = () => {
        setSnackbar(false)
        const allRows = JSON.parse(JSON.stringify(rows)).map(row => {
            undo.map(u => u.name === row.name && Object.assign(row, u))
            return row
        })
        setRows(allRows)
        setUndo([])
    }

    const handleClose = () => {
        setSnackbar(false)
        setUndo([])
        const leftRows = JSON.parse(JSON.stringify(rows)).filter(r => r.filtered)
        setRows(leftRows)
    }

    const isSelected = (name) => selected.indexOf(name) !== -1

    const filterByTotal = value => {
        const clonedRows = JSON.parse(JSON.stringify(rows))
        let matchedRows = []
        if(value) {
            matchedRows = clonedRows.map(row => {
                // eslint-disable-next-line
                if(eval(`${row.total} ${totalFilter === '=' ? '===' : totalFilter} ${value}`)){
                    row.filtered = true
                } else {
                    row.filtered = false
                }
                return row
            })
        }
        if(!value) {
            matchedRows = clonedRows.map(row => {row.filtered = true; return row})
            setFilterStatus('')
        }
        setRows(matchedRows)
    }

    const handleTotalChange = event => {
        const {value} = event.target
        setTotal(value)
        filterByTotal(value)
        setFilterStatus(totalFilter === '>' ? `Greater than $${value}` : totalFilter === '<' ? `Less than $${value}` : `Equal to $${value}`)
        if(!value) {setFilterStatus('')}
    }

    const changeTotalFilter = () => {
        switch (totalFilter) {
            case "=": setTotalFilter('>'); break
            case "<": setTotalFilter('='); break
            case ">": setTotalFilter('<'); break
            default: setTotalFilter('=')
        }
    }

    useEffect(() => {
        setPage(0)
    }, [rows])

    useEffect(() => {
        filterByTotal(total)
        total && setFilterStatus(totalFilter === '>' ? `Greater than $${total}` : totalFilter === '<' ? `Less than $${total}` : `Equal to $${total}`)
        // eslint-disable-next-line
    }, [totalFilter])

    useEffect(() => {
        setFilterStatus('')
    }, [])

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar setAnchorEl={setAnchorEl} filterState={filterState} numSelected={selected.length}  handleDelete={handleDelete}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table">
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .filter(row => row.filtered)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.date}</TableCell>
                                            <TableCell align="center">{row.service}</TableCell>
                                            <TableCell align="center">{row.feature}</TableCell>
                                            <TableCell align="center">{row.complexity}</TableCell>
                                            <TableCell align="center">{row.platforms}</TableCell>
                                            <TableCell align="center">{row.users}</TableCell>
                                            <TableCell align="center">${row.total}</TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={(rows.filter(r => r.filtered)).length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <Snackbar open={snackbar}
                      ContentProps={{style: {backgroundColor: 'crimson'}}}
                      anchorOrigin={{vertical: matchXS ? 'bottom' : 'top', horizontal: 'center'}}
                      onClose={handleClose}
                      autoHideDuration={5000}
                      message={<Grid container>
                              <CheckBoxIcon/>
                              <Typography> &nbsp; Project Deleted.</Typography>
                          </Grid>}
                      action={<Button onClick={handleUndo} size='small' color='inherit' startIcon={<UndoIcon/>}>Undo</Button>}/>
            <Menu
                PaperProps={{elevation: 0}} keepMounted anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => {setAnchorEl(null); setTotal(''); filterByTotal(''); setFilterStatus('')}}>
                <MenuItem className={classes.menu}>
                    <TextField
                               onChange={handleTotalChange}
                               value={total}
                               color='secondary'
                               autoFocus
                               variant='outlined'
                               size='small'
                               placeholder='Enter price...'
                               type='number'
                               inputProps={{min: 0}}
                               InputProps={{
                                   startAdornment: <InputAdornment>$&nbsp;</InputAdornment> ,
                                   endAdornment:
                                   <Tooltip title='Click to change filter status.'>
                                           <InputAdornment
                                                position='end'
                                                onClick={changeTotalFilter}
                                                component={IconButton}>{totalFilter}
                                       </InputAdornment>
                                   </Tooltip>}
                               }/>
                </MenuItem>
            </Menu>
            <Snackbar open={!!filterStatus}
                      message={<Chip label={filterStatus}/>}
                      ContentProps={{style: {backgroundColor: '#05baba'}}}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}/>
        </div>
    )
}
