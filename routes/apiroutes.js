const router=require("express").Router()
const fs=require("fs")
const uniqid=require('uniqid')

router.get("/api/notes",(req,res)=>{
    fs.readFile("db/db.json","utf-8",(err,data)=>{
        if(err) throw err
        return res.json(JSON.parse(data))
    })
})

router.post("/api/notes",(req,res)=>{
const dbData=JSON.parse(fs.readFileSync('db/db.json'))
const newNote=req.body
const id='id'
const noteId=uniqid()
newNote[id]=noteId
dbData.push(newNote)
fs.writeFile('db/db.json',JSON.stringify(dbData),(err)=>{
    if(err) throw err
    res.json(dbData) 
})
})

router.delete('/api/notes/:id',(req,res)=>{
    const dbData=JSON.parse(fs.readFileSync('db/db.json'))
    const removeNotes=dbData.filter((deleteNote)=>deleteNote.id !== req.params.id)
    fs.writeFileSync('db/db.json',JSON.stringify(removeNotes))
    res.json(removeNotes)
})

module.exports=router