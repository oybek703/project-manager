import {createMuiTheme} from "@material-ui/core"

const arcBlue = '#0B72B9'
const darkOrange = '#ee4300'
const darkGrey = '#b8b8b8'

const theme = createMuiTheme({
    palette: {
        common: {
            blue: arcBlue
        },
        primary: {
            main: arcBlue
        },
        secondary: {
            main: darkOrange
        },
        darkText: {
            color: darkGrey
        }
    },
    typography: {
        h5: {
            fontWeight: 700
        }
    },
    overrides: {
        MuiFormControlLabel: {
            label: {
                color: arcBlue,
                fontWeight: '700',
                fontSize: '1.4em',
                borderColor: arcBlue
            },
            labelPlacementStart: {
                marginLeft: 0,
                marginRight: '2em'
            }
        },
        MuiTableCell: {
            head: {
                color: arcBlue,
                fontWeight: 700,
                textAlign: 'center',
                fontSize: '1.2em'
            },
            body: {
                color: darkGrey,
                textAlign: 'center'
            }
        },
        MuiDialogTitle: {
            root: {
                textAlign: 'center'
            }
        },
        MuiRadio: {
            root: {
                '&$checked': {
                    color: arcBlue
                }
            },
            colorSecondary: {
                '&.Mui-checked': {
                    color: arcBlue
                }
            }
        },
        MuiSvgIcon: {
            root: {
                '&.MuiSelect-icon': {
                    color: arcBlue
                }
            }
        },
        MuiTableSortLabel: {
            root: {
                '&.MuiTableSortLabel-active' : {
                    color: darkOrange
                },
                '&:hover': {
                    color: darkOrange
                }
            },
            icon: {
                color: darkOrange,
                '&:hover': {
                    color: darkOrange
                }
            }
        },
        MuiInputBase: {
            root: {
                color: darkGrey
            }

        },
        MuiSnackbarContent: {
            root: {
                padding: '0 5px'
            }
        }
    }
})

export default theme