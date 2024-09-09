export const generateName = () => {
    const randomName = nameList[Math.floor(Math.random() * nameList.length)];
    return randomName;
};

const nameList = [
    "Liam", "Emma", "Noah", "Olivia", "Ava", "William", "Sophia", "James", "Isabella", "Logan", 
    "Mia", "Lucas", "Amelia", "Benjamin", "Harper", "Elijah", "Evelyn", "Mason", "Ella", "Ethan"
  ];