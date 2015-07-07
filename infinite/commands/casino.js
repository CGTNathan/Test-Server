var Economy = require('../economy');
 
 module.exports = {
        dicestart: 'startdice',
        startdice: function(target, room, user) {
                 if (!this.canTalk()) return this.sendReply("You can not start dice games while unable to speak.");
                 if (room.id !== 'casino') return this.sendReply('This command can only be used in the Casino room.');
                 if (!target) return this.sendReply('Usage: /startdice <bet>');
                 if (isNaN(Number(target))) return this.sendReply('/startdice - <bet> must be a number greater than 0');
                 target = Math.round(Number(target));
                 if (target < 1) return this.sendReply('/startdice - You can not bet less than one buck.');
                 if (target > 500) return this.sendReply('/startdice - You can\'t bet more than 500 bucks.');
                 var self = this;
                         if (!room.dice) room.dice = {};
                         if (!room.dice.status) room.dice.status = 0;
                         if (room.dice.status > 0) return self.sendReply('/startdice - There is already a game started in here!');
                         room.dice.status = 1;
                         room.dice.bet = target;
                         room.dice.startTime = Date.now();
                         room.addRaw('<div class="infobox"><h2><center><font color=#24678d>' + Tools.escapeHTML(user.name) + ' has started a dice game for </font><font color=red>' + target + 
                                 ' </font><font color=#24678d>' + ((target === 1) ? " buck." : " bucks.") + '.</font><br /> <button name="send" value="/joindice">Click to join.</button></center></h2></div>');
                         room.update();
        },
 
        joindice: function(target, room, user) {
                if (!this.canTalk()) return this.sendReply("You may not join dice games while unable to speak.");
                 if (!room.dice) return this.sendReply('There is no dice game in it\'s signup phase in this room.');
                 if (room.dice.status !== 1) return this.sendReply('There is no dice game in it\'s signup phase in this room.');
                 var self = this;
                 room.dice.status = 2;
                 Economy.get(user.name).then(function(userMoney){
                         if (userMoney < room.dice.bet) {
                                 self.sendReply('You don\'t have enough bucks to join this game.');
                                 return room.dice.status = 1;
                         }
                         if (!room.dice.player1) {
                                 room.dice.player1 = user.userid;
                                 room.dice.status = 1;
                                 room.addRaw('<b>' + Tools.escapeHTML(user.name) + ' has joined the dice game.</b>');
                                 return room.update();
                         }
                         if (room.dice.player1 === user.userid) return room.dice.status = 1;
                         if (room.dice.player1 !== user.userid) {
                                 room.dice.player2 = user.userid;
                                 if (!Users.get(room.dice.player1).userid) {
                                         room.addRaw("<b>Player 1 seems to be missing... game ending.</b>");
                                         delete room.dice.player1;
                                         delete room.dice.player2;
                                         delete room.dice.bet;
                                         delete room.dice.startTime;
                                         room.update();
                                         return false;
                                 }
                                 if (!Users.get(room.dice.player2).userid) {
                                         room.addRaw("<b>Player 2 seems to be missing... game ending.</b>");
                                         delete room.dice.player1;
                                         delete room.dice.player2;
                                         delete room.dice.bet;
                                         delete room.dice.startTime;
                                         room.update();
                                         return false;
                                 }
                                 if (room.dice.player1 !== Users.get(room.dice.player1).userid) {
                                         room.addRaw('<b>Player 1 has changed names, game ending.</b>');
                                         room.dice.status = 0;
                                         delete room.dice.player1;
                                         delete room.dice.player2;
                                         delete room.dice.bet;
                                         delete room.dice.startTime;
                                         room.update();
                                         return false;
                                 }
                                 room.addRaw('<b>' + Tools.escapeHTML(user.name) + ' has joined the dice game.</b>');
                                 room.update();
                                 var firstNumber = Math.floor(6 * Math.random()) + 1;
                                 var secondNumber = Math.floor(6 * Math.random()) + 1;
                                 var firstName = Users.get(room.dice.player1).name;
                                 var secondName = Users.get(room.dice.player2).name;
                                 firstMoney = Economy.get(toId(firstName));
                                 secondMoney = Economy.get(toId(secondName));
                                                 if (firstMoney < room.dice.bet) {
                                                        room.dice.status = 0;
                                                         delete room.dice.player1;
                                                         delete room.dice.player2;
                                                         delete room.dice.bet;
                                                         delete room.dice.startTime;
                                                         room.addRaw('<b>' + Tools.escapeHTML(firstName) + ' no longer has enough bucks to play, game ending.');
                                                         return room.update();
                                                 }
                                                 if (secondMoney < room.dice.bet) {
                                                        room.dice.status = 0;
                                                         delete room.dice.player1;
                                                         delete room.dice.player2;
                                                         delete room.dice.bet;
                                                         delete room.dice.startTime;
                                                         room.addRaw('<b>' + Tools.escapeHTML(secondName) + ' no longer has enough bucks to play, game ending.');
                                                         return room.update();
                                                 }
                                                 var output = '<div class="infobox">Game has two players, starting now.<br />';
                                                 output += 'Rolling the dice.<br />';
                                                 output += Tools.escapeHTML(firstName) + ' has rolled a ' + firstNumber + '.<br />';
                                                 output += Tools.escapeHTML(secondName) + ' has rolled a ' + secondNumber + '.<br />';
                                                while (firstNumber === secondNumber) {
                                                        output += 'Tie... rolling again.<br />';
                                                         firstNumber = Math.floor(6 * Math.random()) + 1;
                                                         secondNumber = Math.floor(6 * Math.random()) + 1;
                                                         output += Tools.escapeHTML(firstName) + ' has rolled a ' + firstNumber + '.<br />';
                                                         output += Tools.escapeHTML(secondName) + ' has rolled a ' + secondNumber + '.<br />';
                                                }
                                                var betMoney = room.dice.bet;
                                                 if (firstNumber > secondNumber) {
                                                         output += '<font color=#24678d><b>' + Tools.escapeHTML(firstName) + '</b></font> has won <font color=#24678d><b>' + betMoney + '</b></font> ' + ((betMoney === 1) ? " buck." : " bucks.") + '.<br />'
                                                         output += 'Better luck next time ' + Tools.escapeHTML(secondName) + '!';
                                                         Economy.give(toId(firstName),betMoney);
                                                         Economy.take(toId(secondName),betMoney);
                                                         room.dice.status = 0;
                                                         delete room.dice.player1;
                                                         delete room.dice.player2;
                                                         delete room.dice.bet;
                                                         delete room.dice.startTime;
                                                 }
                                                 if (secondNumber > firstNumber) {
                                                         output += '<font color=#24678d><b>' + Tools.escapeHTML(secondName) + '</b></font> has won <font color=#24678d><b>' + betMoney + '</b></font> ' + ((betMoney === 1) ? " buck." : " bucks.") + '.<br />';
                                                         output += 'Better luck next time ' + Tools.escapeHTML(firstName) + '!';
                                                         Economy.take(toId(firstName),betMoney);
                                                         Economy.give(toId(secondName),betMoney);
                                                         room.dice.status = 0;
                                                         delete room.dice.player1;
                                                         delete room.dice.player2;
                                                         delete room.dice.bet;
                                                         delete room.dice.startTime;
                                                 }
                                                 output += '</div>';
                                                 room.addRaw(output);
                                                 room.update();
                         }
                 });
        },
 
        enddice: function (target, room, user) {
                if (!user.can('broadcast',null,room)) return this.sendReply('/enddice - Access denied.');
                if (!room.dice) return this.sendReply('/enddice - There is no dice game in this room.');
                if (room.dice.status === 0) return this.sendReply('/enddice - There is no dice game in this room.');
                if ((Date.now() - room.dice.startTime) < 60000 && !user.can('broadcast', null, room)) return this.sendReply('Regular users may not end a dice game within the first minute of it starting.');
                room.dice = {};
                room.dice.status = 0;
                return room.addRaw('<b>' + Tools.escapeHTML(user.name) + ' ended the dice game.');
        },
 
        dicehelp: function (target, room, user) {
                if (!this.canBroadcast()) return;
                this.sendReplyBox(
                        'Dice game commands: <br />' +
                        '/startdice <bet> - Starts a game.<br />' +
                        '/joindice - Joins the game.<br />' +
                        '/enddice - Forcibly ends the game.'
                        );
        }
};
