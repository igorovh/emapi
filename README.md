## Still in development
(not working right now)
# emapi

Simple caching service to connect all emotes sites and parse them into one type.
To get channel emotes all you need is channel id, which you can get from Twitch API or [here](https://s.kdy.ch/twitchid/).  

#### Currently available:
* Twitch Global and Channel
* BetterTwitchTV Global and Channel
* FrankerFaceZ Global and Channel
* 7TV Global and Channel

In API, `all`, means **every** service, but you can also use service name like `twitch`, `bttv`, `ffz` or `7tv`.

### Emote
We are parsing every emote from every service, so you don't have to parse them yourself.  
Some versions of `urls` can be `undefined`.

```json
{
    "code": "Kappa",
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
    "_next": 60000,
    "_cache": 1627334394,
    "emotes": [
        emotes...
    ]
}
```

#### Channel emotes
[https://emapi.vopp.top/v1/channel/[id]/[service]](https://emapi.vopp.top/v1/channel/12826/all) `(click for example)`
```json
{
    "_next": 60000,
    "_cache": 1627334394,
    "emotes": [
        emotes...
    ]
}
```