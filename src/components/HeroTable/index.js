import React from 'react'
import HeroRow from './HeroRow'

const HeroTable = ({heroes, killHero, putRing, usingRing, returnRing}) => (
  <table className="characters-table">
    <tbody>
      <tr className="character-row">
        <th>Name</th>
        <th>Race</th>
        <th>Age</th>
        <th>Weapon</th>
        <th></th>
      </tr>

      {heroes.map((hero, index) => (
        <HeroRow
          key={index}
          hero={hero}
          killHero={killHero}
          putRing={putRing}
          usingRing={usingRing}
        />
      ))}
    </tbody>
    <div onClick={() => returnRing()}>💍 Return Ring</div>
  </table>
)

export default HeroTable
