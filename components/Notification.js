import stream from 'getstream'

const client = stream.connect('753adfaa3x87', 'xwrybggzyk4um6v8c5ep79r7hqce5twj9j6pjj99584c7b2r36eqjejcp4h8te9y', location = 'us-east')

// add an activity to Scott's notification feed  
const scott = client.feed('notification', 'scott')
const activityData = {
    'actor': 'Josh',
    'verb': 'follow',
    'object': 'Scott',
    'time': '2018-05-04T20:24:03.042927'
}
const activityResponse = scott.addActivity(activityData)

// Read Scott's notification feed
scott = client.feed('notification', 'scott')
notifications = scott.get({ limit: 10 })
console.log(notifications)

