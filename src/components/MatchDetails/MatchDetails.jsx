import { DUMMYDATA } from "../../assets/dummyData/upcoming";
//import { match } from "../../assets/dummyData/match";
import { unixToIST } from "../../utils/unixToIST";
import placeholder from "/images/placeholder.webp";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//const event = DUMMYDATA.events[10];

const MatchDetails = () => {
  const { matchID } = useParams();

  const [match, setMatch] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      const url = `https://allsportsapi2.p.rapidapi.com/api/basketball/match/${matchID}/statistics`;
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
        setMatch(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEvent = async () => {
      const url = `https://allsportsapi2.p.rapidapi.com/api/basketball/match/${matchID}`;
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
        setEvent(result.event);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvent();
    fetchMatch();
  }, []);

    console.log(match);

  return (
    <div>
      {event && (
        <div className="mb-2">
          <h2 className="font-bold text-center text-xl text-light bg-secondary p-2">
            {event.tournament.name}
          </h2>
          <div className="flex justify-evenly items-center p-2">
            <div className="w-20">
              <img src={placeholder} alt="home team" className="w-full" />
            </div>
            <div className="mt-2">
              <p className="text-center text-sm px-2">
                {event.status.description}
              </p>
              {event.status.type === "inprogress" && (
                <p className="text-center text-sm px-2">
                  {Math.trunc((600 - (event.time.played % 600)) / 60)}:
                  {60 - (event.time.played % 60) < 10
                    ? `0${60 - (event.time.played % 60)}`
                    : 60 - (event.time.played % 60)}
                </p>
              )}
              {event.status.type === "notstarted" && (
                <p className="text-center text-sm px-2 mt-2">
                  Starts: {unixToIST(event.startTimestamp).month}{" "}
                  {unixToIST(event.startTimestamp).day},{" "}
                  {unixToIST(event.startTimestamp).hour}:
                  {unixToIST(event.startTimestamp).min}{" "}
                  {unixToIST(event.startTimestamp).period}
                </p>
              )}
              <div className="flex justify-around items-center">
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-end items-center">
                    <p className="font-medium text-center text-base px-2">
                      {event.homeTeam.name}
                    </p>
                    <p className="font-medium text-center text-base px-2">
                      {event.homeScore.current}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-center text-base px-2">:</p>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-start items-center">
                    <p className="font-medium text-center text-base px-2">
                      {event.awayScore.current}
                    </p>
                    <p className="font-medium text-center text-base px-2">
                      {event.awayTeam.name}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-center text-base px-2">
                {event.tournament.category?.country.name ||
                  event.tournament?.category?.name}
              </p>
            </div>
            <div className="w-20">
              <img src={placeholder} alt="away team" className="w-full" />
            </div>
          </div>
          <div className="flex justify-center">
            <table className="table-auto bg-white border border-gray-300">
              <thead className="bg-tertiary text-light">
                <tr>
                  <th className="border border-gray-300 px-2 ">T</th>
                  <th className="border border-gray-300 px-2 ">Q1</th>
                  <th className="border border-gray-300 px-2 ">Q2</th>
                  <th className="border border-gray-300 px-2 ">Q3</th>
                  <th className="border border-gray-300 px-3 ">Q4</th>
                  <th className="border border-gray-300 px-2 ">OT</th>
                  <th className="border border-gray-300 px-2 ">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 ">T1</td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.homeScore?.period1 || `-`}
                  </td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.homeScore?.period2 || `-`}
                  </td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.homeScore?.period3 || `-`}
                  </td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.homeScore?.period4 || `-`}
                  </td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.homeScore?.overtime || `-`}
                  </td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.homeScore?.current || `-`}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 ">T2</td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.awayScore?.period1 || `-`}
                  </td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.awayScore?.period2 || `-`}
                  </td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.awayScore?.period3 || `-`}
                  </td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.awayScore?.period4 || `-`}
                  </td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.awayScore?.overtime || `-`}
                  </td>
                  <td className="border border-gray-300 px-4 ">
                    {event?.awayScore?.current || `-`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {match &&
        event &&
        event.status.type !== "notstarted" &&
        event.status.type !== "postponed" && (
          <div className="mb-4">
            <h2 className="font-bold text-center text-lg text-light bg-secondary px-2">
              Match Stats
            </h2>
            <div className="font-inter grid grid-cols-3 border border-secondary">
              <div className="flex justify-end items-center">
                {match.statistics[0].groups[0]?.statisticsItems[0]?.home}
              </div>
              <div className="flex justify-center items-center bg-tertiary mx-4">
                {match.statistics[0].groups[0]?.statisticsItems[0]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[0]?.statisticsItems[0]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[0]?.statisticsItems[3]?.home}
              </div>
              <div className="flex justify-center items-center bg-tertiary mx-4">
                {match.statistics[0].groups[0]?.statisticsItems[3]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[0]?.statisticsItems[3]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[0]?.statisticsItems[1]?.home}
              </div>
              <div className="flex justify-center items-center bg-tertiary mx-4">
                {match.statistics[0].groups[0]?.statisticsItems[1]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[0]?.statisticsItems[1]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[0]?.statisticsItems[2]?.home}
              </div>
              <div className="flex justify-center items-center bg-tertiary mx-4">
                {match.statistics[0].groups[0]?.statisticsItems[2]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[0]?.statisticsItems[2]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[1]?.statisticsItems[0]?.home}
              </div>
              <div className="flex justify-center items-center  bg-tertiary mx-4">
                {match.statistics[0].groups[1]?.statisticsItems[0].name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[1]?.statisticsItems[0]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[1]?.statisticsItems[1]?.home}
              </div>
              <div className="flex justify-center text-center items-center  bg-tertiary mx-4">
                {match.statistics[0].groups[1]?.statisticsItems[1]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[1]?.statisticsItems[1]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[1]?.statisticsItems[2]?.home}
              </div>
              <div className="flex justify-center  text-center items-center  bg-tertiary mx-4">
                {match.statistics[0].groups[1]?.statisticsItems[2]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[1]?.statisticsItems[2]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[1]?.statisticsItems[3]?.home}
              </div>
              <div className="flex justify-center items-center  bg-tertiary mx-4">
                {match.statistics[0].groups[1]?.statisticsItems[3]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[1]?.statisticsItems[3]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[1]?.statisticsItems[4]?.home}
              </div>
              <div className="flex justify-center items-center  bg-tertiary mx-4">
                {match.statistics[0].groups[1]?.statisticsItems[4]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[1]?.statisticsItems[4]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[1]?.statisticsItems[5]?.home}
              </div>
              <div className="flex justify-center items-center  bg-tertiary mx-4">
                {match.statistics[0].groups[1]?.statisticsItems[5]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[1]?.statisticsItems[5]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[1]?.statisticsItems[6]?.home}
              </div>
              <div className="flex justify-center items-center  bg-tertiary mx-4">
                {match.statistics[0].groups[1]?.statisticsItems[6]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[1]?.statisticsItems[6]?.away}
              </div>

              <div className="flex justify-end items-center">
                {match.statistics[0].groups[1]?.statisticsItems[7]?.home}
              </div>
              <div className="flex justify-center items-center  bg-tertiary mx-4">
                {match.statistics[0].groups[1]?.statisticsItems[7]?.name}
              </div>
              <div className="flex justify-start items-center">
                {match.statistics[0].groups[1]?.statisticsItems[7]?.away}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default MatchDetails;
