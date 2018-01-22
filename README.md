# integracionka
Выбор регионов - городов.

Frontend Angular => ./australia/src/app/app.component.ts <br>
<br>
Backend Node js => ./server.js <br>
<br>
http://int.kekcheburek.ru/api/  <br>
http://int.kekcheburek.ru/api/?state_id=0  <br>
http://int.kekcheburek.ru/api/?state_id=0&city_id=0
<br>
<br>
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
