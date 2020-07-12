import React, { Component, Fragment } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVubmtpbmd5IiwiYSI6ImNrY2ozMnJ5dzBrZ28ycnA1b2Vqb2I0bXgifQ.ZOaVtzsDQOrAovh9Orh13Q'

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }

  componentWillReceiveProps() {

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lat, this.state.lng],
      zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    this.props.cats.map((cat) => {
      var popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML('<h3>' + cat.text + '</h3><p>' + cat.text + '</p>')
      let marker = new mapboxgl.Marker()
      .setLngLat([cat.lng, cat.lat])
      .setPopup(popup) 
      .addTo(map);
      // create the marke
    });

    //map.setView(markersLayer.getBounds().getCenter());

  }

  render() {

    return (
      <Fragment>
        <div ref={el => this.mapContainer = el}  className="mapContainer" />
      </Fragment>
    );
  }
}

export default (MapContainer);