import { Link } from "react-router-dom";
import { DUMMYDATA } from "../../assets/dummyData/live";
import { useEffect, useState } from "react";

//const events = DUMMYDATA.events;

const Live = () => {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    const fetchLive = async () => {
      const url =
        "https://allsportsapi2.p.rapidapi.com/api/basketball/matches/live";
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
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLive();
  }, []);

  if (!events) {
    return (
      <div className="font-inter">
        <h1 className="font-bold text-xl text-light bg-secondary p-2">
          Live Now
        </h1>
        <p className="font-semibold text-center text-base px-2">
          No live events.
        </p>
      </div>
    );
  }
  return (
    <div className="font-inter">
      <h1 className="font-bold text-xl text-light bg-secondary p-2">
        Live Now
      </h1>
      {events.map((item, index) => (
        <div key={index} className="mb-2">
          <Link to={`match/${item.id}`}>
            <h2 className="font-bold text-center text-lg text-light bg-tertiary px-2">
              {item.tournament.name}
            </h2>
            <div className="mt-2">
              <p className="text-center text-sm px-2">
                {item.status.description}
              </p>
              <p className="text-center text-sm px-2">
                {Math.trunc((600 - (item.time.played % 600)) / 60)}:
                {60 - (item.time.played % 60) < 10
                  ? `0${60 - (item.time.played % 60)}`
                  : 60 - (item.time.played % 60)}
              </p>
              <div className="flex justify-around items-center">
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-end items-center">
                    <p className="font-medium text-center text-base px-2">
                      {item.homeTeam.name}
                    </p>
                    <p className="font-medium text-center text-base px-2">
                      {item.homeScore.current}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-center text-base px-2">:</p>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-start items-center">
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
      ))}
    </div>
  );
};

export default Live;
