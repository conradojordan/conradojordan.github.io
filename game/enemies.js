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
        experience: 5,
        loot: [
            {
                itemId: 1,
                max: 4,
                chance: 80
            }
        ]
    },
    {
        id: 2,
        level: 1,
        name: "Snake",
        symbol: "🐍",
        maxHealth: 20,
        strength: 11,
        resilience: 11,
        experience: 15,
        loot: [
            {
                itemId: 1,
                max: 10,
                chance: 70
            }
        ]
    },
    {
        id: 3,
        level: 5,
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