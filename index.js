const app=require("express")();
const httpserveur=require("http").createServer(app);
const {Server} =require("socket.io");
const cors=require("cors");
///const os=require('os')

    const socketion=new Server(httpserveur,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    })


const Userconnect={};

/*
function setonline(status,id){
    fetch("http://127.0.0.1:8000/setonline/"+id+"/"+status,{
        method:"get",
        headers:{
            "Content-Type": "application/json",
        }
    })
    .then(response=>response.text())
    .then((json)=>{
    ///  console.log("hdhhhxx",json);
    })
}*/

socketion.on("connection",(socket)=>{
  /*  Userconnect[socket.id]={
        id:socket.id
    }*/
    if(socket.handshake.auth.iddocteur!=null){
     /// setonline(1,socket.handshake.auth.iddocteur);
        socketion.emit("User_connect_doctor",{id:socket.handshake.auth.iddocteur,satus:"connect"});
    }
    

   console.log("Un utilisateur se connecté socketid:"+socket.id+" nom :"+socket.handshake.auth.username+" id="+socket.handshake.auth.iddocteur);
    

    socket.on("disconnect",()=>{
       /// delete Userconnect[socket.id]
       
       console.log("Un utilisateur se deconnecté socketid :"+socket.id+" nom :"+socket.handshake.auth.username+" id="+socket.handshake.auth.iddocteur);
       if(socket.handshake.auth.iddocteur!=null){
      ///   setonline(0,socket.handshake.auth.iddocteur);
        socketion.emit("User_connect_doctor",{id:socket.handshake.auth.iddocteur,satus:"disconnect"});
    }
        
    })
    socket.on("Notificationpatientevent",(info=>{
        console.log(info);
        socketion.emit("Notificationpatientevent",info);
    }))
    socket.on("Notificationdocteur",(info=>{
        console.log(info);
        socketion.emit("Notificationdocteur",info);
    }))
    socket.on("Messagesendevent",(info=>{
        console.log(info);
        socketion.emit("Messagesendevent",info);
    }))
    socket.on("Accusereception",(info=>{
        console.log(info);
        socketion.emit("Accusereception",info);
    }))
    socket.on("chatstate",(idconcerne=>{
        console.log(idconcerne);
        socketion.emit("chatstate",idconcerne);
    }))
    socket.on("Notificationdocteurprivate",(info=>{
        console.log(info);
        socketion.emit("Notificationdocteurprivate",info);
    }))
   

    

    

    
    
})

httpserveur.listen(5000,function(){
    console.log("server running");
})
app.get("/",(req,res)=>{
    res.send("ok")
})