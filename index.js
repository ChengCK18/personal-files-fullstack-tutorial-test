//const { request, response } = require('express')
//const http = require('http')
const { request, response } = require('express')
const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
]
/*
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})
*/

app.get('/',(request,response) =>{
  response.send('<h1>Konnichiwa World!</h1>')
})

app.get('/api/notes',(request,response) =>{
  response.json(notes)
})

app.get('/api/notes/:id',(request,response) => {
  //api/notes/SOMETHING , SOMETHING refers to arbitrary string
  //SOMETHING can be accessed through request.params.id
  const id = Number(request.params.id) 
  //Number required to convert string to Number for .find comparison to 
  //be true
  const note = notes.find(note => note.id === id)
  if(note){
   response.json(note)
  }
  else{
    response.status(404).end()
  }
})


app.delete('/api/notes/:id',(request,response) =>{
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})


app.post('/api/notes',(request,response) => {
  const body = request.body
 
  if(!body.content){ //if there is no content provided by the request
    return response.status(400).json({error:'content missing'})
  }

  const note = {
    content: body.content,
    important: body.important || false, // if important property is not defined or FALSE, will default to false
    date: new Date(),
    id: generateId(),
  }

  notes = notes.concat (note)

  response.json(note)
})


const generateId = () =>{
  const maxId = notes.length > 0 ? Math.max(...notes.map(n =>n.id)):0
  return maxId + 1
}



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})