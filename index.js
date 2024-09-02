import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-aa2cd-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

console.log(firebaseConfig.databaseURL)

let myLeads = []
const inputEl = document.getElementById("input-el")
const saveBtn = document.getElementById("save-btn")
const delBtn = document.getElementById("del-btn")
const tabBtn = document.getElementById("tab-btn")
let ulEl = document.getElementById("ul-el")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

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

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

delBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

saveBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value = ""
    render(myLeads)
})

