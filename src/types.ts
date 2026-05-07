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
  isPrimary?: boolean;
};

export type OrbWeapon = {
  type: "orb";
  damage: number;
  rotationSpeed: number;
  orbCount: number;
  baseAngle: number;
  orbitRadius: number;
  evolved: boolean;
};

export type BoomerangWeapon = {
  type: "boomerang";
  damage: number;
  fireRate: number;
  range: number;
  returnSpeed: number;
  cooldownRemaining: number;
  evolved: boolean;
};

export type AuraWeapon = {
  type: "aura";
  damage: number;
  radius: number;
  tickRate: number;
  tickCooldown: number;
  pulseTtl: number;
  evolved: boolean;
};

export type LightningWeapon = {
  type: "lightning";
  damage: number;
  fireRate: number;
  chainCount: number;
  chainRange: number;
  cooldownRemaining: number;
  evolved: boolean;
};

export type MinesWeapon = {
  type: "mines";
  damage: number;
  fireRate: number;
  explosionRadius: number;
  triggerRadius: number;
  cooldownRemaining: number;
  evolved: boolean;
};

export type SolarBeam = {
  targetId: number;
  endX: number;
  endY: number;
};

export type LaserWeapon = {
  type: "laser";
  damage: number;
  fireRate: number;
  beamWidth: number;
  beamCount: number;
  cooldownRemaining: number;
  evolved: boolean;
  beams: SolarBeam[];
  isPrimary?: boolean;
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
  isPrimary?: boolean;
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
  isPrimary?: boolean;
};

export type ClusterBombWeapon = {
  type: "clusterBomb";
  impactDamage: number;
  fragmentDamage: number;
  fragmentCount: number;
  fireRate: number;
  cooldownRemaining: number;
  evolved: boolean;
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
  evolved: boolean;
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
  evolved: boolean;
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
  trailHistory: { x: number; y: number; t: number }[];
};

export type Boomerang = Entity & {
  kind: "boomerang";
  damage: number;
  origin: Vec2;
  range: number;
  speed: number;
  phase: "outgoing" | "returning";
  lastHitByEnemy: Map<number, number>;
  lobe: number;
  totalLobes: number;
  fireAngle: number;
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

export type PickupType = "bomb" | "magnet" | "heart" | "scrap_bag" | "clock";

export type Pickup = Entity & {
  kind: "pickup";
  pickupType: PickupType;
  spawnTime: number;
};

export type FloatingText = {
  text: string;
  pos: Vec2;
  vy: number;
  ttl: number;
  ttlMax: number;
  color: string;
};

export type PlasmaField = {
  pos: Vec2;
  radius: number;
  ttl: number;
  ttlMax: number;
  tickCooldown: number;
  tickInterval: number;
  perTickDamage: number;
};

export type GravityWell = Entity & {
  kind: "gravityWell";
  phase: "flying" | "active" | "fading";
  travelTarget: Vec2;
  travelDistance: number;
  travelTraveled: number;
  damage: number;
  pullStrength: number;
  ttl: number;
  fadeTtl: number;
  tickCooldown: number;
  tickInterval: number;
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
  burnTtl: number;
  burnDps: number;
  dropsLoot: boolean;
  freezeTtl: number;
  shoveVelocity: Vec2;
  shoveTimer: number;
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
  magnetized: boolean;
};

export type Camera = {
  pos: Vec2;
  prevPos: Vec2;
};
