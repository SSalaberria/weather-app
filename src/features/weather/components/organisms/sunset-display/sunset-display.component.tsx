import { useMemo } from "react";
import "./sunset-display.css";

interface SunsetDisplayProps {
  riseTime: string;
  setTime: string;
  nextRise: string;
}

interface SunItem {
  time: string;
  label: string;
}

function SunItem({ time, label }: SunItem) {
  return (
    <div className="flex flex-col justify-center text-center items-center text-xs">
      <img alt="label" className="w-8" src="/icons/sun-horizon.svg" />
      <p className="pb-1">
        {new Intl.DateTimeFormat("es-AR", {
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(time))}
      </p>
      <p>{label}</p>
    </div>
  );
}

export function SunsetDisplay({ riseTime, setTime, nextRise }: SunsetDisplayProps) {
  const isNightTime = useMemo(() => new Date().getTime() > new Date(setTime).getTime(), [setTime]);

  const circlePos = useMemo(() => {
    let timeDifference, currentDifference;
    const currentDate = new Date();
    const riseDate = new Date(riseTime);
    const setDate = new Date(setTime);

    if (isNightTime) {
      const nextRiseDate = new Date(nextRise);

      timeDifference = nextRiseDate.getTime() - setDate.getTime();
      currentDifference = currentDate.getTime() - setDate.getTime();
    } else {
      timeDifference = setDate.getTime() - riseDate.getTime();
      currentDifference = currentDate.getTime() - riseDate.getTime();
    }

    return -180 * (1 - currentDifference / timeDifference);
  }, [riseTime, setTime, isNightTime, nextRise]);

  return (
    <div className="flex relative flex-col">
      <div className="circle-big m-auto -mb-20 ">
        <div
          className={`circle`}
          style={{
            transform: `rotate(${circlePos}deg) translate(170px)`,
            backgroundImage: `url("/icons/${isNightTime ? "moon" : "sun"}.svg")`,
          }}
        />
        <div className="flex w-full justify-between absolute top-1/2">
          <div className="-ml-2">
            <SunItem
              label={isNightTime ? "Sun set" : "Sun rise"}
              time={isNightTime ? setTime : riseTime}
            />
          </div>
          <div className="-mr-2">
            <SunItem
              label={isNightTime ? "Sun rise" : "Sun set"}
              time={isNightTime ? nextRise : setTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
