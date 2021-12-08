import { icon } from 'leaflet';

export class LeafletUtils {
    static readonly OSM_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    static readonly OSM_ATTR =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    static readonly iconDefault = icon({
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
    });
}
