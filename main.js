let arrayOfUsers = [];
let shortListOfUsers = [];
let selectListOfUsers = [];

window.onload = function() {
    getPosts();
};

const getPosts = () => {
  fetch('https://randomuser.me/api/?results=5&nat=au,us,fr,gb')
    .then(res => res.json())
    .then(posts => arrayOfUsers = posts)

}

const getShortPosts = () => {
  fetch('https://randomuser.me/api/?inc=name,picture,cell')
    .then(res => res.json())
    .then(posts => shortListOfUsers = posts)

}

const getSelectPosts = () => {
  fetch('https://randomuser.me/api/?exc=dob,registered,nationality,location')
    .then(res => res.json())
    .then(posts => selectListOfUsers = posts)

}

const consolePosts = () => {
    setTimeout(function() {
        console.log(arrayOfUsers)
        displayUsers(arrayOfUsers, "all-posts");
    }, 1000)
}

const displayUsers = (arr, location) => {
    const allPosts = document.getElementById(location)
    arr.results.map((user) => {
        const li = document.createElement('li');
        const ul = document.createElement('ul');
        ul.classList.add('resultList')
        const img = document.createElement('img');
        const button = document.createElement('button');
        const text = document.createTextNode(`${user.name.first} ${user.name.last}`)
        img.src = user.picture.large
        button.innerText = "More Info"
        li.appendChild(text)
        li.appendChild(img)
        li.appendChild(button)
        li.appendChild(ul)
        allPosts.append(li)
        button.addEventListener("click", () => {
            ul.innerHTML = null;
            for (let property in user) {
                if (typeof user[property] === 'object') {
                    // console.log("object")
                    for (let subProperty in user[property]){
                        console.log(user[property][subProperty])                        
                        if (typeof user[property][subProperty] === 'object') {
                            for (let subSubProperty in user[property][subProperty]) {
                                const li = document.createElement('li');
                                const text = document.createTextNode(`${subSubProperty}: ${user[property][subProperty][subSubProperty]}`)
                                li.appendChild(text)
                                ul.appendChild(li)
                            }
                        } else {
                            const li = document.createElement('li');
                            const newText = document.createTextNode(`${subProperty}: ${user[property][subProperty]}`)
                            li.appendChild(newText)
                            ul.appendChild(li)
                    }
                }
                } else {
                    const li = document.createElement('li');
                    const newText = document.createTextNode(`${property}: ${user[property]}`)
                    li.appendChild(newText)
                    ul.appendChild(li)
            }  
        }
        const hideButton = document.createElement('button')
        hideButton.innerText = "Hide Info";
        ul.appendChild(hideButton)
            hideButton.addEventListener("click", () => {
                ul.innerHTML = null;
            })
        })
    })
}

consolePosts()

//returns users with only name picture and phone
const displayShortList = () => {
    getShortPosts();
    setTimeout(function() {
        // console.log(arrayOfUsers)
        displayUsers(shortListOfUsers, "some-posts");
    }, 1000)
}

//returns users without dob, registered, and location
const displaySelectList = () => {
    getSelectPosts();
    setTimeout(function() {
        // console.log(arrayOfUsers)
        displayUsers(selectListOfUsers, "without-posts");
    }, 1000)
}

