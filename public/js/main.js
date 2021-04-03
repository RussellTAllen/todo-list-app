console.log('main.js loaded...')

const deleteBtn = document.querySelectorAll('.delete')
const todoItem = document.querySelectorAll('.todo-item span')
const todoComplete = document.querySelectorAll('.todo-item span.completed')

Array.from(deleteBtn).forEach(el =>{
    el.addEventListener('click', removeItem)
})

Array.from(todoItem).forEach(el => {
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach(el => {
    el.addEventListener('click', markUncomplete)
})

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