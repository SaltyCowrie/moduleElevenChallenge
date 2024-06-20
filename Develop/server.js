const express = require ('express')
const path = require ('path')
const app = express()
const json = require ('./db/db.json')
const fs = require ('fs')

app.use(express.json())

app.use(express.static(path.join(__dirname,"public"))) 

app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"public","index.html"))
})

app.get("/notes",(req,res) => {
    res.sendFile(path.join(__dirname,"public","notes.html"))
})

app.get("/api/notes",(req,res) => {
    res.sendFile(path.join(__dirname,"db","db.json"))
})

app.post("/api/notes",(req,res) => {
    const newNote = {id: json.length+1, title: req.body.title, text: req.body.text}
    json.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(json))
    res.status(200)
})

app.listen(3000, () => {
    console.log("Server loaded successfully! Good job!")
})