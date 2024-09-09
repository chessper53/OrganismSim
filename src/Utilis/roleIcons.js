import agroBlue from '../assets/BlueTeam/legionnaireBlue.png';
import agroRed from '../assets/RedTeam/legionnaireRed.png';
import civilianBlue from '../assets/BlueTeam/civilianBlue.png';
import civilianRed from '../assets/RedTeam/civilianRed.png';
import medicBlue from '../assets/BlueTeam/medicBlue.png';
import medicRed from '../assets/RedTeam/medicRed.png';
import civilianDead from '../assets/DeadState/civiDead.png'; 
import agroDead from '../assets/DeadState/legionnaireDead.png';
import medicDead from '../assets/DeadState/medicDead.png'; 
import kingBlue from "../assets/BlueTeam/KingBlue.png";
import kingRed from '../assets/RedTeam/KingRed.png';
import kingDead from '../assets/DeadState/KingDead.png';
import centurionBlue from "../assets/BlueTeam/centurionBlue.png";
import centurionRed from '../assets/RedTeam/centurionRed.png';
import centurionDead from '../assets/DeadState/centurionDead.png';
import shieldBearerBlue from "../assets/BlueTeam/shieldBearerBlue.png";
import shieldBearerRed from '../assets/RedTeam/shieldBearerRed.png';
import shieldBearerDead from '../assets/DeadState/shieldBearerDead.png';
import archerBlue from "../assets/BlueTeam/archerBlue.png";
import archerRed from '../assets/RedTeam/archerRed.png';
import archerDead from '../assets/DeadState/archerDead.png';
import romanShipBlue from "../assets/BlueTeam/romanShipBlue.png";
import romanShipRed from '../assets/RedTeam/romanShipRed.png';
import romanShipDead from '../assets/DeadState/romanShipDead.png';

export const roleIcons = {
  legionnaire: {
    alive: {
      blue: agroBlue,
      red: agroRed,
    },
    dead: agroDead,
  },
  civilian: {
    alive: {
      blue: civilianBlue,
      red: civilianRed,
    },
    dead: civilianDead,
  },
  medic: {
    alive: {
      blue: medicBlue,
      red: medicRed,
    },
    dead: medicDead,
  },
  Emperor: {
    alive: {
      blue: kingBlue,
      red: kingRed,
    },
    dead: kingDead,
  },
  centurion: {
    alive: {
      blue: centurionBlue,
      red: centurionRed,
    },
    dead: centurionDead,
  },
  shieldBearer: {
    alive: {
      blue: shieldBearerBlue,
      red: shieldBearerRed,
    },
    dead: shieldBearerDead,
  },
  archer: {
    alive: {
      blue: archerBlue,
      red: archerRed,
    },
    dead: archerDead,
  },
  romanShip: {
    alive: {
      blue: romanShipBlue,
      red: romanShipRed,
    },
    dead: romanShipDead,
  }
};
