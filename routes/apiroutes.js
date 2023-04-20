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

module.exports=router