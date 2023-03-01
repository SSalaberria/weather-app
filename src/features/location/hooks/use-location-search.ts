import { useEffect, useState } from "react";

import api from "~/utils/api";
import { City, QueryStatus } from "~/utils/types";

export function useLocationSearch() {
  const [locationQuery, setLocationQuery] = useState("");
  const [searchData, setSearchData] = useState<City[] | null>(null);
  const [status, setStatus] = useState<QueryStatus>("success");

  useEffect(() => {
    if (locationQuery) {
      setStatus("fetching");

      api.geocoding
        .fetch(locationQuery)
        .then((data) => {
          setStatus("success");
          setSearchData(data);
        })
        .catch(() => setStatus("error"));
    } else {
      setSearchData(null);
    }
  }, [locationQuery]);

  return { locationQuery, setLocationQuery, searchData, status };
}
