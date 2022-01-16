// Enemies
const all_enemies = [
    {
        id: 1,
        level: 1,
        name: "Rat",
        symbol: "🐀",
        maxHealth: 10,
        strength: 10,
        resilience: 11,
        experience: 10,
        loot: [
            {
                itemId: 1,
                max: 3,
                chance: 80
            },
            {   // Small Knife
                itemId: 1000,
                max: 1,
                chance: 15
            },
            {   // Diego's Club
                itemId: 1001,
                max: 1,
                chance: 5
            }
        ]
    },
    {
        id: 2,
        level: 1,
        name: "Snake",
        symbol: "🐍",
        maxHealth: 20,
        strength: 12,
        resilience: 11,
        experience: 15,
        loot: [
            {
                itemId: 1,
                max: 10,
                chance: 30
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
        strength: 13,
        resilience: 12,
        experience: 30,
        loot: [
            {
                itemId: 1,
                max: 14,
                chance: 70
            },
            {   // Katana
                itemId: 1002,
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
        strength: 14,
        resilience: 14,
        experience: 80,
        loot: [
            {
                itemId: 1,
                max: 18,
                chance: 50
            },
            {   // Iron Shield
                itemId: 2001,
                max: 1,
                chance: 18
            },
            {   // Staff of Falerga
                itemId: 1004,
                max: 1,
                chance: 7
            }
        ]
    },
    {
        id: 5,
        level: 3,
        name: "Scorpion",
        symbol: "🦂",
        maxHealth: 80,
        strength: 16,
        resilience: 14,
        experience: 80,
        loot: [
            {
                itemId: 1,
                max: 18,
                chance: 50
            },
            {   // Scorpion's Claw
                itemId: 1003,
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
        strength: 30,
        resilience: 30,
        experience: 100,
        loot: [
            {
                itemId: 1,
                max: 50,
                chance: 80
            }
        ]
    }
]