import stream

# Instantiate a new client
client = stream.connect(
    'tc7ru58bttgf',
    '3pvasa2fqkqq22ha8bab8az9mbqx3t92a6ahumwe2aqznj3b2kh6bsc22k6apr6a',
    '65217'
)

timeline_chris = client.feed('timeline', 'chris')

# Follow a friend
timeline_chris.follow('user', 'jack')
# Follow a playlist
timeline_chris.follow('playlist', '90s_hits')
# Follow an artist
timeline_chris.follow('artist', 'coldplay')

# Posting an update
jack = client.feed("user", "jack")

# Jack posts an update with a hashtag and @mention
jack.add_activity({
    "actor": "jack",
    "verb": "post",
    "object': "post: 10",
    "foreign_id": "post:10",
    "to": ["notification:chris", "tag:amsterdam"],
    "message": "Hi @chris, the coldplay concert was totally amazing #amsterdam"
})


### Likes and Comments
# Chris likes Jack's post
chris = client.feed("user", "chris")
chris.add_activity({
    "actor": "chris",
    "verb": "like",
    "object": "post:10",
    "foreign_id": "like:25",
    "to": ["notification:jack"]
})
# Notify Jack and show it to Chris' followers (via the "chris" user feed)

# Reading a Feed
jack = client.feed('timeline', 'jack')
# Read the timeline for jack
activities = jack.get(limit=10)['results']
# Read the next page, use id filtering for optimal performance
next_activities = jack.get(limit=10, id_lt=activities[-1]['id'])['results']
# Reading a notification feed is very similar
chris = client.feed('notification', 'chris')
notifications = chris.get(limit=10)['results']
