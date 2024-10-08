import { ReactNode } from "react";
import { Types } from "../models/Pokemon";
import NormalTypeIcon from "./NormalTypeIcon";
import FireTypeIcon from "./FireTypeIcon";
import WaterTypeIcon from "./WaterTypeIcon";
import ElectricTypeIcon from "./ElectricTypeIcon";
import GrassTypeIcon from "./GrassTypeIcon";
import IceTypeIcon from "./IceTypeIcon";
import FightingTypeIcon from "./FightingTypeIcon";
import PoisonTypeIcon from "./PoisonTypeIcon";
import GroundTypeIcon from "./GroundTypeIcon";
import FlyingTypeIcon from "./FlyingTypeIcon";
import PsychicTypeIcon from "./PsychicTypeIcon";
import BugTypeIcon from "./BugTypeIcon";
import RockTypeIcon from "./RockTypeIcon";
import GhostTypeIcon from "./GhostTypeIcon";
import DragonTypeIcon from "./DragonTypeIcon";
import DarkTypeIcon from "./DarkTypeIcon";
import SteelTypeIcon from "./SteelIconType";
import FairyTypeIcon from "./FairyTypeIcon";

export const icons: { [key in Types]: ReactNode } = {
  normal: <NormalTypeIcon />,
  fire: <FireTypeIcon />,
  water: <WaterTypeIcon />,
  electric: <ElectricTypeIcon />,
  grass: <GrassTypeIcon />,
  ice: <IceTypeIcon />,
  fighting: <FightingTypeIcon />,
  poison: <PoisonTypeIcon />,
  ground: <GroundTypeIcon />,
  flying: <FlyingTypeIcon />,
  psychic: <PsychicTypeIcon />,
  bug: <BugTypeIcon />,
  rock: <RockTypeIcon />,
  ghost: <GhostTypeIcon />,
  dragon: <DragonTypeIcon />,
  dark: <DarkTypeIcon />,
  steel: <SteelTypeIcon />,
  fairy: <FairyTypeIcon />,
};
