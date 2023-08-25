const socket=io('http://localhost:8000');

const form=document.querySelector('#frms');
const messageInput=document.querySelector('.txtfrm')
const messageContainer=document.querySelector('.container');
var audio=new Audio('Message.mp3');  
const append=(message,position)=>{                             /*   for creating new message element at the time of receiving or sending messages or any user joined or left */    
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
      audio.play();
    }
}

form.addEventListener('submit',(e)=>{                        /*  for taking the input message from the client when he wants to send */
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageInput.value='';
});

const name=prompt('Enter your name to join');
socket.emit('new-user-joined',name);

socket.on('user-joined',data=>{                             /* client is listening the event when someone joined the chat */
   append(`${data} joined the chat`,'left'); 
});    
socket.on('receive',data=>{                                 /*  client is listening the event when someone is sending the message to client  */
   append(`${data.name}: ${data.message}`,'left');
});
socket.on('left',name=>{                                   /*   client is listening the event when any user has left the chat  */
   append(`${name} left the chat`,'left');
});
