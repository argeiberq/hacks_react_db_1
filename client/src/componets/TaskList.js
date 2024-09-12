import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export default function TaskList(){
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()

  const loadTasks = async () => {
    const response = await fetch('http://localhost:4000/tasks')
    const data = await response.json()
    setTasks(data)
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, {
    method: "DELETE"
    })
    setTasks(tasks.filter(task => task.id !== id));
    
  }
  useEffect(() =>{
    loadTasks();
  }, [])
  
    return(
    <>
    <CardContent>
     
      </ CardContent>
      
            {
        tasks.map(task => (
          <Card style={{
            marginBottom: ".7rem",
            background: '#1e272e',
            color: '#ffffff'

          }}>
            <CardContent style={{
              display: "flex",
              justifyContent: "space-between"
            }}
            key={task.id}>
              <div>
              <Typography>{task._name}</Typography>
              <Typography>{task.age}</Typography>
              <Typography>{task.email}</Typography>
              </div>
              <div>
              <Button variant='contained' color='inherit' onClick={()=> navigate(`/tasks/${task.id}/edit`)} >Edit</Button>
              <Button variant='contained' color='warning' onClick={()=> handleDelete(task.id)} style={{marginLeft: '.5rem'}}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </>
  )}
  