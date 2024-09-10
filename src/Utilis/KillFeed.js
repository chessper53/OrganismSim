export const logKillEvent = (attacker, defender) => {
    const killMessage = `${attacker.username} (${attacker.role}) killed ${defender.username} (${defender.role})`;
    console.log(killMessage);
    localStorage.setItem("KillFeed", killMessage);
    return killMessage;
};

export const generateUserName = () => {
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); 
  const filteredPrefixes = prefixes.filter(prefix => prefix.startsWith(randomLetter));
  const filteredNames = names.filter(n => n.startsWith(randomLetter));
  

  if (prefixes.length > 0 && filteredNames.length > 0) {
    const randomPrefix = filteredPrefixes[Math.floor(Math.random() * filteredPrefixes.length)];
    const randomName = filteredNames[Math.floor(Math.random() * filteredNames.length)];
    return `${randomPrefix} ${randomName}`;
  } else {
    return generateUserName(); 
  }
};  

const prefixes = [ 
  // A
  "Atrocious", "Aggressive", "Annihilating", "Abyssal", "Apocalyptic", "Assassin-like", "Agonizing", "Antagonistic", "Armageddon-bound", "All-devouring",
  
  // B
  "Brutal", "Bloodthirsty", "Berserk", "Bludgeoning", "Barbaric", "Bone-crushing", "Beastly", "Battering", "Bulletproof", "Blackhearted",
  
  // C
  "Catastrophic", "Carnivorous", "Cutthroat", "Chaotic", "Cold-blooded", "Crushing", "Cannibalistic", "Colossal", "Crazed", "Carnage-seeking",
  
  // D
  "Deadly", "Devastating", "Demonic", "Destructive", "Deathly", "Doom-bringing", "Depraved", "Decimating", "Daggered", "Dreadful",
  
  // E
  "Eviscerating", "Explosive", "Endless", "Enslaving", "Enraged", "Executioner-like", "Excruciating", "Eternal", "Eldritch", "Extreme",
  
  // F
  "Frenzied", "Ferocious", "Fear-inducing", "Fatal", "Flame-breathing", "Fracturing", "Fierce", "Formidable", "Furious", "Flesh-ripping",
  
  // G
  "Gory", "Gruesome", "Grim", "Gutting", "Giant-slaying", "Ghastly", "Graveborn", "Genocidal", "Goliath-crushing", "Gory-eyed",
  
  // H
  "Hellish", "Horrifying", "Heartless", "Hateful", "Harbinger-like", "Havoc-wreaking", "Head-crushing", "Heavy-handed", "Headhunting", "Hyper-violent",
  
  // I
  "Inhumane", "Insane", "Impaler", "Invincible", "Immortal", "Ire-filled", "Indomitable", "Infernal", "Irredeemable", "Icy-hearted",
  
  // J
  "Juggernaut", "Jailbreaking", "Jaw-breaking", "Jungle-born", "Joyless", "Judgment-day", "Jarring", "Jackal-like", "Jagged", "Jury-less",
  
  // L
  "Lethal", "Limb-ripping", "Lucifer-like", "Lacerating", "Lawless", "Loveless", "Legendary", "Livid", "Lustful for blood", "Lionhearted",
  
  // M
  "Merciless", "Monstrous", "Malevolent", "Murderous", "Malignant", "Machete-wielding", "Mass-murdering", "Mind-bending", "Maleficent", "Mountain-crushing",
  
  // N
  "Nefarious", "Nightmarish", "Nail-biting", "Neck-snapping", "Nerve-shattering", "Nuking", "Nihilistic", "Necrotic", "Night-fallen", "Nemesis-born",
  
  // O
  "Obliterating", "Outlaw", "Overkill", "Overthrowing", "Oath-breaking", "Outrageous", "Onslaught-bringing", "Overpowering", "Oppressor-like", "Omen-giving",
  
  // P
  "Pillaging", "Punishing", "Predatory", "Piercing", "Poisonous", "Plague-ridden", "Pyromaniacal", "Pummeling", "Pulverizing", "Power-hungry",
  
  // R
  "Ravaging", "Ruthless", "Ripping", "Reaper-like", "Rampaging", "Rage-fueled", "Razor-sharp", "Relentless", "Raging", "Ruination-bringing",
  
  // S
  "Savage", "Sinister", "Soul-crushing", "Skull-splitting", "Slaughtering", "Searing", "Skeletal", "Shredding", "Shadow-born", "Scourge-like",
  
  // T
  "Terrifying", "Throat-ripping", "Tyrannical", "Tormenting", "Thunderous", "Torturous", "Titan-crushing", "Toxic", "Teeth-baring", "Tempestuous",
  
  // V
  "Vicious", "Venomous", "Vile", "Violent", "Volcanic", "Vampiric", "Vengeful", "Vortex-like", "Voracious", "Void-bringer"
];

