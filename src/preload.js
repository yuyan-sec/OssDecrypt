const { readFileSync } = require('fs')
var c = require("crypto");

window.OssDecrypt = function(data){
	const decipher = c.createDecipher('aes-192-cbc', "x82m#*lx8vv");
	let decrypted = decipher.update(data,'hex','utf-8');
	decrypted += decipher.final('utf-8');
	return decrypted;
}

window.exports = {
  "oss": {
    mode: "list",
    args: {
		enter: (action, callbackSetList) => {
			const s = action.payload.split("oss=")[1];
			const result = window.OssDecrypt(s);
			const json = JSON.parse(result);
			callbackSetList([
				{
					title: json['id'],
					description: '点击复制 AK'
				},
				{
					title: json['secret'],
					description: '点击复制 SK'
				}
			])
		},
		select: (action, itemData, callbackSetList) => {
	        window.utools.hideMainWindow()
	        utools.copyText(itemData.title)
	        alert(`已复制  ${itemData.title}`)
	    },
    }
  }
}