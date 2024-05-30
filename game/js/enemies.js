// Enemies
const all_enemies = [
    {
        id: 1,
        level: 1,
        name: "Rat",
        symbol: "🐀",
        maxHealth: 10,
        attack: 1,
        defense: 1,
        experience: 10,
        loot: [
            {
                // Gold
                itemId: 1,
                max: 5,
                chance: 90
            },
            {   // Short Sword
                itemId: 1001,
                max: 1,
                chance: 15
            },
            {   // Diego's Club
                itemId: 1002,
                max: 1,
                chance: 4
            }
        ]
    },
    {
        id: 2,
        level: 1,
        name: "Snake",
        symbol: "🐍",
        maxHealth: 20,
        attack: 2,
        defense: 2,
        experience: 20,
        loot: [
            {
                // Gold
                itemId: 1,
                max: 10,
                chance: 60
            },
            {   // Wooden Shield
                itemId: 2000,
                max: 1,
                chance: 30
            }
        ]
    },
    {
        id: 3,
        level: 2,
        name: "Bat",
        symbol: "🦇",
        maxHealth: 30,
        attack: 4,
        defense: 3,
        experience: 30,
        loot: [
            {
                // Gold
                itemId: 1,
                max: 15,
                chance: 70
            },
            {   // Katana
                itemId: 1003,
                max: 1,
                chance: 20
            }
        ]
    },
    {
        id: 4,
        level: 3,
        name: "Evil caterpillar",
        symbol: "🐛",
        maxHealth: 60,
        attack: 4,
        defense: 6,
        experience: 80,
        loot: [
            {
                // Gold
                itemId: 1,
                max: 12,
                chance: 50
            },
            {   // Iron Shield
                itemId: 2001,
                max: 1,
                chance: 18
            },
            {   // Staff of Falerga
                itemId: 1005,
                max: 1,
                chance: 3
            }
        ]
    },
    {
        id: 5,
        level: 3,
        name: "Scorpion",
        symbol: "🦂",
        maxHealth: 80,
        attack: 7,
        defense: 7,
        experience: 100,
        loot: [
            {
                // Gold
                itemId: 1,
                max: 14,
                chance: 70
            },
            {   // Scorpion's Claw
                itemId: 1004,
                max: 1,
                chance: 10
            }
        ]
    },
    {
        id: 6,
        level: 10,
        name: "Dragon",
        symbol: "🐉",
        maxHealth: 500,
        attack: 30,
        defense: 30,
        experience: 100,
        loot: [
            {
                // Gold
                itemId: 1,
                max: 50,
                chance: 80
            }
        ]
    }
]