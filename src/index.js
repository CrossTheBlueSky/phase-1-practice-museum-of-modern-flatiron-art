const submitComment = document.getElementById("comment-form")
const commentBlock = document.getElementById("comments-section")
const ticketsBought = document.getElementById("tickets-bought")
const buyTickets = document.getElementById("buy-tickets-button")
let totalTickets = 0;
let commArr = []

buyTickets.addEventListener("click", (e)=>{
    updateTickets()

})

submitComment.addEventListener("submit", (e)=>{
    e.preventDefault()
    addComment(e.target[0].value)
    renderNewComment(e.target[0].value)})

function initialize(){
    fetch(`http://localhost:3000/current-exhibits`)
    .then((res)=>res.json())
    .then((data)=>{
        renderExhibit(data[0])
    })
}

function renderExhibit(obj){
    const title = document.getElementById("exhibit-title")
    const description = document.getElementById("exhibit-description")
    const image = document.getElementById("exhibit-image")

    totalTickets = parseInt(obj.tickets_bought)
    ticketsBought.innerText = `${obj.tickets_bought} tickets bought`
    title.innerText = obj.title
    description.innerText = obj.description
    image.src = obj.image

    obj.comments.forEach((e)=>{
        renderNewComment(e)
        commArr.push(e)
    })
}



function renderNewComment(comment){
    
    const newComment = document.createElement("p")
    newComment.innerText = comment
    commentBlock.append(newComment)

}

function updateTickets(){
    totalTickets++
    const ticketObj = { tickets_bought: parseInt(totalTickets)}

    fetch(`http://localhost:3000/current-exhibits/1`, {   
    method: "PATCH", 
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(ticketObj)})
    .then((res)=>{res.json()})
    .then(()=>{
        ticketsBought.innerText = `${totalTickets} tickets bought`
    })
}

function addComment(comm){
    commArr.push(comm)
    const commObj = { comments : commArr}

    fetch(`http://localhost:3000/current-exhibits/1`, {   
    method: "PATCH", 
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(commObj)})
    .then((res)=>{
        res.json()
        })
 
}




initialize()