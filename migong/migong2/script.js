var labyrinthArray = [[[0,1,0,0],[0,1,0,1],[0,1,0,1],[0,0,1,1],[0,1,0,0],[0,0,1,1],[0,1,1,0],[0,1,0,1],[0,1,0,1],[0,1,0,1],[0,0,1,1]],	//	1
					  [[0,0,0,0],[0,0,1,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[0,1,0,1],[0,1,0,1],[0,0,0,1],[1,0,1,0]],	//	2
					  [[0,0,0,0],[1,0,1,0],[1,1,1,0],[0,0,1,1],[1,1,0,0],[0,0,1,1],[0,1,1,0],[0,1,1,1],[0,1,0,1],[0,1,0,1],[1,0,1,1]],	//	3
					  [[0,0,0,0],[1,0,1,0],[1,0,0,0],[1,0,1,0],[0,0,1,0],[1,1,0,0],[1,0,0,1],[1,0,1,0],[0,1,0,0],[0,0,1,1],[1,0,1,0]],	//	4
					  [[0,0,0,0],[1,1,1,0],[0,0,1,1],[1,1,0,0],[1,1,1,1],[0,1,0,1],[0,0,1,1],[1,0,1,0],[0,1,1,0],[1,0,0,1],[1,0,1,0]],	//	5
					  [[0,0,0,0],[1,0,1,0],[1,1,0,0],[0,1,0,1],[1,1,1,1],[0,0,1,1],[1,0,1,0],[1,0,1,0],[1,0,1,0],[0,1,1,0],[1,0,0,1]],	//	6
					  [[0,0,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,0],[1,0,1,0],[1,0,1,0],[1,0,0,0],[1,0,1,0],[1,0,1,0],[1,1,0,0],[0,0,1,1]],	//	7
					  [[0,0,0,0],[0,1,1,0],[1,0,0,1],[1,0,1,0],[1,0,1,0],[1,1,0,0],[0,1,0,1],[1,0,0,1],[1,0,1,0],[0,1,1,0],[1,0,0,1]],	//	8
					  [[0,0,0,0],[1,0,1,0],[0,0,1,0],[1,1,0,0],[1,1,0,1],[0,1,1,1],[0,0,0,1],[0,1,1,0],[1,0,0,1],[1,0,1,0],[0,0,1,0]],	//	9
					  [[0,0,0,0],[1,1,0,0],[1,1,0,1],[0,1,0,1],[0,0,0,1],[1,1,0,0],[0,1,0,1],[1,1,0,1],[0,0,0,1],[1,1,0,0],[1,1,0,1],[0,0,0,1]]]; // 10

var fenceArray =  [[[0,-2],[8,-2],[16,-2],[24,-2],[32,-2],[40,-2],[48,-2],[56,-2],[64,-2],[72,-2],
					[0,6], [8,6],         [24,6],                 [48,6], [56,6], [64,6],
					              [16,14],        [32,14],[40,14],[48,14],[56,14],[64,14],
					                      [24,22],                        [56,22],[64,22],
					       [8,30],                [32,30],[40,30],        [56,30],
                                  [16,38],        [32,38],                        [64,38],
                           [8,46],[16,46],                                                [72,46],
                    [0,54],                               [40,54],                [64,54],
                           [8,62],                [32,62],[40,62],[48,62],                [72,62],
                                  [16,70],[24,70],        [40,70],        [56,70],
					[0,78],[8,78],[16,78],[24,78],[32,78],[40,78],[48,78],[56,78],[64,78],[72,78]],

				   [	   [-4,10],[-4,18],[-4,26],[-4,34],[-4,42],[-4,50],[-4,58],[-4,66],[-4,74],
				           [ 4,10],[ 4,18],[ 4,26],        [ 4,42],                [ 4,66],
				                           [12,26],[12,34],        [12,50],[12,58],[12,66],
				    [20,2],[20,10],[20,18],[20,26],                [20,50],[20,58],
				                           [28,26],                [28,50],[28,58],        [28,74],
				    [36,2],[36,10],[36,18],                [36,42],[36,50],
				                           [44,26],[44,34],[44,42],[44,50],        [44,66],
				                           [52,26],[52,34],[52,42],[52,50],[52,58],
				                                           [60,42],[60,50],[60,58],[60,66],[60,74],
				           [68,10],        [68,26],[68,34],                        [68,66],
					[76,2],[76,10],[76,18],[76,26],[76,34],[76,42],[76,50],[76,58],[76,66]]];

var x = 50;	
var y = 0;
var z = 30;

var x2 = -6;
var y2 = 2;

$('body').css({	'margin': '0 auto',
				'background-color': 'black',
				'overflow': 'hidden',
				'text-align': 'center'
			});

var objYard = document.createElement('div');
$('body').append(objYard);
$(objYard).addClass('preserve3d');
objYard.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)';
$(objYard).css({	'height': '80vh',
					'width': '80vh',
					'margin': '10vh auto',
					'border': '1px solid rgba(0,0,255,0.5)',
					'background-color': 'rgba(0,0,255,0.3)'
				});

