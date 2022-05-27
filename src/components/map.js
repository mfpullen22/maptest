import React, {useState} from "react";
import "leaflet/dist/leaflet.css";
import {
    MapContainer, 
    GeoJSON, 
    TileLayer,
    LayersControl} from "react-leaflet";
import features from "../data/countries.json";


function Map() {
    const [onselect, setOnselect] = useState({});
    /* function determining what should happen onmouseover, this function updates our state*/
    const highlightFeature = (e=> {
        var layer = e.target;
        const { ADMIN, Crypto } = e.target.feature.properties;
        setOnselect({
            country:ADMIN,
            crypto:Crypto,
        });


    });
    /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
    const resetHighlight= (e =>{
        setOnselect({});
        e.target.setStyle(style(e.target.feature));
    })
    /* this function is called when a feature in the map is hovered over or when a mouse moves out of it, the function calls two functions
     highlightFeature and resetHighlight*/
    const onEachFeature= (feature, layer)=> {
        layer.on({
            mouseover: highlightFeature,
            mouseleave: resetHighlight,
        });
        layer.bindTooltip(`<div><b>Country:</b> ${feature.properties.ADMIN}<p><b>Cryptococcal Meningitis Cases (2020):</b> ${feature.properties.Crypto}</p></div>`, 
            {
                direction: "right",
                sticky: true,
                offset: [10, 0],
                opacity: 0.85,
                className: 'leaflet-tooltip'
            });
        layer.openTooltip()
    }
        
    const mapPolygonColorToDensity=(crypto => {
        return crypto > 50
            ? '#a50f15'
            : crypto > 40
            ? '#fc9272'
            : crypto > 10
            ? '#fcbba1'
            : '#fee5d9';
    })
    const style = (feature => {
        return ({
            fillColor: mapPolygonColorToDensity(feature.properties.Crypto),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });
    const mapStyle = {
        height: '55vh',
        width: '85%',
        margin: '0 auto',
    }
    const feature = features.features.map(feature=>{
        return(feature);
    });

    return(
         <div className='container'>
            <div className="header">
            <h2 className='heading'>Kenya Population as Per 2019 National Census Exercise</h2>
            <p className="text-muted">A choropleth map displaying Kenya population density as per the national census conducted <br/>in 2019
            Each County, details displayed by the map include, total population and number of each gender.</p></div>
            <div className="">
                <div className="">
                {!onselect.country && (
                <div className="census-info-hover">
                    <strong>Kenya population density</strong>
                    <p>Hover on each county for more details</p>
                </div>
                )}
                {onselect.country && (
                    <ul className="census-info">
                       <li><strong>{onselect.country}</strong></li><br/>
                        <li>Total Crypto:{onselect.crypto}</li>
                    </ul>
                )}
                <MapContainer zoom={2}
                 scrollWheelZoom={true} 
                  style={mapStyle} 
                   center={[1.286389, 38.817223]}>
                    <TileLayer
                        attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                        url="https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png"
                    />
                   {feature && (
                    <GeoJSON data={feature} 
                    style={style} 
                    onEachFeature={onEachFeature}/>
                    )}
                </MapContainer>
                </div>
            </div>
        </div>

    )

}

export default Map;