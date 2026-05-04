export type Phase =
  | "title"
  | "playing"
  | "levelup"
  | "won"
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
  | "projectile"
  | "orb"
  | "boomerang"
  | "aura"
  | "lightning"
  | "mines"
  | "laser"
  | "mg"
  | "rocket";

export type ProjectileWeapon = {
  type: "projectile";
  damage: number;
  fireRate: number;
  projectileSpeed: number;
  projectileCount: number;
  pierce: number;
  homingStrength: number;
  cooldownRemaining: number;
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
};

export type MachineGunWeapon = {
  type: "mg";
  damage: number;
  fireRate: number;
  projectileSpeed: number;
  spread: number;
  cooldownRemaining: number;
};

export type RocketLauncherWeapon = {
  type: "rocket";
  impactDamage: number;
  explosionDamage: number;
  explosionRadius: number;
  fireRate: number;
  rocketSpeed: number;
  cooldownRemaining: number;
};

export type Weapon =
  | ProjectileWeapon
  | OrbWeapon
  | BoomerangWeapon
  | AuraWeapon
  | LightningWeapon
  | MinesWeapon
  | LaserWeapon
  | MachineGunWeapon
  | RocketLauncherWeapon;

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
};

type EnemyBase = Entity & {
  kind: "enemy";
  hp: number;
  damage: number;
  speed: number;
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
