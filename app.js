let btn = document.querySelector("#createNote");
let title=document.querySelector('#note')
let category=document.querySelector('#category')
let displaynotessection=document.querySelector('#allnotes')


btn.addEventListener('click',()=>{
    if(title.value && category.value){
        let Title=title.value
        let Category=category.value
        createNote(Title,Category)
    }
    else{
        alert('Please enter the title and category to add the note')
    }
})

let allNotes=JSON.parse(localStorage.getItem('notes')) || []

//create new note
function createNote(Title,Category){
    let id=allNotes.length+1
    let note={
        title:Title,
        category:Category,
        pin:false,
        createdAt:new Date(),
        id
    }
    allNotes.push(note)
    localStorage.setItem('notes',JSON.stringify(allNotes))
    displayNotes(allNotes);
}

//display the notes
function displayNotes(allNotes){
    displaynotessection.innerHTML=''
    console.log(allNotes)
    allNotes.filter(el => el.pin == true)
      .forEach((note) => {
        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.category}</p>
        <button id=${note.id} class=pin>Pinned</button>
        `;
        displaynotessection.appendChild(div);
      });
    allNotes.filter(el=>el.pin==false).forEach(note=>{
        let div=document.createElement('div')
        div.classList.add('card')
        div.innerHTML=`
        <h3>${note.title}</h3>
        <p>${note.category}</p>
        <button id=${note.id} class=pin>Pin</button>
        `
        displaynotessection.appendChild(div)
    })
    
    
}

//add to top
displaynotessection.addEventListener('click',(e)=>{
    if(e.target.classList.contains('pin')){
        addtoTo(e.target.id)
    }
})
function addtoTo(id) {
    console.log(allNotes)
    allNotes[id-1].pin=true
    localStorage.setItem('notes',JSON.stringify(allNotes))
    displayNotes(allNotes)
    console.log("clicked",id);
}

displayNotes(allNotes)


//filtering by category
const filteroption = document.querySelector("#filtercategory");
filteroption.addEventListener('change',(e)=>{
    console.log(e.target.value)
    if(e.target.value){
        let filteredNotes=allNotes.filter(el=>el.category==e.target.value)
        displayNotes(filteredNotes)
    }
    else{
        displayNotes(allNotes)
    }
})