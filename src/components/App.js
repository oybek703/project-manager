import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Header from "./UI/Header"
import Footer from "./UI/Footer"
import CssBaseline from "@material-ui/core/CssBaseline"
import {ThemeProvider} from "@material-ui/core/styles"
import theme from "../components/UI/Theme"
import ProjectManager from "./ProjectManager"

function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
        <BrowserRouter>
          <Header/>
          <Switch>
              <Route path='/' component={ProjectManager}/>
          </Switch>
          <Footer/>
        </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
