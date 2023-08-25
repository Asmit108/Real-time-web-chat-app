const cors=require('cors');
const io =require('socket.io')(8000,{
  cors: {
    origin: '*',
  }});                                                               /*  creating socket.io server   */
const users={};
io.on('connection',socket=>{                                         /*   making the server connection active  */
  socket.on('new-user-joined',name=>{                                /*  server is listening the event when new user has joined the chat   */
    console.log(name);
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name);                       /* server is sending the message about new user joining chat to  every old clients  */
  });
  socket.on('send',message=>{                                        /*  server is listening the event when new user has is sending the message   */  
    socket.broadcast.emit('receive',{message:message,name:users[socket.id]});   /*  server is sending the message with user name(who has sent it) to every other client   */
  });
  socket.on('disconnect',message=>{                                  /*  server is listening the event when any user has left the chat   */
    socket.broadcast.emit('left',users[socket.id]);                  /*  server is sending the message of user left the chat to every client  */
    delete users[socket.id];
  });
});
