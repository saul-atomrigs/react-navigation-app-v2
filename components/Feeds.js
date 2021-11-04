import stream from 'getstream';

const client = stream.connect(
    'tc7ru58bttgf',
    '3pvasa2fqkqq22ha8bab8az9mbqx3t92a6ahumwe2aqznj3b2kh6bsc22k6apr6a'
);

// Generate user token server-side
const userToken = client.createUserToken('the-user-id');

// Instantiate a feed using feed group 'user' and user id 'chris'
const chris = client.feed('user', 'chris');

// Add an activity to the feed 
await user1.addActivity(activity);
// Add an Activity; message is a custom field - tip: you can add unlimited custom fields! 
await chris.addActivity({
    actor: 'chris',
    verb: 'add',
    object: 'picture:10',
    foreign_id: 'picture:10',
    message: 'Beautiful bird!'
});

// Remove an Activity by referencing it's Foreign Id: 
await chris.removeActivity({ foreignId: 'picture:10' });

// Create a following relationship between Jack's "timeline" feed and Chris' "user" feed: 
const jack = client.feed('timeline', 'jack');
// jack follows chris
await jack.follow('user', 'chris');
// Follow feed without copying the activities: 
await jack.follow('user', 'chris', { limit: 0 });
// Unfollow
await jack.unfollow('user', 'chris');

// Read Jack's timeline and Chris' post appears in the feed: 
const results = await jack.get({ limit: 10 });

// Create an activity object 
const activity = { actor: 'User:1', verb: 'pin', object: 'Place:42' };
// Create a bit more complex activity 
const activity = {
    'actor': 'User:1',
    'verb': 'run',
    'object': 'Exercise:42',
    'course': { 'name': 'Golden Gate park', 'distance': 10 },
    'participants': ['Thierry', 'Tommaso'],
    'started_at': new Date(),
    'foreign_id': 'run:1',
    'location': { 'type': 'point', 'coordinates': [37.769722, -122.476944] }
};

// Returns a paginated list of the given feed's followers
const response = await user1.followers({ limit: '10', offset: '10' });

// get follower and following stats of the feed 
client.feed('user', 'me').followStats()

// get follower and following stats of the feed but also filter with given slugs 
// count by how many timelines follow me 
// count by how many markets are followed 
client.feed.followStats({ followerSlugs: ['timeline'], followingSlugs: ['market'] })


// Real time changes
function failCallback(data) {
    alert('something went wrong, check the console logs');
    console.log(data);
}

const user1 = client.feed('user', '1', token);
const subscription = user1.subscribe(function callback(data) {
    alert(data);
}).then(null, failCallback);

// The returned Subscription object has a method cancel 
// that will remove the listener from this channel  
