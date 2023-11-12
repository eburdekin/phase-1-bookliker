const bookAPI = 'http://localhost:3000/books'

let bookList = []

function initialRender() {
    fetch(bookAPI)
    .then(res => res.json())
    .then(bookData => {
        bookList = bookData
        renderBooks(bookList)})
    }

    initialRender()

function renderBooks(books) {
    books.forEach(renderBook)
}

function renderBook(bookObj) {
    const ul = document.getElementById('list')
    const li = document.createElement('li')
    li.textContent = bookObj.title
    //Make sure function is passed with NO arguments
    li.addEventListener('click', (e) => displayInfo(bookObj))
    ul.append(li)
}

function displayInfo(bookObj) {
    const panel = document.getElementById('show-panel')
    panel.innerHTML = ''
    //Set panel's HTML to include the details of clicked book
    panel.innerHTML = `
    <p>Title: ${bookObj.title}</p>
    <img src="${bookObj.img_url}"/>
    <p>Description: ${bookObj.description}</p>
    `

    const likers = document.createElement('p')
    likers.id = 'likers'
    likers.textContent = 'Liked by:'
    panel.append(likers)

    //bookObj.users is an array of user objects
    const users = bookObj.users
    
    users.forEach(user => {
        const nameP = document.createElement('p')
        nameP.textContent = `${user.username}`
        likers.append(nameP)
    })

    const likeButton = document.createElement('button')
    likeButton.textContent = 'LIKE'
    likeButton.addEventListener('click', (e) => handleLike(bookObj))

    panel.append(likeButton)

}

function handleLike(bookObj) {
    // const likers = document.getElementById('likers')
    // const nameP = document.createElement('p')
    // nameP.textContent = 'eileen'
    // likers.append(nameP)

    bookObj.users.push({
        'id': 68,
        'username': 'eileen'})

    fetch(`${bookAPI}/${bookObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(bookObj)
    })
        .then(res => res.json())
        .then(() => {
            console.log(bookObj.users)
                displayInfo(bookObj)
        })
    }