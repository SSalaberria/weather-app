import "./loading.css";

export function Loading() {
  return (
    <div className="wrapper">
      <div className="sun" />
      <div className="cloud">
        <div className="cloud1">
          <ul>
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
        <div className="cloud1 c_shadow">
          <ul>
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
      </div>

      <div className="cloud_s">
        <div className="cloud1">
          <ul>
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
        <div className="cloud1 c_shadow">
          <ul>
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
      </div>

      <div className="cloud_vs">
        <div className="cloud1">
          <ul>
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
        <div className="cloud1 c_shadow">
          <ul>
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
      </div>
      <div className="haze" />
      <div className="haze_stripe" />
      <div className="haze_stripe" />
      <div className="haze_stripe" />
      <div className="thunder" />
      <div className="rain">
        <ul>
          <li />
          <li />
          <li />
        </ul>
      </div>
      <div className="sleet">
        <ul>
          <li />
          <li />
          <li />
        </ul>
      </div>
    </div>
  );
}
