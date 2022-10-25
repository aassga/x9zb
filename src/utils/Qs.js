
export  function getQueryString() {
        const result = {};
<<<<<<< HEAD:src/utils/Qs.js
        const param = window.location.search.split("?")[1];
=======
        const param = window.location.hash.split("?")[1];
        // const param = "https://www.x9zb.live/m/"
>>>>>>> 6a9cce91a45e45b272d8fd7e51fcf5cd7712c636:common/Qs.js
        const search = decodeURIComponent("?" + param);
        const arr = search !== '' ? search.substr(1).split('&') : [];
        arr.forEach((item) => {
            if (item) {
                const itemArr = item.split('=');
                result[itemArr[0]] = itemArr[1]
            }
        })
        return result;
    }
