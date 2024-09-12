import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
export default function TAskForm(){
  const [task, setTask] = useState({
    _name: '',
    age: '',
    email: ''
  })

  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)

  const navigate = useNavigate()
  const params = useParams();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (edit) {
      await fetch(`http://localhost:4000/tasks/${params.id}`,{
        method: 'PuT',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(task)
      })
    } else{    
      await fetch("http://localhost:4000/tasks",{
      method: 'POST',
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json"}
    })
}
    
    setLoading(false)
    navigate('/')  
  }
    const handleChange = (e) => {
      setTask({...task, [e.target.name]: e.target.value})
    }
    const loadTask = async (id) => {
      const res = await fetch(`http://localhost:4000/tasks/${id}`)
      const data = await res.json()
      setTask({_name: data._name, age: data.age, email: data.email})
      setEdit(true)
    }
    useEffect(() => {
      if (params.id) {
        loadTask(params.id);
      }
    }, [params.id])
    return(
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{mt: 5}} style={{
          backgroundColor: '#1e272e',
          padding: '1rem'
        }}>
          <Typography variant='5' textAlign='center' color='white'>
            {edit ? "edit user" : "loadig"}
          </Typography>
          <CardContent>
            <form >
              <TextField variant='filled' label='name' sx={{
                display: 'block',
                margin: '.5rem 0'
              }}
              name='_name'
              value={task._name}
              onChange={handleChange}
              inputProps={{style: {color: "white"}}}
              InputLabelProps={{style: {color: "white"}}}/>
              <TextField variant='filled' label='age' sx={{
                display: 'block',
                margin: '.5rem 0'
              }}
              name='age'
              value={task.age}
              onChange={handleChange}
              inputProps={{style: {color: "white"}}}
              InputLabelProps={{style: {color: "white"}}}/>
              <TextField variant='filled' label='email' sx={{
                display: 'block',
                margin: '.5rem 0'
              }}
              name='email'
              value={task.email}
              onChange={handleChange}
              inputProps={{style: {color: "white"}}}
              InputLabelProps={{style: {color: "white"}}}/>
              <Button variant='contained' color='primary' onClick={handleSubmit} disabled={!task._name || !task.age || !task.email}>
                {loading ? <CircularProgress  color='inherit' size={24}/> : 'save'}</Button>
            </form>
          </CardContent>
        </Card>

      </Grid>
    </Grid>
    )
  }
  