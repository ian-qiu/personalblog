import request from 'superagent'

import Alert from './AlertContainer.js'

export default (obj) => {
    const {type, url, data, callback, skip, errSkip, errorCallback,fail,complete,noShow} = obj;
	// function transfer(){
	// 	let host=location.host;
    //     if(/localhost:[0-9]{2,4}/i.test(host) || /yzadmin\.estay\.com/i.test(host)){
    //         location.href = window.ptloginUrl + '/user/login?rurl='+window.dataAPI+'/user/login_call_back?yzrurl='+location.protocol+'//'+location.host+'/ui/user/list';
    //     }     
    // };
	if(type=='get'){
		request
			.get(window.dataAPI + url)
			.set('Accept', 'application/json')
			.query((data?data:{}))
			.withCredentials()
			.end(function(err, res){
				complete&&complete(err, res);
				if(!res){
					// notification['error']({
				 //    	message: '操作失败！',
				 //    	description: '网络连接失败，请检测你的网络情况；或程序报错，请联系相关工作人员！',
				 //    	duration: 3
				 //    })
				 Alert.show('网络连接失败，请检测你的网络情况；或程序报错，请联系相关工作人员', {
			        time: 3000,
			        type: 'error',
			      });
					return
				}
				if(res.body.status == 0){
					callback&&callback(err, res)
					if(skip) return
					// notification['success']({
				 //    	message: '操作成功！',
				 //    	description: res.body.msg,
				 //    	duration: 3
				 //    })
				 if (!noShow) {
					Alert.show(res.body.msg, {
			        time: 3000,
			        type: 'success',
			      });
				 }
				 
				}else{
					if(res.body.status == -9){
						// transfer();
						return
					}
					errorCallback && errorCallback(err,res)
					if(errSkip) return
					// notification['error']({
				 //    	message: '操作失败！',
				 //    	description: res.body.msg,
				 //    	duration: 3
				 //    })
				 Alert.show(res.body.msg, {
			        time: 3000,
			        type: 'error',
			      });
				}
    		})

	}
	if(type=='post'){
		request
			.post(window.dataAPI + url)
			.set('Accept', 'application/json')
			.send((data?data:{}))
			.withCredentials()
			.end(function(err, res){
				complete&&complete(err, res);
				if(!res){
					// notification['error']({
				 //    	message: '操作失败！',
				 //    	description: '网络连接失败，请检测你的网络情况；或程序报错，请联系相关工作人员！',
				 //    	duration: 3
				 //    })
				 Alert.show('网络连接失败，请检测你的网络情况；或程序报错，请联系相关工作人员！', {
			        time: 3000,
			        type: 'error',
			      });
			      fail && fail(err,res)
					return
				}
				if(res.body.status == 0){
					callback&&callback(err, res)
					if(skip) return
					// notification['success']({
				 //    	message: '操作成功！',
				 //    	description: res.body.msg,
				 //    	duration: 3
				 //    })
				 Alert.show(res.body.msg, {
			        time: 3000,
			        type: 'success',
			      });
				}else{
					if(res.body.status == -9){
						// transfer();
						return
					}
					errorCallback && errorCallback(err,res)
					if(errSkip) return
					// notification['error']({
			  //   		message: '操作失败！',
				 //    	description: res.body.msg,
			  //   		duration: 3
			  //   	})
			  if(!noShow) {
				  Alert.show(res.body.msg, {
			        time: 3000,
			        type: 'error',
			      });
			  }
			  
				}
    		})
	}
}