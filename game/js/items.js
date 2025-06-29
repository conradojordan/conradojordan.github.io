const gold = [
	{
		id: 1,
		name: "gold coin",
		type: "gold",
		attack: 0,
		defense: 0,
		value: 1,
	},
];

const weapons = [
	{
		id: 1000,
		name: "Small Knife",
		type: "weapon",
		attack: 1,
		value: 5,
	},
	{
		id: 1001,
		name: "Short Sword",
		type: "weapon",
		attack: 2,
		value: 10,
	},
	{
		id: 1002,
		name: "Diego's Club",
		type: "weapon",
		attack: 4,
		value: 20,
	},
	{
		id: 1003,
		name: "Katana",
		type: "weapon",
		attack: 5,
		value: 45,
	},
	{
		id: 1004,
		name: "Scorpion's Claw",
		type: "weapon",
		attack: 8,
		value: 120,
	},
	{
		id: 1005,
		name: "Staff of Falerga",
		type: "weapon",
		attack: 12,
		value: 180,
	},
];

const shields = [
	{
		id: 2000,
		name: "Wooden Shield",
		type: "shield",
		defense: 2,
		value: 10,
	},
	{
		id: 2001,
		name: "Iron Shield",
		type: "shield",
		defense: 4,
		value: 18,
	},
	{
		id: 2002,
		name: "Shield of Dispute",
		type: "shield",
		defense: 7,
		value: 30,
	},
];

const merchantItems = [
	{
		id: 1006,
		name: "Battle Axe",
		type: "weapon",
		attack: 6,
		value: 55,
	},
	{
		id: 1007,
		name: "Elven Bow",
		type: "weapon",
		attack: 7,
		value: 70,
	},
	{
		id: 1008,
		name: "Ogre Club",
		type: "weapon",
		attack: 9,
		value: 90,
	},
	{
		id: 1009,
		name: "Wizard's Staff",
		type: "weapon",
		attack: 10,
		value: 110,
	},
	{
		id: 1010,
		name: "Dragon's Fang",
		type: "weapon",
		attack: 15,
		value: 250,
	},
	{
		id: 1011,
		name: "Shadow Blade",
		type: "weapon",
		attack: 18,
		value: 350,
	},
	{
		id: 1012,
		name: "Godly Hammer",
		type: "weapon",
		attack: 20,
		value: 500,
	},
	{
		id: 1013,
		name: "Phoenix Bow",
		type: "weapon",
		attack: 22,
		value: 600,
	},
	{
		id: 1014,
		name: "Titan's Maul",
		type: "weapon",
		attack: 25,
		value: 800,
	},
	{
		id: 1015,
		name: "Void Sword",
		type: "weapon",
		attack: 30,
		value: 1000,
	},
	{
		id: 2003,
		name: "Leather Shield",
		type: "shield",
		defense: 3,
		value: 15,
	  },
	  {
		id: 2004,
		name: "Silver Shield",
		type: "shield",
		defense: 5,
		value: 25,
	  },
	  {
		id: 2005,
		name: "Dragon Scale Shield",
		type: "shield",
		defense: 8,
		value: 45,
	  },
	  {
		id: 2006,
		name: "Guardian Shield",
		type: "shield",
		defense: 10,
		value: 60,
	  },
	  {
		id: 2007,
		name: "Obsidian Shield",
		type: "shield",
		defense: 12,
		value: 80,
	  },
	  {
		id: 2008,
		name: "Celestial Shield",
		type: "shield",
		defense: 15,
		value: 120,
	  },
	  {
		id: 2009,
		name: "Void Shield",
		type: "shield",
		defense: 20,
		value: 200,
	  },
  ];

const ALL_ITEMS = gold.concat(weapons, shields);
