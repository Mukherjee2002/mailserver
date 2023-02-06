const express=require("express")
const bodyparser=require("body-parser")
const app=express()
const https=require("https")
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/indx.html")
})
app.post("/",function(req,res){
    const f=req.body.firstname
    const l=req.body.lastname
    const m=req.body.mail
    console.log(f)
    console.log(l)
    console.log(m)
    var data={
        members:[
            {
                email_address: m,
                status: "subscribed",
                merge_fields :{
                    FNAME : f,
                    LNAME : l
                }
            }
        ]
    }
    const Jsondata=JSON.stringify(data)
    const url="https://us21.api.mailchimp.com/3.0/lists/5e021a2e5e"
    const options={
        method: "POST",
        auth: "sankhadeep:645fc3d2232a4a16f7df0b1d760e365d-us21"
    }
    const request = https.request(url,options,function(response){
        res.sendFile(__dirname+"/success.html")
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(Jsondata)
    request.end()
    
})

app.listen(process.env.PORT||3000)

//API KEY
// 645fc3d2232a4a16f7df0b1d760e365d-us21
//Audiance ID
// 5e021a2e5e