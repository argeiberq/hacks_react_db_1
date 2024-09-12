import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import TaskList from './componets/TaskList'
import TAskForm from './componets/TaskForm'
import Navbar from './componets/Navbar'
export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<TAskForm />} />
          <Route path='/tasks/:id/edit' element={<TAskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

