const fetch = require('node-fetch') 
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(process.env.KEY)

client.once('ready', () => {
	console.log('Ready!');
})


client.on('message', async (message) => {
  try {
    const input = message.content.toLowerCase().split(' ')
    const command = input.shift()
    const oneString = input.join('')
    const dashesString = input.join('-')

    if (command === '.floor') {
      const url = `https://api.opensea.io/api/v1/collection/${oneString}`
      const options = {method: 'GET'}

      const response = await fetch(url, options)
      
      try { (fetch.FetchError) 
        const url = `https://api.opensea.io/api/v1/collection/${dashesString}`
        const options = {method: 'GET'}

        const response = await fetch(url, options)
        const res = await response.json()
        const floor = res.collection?.stats?.floor_price

        console.log(floor)
        if (floor) {
          message.channel.send(`Current ${dashesString} floor ${floor}Ξ`)
        }
      } catch {
        const res = await response.json()
        const floor = res.collection?.stats?.floor_price

        console.log(floor)
        if (floor) {
          message.channel.send(`Current ${oneString} floor ${floor}Ξ`)
        } 
      }
    }
  } catch(error) {
    console.error(`error: ${error}`)
  }
})