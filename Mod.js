G.AddData({
name:'Name',
author:'Pookstir',
desc:'',
engineVersion:1,
requires:['Default dataset*'],
sheets:{'fungi':'https://pookstir.github.io/NeverEndingLegacyModAttempt/img/fungiSheet.png'},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{
	//New goods
	new G.Goods({
		name:'mycelium',
		desc:'[mycelium] is a great source of [herb]s; Occasionally you may find [spore]s.',
		icon:[0,0,'fungi'],
		res:{
			'gather':{'herb':13,'spore':0.5},
			'fungal farm':{'herb':23},
		},
		mult:13,
	});
	new G.Goods({
		name:'big mushroom',
		desc:'[big mushroom]s are giant versions of mushrooms you would see in other forests.',
		icon:[1,0,'fungi'],
		res:{
			'gather':{'herb':6,'spore':0.5, 'stick':1},
			'chop':{'herb':18,'spore':0.75, 'stick':4},
			'fungal farm':{'herb':36, 'spore':1, 'stick':8},
		},
		mult:5,
	});
  
  //New land types
	new G.Land({
		name:'mushroom forest',
		names:['Mushroom forest'],
		goods:[
			{type:'berry bush',chance:0.2},
			{type:'forest mushrooms',amount:3},
			{type:'big mushroom',amount:3},
			{type:'mycelium'},
			{type:['stoats'],chance:0.4},
			{type:['wolves'],chance:0.5,min:0.5,max:1},
			{type:'freshwater fish',chance:0.1,min:0.1,max:0.3},
			{type:'freshwater',amount:1},
			{type:'rocky substrate'},
		],
		image:10,
		score:6,
	});
  
	//new resources
	new G.Res({
		name:'spore',
		desc:'[spore]s are capable of being used to grow fungi.',
		icon:[2,0,'fungi'],
		category:'build',
	});
  
        //new units
        new G.Unit({
		name:'fungus farm',
		startWith:0,
		desc:'@farms [herb]',
		icon:[0,1,'fungi'],
		cost:{'spore':2,'basic building materials':125,'spoiled food':5000},
		use:{'worker':1},
		effects:[
                        {type:'gather',context:'fungal farm',amount:2,max:4},
			{type:'gather',context:'fungal farm',what:{'herb':14},amount:2,max:18},
			{type:'gather',context:'fungal farm',what:{'stick':0.5},amount:1,max:3},
			{type:'gather',context:'fungal farm',what:{'spore':0.25},amount:1,max:1,req:{'advanced mycology':true}},
			{type:'mult',value:1.75,req:{'advanced mycology':true}},
		],
		req:{'mycology':true},
		category:'production',
		priority:10,
	});
	
	//Base data modification
	G.contextNames['fungal farm']='Fungal farming';
	G.getDict('forest mushrooms').res['gather']['spore']=1;
// 		//adding a new mode to artisans so they can make hot sauce from hot peppers
// 	G.getDict('artisan').modes['hot sauce']={name:'Make hot sauce',desc:'Turn 3 [hot pepper]s and 3 [herb]s into 1 [hot sauce].',req:{'hot sauce preparing':true},use:{'knapped tools':1}};
// 		//adding a new effect to artisans that handles the actual hot sauce preparing and is only active when the unit has the mode "hot sauce"
// 	G.getDict('artisan').effects.push({type:'convert',from:{'hot pepper':3,'herb':3},into:{'hot sauce':1},every:3,mode:'hot sauce'});
	
	//Thech
	new G.Tech({
		name:'mycology',
		desc:'@provides 10 [inspiration]@provides 10 [wisdom]<>unlocks [fungus farm]s which grant herbs at a higher rate than gatherers.',
		icon:[1,1,'fungi'],
		cost:{'insight':10,'culture':5},
                effects:[
		  {type:'provide res',what:{'inspiration':30,'wisdom':30}},
		  {type:'show context',what:['fungal farm']},
		],
		req:{'speech':true},
	});
	new G.Tech({
		name:'advanced mycology',
		desc:'@provides 40 [inspiration]@provides 40 [wisdom]<>[fungus farm]s have 1.75x efficiency.',
		icon:[2,1,'fungi'],
		cost:{'insight':40,'culture':20},
                effects:[
		  {type:'provide res',what:{'inspiration':30,'wisdom':30}},
		],
		req:{'mycology':true},
	});
	
	//Finally, we add a trait that amplifies the benefits of consuming hot sauce; it will take on average 20 years to appear once the conditions (knowing the "Hot sauce preparing" tech) is fulfilled.
// 	new G.Trait({
// 		name:'hot sauce madness',
// 		desc:'@your people appreciate [hot sauce] twice as much and will be twice as happy from consuming it.',
// 		icon:[1,1,'spicySheet'],
// 		chance:20,
// 		req:{'hot sauce preparing':true},
// 		effects:[
// 			{type:'function',func:function(){G.getDict('hot sauce').turnToByContext['eat']['happiness']=0.2;}},//this is a custom function executed when we gain the trait
// 		],
// 	});
	
	//There are many other ways of adding and changing content; refer to /data.js, the default dataset, if you want to see how everything is done in the base game. Good luck!
	
	//map generator replacement
	G.funcs['create map']=function(w,h)
	{
		//generate basic geography using Conway's Game of Life (rule : births from 4 to 9 neighbors, survival from 6 to 9 neighbors)
		
		var generate=function(w,h)
		{
			var getAt=function(map,x,y)
			{
				//if (x<0||x>=map.length||y<0||y>=map[0].length) return 0;
				//wrap around so we don't get big empty spots on the edges (as a bonus, this creates donut-shaped worlds)
				if (x<0) x+=map.length;
				else if (x>=map.length) x-=map.length;
				if (y<0) y+=map[0].length;
				else if (y>=map[0].length) y-=map[0].length;
				return map[x][y];
			}
			
			//init map
			var lvl=[];
			for (var x=0;x<w;x++)
			{
				lvl[x]=[];
				for (var y=0;y<h;y++)
				{
					lvl[x][y]=Math.random()<0.5?1:0;
				}
			}
			
			//init buffer
			var lvlBuffer=[];
			for (var x=0;x<w;x++){lvlBuffer[x]=[];for (var y=0;y<h;y++){lvlBuffer[x][y]=0;}}
			
			var passes=1;
			for (var i=0;i<passes;i++)
			{
				//live
				for (var x=0;x<w;x++)
				{
					for (var y=0;y<h;y++)
					{
						var n=getAt(lvl,x-1,y)+getAt(lvl,x-1,y-1)+getAt(lvl,x,y-1)+getAt(lvl,x+1,y-1)+getAt(lvl,x+1,y)+getAt(lvl,x+1,y+1)+getAt(lvl,x,y+1)+getAt(lvl,x-1,y+1);
						var on=lvl[x][y];
						if (on && n>=4 && n<=9) on=1; else on=0;
						if (!on && n>=6 && n<=9) on=1;
						if (Math.random()<0.05) on=Math.random()<0.5?1:0;//just a bit of extra randomness
						lvlBuffer[x][y]=on;
					}
				}
				//copy buffer back
				for (var x=0;x<w;x++){for (var y=0;y<h;y++){lvl[x][y]=lvlBuffer[x][y];}}
			}
			
			return lvl;
		}
		
		var getStrAt=function(map,x,y)
		{
			if (x<0||x>=map.length-1||y<0||y>=map[0].length-1) return 'out';
			return map[x][y];
		}
		var getAt=function(map,x,y)
		{
			if (x<0||x>=map.length-1||y<0||y>=map[0].length-1) return 0.5;
			return map[x][y];
		}
		
		var landTiles=[];
		var seaTiles=[];
		var fit=false;
		i=0;
		while (i<20 && fit==false)//discard any map with less than 30% or more than 50% land
		{
			var lvl=generate(w,h);
			
			landTiles=[];
			seaTiles=[];
			for (var x=0;x<w;x++)
			{
				for (var y=0;y<h;y++)
				{
					if (lvl[x][y]==0) seaTiles.push([x,y]);
					else landTiles.push([x,y]);
				}
			}
			var total=landTiles.length+seaTiles.length;
			if (landTiles.length/total>0.3 && landTiles.length/total<0.5) fit=true;
			i++;
		}
		
		//translate into terrain
		for (var x=0;x<w;x++)
		{
			for (var y=0;y<h;y++)
			{
				var land='ocean';
				if (lvl[x][y]==0) land='ocean';
				else if (lvl[x][y]==1)
				{
					land='none';
				}
				lvl[x][y]=land;
			}
		}
		
		//precipitation map
		//generate more humidity over sea, less in land - with some variance
		//on tiles with low humidity, 30% of the time, add some huge variance
		//then, blur the map so that coasts get some humidity and variance can spread
		var wet=[];
		for (var x=0;x<w;x++)
		{
			wet[x]=[];
			for (var y=0;y<h;y++)
			{
				wet[x][y]=(lvl[x][y]=='ocean'?0.8:0.2)+Math.random()*0.1-0.1/2;
				if (Math.random()<0.3 && wet[x][y]<0.5) wet[x][y]+=Math.random()*5-2.5;
			}
		}
		for (var x=0;x<w;x++)//blur
		{
			for (var y=0;y<h;y++)
			{
				var variance=0.05;
				var n=getAt(wet,x-1,y)+getAt(wet,x-1,y-1)+getAt(wet,x,y-1)+getAt(wet,x+1,y-1)+getAt(wet,x+1,y)+getAt(wet,x+1,y+1)+getAt(wet,x,y+1)+getAt(wet,x-1,y+1);
				wet[x][y]=(wet[x][y]+n)/9+Math.random()*variance-variance/2;
			}
		}
		//temperature map. why not
		var jumble=false;
		if (!jumble)
		{
			//vertical sine wave (so we get hot equator and cold poles), with some variance
			//humidity lowers temperature by a bit
			var temp=[];
			for (var x=0;x<w;x++)
			{
				temp[x]=[];
				for (var y=0;y<h;y++)
				{
					var variance=0.15;
					temp[x][y]=Math.sin(((y+0.5)/h-0.25)*Math.PI*2)/2+(lvl[x][y]=='ocean'?0.6:0.5)-(wet[x][y])*0.15+Math.random()*variance-variance/2;
				}
			}
		}
		else
		{
			//temperature spawns in big blobs of cold and hot
			var temp=[];
			for (var x=0;x<w;x++)
			{
				temp[x]=[];
				for (var y=0;y<h;y++)
				{
					temp[x][y]=0.65+Math.random()*0.1-0.1/2-wet[x][y]*0.15;
					if (Math.random()<0.5) temp[x][y]+=Math.random()*10-5;
				}
			}
			for (var i=0;i<2;i++)//blur
			{
				for (var x=0;x<w;x++)
				{
					for (var y=0;y<h;y++)
					{
						var variance=0.05;
						var n=getAt(temp,x-1,y)+getAt(temp,x-1,y-1)+getAt(temp,x,y-1)+getAt(temp,x+1,y-1)+getAt(temp,x+1,y)+getAt(temp,x+1,y+1)+getAt(temp,x,y+1)+getAt(temp,x-1,y+1);
						temp[x][y]=(temp[x][y]+n)/9+Math.random()*variance-variance/2;
					}
				}
			}
		}
		
		//biomes
		for (var x=0;x<w;x++)
		{
			for (var y=0;y<h;y++)
			{
				var tempTile=temp[x][y];
				var wetTile=wet[x][y];
				var landTile=lvl[x][y];
				
				var biomes=[];
				if (tempTile<-0.1)
				{
					if (landTile=='ocean') biomes.push('arctic ocean');
					else biomes.push('ice desert');
				}
				else if (tempTile<0.15)
				{
					if (landTile=='ocean') biomes.push('arctic ocean');
					else if (wetTile<0.25) biomes.push('ice desert');
					else if (wetTile>0.5) biomes.push('boreal forest');
					else biomes.push('tundra');
				}
				else if (tempTile>1.1)
				{
					if (landTile=='ocean') biomes.push('tropical ocean');
					else biomes.push('desert');
				}
				else if (tempTile>0.85)
				{
					if (landTile=='ocean') biomes.push('tropical ocean');
					else if (wetTile<0.25) biomes.push('desert');
					else if (wetTile>0.75) biomes.push('mushroom forest');
					else if (wetTile>0.5) biomes.push('jungle');
					else biomes.push('savanna');
				}
				else
				{
					if (landTile=='ocean') biomes.push('ocean');
					else if (wetTile<0.25) biomes.push('shrubland');
					else if (wetTile>0.5) biomes.push('forest');
					else biomes.push('prairie');
				}
				if (biomes.length==0) biomes.push('prairie');
				lvl[x][y]=choose(biomes);
			}
		}
		
		for (var x=0;x<w;x++)//clean all tiles with no terrain
		{
			for (var y=0;y<h;y++)
			{
				if (lvl[x][y]=='none') lvl[x][y]='forest';
			}
		}
		return lvl;
	}
}
}
});
