import { actions } from './action-types'

export function setMapPosition( lon, lat, zoom ) {
    console.log("actions.setMapPosition", lat, lon, zoom);
    return {
        type: actions.SET_MAP_POSITION,
        payload: {
            lon: lon,
            lat: lat,
            zoom: zoom
        }
    };
}
