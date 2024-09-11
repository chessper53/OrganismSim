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
  "Audacious", "Aggressive", "Arrogant", "Anguished", "Astonishing", "Almighty", "Abominable", "Adamant", "Antagonistic", "Agile",
  
  // B
  "Brutal", "Baleful", "Bold", "Brazen", "Bitter", "Blazing", "Belligerent", "Berserk", "Brawny", "Beastly",
  
  // C
  "Cold-blooded", "Cunning", "Cruel", "Calculated", "Chaotic", "Colossal", "Cutthroat", "Combative", "Crushing", "Clawed",
  
  // D
  "Daring", "Deadly", "Devastating", "Dangerous", "Destructive", "Dominant", "Dauntless", "Defiant", "Doomed", "Demonic",
  
  // E
  "Evil", "Enraged", "Elusive", "Empowered", "Explosive", "Extreme", "Eviscerating", "Epic", "Erratic", "Eternal",
  
  // F
  "Fierce", "Ferocious", "Fearless", "Formidable", "Furious", "Fiery", "Fatal", "Frenzied", "Frantic", "Fabled",
  
  // G
  "Grim", "Ghoulish", "Gallant", "Gutsy", "Grisly", "Gigantic", "Gory", "Gravely", "Grasping", "Greedy",
  
  // H
  "Heroic", "Harsh", "Horrific", "Hateful", "Hellish", "Hostile", "Hulking", "Havoc", "Hungry", "Hardened",
  
  // I
  "Imposing", "Inhumane", "Invincible", "Icy", "Intimidating", "Incensed", "Insolent", "Imperious", "Insidious", "Infectious",
  
  // J
  "Jagged", "Jarring", "Joyless", "Juvenile", "Jittery", "Judgmental", "Jovial", "Jubilant", "Jeering", "Jubilant",
  
  // L
  "Lethal", "Lurid", "Lionhearted", "Looming", "Livid", "Lumbering", "Loud", "Lacerating", "Loyal", "Lethargic",
  
  // M
  "Malicious", "Monstrous", "Merciless", "Menacing", "Mighty", "Malevolent", "Massive", "Mad", "Murderous", "Mischievous",
  
  // N
  "Nefarious", "Nimble", "Nasty", "Noble", "Notorious", "Narrow", "Nagging", "Noble", "Nifty", "Nomadic",
  
  // O
  "Obliterating", "Ominous", "Outrageous", "Overbearing", "Overwhelming", "Oppressive", "Obscure", "Outlaw", "Outspoken", "Obstinate",
  
  // P
  "Powerful", "Persistent", "Pugnacious", "Perilous", "Paranoid", "Passionate", "Poisonous", "Phantom", "Pitiless", "Primal",
  
  // R
  "Ruthless", "Relentless", "Rampaging", "Reckless", "Raging", "Radical", "Revolting", "Ravenous", "Rancorous", "Robust",
  
  // S
  "Savage", "Sinister", "Striking", "Spectral", "Spiteful", "Swift", "Scornful", "Silent", "Steadfast", "Smoldering",
  
  // T
  "Terrifying", "Tactical", "Tyrannical", "Tough", "Thorny", "Tenacious", "Traitorous", "Timeless", "Turbulent", "Toxic",
  
  // V
  "Vicious", "Vindictive", "Violent", "Volatile", "Vigilant", "Vain", "Vile", "Vulgar", "Venomous", "Vibrant"
];

const names = [
  // A
  "Aaron", "Adam", "Albert", "Arthur", "Aidan", "Alexander", "Alfred", "Anthony", "Archibald", "Arnold",
  
  // B
  "Benjamin", "Brandon", "Brian", "Bruce", "Bradley", "Bernard", "Blake", "Bryce", "Barrett", "Benson",
  
  // C
  "Charles", "Christopher", "Caleb", "Cameron", "Carter", "Colin", "Clint", "Curtis", "Clayton", "Clark",
  
  // D
  "Daniel", "David", "Derek", "Dylan", "Dominic", "Douglas", "Dean", "Dawson", "Damian", "Dennis",
  
  // E
  "Edward", "Ethan", "Eli", "Eric", "Ezekiel", "Everett", "Edgar", "Eldon", "Emerson", "Eugene",
  
  // F
  "Frank", "Frederick", "Fergus", "Finn", "Francis", "Felix", "Fletcher", "Forrest", "Foster", "Ford",
  
  // G
  "George", "Gavin", "Gregory", "Gordon", "Grayson", "Gerald", "Garrett", "Geoffrey", "Glenn", "Grant",
  
  // H
  "Henry", "Harrison", "Harold", "Hunter", "Hugh", "Howard", "Harry", "Hector", "Hayden", "Hudson",
  
  // I
  "Isaac", "Ian", "Isaiah", "Ivan", "Irvin", "Isa", "Ira", "Ishmael", "Ignatius", "Ibrahim",
  
  // J
  "Jacob", "Jonathan", "Joseph", "Jack", "James", "Joshua", "Jasper", "Jackson", "Jeremy", "Jeremiah",
  
  // L
  "Liam", "Lucas", "Louis", "Logan", "Leon", "Luther", "Lloyd", "Leland", "Lawrence", "Lance",
  
  // M
  "Matthew", "Marcus", "Michael", "Miles", "Maxwell", "Martin", "Marshall", "Morgan", "Malcolm", "Mitchell",
  
  // N
  "Nathan", "Nicholas", "Noah", "Nelson", "Norman", "Nolan", "Nigel", "Neville", "Nash", "Nestor",
  
  // O
  "Oliver", "Oscar", "Owen", "Orlando", "Otis", "Orson", "Omar", "Olin", "Otto", "Oakley",
  
  // P
  "Paul", "Patrick", "Peter", "Philip", "Preston", "Peyton", "Percy", "Porter", "Pierce", "Parker",
  
  // R
  "Richard", "Robert", "Ronald", "Ryan", "Russell", "Ralph", "Reed", "Riley", "Reuben", "Randall",
  
  // S
  "Samuel", "Simon", "Stephen", "Sean", "Scott", "Stanley", "Spencer", "Sterling", "Silas", "Seth",
  
  // T
  "Thomas", "Timothy", "Travis", "Troy", "Tyler", "Tobias", "Theodore", "Terrence", "Tanner", "Trent",
  
  // V
  "Victor", "Vincent", "Vernon", "Vaughn", "Valentin", "Virgil", "Vance", "Van", "Vito", "Vidal"
];
