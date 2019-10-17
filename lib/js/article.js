window.onload = function () {
    let AJAX = ajax();
    let id = location.search.slice(location.search.indexOf('=') + 1);
    let btn = document.querySelector('.btn');
    console.log(id)
    AJAX.getData('http://192.168.2.100/blogwebapi/article/single', {
        id: id
    }, function (e) {
        console.log(e);
        let articleContainer = document.querySelector('.article-container')
        let data = e.Data;
        let commons = data.Comments;

        let html = `<p class="title">${data.Title}</p>
        <p class="timer">${getTime(data.CreateTime)}</p>
        <p class="description">
            ${data.Description}
        </p>
        <div class="article-content">
          ${data.Content}
        </div>  
        <p class='thumbs-count'>${data.ThumbsCount}</p>
        
        `;
        articleContainer.innerHTML = html;
        let messageHtml = '';
        for (let i = 0; i < commons.length; i++) {

            messageHtml += `
                <div class="message-info">
                    <div class="info-name">
                        ${commons[i].UserName}
                    </div>
                    <div class="info-time">${getTime(commons[i].CreateTime)}</div>
                </div>
                <p class="message-content">
                    ${commons[i].Content}
                </p>
            `
            document.querySelector('.message-list').innerHTML = messageHtml;
        }
    });
    btn.onclick = function (e) {
        e.preventDefault();
        let name = document.querySelector('.message-name input').value;
        let content = document.querySelector('.message-word textarea').value;
        AJAX.postData('http://192.168.2.100/blogwebapi/comment/submit', {
            name: name,
            content: content,
            articleId: id
        }, function (e) {
            if (e.Code == 100) {
                location.reload();
            }
        })
    }

    function getTime(time) {
        let date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
}