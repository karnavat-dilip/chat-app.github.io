const socket = io()
const textarea = document.querySelector('#textarea')
const message_area = document.querySelector('.message_area')
let Name;
do {
    Name = prompt("please Enter your name: ")
} while (!Name);

textarea.addEventListener('keyup', (e) => {
    
        if (e.key === 'Enter') {
            sendmessage(e.target.value)
            textarea.value=""
        }
    
})

function sendmessage(msg) {
    let message = {
        user: Name,
        msg: msg.trim()
    }
    Appendmessage(message, 'outgoing')
    scrollToBottom()
    socket.emit('msg', message)
}


function Appendmessage(message, type) {
    let maindiv = document.createElement('div')
    maindiv.classList.add(type, 'message')
    let markup = `
        <h4>${message.user}</h4>
        <p>${message.msg}</p>
    `
    maindiv.innerHTML = markup

    message_area.appendChild(maindiv)
}

socket.on('msg', (msg) => {
    Appendmessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    message_area.scrollTop=message_area.scrollHeight
}