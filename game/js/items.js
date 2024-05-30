const gold = [
    {
        id: 1,
        name: "gold coin",
        type: "gold",
        attack: 0,
        defense: 0,
        value: 1
    }
]

const weapons = [
    {
        id: 1000,
        name: "Small Knife",
        type: "weapon",
        attack: 1,
        value: 5
    },
    {
        id: 1001,
        name: "Short Sword",
        type: "weapon",
        attack: 2,
        value: 10
    },
    {
        id: 1002,
        name: "Diego's Club",
        type: "weapon",
        attack: 4,
        value: 20
    },
    {
        id: 1003,
        name: "Katana",
        type: "weapon",
        attack: 5,
        value: 45
    },
    {
        id: 1004,
        name: "Scorpion's Claw",
        type: "weapon",
        attack: 8,
        value: 120
    },
    {
        id: 1005,
        name: "Staff of Falerga",
        type: "weapon",
        attack: 12,
        value: 180
    }
]

const shields = [
    {
        id: 2000,
        name: "Wooden Shield",
        type: "shield",
        defense: 2,
        value: 10
    },
    {
        id: 2001,
        name: "Iron Shield",
        type: "shield",
        defense: 4,
        value: 18
    },
    {
        id: 2002,
        name: "Shield of Dispute",
        type: "shield",
        defense: 7,
        value: 30
    },
]

const ALL_ITEMS = gold.concat(weapons, shields)
