var signinEmail= document.getElementById('signinEmail');
var signinPassword= document.getElementById('signinPassword');
var signupName=document.getElementById('signupName');
var signupEmail=document.getElementById('signupEmail');
var signupPassword=document.getElementById('signupPassword');
var signupBtn= document.querySelector('.signup');
var loginBtn= document.querySelector('.login');
var logoutBtn=document.querySelector('.logout')
var form= document.querySelector('form');

var usersData=[];
if(localStorage.getItem('users')!=null){
    usersData=JSON.parse(localStorage.getItem('users'))
}
var showUsername=document.querySelector('.username');
var username=localStorage.getItem('username');
if(showUsername&&username){
    showUsername.innerHTML='Welcome ' + username;
    
}



// for sign up

function empty(){
    if(signupName.value=="" || signupEmail.value=="" || signupPassword.value==""){
        return true
        
    }
    return false
}
function emailExists(){
    for(var i=0; i<usersData.length; i++){
        if(signupEmail.value==usersData[i].email){
            return true
        }
    }
    return false
}
function emailcorrect(){
    var inputEmail=signupEmail.value;
    var emailRegx= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(emailRegx.test(inputEmail)){
        return true
    }
    return false

}



function addUser(){

    if(empty()){
        document.querySelector('.note').innerHTML=`<span class="text-danger">All inputs is required!</span>`
       return false
    }

    var userSignup={
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    }
   

    // if(usersData.length==0){
    //     usersData.push(userSignup);
    //     localStorage.setItem('users',JSON.stringify(usersData))
    //     document.querySelector('.note').innerHTML=`<span class="text-danger">Success</span>`

    // }

   

    if(emailExists()==true){
        document.querySelector('.note').innerHTML=`<span class="text-danger">Email already exists!</span>`
        return false
    }
    
    if(emailcorrect()){
        usersData.push(userSignup);
        localStorage.setItem('users',JSON.stringify(usersData))
        document.querySelector('.note').innerHTML=`<span class="text-success">Success</span>`
       

    }
    else{
        document.querySelector('.note').innerHTML=`<span class="text-danger"> Email does not exist!</span>`

    }
}



// for sign in

function signinEmpty(){
    if(signinEmail.value=="" || signinPassword.value==""){
        
        return true;
    }
    return false
   
}
var index;
function signinCorrect(){
    for(var i=0; i<usersData.length; i++){
        if(signinEmail.value==usersData[i].email && signinPassword.value==usersData[i].password)
        {
            index=i;
            return true;

        }
    }
    return false;

}
function signin(){
    if(signinEmpty()){
        document.querySelector('.check').innerHTML=`<span class="text-danger">All inputs is required!</span>`
        return false;

    }
    if(signinCorrect()){
        
        localStorage.setItem('username',usersData[index].name);
        document.querySelector('.path').href=`home.html`;
        return true;

    }
    else{
        document.querySelector('.check').innerHTML=`<span class="text-danger">Email or Password is not correct!</span>`
        return false;
    }

}

if (form){
    form.addEventListener('click',function(e){
        if(e.target==signupBtn){
            addUser()
          
        }
        else if(e.target==loginBtn){
            signin()
        }
    
       
    })
    signupPassword.addEventListener('keypress',function(e){
        var regxpass=/\s/g;
       var  password= signupPassword.value;
       if(regxpass.test(password)){
        signupPassword.type='text';
        e.preventDefault();
       }
       else{
        signupPassword.type='password'

       }


    })
}
function logout(){
    localStorage.removeItem('username')
}

if(logoutBtn){
    logoutBtn.addEventListener('click',logout)
}



