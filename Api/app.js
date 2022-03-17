// The call stack in js !!!!!!!!!!!!!!

// Third on call stack
const repeat = (str, times) => {
    let result = '';
    for (let i = 0; i < times; i++) {
        result += str;
    }
    return result;
};

// First on call stack
const scream = (str) => {
    return str.toUpperCase() + '!!!';
};

// Second on call stack
const getRantText = (phrase) => {
    let text = scream(phrase);
    let rant = repeat(text, 8);
    return rant;
};

// Fourth and last on call stack
const makeRant = (phrase, el) => {
    const h1 = document.createElement('h1');
    h1.innerText = getRantText(phrase);
    el.appendChild(h1);
};
// console.log('HELLO!');

// makeRant('I hate mayonnaise', document.body);
// makeRant('if you have to cough, please cover your mouth', document.body);

// ------------------------------------------------

// Callback hell !!!!!!!!!!!!!!

const btn = document.querySelector('button');

//This function moves an element "amount" number of pixels after a delay.
//If the element will stay on screen, we move the element and call the onSuccess callback function
//If the element will move off screen, we do not move the element and instead call the onFailure callback
// const moveX = (element, amount, delay, onSuccess, onFailure) => {
//     setTimeout(() => {
//         const bodyBoundary = document.body.clientWidth;
//         const elRight = element.getBoundingClientRect().right;
//         const currLeft = element.getBoundingClientRect().left;
//         if (elRight + amount > bodyBoundary) {
//             onFailure();
//         }
//         else {
//             element.style.transform = `translateX(${currLeft + amount}px)`;
//             onSuccess();
//         }
//     }, delay);
// };

// // LOOK AT THIS UGLY MESS!
// moveX(
//     btn,
//     300,
//     1000,
//     () => {
//         //success callback
//         moveX(
//             btn,
//             300,
//             1000,
//             () => {
//                 //success callback
//                 moveX(
//                     btn,
//                     300,
//                     1000,
//                     () => {
//                         //success callback
//                         moveX(
//                             btn,
//                             300,
//                             1000,
//                             () => {
//                                 //success callback
//                                 moveX(
//                                     btn,
//                                     300,
//                                     1000,
//                                     () => {
//                                         //success callback
//                                         alert('YOU HAVE A WIDE SCREEN!');
//                                     },
//                                     () => {
//                                         //failure callback
//                                         alert('CANNOT MOVE FURTHER!');
//                                     }
//                                 );
//                             },
//                             () => {
//                                 //failure callback
//                                 alert('CANNOT MOVE FURTHER!');
//                             }
//                         );
//                     },
//                     () => {
//                         //failure callback
//                         alert('CANNOT MOVE FURTHER!');
//                     }
//                 );
//             },
//             () => {
//                 //failure callback
//                 alert('CANNOT MOVE FURTHER!');
//             }
//         );
//     },
//     () => {
//         //failure callback
//         alert('CANNOT MOVE FURTHER!');
//     }
// );

// ------------------------------------------------

// Promises !!!!!!!!!!!!!!

// const makeDogPromise = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const rand = Math.random()
//             if (rand < 0.5) {
//                 resolve()
//             } else {
//                 reject()
//             }
//         }, 5000);
//     })
// };
// makeDogPromise()
//     .then(() => {
//         console.log('Got a dog')
//     })
//     .catch(() => {
//         console.log('No dog')
//     })

// ------------------------------------------------

// const fakeRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             const pages = {
//                 '/users': [
//                     { id: 1, username: 'Bilbo' },
//                     { id: 5, username: 'Esmerelda' },
//                 ],
//                 '/about': 'This is the about'
//             }
//             const data = pages[url]
//             if (data) {
//                 resolve({ status: 200, data })
//             } else {
//                 reject({ status: 404 })
//             }
//             resolve({ status: 200, data })
//         }, 1000)
//     })
// }
// fakeRequest('/users')
//     .then((res) => {
//         console.log('Status Code', res.status)
//         console.log('Data', res.data)
//     })
//     .catch((res) => {
//         console.log(res.status)
//         console.log('Failed')
//     })

// fakeRequest('/dogs')
//     .then((res) => {
//         console.log('Status Code', res.status)
//         console.log('Data', res.data)
//     })
//     .catch((res) => {
//         console.log(res.status)
//         console.log('Failed')
//     })



// ------------------------------------------------

//This is a FAKE Http Request Function
//It takes 1 second to resolve or reject the promise, depending on the url that is passed in
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pages = {
                '/users': [
                    { id: 1, username: 'Bilbo' },
                    { id: 5, username: 'Esmerelda' }
                ],
                '/users/1': {
                    id: 1,
                    username: 'Bilbo',
                    upvotes: 360,
                    city: 'Lisbon',
                    topPostId: 454321
                },
                '/users/5': {
                    id: 5,
                    username: 'Esmerelda',
                    upvotes: 571,
                    city: 'Honolulu'
                },
                '/posts/454321': {
                    id: 454321,
                    title:
                        'Ladies & Gentlemen, may I introduce my pet pig, Hamlet'
                },
                '/about': 'This is the about page!'
            };
            const data = pages[url];
            if (data) {
                resolve({ status: 200, data }); //resolve with a value!
            }
            else {
                reject({ status: 404 }); //reject with a value!
            }
        }, 1000);
    });
};

fakeRequest('/users')
    .then((res) => {
        console.log(res);
        const id = res.data[0].id;
        return fakeRequest(`/users/${id}`);
    })
    .then((res) => {
        console.log(res);
        const postId = res.data.topPostId;
        return fakeRequest(`/posts/${postId}`);
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log('OH NO!', err);
    });

// ************************************************
// ATTEMPT 2 (deliberate error to illustrate CATCH)
// ************************************************
// fakeRequest('/users')
// 	.then((res) => {
// 		console.log(res);
// 		const id = res.data[0].id;
// 		return fakeRequest(`/useALSKDJrs/${id}`); //INVALID URL, CATCH WILL RUN!
// 	})
// 	.then((res) => {
// 		console.log(res);
// 		const postId = res.data.topPostId;
// 		return fakeRequest(`/posts/${postId}`);
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log('OH NO!', err);
// 	});

// ------------------------------------------------
