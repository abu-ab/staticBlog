window.onload = function () {
    const AJAX = ajax();
    let messageList = document.querySelector('.message-list');
    let form = document.querySelector('.message-respond form');
    let html = '';
    let num = 10;
    getMessageList(num);

    window.onscroll = function (e) {
        let clientHeight = document.documentElement.clientHeight;
        let scrollTop = document.documentElement.scrollTop;
        let offsetHeight = document.documentElement.offsetHeight;
        console.log(clientHeight, scrollTop, offsetHeight)
        if (flag) {
            if (clientHeight + scrollTop > offsetHeight - 50) {
                console.log(11)
                flag = false;
                num += 10;
                document.documentElement.scrollTop -= 150;
                getMessageList(num);
            }
        }
    }

    function getMessageList(num) {
        AJAX.getData('http://192.168.2.100/blogwebapi/message/list', {}, function (e) {
        
            console.log(e)
            let data = e.Data;
            if (data) {
                flag = true;
                for (let i = 0; i < num; i++) {
                    html += `
                    <div class="message">
                    <div class="message-info">
                      <div class="info-name">
                      ${data[i].UserName}
                      </div>
                      <div class="info-time">${getTime(data[i].CreateTime)}</div>
                    </div>
                    <p class="message-content">
                        ${data[i].Content}
                    </p>
                  </div>`
                }
                messageList.innerHTML = html;
            }else{
                flag=false;
            }

        })
    }

    form.onsubmit = function (e) {
        e.preventDefault();
        let name = document.querySelector('.message-name input').value;
        let content = document.querySelector('.message-word textarea').value;
        console.log(content)
        AJAX.postData('http://192.168.2.100/blogwebapi/message/submit', {
            name: name,
            content: content
        }, function (e) {
            if (e.Code == 100) {
                location.reload();
            }
            console.log(e)
        })
    }

    function getTime(time) {
        let date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
}