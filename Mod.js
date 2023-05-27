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
		cost:{},
		use:{'worker':1},
		effects:[
                        {type:'gather',context:'fungal farm',amount:2,max:4},
			{type:'gather',context:'fungal farm',what:{'herb':14},amount:2,max:18},
			{type:'gather',context:'fungal farm',what:{'stick':0.5},amount:1,max:3},
			{type:'gather',context:'fungal farm',what:{'spore':0.25},amount:1,max:1,req:{'advanced mycology':true}},
			{type:'gather',value:1.75,req:{'advanced mycology':true}}
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
}
});
