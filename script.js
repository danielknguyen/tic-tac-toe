$(document).ready(function(){
	// player turn will be x
	var player = 'x';
	// computer turn will be o
	var computer = 'o';
	// array of values that will be checked for a winner
	var turns = [];
	// keep track of who's turn it is
	var playersTurn = true;
	// prevent infinite loop for tic tac toe AI
	// var count = 0;

	// function to assign player/computer to x and or o
	function selectPlayer(){
		if(player === 'x') {
			computer = 'o';
			$('#player1').css('border-color','#14bdac')
			$('#player2').css('border-color','#000000');
		} else {
			computer = 'x';
			$('#player2').css('border-color','#14bdac');
			$('#player1').css('border-color','#000000');	
		}
	}

	// change player/computer to x and or o upon clicking
	$('#player1').on('click',function(){
		if(player !== 'x'){
			player = 'x';
			resetGame();
			selectPlayer();
		}
	});
	$('#player2').on('click',function(){
		if(player !== 'o'){
			player = 'o';
			resetGame();
			selectPlayer();
		}
	});
	// function to check if a spot is open
	function checkIfSlotsOpen(player,id){
		var slotsClosed = $('#' + id)["0"].innerHTML;
		if(slotsClosed === ''){
			turns[id] = player;
			$('#' + id).text(player);
			console.log(turns);
		} else {
			return false;
		}
	}
	// when a square on the board is clicked program will check if it is empty, if it is empty it will be filled with player/computer's character
	$('.squares').on('click',function(){
		var slot = $(this).attr('id');
		// if(playersTurn){
			playersTurn = false;
			checkIfSlotsOpen(player,slot);
			// count++;
			// console.log('count: ' + count);
		// }
	});
	// reset the tic tac toe game
	function resetGame(){
		var turns = [];
		$('.squares').text('');
		count = 0;
		console.log(turns);
	}
	// when restart is clicked the tic tac toe board will clear
	$('#ttt-restart').on('click',function(){
		resetGame();
	});

	// function computersTurn(){
	// 	var computerSlot = 'sq-' + (Math.random() * 9).toFixed();
	// 	if(!playersTurn){
	// 		while(count !== 5 && !playersTurn){
	// 			checkIfSlotsOpen(computer,computerSlot);
	// 		} else {
	// 			playersTurn = true;
	// 		}
	// 	}
	// }
});