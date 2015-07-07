var Q = require('q');
var Economy = require('../economy');
var User = require('../mongo').userModel;
var fs = require('fs');

module.exports = {

	roomshop: 'leagueshop',
	leagueshop: function(target, room, user) {
	 /*	if (!room.isLeague) return this.sendReply('/leagueshop - This room is not a league.'); */
	 	if (!room.founder) return this.sendReply('/leagueshop - league shops require a room founder.');
	 	if (!room.shopList) room.shopList = [];
	 	if (!target) var target = '';
	 	var self = this;
 
		var cmdParts = target.split(' ');
		var cmd = cmdParts.shift().trim().toLowerCase();
		var params = cmdParts.join(' ').split(',').map(function (param) { return param.trim(); });
 
	 	switch (cmd) {
	 		case 'list':
	 		case 'view':
	 		default:
	 			if (!this.canBroadcast()) return;
	 			if (room.shopList.length < 1) return this.sendReplyBox('<center><b><u>This shop has no items!</u></b></center>');
	 			var output = '<center><h4><b><u><font color="#24678d">' + Tools.escapeHTML(room.title) + '\'s Shop</font></u></b></h4><table border="1" cellspacing ="0" cellpadding="3"><tr><th>Item</th><th>Description</th><th>Price</th></tr>';
	 			for (var u in room.shopList) {
					if (!room.shop[room.shopList[u]] || !room.shop[room.shopList[u]].name || !room.shop[room.shopList[u]].description || !room.shop[room.shopList[u]].price) continue;
	 				output += '<tr><td><button name="send" value="/leagueshop buy ' + Tools.escapeHTML(room.shopList[u]) + '" >' + Tools.escapeHTML(room.shop[room.shopList[u]].name) +
	 				'</button></td><td>' + Tools.escapeHTML(room.shop[room.shopList[u]].description.toString()) + '</td><td>' + room.shop[room.shopList[u]].price + '</td></tr>';
	 			}
	 			output += '</center><br />';
	 			this.sendReplyBox(output);
	 			break;
	 		case 'add':
	 			if (!user.can('roommod', null, room)) return this.sendReply('/leagueshop - Access denied.');
	 			if (params.length < 3) return this.sendReply('Usage: /leagueshop add [item name], [description], [price]');
	 			if (!room.shopList) room.shopList = [];
	 			var name = params.shift();
	 			var description = params.shift();
	 			var price = Number(params.shift());
	 			if (isNaN(price)) return this.sendReply('Usage: /leagueshop add [item name], [description], [price]');
	 			var bucks = 'bucks';
	 			if (Number(price) < 2) bucks = 'buck';
	 			room.shop[toId(name)] = new Object();
	 			room.shop[toId(name)].name = name;
	 			room.shop[toId(name)].description = description;
	 			room.shop[toId(name)].price = price;
	 			room.shopList.push(toId(name));
	 			room.chatRoomData.shop = room.shop;
	 			room.chatRoomData.shopList = room.shopList;
	 			Rooms.global.writeChatRoomData();
	 			this.sendReply('Added "' + name + '" to the league shop for ' + price + ' ' + ((price === 1) ? " buck." : " bucks.") + '.');
	 			break;
	 		case 'remove':
	 		case 'rem':
	 		case 'del':
	 		case 'delete':
	 			if (!user.can('roommod', null, room)) return this.sendReply('/leagueshop - Access denied.');
	 			if (params.length < 1) return this.sendReply('Usage: /leagueshop delete [item name]');
	 			var item = params.shift();
	 			if (!room.shop[toId(item)]) return this.sendReply('/leagueshop - Item "'+item+'" not found.');
	 			delete room.shop[toId(item)];
	 			var index = room.shopList.indexOf(toId(item));
				if (index > -1) {
				    room.shopList.splice(index, 1);
				}
				this.sendReply('Removed "' + item + '" from the league shop.');
				break;
			case 'buy':
				if (params.length < 1) return this.sendReply('Usage: /leagueshop buy [item name]');
				var item = params.shift();
				if (!room.shop[toId(item)]) return this.sendReply('/leagueshop - Item "'+item+'" not found.');
				Economy.get(user.userid).then(function(money) {
					if (money < room.shop[toId(item)].price) return self.sendReply('You don\'t have enough bucks to purchase a '+item+'. You need '+ ((money - room.shop[toId(item)].price) * -1) + ' more bucks.');
					var buck = 'buck';
					if (room.shop[toId(item)].price > 1) buck = 'bucks';
					if (!room.shopBank) room.shopBank = room.founder;
					self.parse('/transferbucks '+room.shopBank+','+room.shop[toId(item)].price);
					fs.appendFile('logs/leagueshop_'+room.id+'.txt', '['+new Date().toJSON()+'] '+user.name+' has purchased a '+room.shop[toId(item)].price+' for '+room.shop[toId(item)].price+' '+buck+'.\n');
					room.add(user.name + ' has purchased a ' + room.shop[toId(item)].name + ' for ' + room.shop[toId(item)].price + ' ' + ((price === 1) ? " buck." : " bucks.") + '.');
				});
				break;
			case 'help':
				if (!this.canBroadcast()) return;
				this.sendReplyBox('The following is a list of league shop commands: <br />' +
					'/leagueshop view/list - Shows a complete list of shop items.`<br />' +
					'/leagueshop add [item name], [description], [price] - Adds an item to the shop.<br />' +
					'/leagueshop delete/remove [item name] - Removes an item from the shop.<br />' +
					'/leagueshop buy [item name] - Purchases an item from the shop.<br />' +
					'/leagueshop viewlog [number of lines OR word to search for] - Views the last 15 lines in the shop log.<br />' +
					'/leagueshop bank [username] - Sets the room bank to [username]. The room bank receives all funds from purchases in the shop.'
				);
				break;
			case 'setbank':
			case 'bank':
				if (user.userid !== room.founder && !user.can('seniorstaff')) return this.sendReply('/leagueshop - Access denied.');
				if (params.length < 1) return this.sendReply('Usage: /leagueshop bank [username]');
				var bank = params.shift();
				room.shopBank = toId(bank);
				room.chatRoomData.shopBank = room.shopBank;
				Rooms.global.writeChatRoomData();
				this.sendReply('The room bank is now set to '+room.shopBank);
				break;
			case 'log':
			case 'viewlog':
				if (!user.can('roommod', null, room)) return this.sendReply('/leagueshop - Access denied.');
				var target = params.shift();
				var lines = 0;
				if (!target.match('[^0-9]')) {
					lines = parseInt(target || 15, 10);
					if (lines > 100) lines = 100;
				}
				var filename = 'logs/leagueshop_'+room.id+'.txt';
				var command = 'tail -'+lines+' '+filename;
				var grepLimit = 100;
				if (!lines || lines < 0) { // searching for a word instead
					if (target.match(/^["'].+["']$/)) target = target.substring(1,target.length-1);
					command = "awk '{print NR,$0}' "+filename+" | sort -nr | cut -d' ' -f2- | grep -m"+grepLimit+" -i '"+target.replace(/\\/g,'\\\\\\\\').replace(/["'`]/g,'\'\\$&\'').replace(/[\{\}\[\]\(\)\$\^\.\?\+\-\*]/g,'[$&]')+"'";
				}
 
				require('child_process').exec(command, function(error, stdout, stderr) {
					if (error && stderr) {
						user.popup('/leagueshop viewlog erred - the shop log does not support Windows');
						console.log('/leagueshop viewlog error: '+error);
						return false;
					}
					if (lines) {
						if (!stdout) {
							user.popup('The log is empty.');
						} else {
							user.popup('Displaying the last '+lines+' lines of shop purchases:\n\n'+stdout);
						}
					} else {
						if (!stdout) {
							user.popup('No purchases containing "'+target+'" were found.');
						} else {
							user.popup('Displaying the last '+grepLimit+' logged purchases containing "'+target+'":\n\n'+stdout);
						}
					}
				});
			break;
	 	}
	 },
}
