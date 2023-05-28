G.AddData({
name:'Name',
author:'Pookstir',
desc:'',
engineVersion:1,
requires:['Default dataset*'],
sheets:{'fungi':'https://pookstir.github.io/NeverEndingLegacyModAttempt/img/fungiSheet.png','soup':'https://pookstir.github.io/NeverEndingLegacyModAttempt/img/soupSheet.png'},
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
		turnToByContext:{'eating':{'health':0.02,'happiness':0.05},'decay':{'spore':0.2,'spoiled food':0.8}},
		partOf:'food',
		category:'food',
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
	
	new G.Unit({
		name:'soup chef',
		desc:'@turns [herb]s, [stick]s, and other ingredients in to soups/stews.',
		icon:[6,2],
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
	
	//Base data modification
	G.contextNames['fungal farm']='Fungal farming';
	G.getDict('forest mushrooms').res['gather']['spore']=1;
	G.getDict('jungle').goods.push({type:['mycelium','big mushroom','forest mushroom'],chance:0.35,min:0.25,max:0.85});
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
	
	//traits
	new G.Trait({
		name:'soup appreciation',
		desc:'@your people appreciate [mushroom stew], [vegetable soup], [chicken soup], and [clam chowder] twice as much and will be twice as happy and twice as healthy from consuming them.',
		icon:[1,0,'soup'],
		chance:25,
		req:{'soup making':true},
		effects:[
			{type:'function',func:function(){G.getDict('mushroom stew').turnToByContext['eating']['happiness']=0.06;}},
			{type:'function',func:function(){G.getDict('mushroom stew').turnToByContext['eating']['health']=0.08;}},
			{type:'function',func:function(){G.getDict('vegetable soup').turnToByContext['eating']['happiness']=0.04;}},
			{type:'function',func:function(){G.getDict('vegetable soup').turnToByContext['eating']['health']=0.1;}},
			{type:'function',func:function(){G.getDict('chicken soup').turnToByContext['eating']['happiness']=0.06;}},
			{type:'function',func:function(){G.getDict('chicken soup').turnToByContext['eating']['health']=0.08;}},
			{type:'function',func:function(){G.getDict('clam chowder').turnToByContext['eating']['happiness']=0.06;}},
			{type:'function',func:function(){G.getDict('clam chowder').turnToByContext['eating']['health']=0.08;}},
		],
	});
}});