const names = [
  // A
  "Aaron", "Alec", "Axel", "Arnold", "Aldric", "Anders", "Amos", "Alaric", "August", "Asher",
  
  // B
  "Bryce", "Brandon", "Blake", "Brock", "Baron", "Bane", "Benedict", "Braxton", "Boris", "Brutus",
  
  // C
  "Cain", "Caleb", "Cassius", "Cedric", "Colt", "Cyrus", "Connor", "Clint", "Carson", "Conrad",
  
  // D
  "Damon", "Drake", "Dante", "Damian", "Darius", "Desmond", "Dirk", "Dexter", "Donovan", "Duke",
  
  // E
  "Ezra", "Elias", "Evan", "Emmett", "Edgar", "Erik", "Eldon", "Ezekiel", "Elric", "Everett",
  
  // F
  "Finn", "Fletcher", "Flint", "Felix", "Frederick", "Francis", "Ferdinand", "Floyd", "Frost", "Fenton",
  
  // G
  "Griffin", "Gage", "Gareth", "Grant", "Gavin", "Gideon", "Gunnar", "Gordon", "Garrett", "Gerard",
  
  // H
  "Hank", "Hunter", "Hugo", "Harvey", "Holden", "Harlan", "Hendrix", "Hugh", "Heath", "Horace",
  
  // I
  "Ira", "Isaac", "Ishmael", "Ivan", "Icarus", "Ignatius", "Indigo", "Isaiah", "Ike", "Irvin",
  
  // J
  "Jax", "Jericho", "Jethro", "Julius", "Jasper", "Jed", "Jagger", "Jace", "Jared", "Jonah",
  
  // L
  "Lucian", "Lance", "Logan", "Leon", "Lachlan", "Luther", "Lorenzo", "Lennox", "Levi", "Lawson",
  
  // M
  "Maximus", "Magnus", "Milo", "Malcolm", "Marcus", "Maverick", "Morrison", "Mason", "Mordecai", "Merrick",
  
  // N
  "Nathaniel", "Nash", "Nolan", "Nestor", "Neville", "Nico", "Nicholas", "Norman", "Norris", "Nigel",
  
  // O
  "Orion", "Odin", "Oscar", "Oleg", "Otto", "Oliver", "Orson", "Omar", "Owen", "Oswald",
  
  // P
  "Pax", "Pierce", "Preston", "Patrick", "Percival", "Porter", "Parker", "Peregrine", "Price", "Phineas",
  
  // R
  "Ragnar", "Ronan", "Remy", "Randall", "Raymond", "Rex", "Ryder", "Ralph", "Roland", "Roman",
  
  // S
  "Silas", "Stefan", "Seth", "Storm", "Spencer", "Samson", "Soren", "Slade", "Sebastian",
  
  // T
  "Talon", "Thane", "Titus", "Tobias", "Tristan", "Troy", "Theon", "Thor", "Tiberius", "Tanner",
  
  // V
  "Vlad", "Viktor", "Vance",  "Valerian", "Virgil", "Viggo", "Vincent", "Victor"
];
