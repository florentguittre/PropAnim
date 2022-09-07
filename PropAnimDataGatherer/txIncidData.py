import requests, datetime, json
from datetime import datetime

f = open('./txIncidData.json')
data = json.load(f)
f.close()

if data == {}:
    date_ = int(datetime(2019, 5, 19).timestamp())
else:
    date_ = list(data)[-1]
    date_ = int(datetime.strptime(date_, "%Y-%m-%d").timestamp())

currentDatetime = datetime.now()
currentDay = currentDatetime.day
currentMonth = currentDatetime.month
currentYear = currentDatetime.year
stop_date = int(datetime(currentYear, currentMonth, currentDay).timestamp())
stop_date -= 86400 * 5
# 5 days are being substraced because data are available at D-5
daysLeft = int((stop_date - date_) / 86400)

for i in range(daysLeft):
    temp_data = []
    unixtime = date_ + ((i + 1) * 86400)
    dayToRetrieve = datetime.fromtimestamp(unixtime).strftime("%d-%m-%Y")
    dayToRetrieveChanged = datetime.strptime(dayToRetrieve, "%d-%m-%Y").strftime("%Y-%m-%d")
    x = requests.get(
        "https://coronavirusapifr.herokuapp.com/data/departements-by-date/" + dayToRetrieve
        ).json()
    for element in x:
        if element["tx_incid"]:
            tx_incid = round(element["tx_incid"])
        else:
            tx_incid = -1
        temp_data.append(
            {
                "lib_dep": element["lib_dep"],
                "tx_incid": tx_incid
            }
        )
    data[str(dayToRetrieveChanged)] = temp_data
    print(f"✅ {dayToRetrieveChanged}", end="\r")
print()
with open('txIncidData.json', 'w', encoding ='utf8') as json_file:
    json.dump(data, json_file, ensure_ascii = False, indent = 2)