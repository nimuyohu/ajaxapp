// async/awaitに置き換え
async function main() {
    try {
        const userId = getUserId();
        const userInfo = await fetchUserInfo(userId);
        const view = createView(userInfo);
        displayView(view)
    } catch (error) {
        console.error(`エラーが発生しました (${error})`)
    }
};


function fetchUserInfo(userId) {
    // fetchの戻り値のPromiseをreturnする
    return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            if (!response.ok){
                // エラーレスポンスからRejectedなPromiseを作成して返す
                return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
            } else {
                // json形式にパースして渡す
                return response.json()
            }
            })
}

// fetchしたユーザーの情報を引数に、HTMLを生成して返す
function createView(userInfo) {
    return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function getUserId(userId){
    return document.getElementById('userId').value
}

// 生成したHTMLをDOMで表示する
function displayView(view) {
    const result = document.getElementById('result')
    result.innerHTML = view
}

function escapeHTML(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + htmlspecialchars(value) + str;
        } else {
            return result + String(value) + str;
        }
    })
}
// <>や、&などの特殊な文字列は意図しない構造のHTMLになるかもしれないたため、UTF8に変換する
// ライブラリを使うのが一般だけど、下のように実装。上で使ったのはhtmlspecialcharsというライブラリ
// https://github.com/teppeis/htmlspecialchars#for-browsers
// function escapeSpecialChars(str) {
//     return str
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
// }

