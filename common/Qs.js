
export  function getQueryString() {
        const result = {};
        const param = window.location.hash.split("?")[1];
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
