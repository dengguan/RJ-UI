var chess=document.getElementById('chess');
var context=chess.getContext('2d');
var me=true;
var chessBoard=[];
for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;
	}
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
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x / 30);
	var j=Math.floor(y / 30);
	if(chessBoard[i][j]==0){
		oneStep(i,j,me);

		if(me){
			chessBoard[i][j]=1;
		}else{
			chessBoard[i][j]=2;	
		}
		me=!me;
 }
}