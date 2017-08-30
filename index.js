import prettyjson from 'prettyjson'
import { first, shuffle } from 'lodash'
import persons from './list.json'

const awards = [
  { card: 1000, luckyWiners: [...new Array(1)]},
  { card: 300, luckyWiners: [...new Array(5)]},
  { card: 50, luckyWiners: [...new Array(50)]}
]

let emails = persons
  .reduce((results, {email, point}) =>
    results.concat([...new Array(point)].map(() => email)), []
  )

const announce = awards
  .map(({ card, luckyWiners }) => ({
    card, luckyWiners: luckyWiners.map(() => {
      const winner = first(shuffle(emails))
      emails = emails.filter(email => email !== winner)
      return winner.split('@').map((value, index) => index === 0 ? `${value.slice(0, -2)}**` : '***').join('@')
    })
  }))

console.log(prettyjson.render(announce))