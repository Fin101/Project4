// import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
// import ReactMapGl, { Marker } from 'react-map-gl'

// const App = () => {
//   const [viewport, setViewport] = useState({
//     latitude: 51.46761,
//     logitude: -0.158348,
//     width: '100vw',
//     height: '600px',
//     zoom: 1
//   })

//   const _onViewportChange = viewport => setViewport({ ...viewport })

//   return (
//     <div>
//       <ReactMapGl
//         {...viewport}
//         mapboxApiAccessToken={'pk.eyJ1IjoiZmluMTAxIiwiYSI6ImNrOTJvcDVsNjAyMG0zZm9ha2F3cWpjMXkifQ.F8G5VxgyDtZBT2SY2QhhBg'}
//         onViewportChange={_onViewportChange}
//       >
//         <Marker
//           latitude={4.000000}
//           longitude={-72.000000}
//         >
//           <div>LOCATION</div>
//         </Marker>
//       </ReactMapGl>
//     </div>
//   )
// }

// ReactDOM.render(<App />, document.getElementById('root'))