let postsCard = document.querySelector('#posts')
const urlPrefix = 'https://jsonplaceholder.org/'

const requestUrl = urlPrefix + 'posts'
const requestUserUrl = urlPrefix + 'users'
const requestCommentsUrl = urlPrefix + 'comments'
let posts = []
let comments = []
let users = []

//users
fetch(requestUserUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(users => {
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

//posts
  fetch(requestUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(posts => {
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  //comments
  fetch(requestCommentsUrl)
  .then(response => {
    if(!response.ok){
        throw new Error('Network response was not ok')
    }
    return response.json()
  })
  .then(comments =>{
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });


  function showLoadErr(){
    alert('404 capon yapıştırıcısı')
  }

  async function loadData(){
    posts = await fetch(requestUrl).then(x => x.json())
    users = await fetch(requestUserUrl).then(x => x.json())
    comments = await fetch(requestCommentsUrl).then(x => x.json())
    render()
  }

  
  loadData()


  function render() {
    for(const post of posts){
        let writer = users.find(x => x.id === post.userId)

        postsCard.innerHTML += `
                <div class="post-preview">
                <a>
                    <h2 class="post-title">${post.title}</h2>
                    <h4 class="content">${post.content}</h4>
                    <h6>Category: ${post.category}</h6>
                 </a>
                <p class="post-meta">
                <h6>Posted by</h6>
                <a>${writer.firstname}${writer.lastname}</a>
                ${post.publishedAt}
                </p>
                </div>
                <hr class="my-4"/>`
                bindClicks()
    }
  }
  

  function bindClicks() {
    for(const btn of document.querySelectorAll('.post-title')){
        btn.addEventListener('click', (e) => {
            e.target.parentElement.children[1].classList.toggle('show')
        })
    }
  }