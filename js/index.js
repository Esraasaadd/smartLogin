//sign up inputs 
var signupNameInput=document.getElementById("signupName")
var signupEmailInput=document.getElementById("signupEmail")
var signupPasswordInput=document.getElementById("signupPassword")
var signupButton=document.getElementById("signupButton")
//login inputs
var loginEmailInput=document.getElementById("loginEmail")
var loginPasswordInput=document.getElementById("loginPassword")
var loginButton=document.getElementById("loginButton")

var loginForm=document.getElementById("loginForm")
var signupForm=document.getElementById("signupForm")
var home =document.getElementById("home")
var signinPage=document.getElementById("signinPage")
var signupPage=document.getElementById("signupPage")
var pWarning=document.getElementById("pWarning")
var emailWarning=document.getElementById("emailWarning")
var pHome=document.querySelector("#home .formContainer")
var navbar=document.querySelector("nav")
var logoutButton=document.getElementById("logoutButton")
var loginValidationWarning=document.getElementById("loginValidationWarning")
var signupValidationWarning=document.getElementById("signupValidationWarning")

function isEmailExist() {
    for (var i = 0; i < signupArray.length; i++) {
        if (signupArray[i].signupEmail== signupEmail.value) {
            return false
        }
    }
}

var signupArray=[];
function signup() {
    var signup={
        signupName:signupNameInput.value,
        signupEmail:signupEmailInput.value,
        signupPassword:signupPasswordInput.value
    }

    //validation first
    if(signupNameInput.classList.contains("is-valid")&&
        signupEmailInput.classList.contains("is-valid")&&
        signupPasswordInput.classList.contains("is-valid")){
            if(isEmailExist()==false)
                {
                    emailWarning.classList.replace("d-none","d-block")
                }
                else{
                    signupArray.push(signup);
                    localStorage.setItem("signup",JSON.stringify(signupArray))
                    signupForm.classList.add("d-none")
                    loginForm.classList.replace("d-none","d-block")   
                    clearSignupInputs();           
                }
        }
        else{
            signupValidationWarning.classList.replace("d-none","d-block")
        }
}

if(localStorage.getItem("signup")==null)
    {signupArray=[];}
    else
    {signupArray=JSON.parse(localStorage.getItem("signup"));}

signupButton.addEventListener("click",signup)


var loginArray=[];
function login() {
    var login={
        loginEmail:loginEmailInput.value,
        loginPassword:loginPasswordInput.value
    }

    //validation first
    if(loginEmailInput.classList.contains("is-valid")&&
    loginPasswordInput.classList.contains("is-valid")){
        for(var i=0 ;i<signupArray.length;i++){
            if(loginEmailInput.value==signupArray[i].signupEmail && loginPasswordInput.value==signupArray[i].signupPassword){
                    loginForm.classList.add("d-none")
                    home.classList.replace("d-none","d-flex")
                    navbar.classList.replace("d-none","d-flex")
                    pHome.innerHTML=(`<h1>Welcome ${signupArray[i].signupName}</h1>`)   
                    clearLoginInputs();        
                }
            else{
                pWarning.classList.replace("d-none","d-block")
            }
        }  
    }
    else{
        loginValidationWarning.classList.replace("d-none","d-block")
    }
}

loginButton.addEventListener("click",login)


signinPage.addEventListener("click",function(){
    signupForm.classList.add("d-none")
    loginForm.classList.replace("d-none","d-block")
})

signupPage.addEventListener("click",function(){
    loginForm.classList.replace("d-block","d-none")
    signupForm.classList.replace("d-none","d-block")
})

function logout(){
    home.classList.replace("d-flex","d-none")
    navbar.classList.replace("d-flex","d-none")
    signupForm.classList.replace("d-none","d-block")
}
logoutButton.addEventListener("click",logout)
//validation
function validateInputs(element){
    var regex={
        signupName:/^[A-Z]{3,}$/i,
        signupEmail: /^[A-Z]{3,}@(gmail|yahoo).com$/i,
        signupPassword:/^\d{3,}$/,
        loginEmail:/^[A-Z]{3,}@(gmail|yahoo).com$/i,
        loginPassword:/^\d{3,}$/
    }
    if(regex[element.id].test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
    }
    else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
    }
}

function clearLoginInputs() {
    loginEmailInput.value=null;
    loginPassword.value=null;
    loginEmailInput.classList.remove("is-valid")
    loginPasswordInput.classList.remove("is-valid")
}

function clearSignupInputs() {
    signupNameInput.value=null;
    signupEmailInput.value=null;
    signupPasswordInput.value=null;
    signupNameInput.classList.remove("is-valid")
    signupEmailInput.classList.remove("is-valid")
    signupPasswordInput.classList.remove("is-valid")
}
