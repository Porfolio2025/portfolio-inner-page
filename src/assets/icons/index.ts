// src/assets/icons.ts
import windowResize from './windowResize.png';
import maximize from './maximize.png';
import minimize from './minimize.png';
import computerBig from './computerBig.png';
import computerSmall from './computerSmall.png';
import myComputer from './myComputer.png';
import showcaseIcon from './showcaseIcon.png';
import doomIcon from './doomIcon.png';
import henordleIcon from './henordleIcon.png';
import credits from './credits.png';
import volumeOn from './volumeOn.png';
import volumeOff from './volumeOff.png';
import trailIcon from './trailIcon.png';
import windowGameIcon from './windowGameIcon.png';
import windowExplorerIcon from './windowExplorerIcon.png';
import windowsStartIcon from './windowsStartIcon.png';
import scrabbleIcon from './scrabbleIcon.png';
import close from './close.png';
import diggerIcon from './diggerIcon.png';

const icons = {
  windowResize,
  maximize,
  minimize,
  computerBig,
  computerSmall,
  myComputer,
  showcaseIcon,
  doomIcon,
  volumeOn,
  volumeOff,
  credits,
  scrabbleIcon,
  henordleIcon,
  close,
  windowGameIcon,
  windowExplorerIcon,
  windowsStartIcon,
  trailIcon,
  diggerIcon,
};

export type IconName = keyof typeof icons;

const getIconByName = (iconName: IconName): string => icons[iconName];

export default getIconByName;
