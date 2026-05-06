export type Phase =
  | "title"
  | "playing"
  | "paused"
  | "levelup"
  | "extracted"
  | "lost"
  | "workshop"
  | "weapon-select";

export type Vec2 = { x: number; y: number };

export type Entity = {
  id: number;
  pos: Vec2;
  prevPos: Vec2;
  vel: Vec2;
  radius: number;
  alive: boolean;
};

export type WeaponType =
  | "pistol"
  | "orb"
  | "boomerang"
  | "aura"
  | "lightning"
  | "mines"
  | "laser"
  | "mg"
  | "rocket"
  | "clusterBomb"
  | "repulsor"
  | "sword";

export type PistolWeapon = {
  type: "pistol";
  damage: number;
  fireRate: number;
  projectileSpeed: number;
  projectileCount: number;
  pierce: number;
  homingStrength: number;
  cooldownRemaining: number;
  evolved: boolean;
};

export type OrbWeapon = {
  type: "orb";
  damage: number;
  rotationSpeed: number;
  orbCount: number;
  baseAngle: number;
};

export type BoomerangWeapon = {
  type: "boomerang";
  damage: number;
  fireRate: number;
  range: number;
  returnSpeed: number;
  cooldownRemaining: number;
};

export type AuraWeapon = {
  type: "aura";
  damage: number;
  radius: number;
  tickRate: number;
  tickCooldown: number;
  pulseTtl: number;
};

export type LightningWeapon = {
  type: "lightning";
  damage: number;
  fireRate: number;
  chainCount: number;
  chainRange: number;
  cooldownRemaining: number;
};

export type MinesWeapon = {
  type: "mines";
  damage: number;
  fireRate: number;
  explosionRadius: number;
  triggerRadius: number;
  cooldownRemaining: number;
};

export type LaserWeapon = {
  type: "laser";
  damage: number;
  fireRate: number;
  beamWidth: number;
  beamCount: number;
  cooldownRemaining: number;
  evolved: boolean;
  beamTargetId: number;
  beamEndX: number;
  beamEndY: number;
};

export type MachineGunWeapon = {
  type: "mg";
  damage: number;
  fireRate: number;
  projectileSpeed: number;
  spread: number;
  cooldownRemaining: number;
  evolved: boolean;
  spinUp: number;
  noTargetTimer: number;
};

export type RocketLauncherWeapon = {
  type: "rocket";
  impactDamage: number;
  explosionDamage: number;
  explosionRadius: number;
  fireRate: number;
  rocketSpeed: number;
  cooldownRemaining: number;
  evolved: boolean;
};

export type ClusterBombWeapon = {
  type: "clusterBomb";
  impactDamage: number;
  fragmentDamage: number;
  fragmentCount: number;
  fireRate: number;
  cooldownRemaining: number;
};

export type RepulsorWeapon = {
  type: "repulsor";
  damage: number;
  radius: number;
  pushDistance: number;
  pulseRate: number;
  pulseCooldown: number;
  pulseVizTtl: number;
  pulseVizRadius: number;
};

export type SwordWeapon = {
  type: "sword";
  damage: number;
  range: number;
  arcAngle: number;
  fireRate: number;
  cooldownRemaining: number;
  swingTtl: number;
  swingFromAngle: number;
  swingToAngle: number;
  swingRange: number;
};

export type Weapon =
  | PistolWeapon
  | OrbWeapon
  | BoomerangWeapon
  | AuraWeapon
  | LightningWeapon
  | MinesWeapon
  | LaserWeapon
  | MachineGunWeapon
  | RocketLauncherWeapon
  | ClusterBombWeapon
  | RepulsorWeapon
  | SwordWeapon;

export type Player = Entity & {
  kind: "player";
  hp: number;
  maxHp: number;
  moveSpeed: number;
  pickupRadius: number;
  regen: number;
  xpMultiplier: number;
  iframeRemaining: number;
  weapons: Weapon[];
  level: number;
  xp: number;
  xpToNext: number;
  globalDamageMult: number;
  rerollTokens: number;
  runScrap: number;
  critChance: number;
  critMult: number;
  berserkerStacks: number;
  thornsStacks: number;
  ironSkinStacks: number;
};

export type Orb = Entity & {
  kind: "orb";
  lastHitByEnemy: Map<number, number>;
};

export type Boomerang = Entity & {
  kind: "boomerang";
  damage: number;
  origin: Vec2;
  range: number;
  speed: number;
  phase: "outgoing" | "returning";
  lastHitByEnemy: Map<number, number>;
};

export type Mine = Entity & {
  kind: "mine";
  damage: number;
  triggerRadius: number;
  explosionRadius: number;
  armTimer: number;
  exploded: boolean;
  explosionTtl: number;
};

export type LightningBolt = {
  points: Vec2[];
  ttl: number;
  ttlMax: number;
};

export type LaserBeam = {
  start: Vec2;
  end: Vec2;
  ttl: number;
  ttlMax: number;
};

export type Rocket = Entity & {
  kind: "rocket";
  impactDamage: number;
  explosionDamage: number;
  explosionRadius: number;
  ttl: number;
  exploded: boolean;
  explosionTtl: number;
  originX: number;
  originY: number;
  splitDistance: number;
  splitTimer: number;
  homingStrength: number;
};

export type ClusterBomb = Entity & {
  kind: "clusterBomb";
  impactDamage: number;
  fragmentDamage: number;
  fragmentCount: number;
  fragmentSpeed: number;
  fragmentLifetime: number;
  ttl: number;
};

export type ExtractionZone = {
  pos: Vec2;
  radius: number;
  ttl: number;
  ttlMax: number;
  windowIndex: number;
  multiplier: number;
};

type EnemyBase = Entity & {
  kind: "enemy";
  hp: number;
  damage: number;
  speed: number;
  critFlashTtl: number;
};

export type Chaser = EnemyBase & { species: "chaser" };
export type Shooter = EnemyBase & {
  species: "shooter";
  fireCooldown: number;
};

export type Enemy = Chaser | Shooter;

export type EnemyProjectile = Entity & {
  kind: "enemyProjectile";
  damage: number;
  ttl: number;
};

export type Projectile = Entity & {
  kind: "projectile";
  damage: number;
  ttl: number;
  pierceRemaining: number;
  hitIds: number[];
  homingStrength: number;
};

export type Gem = Entity & {
  kind: "gem";
  value: number;
};

export type Camera = {
  pos: Vec2;
  prevPos: Vec2;
};
