import { useState } from 'react';
import { Typography } from '@mui/material'

export default function Buscar(tasks){
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = tasks.filter((item) =>
      item.includes(searchTerm)
)
    return(
        <div className='div'>
        <Typography
          type="text"
          placeholder="buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
       
        <ul>
          {filteredData.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
  
      </div>
    )
}