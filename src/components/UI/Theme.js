import {createMuiTheme} from "@material-ui/core"

const arcBlue = '#0B72B9'

const theme = createMuiTheme({
    palette: {
        common: {
            blue: arcBlue
        },
        primary: {
            main: arcBlue
        }
    },
    overrides: {
        MuiFormControlLabel: {
            label: {
                color: arcBlue,
                fontWeight: '700',
                fontSize: '1.4em'
            },
            labelPlacementStart: {
                marginLeft: 0,
                marginRight: '2em'
            }
        }
    }
})

export default theme