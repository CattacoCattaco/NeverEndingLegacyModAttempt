G.AddData({
name:'Name',
author:'Pookstir',
desc:'',
engineVersion:1,
requires:['Default dataset*'],
sheets:{'fungi':'https://pookstir.github.io/NeverEndingLegacyModAttempt/img/fungiSheet.png','soup':'https://pookstir.github.io/NeverEndingLegacyModAttempt/img/soupSheet.png','papery':'https://pookstir.github.io/NeverEndingLegacyModAttempt/img/paperySheet.png','wonderful':'https://pookstir.github.io/NeverEndingLegacyModAttempt/img/wonderfulSheet.png'},
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
	new G.Goods({
		name:'sugar cane',
		desc:'Sugar cane is a plant which can be processed into [sugar] and [paper].',
		icon:[0,0,'papery'],
		res:{
			'gather':{'herb':0.2,'cane':0.5},
			'chop':{'herb':1,'cane':2.5, 'stick':0.25},
		},
		mult:5,
	});
  
  	//new resources
	new G.Res({
		name:'spore',
		desc:'[spore]s are capable of being used to grow fungi.',
		icon:[2,0,'fungi'],
		category:'build',
	});
	new G.Res({
		name:'mushroom stew',
		desc:'[mushroom stew] is pretty tasty and quite healthy.',
		icon:[0,0,'soup'],
		turnToByContext:{'eating':{'health':0.04,'happiness':0.03},'decay':{'spore':0.2,'spoiled food':0.8}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'vegetable soup',
		desc:'[vegetable soup] is palletable and extremely healthy.',
		icon:[0,1,'soup'],
		turnToByContext:{'eating':{'health':0.05,'happiness':0.02},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'chicken soup',
		desc:'[chicken soup] is quite tasty and pretty healthy.',
		icon:[1,0,'soup'],
		turnToByContext:{'eating':{'health':0.03,'happiness':0.04},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'clam chowder',
		desc:'[clam chowder] is extremely tasty and somewhat healthy.',
		icon:[1,1,'soup'],
		turnToByContext:{'eating':{'health':0.02,'happiness':0.05},'decay':{'spoiled food':1}},
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'cane',
		desc:'[cane]s may be processed into [paper] and [sugar].',
		icon:[0,0,'papery'],
		partOf:'misc materials',
		category:'misc',
	});
	new G.Res({
		name:'sugar',
		desc:'[sugar] is made from [cane]s.',
		icon:[1,0,'papery'],
		partOf:'misc materials',
		category:'misc',
	});
	new G.Res({
		name:'paper',
		desc:'[paper] is made from [cane]s.',
		icon:[2,0,'papery'],
		partOf:'misc materials',
		category:'misc',
	});
	new G.Res({
		name:'book',
		desc:'[book]s are may be used up over time, creating [insight].',
		icon:[0,1,'papery'],
		partOf:'misc materials',
		category:'misc',
		tick:function(me,tick)
		{
			var toSpoil=me.amount*0.01;
			var spent=G.lose(me.name,randomFloor(toSpoil),'decay');
			G.pseudoGather(G.getRes('insight'),randomFloor(spent));
		},
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
			{type:'mult',value:5,req:{'myconument-building':true}},
		],
		req:{'mycology':true},
		category:'production',
		priority:10,
	});
	
	new G.Unit({
		name:'soup chef',
		desc:'@turns [herb]s, [stick]s, and other ingredients in to soups/stews.',
		icon:[1,1,'soup'],
		cost:{},
		use:{'worker':1,'metal tools':1},
		upkeep:{'coin':0.1},
		gizmos:true,
		modes:{
			'mushroom':{name:'Mushroom stew',icon:[0,0,'soup'],desc:'Use [spore]s to create [mushroom stew].'},
			'vegetable':{name:'Vegetable soup',icon:[0,1,'soup'],desc:'Use additional [herb]s to create [vegetable soup].'},
			'chicken':{name:'Chicken soup',icon:[1,0,'soup'],desc:'Use [meat] to create [chicken soup].'},
			'clam':{name:'Clam chowder',icon:[1,1,'soup'],desc:'Use [seafood] to create [clam chowder].'},
		},
		effects:[
			{type:'convert',from:{'stick':3,'herb':12,'water':1,'spore':4},into:{'mushroom stew':1},every:1,repeat:7,mode:'mushroom'},
			{type:'convert',from:{'stick':3,'herb':24,'water':1},into:{'vegetable soup':1},every:1,repeat:7,mode:'vegetable'},
			{type:'convert',from:{'stick':3,'herb':12,'water':1,'meat':2},into:{'chicken soup':1},every:1,repeat:7,mode:'chicken'},
			{type:'convert',from:{'stick':3,'herb':12,'water':1,'seafood':2},into:{'clam chowder':1},every:1,repeat:7,mode:'clam'},
		],
		req:{'soup making':true},
		category:'crafting',
	});
	
	new G.Unit({
		name:'processing plant',
		desc:'@turns [cane]s into [paper] and [sugar].@gains abilities with new techs.',
		icon:[1,1,'papery'],
		cost:{'basic building materials': 150},
		use:{'worker':3,'metal tools':3},
		upkeep:{'coin':0.5},
		gizmos:true,
		modes:{
			'cane':{name:'Cane processing',icon:[0,0,'papery'],desc:'Craft 1 [paper] and 3 [sugar] from 1 [cane].'},
			'log':{name:'Wood processing',icon:[1,6],desc:'Craft 3 [paper] from 1 [log].',req:{'wood processing': true}},
		},
		effects:[
			{type:'convert',from:{'cane':1},into:{'paper':1,'sugar':3},every:3,mode:'cane'},
			{type:'convert',from:{'log':1},into:{'paper':3},every:2,mode:'log'},
		],
		req:{'cane processing':true},
		category:'crafting',
	});
	
	//Wonders
	new G.Unit({
		name:'myconument',
		desc:'@leads to the <b>myconument Victory</b><>A monument to the wonders of fungi.//The monument stands tall, reminding your people how much they love fungi.',
		wonder:'myconument',
		icon:[0,0,'wonderful'],
		wideIcon:[0,0,'wonderful'],
		cost:{'basic building materials':2000,'precious building materials':50,'herb':1000},
		costPerStep:{'basic building materials':250,'precious building materials':200,'herb':100},
		steps:500,
		messageOnStart:'You begin the construction of the myconument. Its towering mass already dominates the city, casting awe wherever its shadow reaches.',
		finalStepCost:{'population':10,'herb':2000,'fruit':500,'spore':250},
		finalStepDesc:'To complete the myconument, 10 of your [population,People] must be sacrificed to grow fungi from, you must use 2000 [herb]s and 500 [fruit] to paint it, and you need 250 [spore]s to grow fungi in the soil beneath the monument.',
		use:{'land':50,'worker':15,'metal tools':15},
		//require:{'worker':10,'stone tools':10},
		req:{'myconument-building':true},
		category:'wonder',
	});
	
	//Base data modification
	G.contextNames['fungal farm']='Fungal farming';
	G.getDict('forest mushrooms').res['gather']['spore']=1;
	G.getDict('jungle').goods.push({type:['mycelium','big mushroom','forest mushrooms'],chance:0.35,min:0.25,max:0.85});
	G.getDict('jungle').goods.push({type:['sugar cane'],chance:0.75,min:0.475,max:0.95});
	G.getDict('desert').goods.push({type:['sugar cane'],chance:0.15,min:0.15,max:0.5});
	G.getDict('forest').goods.push({type:['sugar cane'],chance:0.25,min:0.15,max:0.65});
	G.getDict('artisan').modes['book']={name:'Write books',desc:'Turn 3 [paper] and 1 [leather] into 1 [book].',icon:[0,1,'papery'],req:{'book writing':true},use:{'stone tools':1}};
	G.getDict('artisan').effects.push({type:'convert',from:{'paper':3,'leather':1},into:{'book':1},every:3,mode:'book'});
	G.legacyBonuses.push(
		{id:'addCultureOnStart',name:'+[X] free culture',desc:'Additional culture when starting a new game.',icon:[0,0],func:function(obj){G.resByName['culture']['amount']+=obj.amount;},context:'new'}
	);
	
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
		desc:'@provides 40 [inspiration]@provides 40 [wisdom]@[fungus farm]s have 1.75x efficiency.',
		icon:[2,1,'fungi'],
		cost:{'insight':40,'culture':20},
                effects:[
		  {type:'provide res',what:{'inspiration':40,'wisdom':40}},
		],
		req:{'mycology':true},
	});
	new G.Tech({
		name:'soup making',
		desc:'@provides 50 [inspiration]@provides 30 [wisdom]@unlocks [soup chef]s.',
		icon:[0,1,'soup'],
		cost:{'insight':25,'culture':40},
                effects:[
		  {type:'provide res',what:{'inspiration':50,'wisdom':30}},
		],
		req:{'mycology':true},
	});
	new G.Tech({
		name:'cane processing',
		desc:'@unlocks [processing plant]s.',
		icon:[0,0,'papery'],
		cost:{'insight':18},
                effects:[
		  
		],
		req:{'scouting':true},
	});
	new G.Tech({
		name:'book writing',
		desc:'@artisans can make [book]s.',
		icon:[0,1,'papery'],
		cost:{'insight':30},
                effects:[
		  
		],
		req:{'cane processing':true},
	});
	new G.Tech({
		name:'wood processing',
		desc:'@processing plants can make [paper] from [log]s.',
		icon:[1,6],
		cost:{'insight':30},
                effects:[
		  
		],
		req:{'cane processing':true},
	});
	new G.Tech({
		name:'myconument-building',
		desc:'@unlocks the myconument@[fungus farm]s have 5x efficiency.',
		icon:[0,0,'wonderful'],
		cost:{'insight':100,'culture':90},
                effects:[
		  
		],
		req:{'advanced mycology':true,'monument-building':true,'fungal appreciation':true},
	});
	
	//traits
	new G.Trait({
		name:'soup appreciation',
		desc:'@your people appreciate [mushroom stew], [vegetable soup], [chicken soup], and [clam chowder] twice as much and will be twice as happy and twice as healthy from consuming them.',
		icon:[1,0,'soup'],
		chance:25,
		req:{'soup making':true},
		effects:[
			{type:'function',func:function(){G.getDict('mushroom stew').turnToByContext['eating']['happiness']*=2;}},
			{type:'function',func:function(){G.getDict('mushroom stew').turnToByContext['eating']['health']*=2;}},
			{type:'function',func:function(){G.getDict('vegetable soup').turnToByContext['eating']['happiness']*=2;}},
			{type:'function',func:function(){G.getDict('vegetable soup').turnToByContext['eating']['health']*=2;}},
			{type:'function',func:function(){G.getDict('chicken soup').turnToByContext['eating']['happiness']*=2;}},
			{type:'function',func:function(){G.getDict('chicken soup').turnToByContext['eating']['health']*=2;}},
			{type:'function',func:function(){G.getDict('clam chowder').turnToByContext['eating']['happiness']*=2;}},
			{type:'function',func:function(){G.getDict('clam chowder').turnToByContext['eating']['health']*=2;}},
		],
	});
	new G.Trait({
		name:'fungal appreciation',
		desc:'@your people appreciate [mushroom stew] and [herb]s twice as much and will be much happier from consuming them from consuming them.',
		icon:[2,1,'fungi'],
		chance:20,
		req:{'mycology':true},
		effects:[
			{type:'function',func:function(){G.getDict('mushroom stew').turnToByContext['eating']['happiness']*=1.5;}},
			{type:'function',func:function(){G.getDict('mushroom stew').turnToByContext['eating']['health']*=1.5;}},
			{type:'function',func:function(){G.getDict('herb').turnToByContext['eating']['happiness']=0.08;}},
			{type:'function',func:function(){G.getDict('herb').turnToByContext['eating']['health']*=2;}},
		],
	});
	
	//Achievements
	new G.Achiev({
		tier:0,
		name:'myconument',
		desc:'You have been laid to grow in the Myconument, a monument to fungi.',
		fromUnit:'myconument',
		effects:[
			{type:'addFastTicksOnStart',amount:1000},
			{type:'addFastTicksOnResearch',amount:500},
			{type:'addCultureOnStart',amount:10}
		],
	});
}});
