import { Link } from "react-router-dom";
import { DUMMYDATA } from "../../assets/dummyData/upcoming";
import { unixToIST } from "../../utils/unixToIST";
import { useEffect, useState } from "react";

// const events = DUMMYDATA.events;

const Upcoming = () => {
  const today = new Date();
  const date = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  console.log(date);

  const [events, setEvents] = useState(null);
  useEffect(() => {
    const fetchUpcoming = async () => {
      const url = `https://allsportsapi2.p.rapidapi.com/api/basketball/matches/${date}`;
      const options = {
        method: "GET",
        headers: {
          //"x-rapidapi-key":
          // "52fb367f3bmsh7fd3dffb88c354cp14a449jsn2f64cd470f32",
          "x-rapidapi-key":
            "a3947806cemshef907c31a40c70cp1a33cajsnfaf9df0506ef",
          "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setEvents(result.events);
        console.log(result.events);
        console.log("events", events);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUpcoming();
  }, []);

  if (events) {
    events.sort((a, b) => {
      if (a.startTimestamp < b.startTimestamp) {
        return -1;
      }
      if (a.startTimestamp > b.startTimestamp) {
        return 1;
      }
      return 0;
    });
  }

  if (!events) {
    return (
      <div className="font-inter">
        <h1 className="font-bold text-xl text-light bg-secondary p-2">
          Upcoming
        </h1>
        <p className="font-semibold text-center text-base px-2">
          No upcoming events.
        </p>
      </div>
    );
  }
  return (
    <div className="font-inter">
      <h1 className="font-bold text-xl text-light bg-secondary p-2">
        Upcoming
      </h1>
      {events
        .filter((item) => item.status.type === "notstarted")
        .map((item, index) => {
          if (index < 10) {
            return (
              <div key={index} className="mb-2">
                <Link to={`match/${item.id}`}>
                  <h2 className="font-bold text-center text-lg text-light bg-tertiary px-2">
                    {item.tournament.name}
                  </h2>
                  <div>
                    <p className="text-center text-sm px-2 mt-2">
                      Starts: {unixToIST(item.startTimestamp).month}{" "}
                      {unixToIST(item.startTimestamp).day},{" "}
                      {unixToIST(item.startTimestamp).hour}:
                      {unixToIST(item.startTimestamp).min}{" "}
                      {unixToIST(item.startTimestamp).period}
                    </p>
                    <div className="flex justify-around items-center">
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-end">
                          <p className="font-medium text-center text-base px-2">
                            {item.homeTeam.name}
                          </p>
                          <p className="font-medium text-center text-base px-2">
                            {item.homeScore.current}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-center font-bold text-base px-2">
                          :
                        </p>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-start">
                          <p className="font-medium text-center text-base px-2">
                            {item.awayScore.current}
                          </p>
                          <p className="font-medium text-center text-base px-2">
                            {item.awayTeam.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-base px-2">
                      {item.tournament.category?.country.name ||
                        item.tournament?.category?.name}
                    </p>
                  </div>
                </Link>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Upcoming;
