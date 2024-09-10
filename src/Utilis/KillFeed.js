export const logKillEvent = (attacker, defender) => {
    const killMessage = `${attacker.username} (${attacker.role}) killed ${defender.username} (${defender.role})`;
    console.log(killMessage);
    return killMessage;
  };

  export const generateUserName = () => {
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomName = name[Math.floor(Math.random() * name.length)];
    return randomPrefix + " " + randomName;
};

const prefixes = [ 
  "The", 
  "Notorious", 
  "Brutal", 
  "Merciless", 
  "Ruthless", 
  "Relentless", 
  "Vicious", 
  "Ferocious", 
  "Inhumane", 
  "Savage", 
  "Unforgiving", 
  "Terrifying", 
  "Malevolent", 
  "Vindictive", 
  "Fierce", 
  "Bloodthirsty", 
  "Monstrous", 
  "Venomous", 
  "Diabolical",
  "Wrathful",
  "Grim",
  "Fearsome",
  "Baleful",
  "Formidable",
  "Merciless",
  "Cold-blooded",
  "Implacable",
  "Unsparing"
];

const name = [
  "Benjamin", 
  "Alexander", 
  "Christopher", 
  "William", 
  "Daniel", 
  "Matthew", 
  "Jonathan", 
  "Samuel", 
  "Michael", 
  "James", 
  "Thomas", 
  "Nicholas", 
  "Andrew", 
  "David", 
  "Henry", 
  "John", 
  "George", 
  "Patrick", 
  "Stephen", 
  "Charles",
  "Edward",
  "Robert",
  "Peter",
  "Joseph",
  "Paul",
  "Arthur",
  "Simon",
  "Oliver",
  "Frederick",
  "Louis"
];
