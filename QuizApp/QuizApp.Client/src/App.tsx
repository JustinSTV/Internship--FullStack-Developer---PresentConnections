import './App.css'
import { Route, Routes } from 'react-router-dom'
import QuizPage from './components/Pages/QuizPage'
import HighScorePage from './components/Pages/HighScorePage'
import { createTheme } from '@mui/material'

const theme = createTheme();

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<QuizPage />} />
      <Route path='/high-scores' element={<HighScorePage />} />
    </Routes>
  )
}

export default App
