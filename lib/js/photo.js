window.onload = function () {
    const AJAx = ajax();
    let photoContainer = document.querySelector('.photo-container');
    changeWidth();

    let flag = false;
    window.onresize = function () {
        changeWidth()
    }


    function changeWidth() {
        let width = document.documentElement.clientWidth;
        if (width >= 1360) {
            getImg(width = 320, num = 4);
        } else if (width < 1360 && width >= 1024) {
            getImg(340, 3);
        } else if (width < 1024 && width >= 768) {
            getImg(250, 3);
        } else if (width < 768) {
            getImg(160, 2);
        }
    }

    function getImg(width, num) {
        AJAx.getData('http://192.168.2.100/blogwebapi/album/list', {

        }, function (e) {
            //     <div class="img-content">
            //     <img src="./lib/images/legs-434918__340.jpg" />
            // </div>
            // console.log(e.Data);
            photoContainer.innerHTML = '';
            const data = e.Data;
            let arr = [];

            data.forEach((item, index) => {
                if (index < num) {
                    console.log(arr);
                    let div = createImg(item);
                    div.style.top = 0 + 'px';
                    div.style.left = width * index + "px";
                    photoContainer.appendChild(div);
                    arr.push(div);
                    console.log(arr);
                } else {
                    let div = createImg(item);
                    let index = findMin(arr);
                    let top = arr[index].offsetHeight + arr[index].offsetTop;
                    let left = arr[index].offsetLeft;
                    div.style.left = left + 'px';
                    div.style.top = top + 10 + 'px';
                    photoContainer.appendChild(div);
                    console.log(div)
                    arr[index] = div;

                }

            });

        })
    }


    function createImg(item) {
        let div = document.createElement('div');
        div.classList.add('img-content');
        let img = document.createElement('img');
        img.src = item.Image;
        div.appendChild(img);
        return div;
    }

    function findMin(arr) {
        let index = 0;
        let minHeight = arr[0].offsetHeight + arr[0].offsetTop;

        for (let i = 1; i < arr.length; i++) {
            if (arr[0].offsetHeight + arr[0].offsetTop < 100) {
                location.reload();
            }
            if (minHeight > arr[i].offsetHeight + arr[i].offsetTop) {
                minHeight = arr[i].offsetHeight + arr[i].offsetTop;
                index = i;
            }
        }
        return index;

    }
}