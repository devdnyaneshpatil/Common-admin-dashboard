let startBtn=document.querySelector("button")
startBtn.addEventListener("click",()=>{
    const bbToken=JSON.parse(localStorage.getItem("bbToken"))
    if(bbToken){
        window.location.href = "../Homepage/home.html";
    }else{
        window.location.href = "../authorization/login.html";
    }
})