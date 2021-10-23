console.log('main.js loaded...')

const deleteBtn = document.querySelectorAll('.delete')
const todoItem = document.querySelectorAll('.todo-item span')
const todoComplete = document.querySelectorAll('.todo-item span.completed')

// Created these three variables for the POST test
const item = document.querySelector('#item')
const submitBtn = document.querySelector('#submit-btn')
const todoList = document.querySelector('.todo-list')

submitBtn.addEventListener('click', createItem)

Array.from(deleteBtn).forEach(el =>{
    el.addEventListener('click', removeItem)
})

Array.from(todoItem).forEach(el => {
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach(el => {
    el.addEventListener('click', markUncomplete)
})


async function createItem(e){
    e.preventDefault()

    const itemText = String(item.value)

    try{
        const response = await fetch('/addItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'item': itemText,
            })
        })

        console.log(response.status === 200)

        if (response.status === 200){
            const li = document.createElement('li')
            const span = document.createElement('span')
            li.classList.add('todo-item')
            li.appendChild(span)
            li.appendChild(span)
            span.textContent = itemText
            todoList.appendChild(li)
            li.addEventListener('click', () => console.log(this))
        }
    }
    catch(err){
        console.log(err)
    }
}

async function removeItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    const itemDate = this.parentNode.childNodes[3].innerText

    console.log(itemText, itemDate)
    
    try{
        const response = await fetch('removeItem', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'itemS': itemText,
                'dateS': itemDate
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){ console.error(err) }
}

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    console.log(itemText)

    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'itemS': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){ console.error(err) }
}

async function markUncomplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markUncomplete', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'itemS': itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){ console.error(err) }
}