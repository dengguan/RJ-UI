var chess=document.getElementById('chess');
var context=chess.getContext('2d');
var me=true;
var over=false;
var chessBoard=[];
var wins=[];                //赢法数组---三维数组
var mywin=[];               //统计赢法的数组----一维数组
var computerWin=[];   
for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;     //没有下棋的时候，初始状态
	}
}	

for(var i=0;i<15;i++){
	wins[i]=[];
	for(var j=0;j<15;j++){
		wins[i][j]=[];
	}
}

var count=0;
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i][j+k][count]=true;
		}
		count++;
	}
}                           //所有纵向赢法  165
for(var i=0;i<11;i++){
	for(var j=0;j<15;j++){
		for(var k=0;k<5;k++){
			//wins[i+k][j][count]=true;
			wins[i+k][j][count]=true;
		}
		count++;           //横向
	}
}
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}                     //斜线
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}                    //反斜线
console.log(count);
for(i=0;i<count;i++){
	mywin[i]=0;
	computerWin[i]=0;
}

context.strokeStyle="#BFBFBF";

var img=new Image();
img.src='images/logo.png';
img.onload=function(){
	context.drawImage(img,0,0,450,450);       //画一个背景图LOGO
	drawChessBoard();
	//oneStep(0,1,true);
	//oneStep(1,2,false);
}

var drawChessBoard=function(){
	for(i=0;i<15;i++){
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.stroke();          //画竖线

		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();           //画横线
               }
}
var oneStep=function(i,j,me){
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI)
	context.closePath();
	var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);  //两个圆心坐标和半径
	if(me){
	gradient.addColorStop(0,"#0A0A0A");        //第一个圆----最外层的圆
	gradient.addColorStop(1,"#636766");        //第二个圆----渐变层的大圆
	} else{
	gradient.addColorStop(0,"#D1D1D1");        
	gradient.addColorStop(1,"#F9F9F9");
	}    
	context.fillStyle=gradient;
	context.fill();
}
chess.onclick=function(e){
	if(over){
		return;
	}
	if(!me){
		return;
	}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x / 30);
	var j=Math.floor(y / 30);
	if(chessBoard[i][j]==0){           //没有下棋
		oneStep(i,j,me);
		chessBoard[i][j]=1;        //下黑子
			
		for(var k=0;k<count;k++){
			if(wins[i][j][k]){
				mywin[k]++;
				computerWin[k]=6;
				if(mywin[k]==5){
					window.alert("你已经赢了");
					over=true;
				}
			}
		}
		if(!over){
			me=!me;
			computerAI();
		}
 }
}
var computerAI=function(){
	var myScore=[];           //我的分数-----分数越大，就越接近赢
	var computerScore=[];     //电脑
	var max=0;                //中间值----最大分数
	var u=0,v=0;              //电脑下棋的位置（索引）
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
	    }
    }
    for(var i=0;i<15;i++){
    	for(var j=0;j<15;j++){                             //每次循环之前，进行扫描棋盘
    		if(chessBoard[i][j]==0){                       // 判断棋盘该位置没有棋子
    			for(var k=0;k<count;k++){                  //扫描赢法数组，判断属于哪一种赢法
    				if(wins[i][j][k]){
    					if(mywin[k]==1){
    						myScore[i][j]+=200;
    					}else if(mywin[k]==2){
    						myScore[i][j]+=400;
    					}else if(mywin[k]==3){
    						myScore[i][j]+=2000;
    					}else if(mywin[k]==4){
    						myScore[i][j]+=10000;
    					}

    					if(computerWin[k]==1){
    						computerScore[i][j]+=220;
    					}else if(computerWin[k]==2){
    						computerScore[i][j]+=420;
    					}else if(computerWin[k]==3){
    						computerScore[i][j]+=2100;
    					}else if(computerWin[k]==4){
    						computerScore[i][j]+=20000;
    					}
    				}    				
    			}
    			if(myScore[i][j]>max){
    				max=myScore[i][j];
    				u=i;
    				v=j;                                           //防守代码
    			}else if(myScore[i][j]==max){
    				if(computerScore[i][j]>computerScore[u][v]){
    					u=i;
    					v=j;
    				}
    			}

    			if(computerScore[i][j]>max){
    				max=computerScore[i][j];
    				u=i;
    				v=j;                                        //进攻代码
    			}else if(computerScore[i][j]==max){
    				if(myScore[i][j]>myScore[u][v]){
    					u=i;
    					v=j;
    				}
    			}
    		}
    	}
    }
    oneStep(u,v,false);
    chessBoard[u][v]=2;
    for(var k=0;k<count;k++){
		if(wins[u][v][k]){
			computerWin[k]++;
			mywin[k]=6;
			if(computerWin[k]==5){
			window.alert("计算机赢了");
			over=true;
			}
		}
	}
	if(!over){
		me=!me;
	}
}