import store from '../store/index.js' //vuex
// import config from './config' //配置文件
export default {
    ws: null,
    websocket: false,
    conditions: '',
    time: 30000,//发心跳时间
    WebSocketFn: function (fn,config) { //连接长连接
        // this.ws = new WebSocket(`wss://yl.zckfhly.com/wss?website_domain=${this.website_domains[0]}`);
        // console.log("发起websocket连接");
		// store.state.system.websocket
		// loca
		
		if(this.ws !== null) return
        this.ws = new WebSocket(store.state.system.websocket);
        this.ws.onopen = () => {
            //连接成功
            // console.log('连接成功!');
            this.websocket = true;
			
            // store.dispatch('succeed');
            fn && fn(true);
            // this.ws.send('#');
            this.heartbeat();
            // let conditions = store.state.Counter.conditions;
            // if (!conditions) return;
			let item = {
				info:"web",
				type:"register"
			}
			console.log('console.log(store);');
			this.ws.send(JSON.stringify(item));
			if(store.state.type == 1){//足球
				this.ws.send(JSON.stringify({type:"toggle",company_id:store.state.company_id}));
				this.ws.send(JSON.stringify({type:"classify",classify_type:0},'',''));
			}else {
				// this.ws.send(JSON.stringify({type:"basketball"},'',''));
				this.ws.send(JSON.stringify({type:"classify",classify_type:1},'',''));
			}
            
			
        }
        this.ws.onerror = () => {
            //连接失败
            // console.log('连接失败!');
            this.websocket = false;
            // store.dispatch('unsuccessful');
            fn && fn(false);
        }
    },
    // 心跳
    heartbeat: function () {
        // console.log('开始发送心跳!');
        let _this = this;
        setInterval(() => {
            _this.send(
                {
                    type: 'heartbeat'
                },
                false
            );
        }, _this.time)
    },
    onmessage: function (fn) { //获取服务器发送的数据
        if (!this.websocket) return;
        this.ws.onmessage = (data) => {
            // console.log(data);
            data = data['data'];
            let evalFn = '';
            if (data.indexOf('{') != -1 || data.indexOf('[') != -1) {
                evalFn = eval('(' + data + ')');
            } else {
                evalFn = data;
            }
            fn && fn(evalFn);
        }
    },
    send: function (data, info, fn) { //发送消息
		if (!this.websocket) {
            fn && fn(false);
            return
        };
        if (info) { //存储能改变长连接属性的信息
            // store.dispatch('conditionsActions', data);
        }
        this.ws.send(typeof data == 'string' ? data : JSON.stringify(data));
        // console.log(typeof data == 'string' ? data : JSON.stringify(data));
        fn && fn(true);
    },
    websocketclose(fn) {  //关闭
        if (!this.websocket) {
            fn && fn(false);
            return
        };
        this.websocket = false;
        // store.dispatch('unsuccessful');
        this.ws.close();
        fn && fn(true);
    },
}