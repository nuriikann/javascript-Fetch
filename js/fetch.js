let postsCard = document.querySelector('#posts')
const baseUrl = 'http://localhost:1337'
const urlPrefix = baseUrl + '/api/'

const requestUrl = urlPrefix + 'posts'
// const requestUser = urlPrefix + 'users'


let posts = []
// let users = []


//#region yorumlar
//posts
  // fetch(requestUrl)
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok Posts');
  //   }
  //   return response.json();
  // })
  // .then(postsResponse => {
  // })
  // .catch(error => {
  //   console.error('There was a problem with the fetch operation:', error);
  // });


  
  // fetch(requestUser)
  // .then(response =>{
  //   if(!response.ok){
  //     throw new Error('Network response was not ok Users')
  //   }
  //   return response.json()
  // })
  // .catch(error => {
  //   console.error('There was a problem with the fetch operation:', error)
  // })
//#endregion

  function showLoadErr(){
    alert('404 capon yapıştırıcısı')
  }

  async function loadData(){
    const postsResponse = await fetch(requestUrl)
    if (!postsResponse.ok) {
      throw new Error('Network response was not ok Posts');
    }
    posts = await postsResponse.json()
    // users = await fetch(requestUser).then(x => x.json())
    render()
  }

  

 


  function render() {
    for(const post of posts.data){
        // let writer = users.find(x => x.id === post.userId)

        postsCard.innerHTML += `
                <div class="post-preview">
                
                    <h2 class="post-title"><a href="#/${post.id}">${post.attributes.title}</a></h2>
                    <h4 class="content">${post.attributes.summary}</h4>
                    <h6>${post.attributes.content}</h6>
                 
                <p class="post-meta">
                <div class="postedBy"> <h6>Posted by <h6 class="authorColor"> ${post.attributes.author}</h6></h6></div><br>
                created at: ${post.attributes.createdAt}<br><br>
                updated at: ${post.attributes.updatedAt}
                </p>
                </div>
                <hr class="my-4"/>`
        bindClicks()
    }
  }
  
  loadData()
  
  function bindClicks() {
    for(const btn of document.querySelectorAll('.post-title')){
        btn.addEventListener('click', e => {
            postsCard.classList.toggle('hide')
            
        })
    }
  }


   const servicePrefix = 'http://localhost:1337/api/posts/';


window.addEventListener('hashchange', changeRoute);

let contentEl;

function changeRoute() {
    const pageUrl = location.hash.substring(2);
    loadPage(pageUrl);
}

async function loadPage(url) {
  contentEl = document.querySelector('#post-detail');
    contentEl.innerHTML = 'Yükleniyor';
    if (url === '') {
      postsCard.classList.toggle('hide')
      contentEl.classList.toggle('hide')
      postsCard.innerHTML = ''
      loadData();
    } else {
      if (contentEl.classList.contains('hide')) {
        contentEl.classList.toggle('hide')
      }
        loadSubPage(servicePrefix + url + '?populate=hero');
    }
}

async function loadSubPage(url) {
    const post = await fetch(url).then(r => r.json());
    
    contentEl.innerHTML = `
        <div class="post">
            <img src="${baseUrl + post.data.attributes.hero.data.attributes.url}">
            <h3>${post.data.attributes.title}</h3>
            <h4>${post.data.attributes.summary}</h4>
            <div class="content">
                ${post.data.attributes.content}
            </div>
        </div>
        `;
}

// async function loadHomePage() {
//     const posts = await fetch(servicePrefix).then(r => r.json());
//     contentEl.innerHTML = '';
//     for(const post of posts.data) {
//         contentEl.innerHTML += `
//         <div class="post">
//             <h3><a href="#/${post.id}">${post.attributes.title}</a></h3>
//             <h4><a href="#/${post.id}">${post.attributes.summary}</a></h4>
//             <hr>
//         </div>
//         `;
//     }
// }

// changeRoute();