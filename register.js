let users = [
    {
        name: 'Zack',
        email: 'Zack@mail.com', 
        pass: '123'
    },
];
currentUser = null;

function showReg() {
    
    document.getElementById('loginForm').classList.add('hidden')
    document.getElementById('regForm').classList.remove('hidden')
}


function showLogin() {
    
    document.getElementById('regForm').classList.add('hidden')
    document.getElementById('loginForm').classList.remove('hidden')
}


function register() {
   const name = document.getElementById('regName').value
   const email = document.getElementById('regEmail').value
   const pass = document.getElementById('regPass').value
   console.log(users)


   if (users.some(u => u.email === email)) { alert("Пользователь существует"); return  }

   users.push({name, email, password})
   showLogin()
}

function login() {
    const email = document.getElementById('loginEmail').value
    const pass = document.getElementById('loginPass').value

    const user = users.find(u => u.email === email && u.pass === pass)
    console.log(users)


    if (user) {
        currentUser = user;
        document.getElementById('loginForm').classList.add('hidden')
        window.location.href = 'http://127.0.0.1:5500/home.html'
    } else {
        alert("Неверные данные")
    }

}

function logout(){
    currentUser = null;
    window.location.href = "http://127.0.0.1:5500/auth/auth_reg.html"
}