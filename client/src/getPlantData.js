import fetch from 'node-fetch'

const plantIds = [
    'kjzl6cwe1jw1479uw8qi0dw525djrqe0jd8y3rzs7l4n4c0lc7ph6y1yo045wop',
    'kjzl6cwe1jw146mh4g4t15qu7homv5q7fefhqtm06x5w901afolb5ymccxrtwa8',
    'kjzl6cwe1jw149hwji5v7wzwdykltryt5jziqmtjx5mwt419c6h3mj7nqxjlmd2',
    'kjzl6cwe1jw148qup4nesbe3r5l8g06weukmnl8yukqu2jjzlc5pbujv928g0a1',
    'kjzl6cwe1jw1482kp6j4v3radqr46n5wr1f74tw7jfm5zpt4tyr1lkc4nkgv13o',
    'kjzl6cwe1jw149823dgeickx0f021z4m8mw35n7ryzn39bhpgiwywuuxjyl05s8',
    'kjzl6cwe1jw147til8qx5t7waz1usa67kjpvki6onoebfgmp6d17ig06ads0n7q',
    'kjzl6cwe1jw147yxxu29g7t7hm7mb96okavdf24fai6ea9349wis6ngn97yh4zs',
    'kjzl6cwe1jw147ybyngqs7htlex30chcoh9ivfkhwgp8liwe5iud98xkdfivifm'
]

export default async function getPlantData () {
    const randomPlantId = plantIds[plantIds.length * Math.random() | 0]
    const response = await fetch('https://crypto-plants-metadata-backend.herokuapp.com/plant/' + randomPlantId)

    return await response.json()
}
