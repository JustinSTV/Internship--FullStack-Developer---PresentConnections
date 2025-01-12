import './App.css'
import { Route, Routes } from 'react-router-dom'
import QuizPage from './components/Pages/QuizPage'
import HighScorePage from './components/Pages/HighScorePage'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme();

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<QuizPage />} />
        <Route path='/high-scores' element={<HighScorePage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
