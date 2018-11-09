
var map, infoWindow;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.88, lng: -117.23},
    zoom: 13,

    mapTypeControl: true,
    mapTypeControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM },

    zoomControl: true,
    zoomControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER },

    scaleControl: true,

    streetViewControl: true,
    streetViewControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER },

    fullscreenControl: true,
    fullscreenControlOptions:{ position: google.maps.ControlPosition.LEFT_CENTER},

    styles:[
    {
        "featureType": "road",
        "stylers": [
            {
                "hue": "#5e00ff"
            },
            {
                "saturation": -79
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "saturation": -78
            },
            {
                "hue": "#6600ff"
            },
            {
                "lightness": -47
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "hue": "#6600ff"
            },
            {
                "saturation": -11
            }
        ]
    },
    {},
    {},
    {
        "featureType": "water",
        "stylers": [
            {
                "saturation": -65
            },
            {
                "hue": "#1900ff"
            },
            {
                "lightness": 8
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "weight": 1.3
            },
            {
                "lightness": 30
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#5e00ff"
            },
            {
                "saturation": -16
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "saturation": -72
            }
        ]
    },
    {}
]

  });

  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);


  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}


function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = 'rgba(96,32,96,0.98)';
        controlUI.style.border = '0px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '60px';
        controlUI.style.textAlign = 'center';
        controlUI.style.borderRadius = '60px';
        controlUI.title = 'Click to recenter the map';
        controlUI.style.padding = '16px 16px 9px 16px';

        controlDiv.appendChild(controlUI);

        var label = document.createElement('label');
        label.style.width = '40px';
        label.style.height = '40px';
        label.style.borderRadius = '40px';
        label.style.overflow = 'hidden';
        label.style.background = 'rgba(220,220,220,0.2)';
        controlUI.appendChild(label);

        var emojiList = document.createElement('select');
        var newOption;
        var emojRange = [
          [128513, 128591] ,[9986,10160],[128640,128704]
        ];
        for (var i = 0; i < emojRange.length; i++) {
          var range = emojRange[i];
          for (var x = range[0]; x < range[1]; x++) {

            newOption = document.createElement('option');
            newOption.value = x;
            newOption.innerHTML = "&#" + x + ";";
            emojiList.appendChild(newOption);
          }
        }

        emojiList.style.padding = '10px 12px';
        emojiList.style.width = '100%';
        emojiList.style.border = 'none';
        emojiList.style.boxShadow = 'none';
        emojiList.style.background = 'transparent';
        emojiList.style.backgroundImage = 'none';
        emojiList.style.webkitAppearance = 'none';

        label.appendChild(emojiList);

        // default emoji value
        var emoji = '&#' + emojiList.children[0].value;

        // Change emoji value if the select has changed
        $(emojiList).on('change', function(){
          var num = $(this).val();
          emoji = '&#' +  num;

        });

        // Setup the click event listeners: post emoji
        controlUI.addEventListener('click', function() {
          postEmoji(map, emoji);
        });
      }

function postEmoji(map, emoji){

  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent(emoji);

      infoWindow.open(map);

      map.setZoom(15);

      map.setCenter(pos);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
