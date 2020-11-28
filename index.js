const heading = document.querySelector('h2');

const headingText = heading.textContent;

function fetchUserInfo(userId) {
fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
        console.log(response.status);//200
        if (!response.ok){
            console.error("エラーレスポンス",response);
        } else {
            return response.json().then(userInfo => {
                console.log(userInfo)
                const view = `
<h4>${userInfo.name} (@${userInfo.login})</h4>
<img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
<dl>
    <dt>Location</dt>
    <dd>${userInfo.location}</dd>
    <dt>Repositories</dt>
    <dd>${userInfo.public_repos}</dd>
</dl>
`;

const result = document.getElementById('result')
result.innerHTML = view
            })
        }
        }).catch(error => {
            console.error(error); 
        });
}

