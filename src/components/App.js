import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Header from "./UI/Header"
import {Typography} from "@material-ui/core"
import Footer from "./UI/Footer"
import CssBaseline from "@material-ui/core/CssBaseline"
import {ThemeProvider} from "@material-ui/core/styles"
import theme from "../components/UI/Theme"

function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
        <BrowserRouter>
          <Header/>
          <Switch>
              <Route path='/' render={() => <Typography variant='h1' color='primary'>Project Manager</Typography>}/>
          </Switch>
          <Footer/>
        </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