var objStart = document.createElement('div');
$(objYard).append(objStart);
objStart.style.transform = 'translateX(-8vh)';
$(objStart).css({	'height': '8vh',
					'width': '8vh',
					'position': 'absolute',
					'background-color': 'rgba(0,0,255,0.3)'
				});

var objFinish = document.createElement('div');
$(objYard).append(objFinish);
objFinish.style.transform = 	'translateX(80vh) translateY(72vh) ';
$(objFinish).css({	'height': '8vh',
					'width': '8vh',
					'position': 'absolute',
					'background-color': 'rgba(0,0,255,0.3)'
				});

function createFence(a,r) {
	var objFence = document.createElement('div');
	$(objYard).append(objFence);
	objFence.style.transform = 	'translateX(' + a[0] + 'vh) ' + 
								'translateY(' + a[1] + 'vh) ' +
								'translateZ(2vh) ' +
								'rotateX(90deg)' + r;
	$(objFence).css({	'height': '4vh',
						'width': '8vh',
						'position': 'absolute',
						'border': '1px solid rgba(0,0,255,0.5)',
						'background-color': 'rgba(0,0,255,0.2)'
					});
}

for (var i = 0; i < fenceArray[0].length; i++) {
	createFence(fenceArray[0][i],'');
}
for (var i = 0; i < fenceArray[1].length; i++) {
	createFence(fenceArray[1][i],' rotateY(90deg)');
}

var objRabbit = document.createElement('div');
$(objYard).append(objRabbit);
objRabbit.style.transform = 'translateX(' + x2 + 'vh) translateY(' + y2 + 'vh) translateZ(2vh)';
objRabbit.style.transition = 'transform 0.25s';
$(objRabbit).css({	'height': '8vh',
					'width': '8vh',
					'position': 'absolute'
				});

var rabbitArray = ['', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateY(90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'];

for (var i = 0; i < rabbitArray.length; i++) {
	var obj = document.createElement('div');
	$(objRabbit).addClass('preserve3d');
	$(objRabbit).append(obj);
	$(obj).css({	'height': '4vh',
					'width': '4vh',
					'margin': '0 auto',
					'position': 'absolute',
					'border': '1px solid rgba(255,0,0,0.2)',
					'background-color': 'rgba(255,0,0,0.8)',
					'transform': rabbitArray[i] + 'translateZ(2vh)'
				});
};

var IntervalId = setInterval(function() {
	objRabbit.style.transform = 'translateX(' + x2 + 'vh) translateY(' + y2 + 'vh) translateZ(4vh)';
	objRabbit.style.transition = 'transform 0.25s';

	var TimerId = setTimeout(function() {
		objRabbit.style.transform = 'translateX(' + x2 + 'vh) translateY(' + y2 + 'vh) translateZ(2vh)';
	}, 250);
} ,500);

window.onkeydown = function(e) {
	var x3 = (x2 + 6) / 8;
	var y3 = (y2 - 2) / 8;
	if (e.keyCode === 38) {
		if (labyrinthArray[y3][x3][0] === 1) {
			y2 -= 8
		}
	} else if (e.keyCode === 39) {
		if (labyrinthArray[y3][x3][1] === 1) {
			x2 += 8
		}
	} else if (e.keyCode === 40) {
		if (labyrinthArray[y3][x3][2] === 1) {
			y2 += 8
		}
	} else if (e.keyCode === 37) {
		if (labyrinthArray[y3][x3][3] === 1) {
			x2 -= 8
		}
	}

	if (x2 === 82 && y2 === 74) {
		x2 = -6;
		y2 = 2;
	}
	objRabbit.style.transform = 'translateX(' + x2 + 'vh) translateY(' + y2 + 'vh)  translateZ(2vh)';
}

function colorFunX() {
	x = $('#xColorId').val() / 2;
	objYard.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)';
	$('#xColorId').blur();
}

function colorFunY() {
	y = $('#yColorId').val() / 2;
	objYard.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)';
	$('#yColorId').blur();
}

function colorFunZ() {
	z = $('#zColorId').val() / 2;
	objYard.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)';
	$('#zColorId').blur();
}