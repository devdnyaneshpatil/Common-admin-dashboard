function submitForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if(!email||!password){
    alert("Please Enter Your Credentials!!")
  }else{
    payload={email,password}
    fetch("http://localhost:8080/users/admin/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload)
    })
    .then((res)=>res.json())
    .then((data)=>{
      // console.log(data)
        localStorage.setItem("bbToken",JSON.stringify(data.token))
        alert(`welcome${data.user.name}`)
        if (data.msg == "Login Successfull") {
          window.location.href="../Homepage/home.html"
        }
    })
    .catch((error)=>console.log(error))
  }
  
}
