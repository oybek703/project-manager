import {createMuiTheme} from "@material-ui/core"

const arcBlue = '#0B72B9'
const darkGrey = '#b8b8b8'

const theme = createMuiTheme({
    palette: {
        common: {
            blue: arcBlue
        },
        primary: {
            main: arcBlue
        },
        darkText: {
            color: darkGrey
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
        }
    }
})

export default theme