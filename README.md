# emapi

Simple caching service to connect all emotes sites and parse them into one type.
To get channel emotes all you need is channel id, which you can get from Twitch API, [here](https://s.kdy.ch/twitchid/) or by using `name` route which you can see below.  

#### Currently available:
* Twitch global and channel emotes
* BetterTwitchTV global and channel emotes
* FrankerFaceZ global and channel emotes
* 7TV global and channel emotes
* Getting twitch id by name

In API, `all`, means **every** service, but you can also use service name like `twitch`, `bttv`, `ffz` or `7tv`.

### Limits
You can make **5 request per 1 second**.

### Emote
We are parsing every emote from every service, so you don't have to parse them yourself.  
Some `urls` can be `undefined`.

```json
{
    "code": "WeirdChamp",
    "urls": {
        "1x": "url",
        "2x": "url",
        "4x": "url"
    }
}
```

#### Global emotes
[https://emapi.vopp.top/v1/global/[service]](https://emapi.vopp.top/v1/global/all) `(click for example)`
```json
{
    "_cache": 1627334394,
    "emotes": [
        {
            "code": "WeirdChamp",
            "urls": {
                "1x": "url",
                "2x": "url",
                "4x": "url"
            }
        }
    ]
}
```

#### Channel emotes
[https://emapi.vopp.top/v1/channel/[id]/[service]](https://emapi.vopp.top/v1/channel/87037696/all) `(click for example)`
```json
{
    "_cache": 1627334394,
    "emotes": [
        {
            "code": "WeirdChamp",
            "urls": {
                "1x": "url",
                "2x": "url",
                "4x": "url"
            }
        }
    ]
}
```

#### Name
[https://emapi.vopp.top/v1/name/[name]](https://emapi.vopp.top/v1/name/twitch) `(click for example)`
```json
{
    "_cache": 1630496500208,
    "id": "87037696"
}
```

#### TODO
- [ ] Create system based on `Ratelimit` headers.
- [ ] Create route for chaning name into id.
- [ ] Return last cached emotes when get ratelimited.