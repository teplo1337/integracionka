# integracionka
Выбор регионов - городов.

Frontend Angular => ./australia/src/app/app.component.ts

Backend Node js => ./server.js

http://skb.kekcheburek.ru/api/
http://skb.kekcheburek.ru/api/?state_id=0
http://skb.kekcheburek.ru/api/?state_id=0&city_id=0


MongoDB document:

```
{
    "_id": {
        "$oid": "5a61a490734d1d781742fd5b"
    },
    "state_id": 0,
    "state_name": "Тасмания",
    "state_data": [
        {
            "city_name": "Берни",
            "city_id": 0
        },
        {
            "city_name": "Девонпорт",
            "city_id": 1
        },
        {
            "city_name": "Лонсестон",
            "city_id": 2
        },
        {
            "city_name": "Хобарт",
            "city_id": 3
        }
    ]
}
```
