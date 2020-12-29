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
    }
})

export default theme