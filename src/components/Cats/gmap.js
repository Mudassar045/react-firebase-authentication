import React, { useState, useEffect } from "react";
import MapMarker from "./../../images/mapmarker.svg";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import useSupercluster from "use-supercluster";

const MapMarkerImage = ({pointCount}) => (
  <div>
    <img src={MapMarker} height={40} width={40} />
    {pointCount}
  </div>
);

const MapContainer = (props) => {

  const [viewport, setViewport] = useState({
    latitude: 51.5074,
    longitude:  0.1278,
    width: "100%",
    height: "80vh",
    zoom: 9
  });

  const mapRef = React.useRef();

  const points = props.cats.map(cat => ({
    type: "Feature",
    properties: { cluster: false, catId: cat.uid, category: 'Cat' },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(cat.lng),
        parseFloat(cat.lat)
      ]
    }
  }));

  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 }
  });


  return (
    <div>
      <ReactMapGL
        {...viewport}
        maxZoom={20}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOXPKEY}
        onViewportChange={newViewport => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
      >
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker"
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2
                      }),
                      transitionDuration: "auto"
                    });
                  }}
                >
                  <MapMarkerImage pointCount={pointCount} />
                </div>
              </Marker>
            );
          }
          return (
            <Marker
              key={`cat-${cluster.properties.catId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <MapMarkerImage/>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
}

export default (MapContainer);