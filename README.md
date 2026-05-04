# auto-arsenal

A browser roguelike auto-shooter with Tarkov-style extraction, written in
TypeScript on the Canvas 2D API. No game engine, no React — plain TS state
in a fixed-timestep loop with interpolated render.

## Run it

Requires Node.js 20.19+ or 22.12+ (Vite 6 baseline).

```sh
npm install
npm run dev
```

Then open the URL Vite prints (typically http://localhost:5173 or 5174).

```sh
npm run build     # type-check + production build
npm run preview   # serve the production build
```

## Gameplay

Pick a starting weapon, get dropped into a shrinking field of enemies, and
either **extract** for scrap or **die** and lose what you accumulated.

- **Movement**: WASD (or arrow keys). The camera follows you on a faint grid.
- **Aim**: weapons auto-fire at the nearest enemy. Player has no manual aim.
- **Levels**: enemies drop XP gems that magnet to you. Each level pauses the
  game and offers 3 mod cards. Reroll tokens (meta upgrade) let you redraw.
- **Run scrap**: ticks up live (+1/kill, +0.5/sec, +25/level), only banked on
  successful extraction.
- **Extraction**: starting at 3:00 and every 3 minutes after, an extraction
  zone spawns 700px away in a random direction. An on-screen arrow points to
  it with distance. Walk in to bank scrap × the window's multiplier. Window
  is open for 30s; missed windows wait until the next 3-minute mark, with a
  larger multiplier.
- **Death**: discards the run's scrap entirely. The screen shows what was
  lost in red.

Pause anytime with **P** or **Esc** (or the pause button top-right).

## Weapons

Each run begins with a single starter weapon. Up to 3 weapons can be owned
at once. New weapons unlock as Summon X mods at level-up (slot-cap permitting).

| Weapon          | Behavior                                                |
| --------------- | ------------------------------------------------------- |
| Bolt            | Auto-aimed projectile; mod with split / pierce / homing |
| Orb             | Permanent orbiting projectile, hits enemies on contact  |
| Boomerang       | Throws outbound + returns; damages on both legs         |
| Aura            | Persistent damage field around player; ticks on cooldown |
| Lightning (Arc) | Chains between nearest enemies                          |
| Mines           | Drops proximity mines that explode in an AOE            |
| Laser           | High-damage piercing beam; multi-beam mod               |
| Machine Gun     | Fast inaccurate spray                                   |
| Rocket Launcher | Slow AOE explosion on contact or expiry                 |

Three of the four "starter-eligible" weapons are gated behind achievements
(reach level 10, get 500 kills, survive 5 minutes).

## Meta-progression

Scrap banked at extraction is permanent and persists in `localStorage` under
the key `auto-arsenal-save`. Spend it in the Workshop on:

- Reinforced Frame: +max HP
- Greased Bearings: +move speed
- Sharper Edges: +base damage
- Wider Magnet: +pickup radius
- Salvage Network: +scrap earned per run
- Field Medic: +HP regen
- Reroll Token: extra rerolls available at level-up

Achievements unlock alternate starter weapons. Wipe Save (bottom-left of
title screen, debug-only) clears all progress.

## Architecture notes

- **Fixed timestep**: simulation runs at 60Hz with an accumulator. The main
  loop drains the accumulator each animation frame and renders with an
  interpolation alpha so motion stays smooth at non-60Hz refresh rates.
- **State as data**: a single `GameState` object holds entity arrays,
  player, save snapshot, and phase. Systems are pure-ish functions over
  that state — no classes for entities, no global mutable state.
- **Phase machine**: `title | weapon-select | playing | paused | levelup |
  extracted | lost | workshop`. `updateGame` is a switch on phase.
- **Data-driven weapons**: each weapon is a `WeaponDef` containing its
  factory, its mod list, summon mod, and HUD stats getter. The level-up
  pool is composed by walking owned weapons + global passives; adding a
  weapon means a new `WeaponDef` entry, not a new `case` in level-up logic.
- **Save schema**: `{ totalScrap, upgrades, achievements, selectedStartingWeapon }`.
  `loadSave` is defensive — unknown shapes fall back to defaults.

## Repo layout

```
src/
  main.ts             bootstraps canvas + fixed-step loop
  game.ts             GameState, init, update/render dispatch, all UI
  types.ts            entity + weapon types, Phase union
  constants.ts        every tunable number (gameplay + UI)
  input.ts            keyboard + mouse edge tracker
  damage.ts           dealDamage(state, enemy, base) shared helper
  save.ts             localStorage load/write/wipe
  upgrades.ts         workshop upgrade defs + applyUpgrades
  achievements.ts     achievement defs + check/isUnlocked
  mods.ts             passive mod list + rollOffer + Mod type
  weapons.ts          WeaponDef + every weapon definition
  systems/            one file per system (movement, spawn, combat,
                      weapon, projectile, orb, boomerang, aura,
                      lightning, mines, laser, mg, rocket, gem,
                      enemyAI, enemyShoot, enemyProjectile, regen,
                      deathDrops, extract, levelup)
```
