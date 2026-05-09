export type Phase =
  | "title"
  | "playing"
  | "paused"
  | "levelup"
  | "extracted"
  | "lost"
  | "workshop"
  | "weapon-select"
  | "first-pick"
  | "paused-summary";

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
  | "sword"
  | "ricochet"
  | "drone"
  | "frost_nova";

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

export type RicochetWeapon = {
  type: "ricochet";
  damage: number;
  fireRate: number;
  projectileSpeed: number;
  bounceCount: number;
  bounceSearchRange: number;
  cooldownRemaining: number;
  evolved: boolean;
};

export type FrostNovaWeapon = {
  type: "frost_nova";
  damage: number;
  radius: number;
  pulseRate: number;
  slowAmount: number;
  slowDuration: number;
  pulseCooldown: number;
  pulseVizTtl: number;
  pulseVizRadius: number;
  evolved: boolean;
};

export type DroneWeapon = {
  type: "drone";
  droneCount: number;
  droneDamage: number;
  droneFireRate: number;
  droneProjectileSpeed: number;
  droneRange: number;
  droneFollowOffset: number;
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
  | SwordWeapon
  | RicochetWeapon
  | DroneWeapon
  | FrostNovaWeapon;

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
  dashCooldown: number;
  dashCooldownMax: number;
  dashIframeTimer: number;
  dashActiveTimer: number;
  dashStartPos: Vec2;
  dashEndPos: Vec2;
  dashAfterimageTimer: number;
  lastMovementDirection: Vec2;
};

export type DashAfterimage = {
  pos: Vec2;
  ttl: number;
  ttlMax: number;
  baseAlpha: number;
};

export type DashFlash = {
  pos: Vec2;
  ttl: number;
  ttlMax: number;
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
  targetId?: number;
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

export type RicochetProjectile = Entity & {
  kind: "ricochetProjectile";
  damage: number;
  speed: number;
  bouncesRemaining: number;
  bounceIndex: number;
  searchRange: number;
  hitIds: number[];
  ttl: number;
  evolved: boolean;
  damagePerBounceMult: number;
  trail: { x: number; y: number; ttl: number; ttlMax: number }[];
};

export type RicochetSpark = {
  pos: Vec2;
  ttl: number;
  ttlMax: number;
};

export type PickupType =
  | "bomb"
  | "magnet"
  | "heart"
  | "scrap_bag"
  | "clock"
  | "treasure_chest";

export type Pickup = Entity & {
  kind: "pickup";
  pickupType: PickupType;
  spawnTime: number;
  scrapValue?: number;
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
  slowMultiplier: number;
  slowTimer: number;
  frostFlashTtl: number;
};

export type Chaser = EnemyBase & { species: "chaser" };
export type Shooter = EnemyBase & {
  species: "shooter";
  fireCooldown: number;
};
export type BruteSlamPhase = "ready" | "windup";
export type Brute = EnemyBase & {
  species: "brute";
  slamCooldown: number;
  slamPhase: BruteSlamPhase;
  slamWindupTimer: number;
};
export type Bomber = EnemyBase & {
  species: "bomber";
  armed: boolean;
  armedTimer: number;
  detonated: boolean;
  pulsePhase: number;
};
export type Shielded = EnemyBase & {
  species: "shielded";
  shieldHp: number;
  shieldHpMax: number;
  shieldBreakTtl: number;
};
export type CasterPhase = "approach" | "channeling" | "cooldown";
export type Caster = EnemyBase & {
  species: "caster";
  castPhase: CasterPhase;
  castPhaseTimer: number;
  castTargetX: number;
  castTargetY: number;
  attackFlashTtl: number;
};

export type BossBruteLord = EnemyBase & {
  species: "boss_brute_lord";
  maxHp: number;
  windowIndex: number;
  slamCooldown: number;
  slamPhase: BruteSlamPhase;
  slamWindupTimer: number;
  baseSpeed: number;
  baseDamage: number;
  hasRoared: boolean;
  enraged: boolean;
};

export type Enemy =
  | Chaser
  | Shooter
  | Brute
  | Bomber
  | Shielded
  | Caster
  | BossBruteLord;

export type Explosion = {
  pos: Vec2;
  radius: number;
  ttl: number;
  ttlMax: number;
  innerColor: string;
  outerColor: string;
  ringWidth: number;
};

export type EnemyProjectile = Entity & {
  kind: "enemyProjectile";
  damage: number;
  ttl: number;
  source: string;
};

export type Projectile = Entity & {
  kind: "projectile";
  damage: number;
  ttl: number;
  pierceRemaining: number;
  hitIds: number[];
  homingStrength: number;
  color?: string;
};

export type Drone = Entity & {
  kind: "drone";
  targetOffset: Vec2;
  fireCooldown: number;
  bobPhase: number;
  lastFireAngle: number;
  trailHistory: { x: number; y: number; ttl: number; ttlMax: number }[];
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

export type BestMoment = { dps: number; time: number; dealt: number };
export type WorstMoment = { damage: number; time: number; dominantSource: string };

export type DamageTakenSample = {
  total: number;
  bySource: { [source: string]: number };
};
