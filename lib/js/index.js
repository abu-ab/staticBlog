window.onload = function () {
    let AJAX = ajax();
    let articleList = document.querySelector('.articleList');
    let loadsuccess = document.querySelector('.loadsuccess');
    let articleHtml = '';
    let index = 0;
    let flag = true;
    window.onscroll = function (e) {
        let clientHeight = document.documentElement.clientHeight;
        let scrollTop = document.documentElement.scrollTop;
        let offsetHeight = document.documentElement.offsetHeight;
        // console.log(clientHeight, scrollTop, offsetHeight)
        if (flag) {
            if (clientHeight + scrollTop == offsetHeight) {
                flag = false;
                document.documentElement.scrollTop -= 150;
                getArticle();
            }
        }
    }
    getArticle();

    function getArticle() {
        AJAX.getData('http://192.168.2.100/blogwebapi/article/list', {
            page: index
        }, function (e) {
            let data = e.Data;
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    articleHtml += `
                    <div class="article" id="${data[i].Id}">
                        <div class="article-left">
                            <div class="article-left-img">
                                <img src="${data[i].Image}" />
                            </div>
                        </div>
                        <div class="article-right">
                            <div class="article-right-title">
                                ${data[i].Title}
                            </div>
                            <div class="article-right-content">
                                ${data[i].Description}
                            </div>
                        </div>
                    </div>`
                }
                articleList.innerHTML = articleHtml;
                index++;
                flag = true;
            } else {
                flag = false;
                loadsuccess.style.display = 'block';
            }

        })
    }


    AJAX.getData('http://192.168.2.100/blogwebapi/article/recommendList', {}, function (e) {
        console.log(e);
        let html = '';
        let rankList = document.querySelector('.rank-list')
        let data = e.Data;
        for (let i = 0; i < data.length; i++) {
            html += `<li><i class="icon iconfont icon-dianzan"></i><a href="#">${data[i].Title}</a></li>`
        }
        rankList.innerHTML = html;
    })

    AJAX.getData('http://192.168.2.100/blogwebapi/sort/list', {}, function (e) {
        console.log('类别', e);
        let html = '';
        let classifyList = document.querySelector('.classify-list')
        let data = e.Data;
        for (let i = 0; i < data.length; i++) {
            html += `<li><a href="#">${data[i].Name}(${data[i].Count})</a></li>`
        }
        classifyList.innerHTML = html;
    })

    articleList.onclick = function (e) {
        console.log(e.path[2].id);
        if (e.path[2].id) {
            let id = e.path[2].id;
            location.href = `article.html?id=${id}`

        }
    }
}