import { roleIcons } from "../../Utilis/IconRedirector";
import "./Organism.css"

const Organism = ({ organism }) => {
  const getOrganismIcon = () => {
    const role = roleIcons[organism.role] || {};
    if (!organism.isAlive) {
      return role.dead;
    }
    const type = role.alive || {};
    return organism.type === 'red' ? type.red : type.blue;
  };

  return (
    <img
      src={getOrganismIcon()}
      alt={organism.type}
      style={{
        position: 'absolute',
        left: organism.position.x,
        top: organism.position.y,
        width: '20px',
        height: '20px',
      }}
      title={`Role: ${organism.role}`}
    />
  );
};

export default Organism;
