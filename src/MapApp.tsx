
import { MapProvider, PlacesProvider } from './context'
import { HomePage } from './screens'

export const MapApp = () => {

  return (
    <PlacesProvider>
      <MapProvider>
          <HomePage/>
      </MapProvider>
    </PlacesProvider>
  )
}
