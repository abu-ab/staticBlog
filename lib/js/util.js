let ajax = function () {
    return {
        getData: function (url, data, callback) {
            let xhr = new XMLHttpRequest();
            if (url.indexOf("?") < 0) {
                url = url + "?"
            }

            if (JSON.stringify(data) != "{}") {

                data = jsonToString(data);
                url = url + data
            }
            xhr.open('get', url, true);
            xhr.onreadystatechange = function () {
                if (this.status == 200 && this.readyState == 4) {
                    callback(JSON.parse(this.responseText));
                }
            }
            xhr.send();
        },

        postData: function (url, data, callback) {
            let xhr = new XMLHttpRequest();
            if (JSON.stringify(data) != "{}") {
                data = jsonToString(data);
            }

            xhr.open('post', url, true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.onreadystatechange = function () {
                if (this.status == 200 && this.readyState == 4) {
                    callback(JSON.parse(this.responseText));
                }
            }
            xhr.send(data);
        }
    }

    function jsonToString(data) {
        let str = JSON.stringify(data);
        if (str != "{}") {
            return str.substring(1, str.length - 1).replace(/\"/g, "").replace(/\,/g, "&").replace(/\:/g, "=");
        }

    }
}