import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import { getDatabase,
        ref,
        push,
        onValue,
        remove
        } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-aa2cd-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceDB = ref(database, "LeadInformation")

console.log(firebaseConfig.databaseURL)

const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const delBtn = document.getElementById("del-btn")
let ulEl = document.getElementById("ul-el")


function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++){
    listItems += `<li>
                    <a target='_blank' href='${leads[i]}'>
                        ${leads[i]}
                    </a>
                </li>`
    }
ulEl.innerHTML = listItems
}


delBtn.addEventListener("click", function(){
    const removeSnapshot = remove(referenceDB)
    ulEl.innerHTML = ""
})

onValue(referenceDB, function(snapshot){
    const doesSnapExists = snapshot.exists()
    
    if(doesSnapExists){
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    render(leads)
    }
})

saveBtn.addEventListener("click", function(){
    push(referenceDB, inputEl.value)
    inputEl.value = "" 
})

