//express

const express = require('express')


const bodyParser =require('body-parser')
const plantRouter = require('./plantData')

const app =express()
app.use(bodyParser.json())
app.use(express.static('public'));

// app.get('/public/images/*', function (req, res) {
//     res.sendFile( __dirname + "/" + req.url );
//     console.log("Request for " + req.url + " received.");
// })
app.use('/user',plantRouter)
app.get('/a',function(req,res){
	console.log('<h1><hhallo world1<h1>')
	res.send('<h1>hallo world1 <h1>')
})


app.listen(9093,function(){
	console.log('Node app start at port 9093')
})
