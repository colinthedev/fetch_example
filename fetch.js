
const fetchedURL = 'https://jsonplaceholder.typicode.com/users'
const postURL = 'https://jsonplaceholder.typicode.com/posts?userId='

//Non async await
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        const firstUser = users[0];
        console.log(firstUser);
        
        return fetch('https://jsonplaceholder.typicode.com/posts?userId=' + firstUser.id);
    })
    .then(response => response.json())
    .then(posts => console.log(posts))
    .catch(error => console.log(error));

/* 
const myAsyncFunction = async () => {
    try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await usersResponse.json();
        const secondUser = users;
        console.log(secondUser);

        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + secondUser.id)
        const posts = await postsResponse.json();
        console.log(posts)
    } catch (error) {
        console.log(`There was a error ${error}`)
    }
}
 */

