var map, infoWindow;

var minLong = 32.87025;
var maxLong = 32.89156;
var minLat = -117.24412;
var maxLat = -117.22909;
var start = 600;
var end = 644;

var textPlaceholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas vitae scel...";

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function getRandomEmoji(start, end) {
  return (Math.random() * (start - end) + end).toFixed();
}

// Random names
var names = ["John Doe", "Kamren Atkinson", "Jaylin Martin", "Justus Townsend", "Lilly Bryant", "Annie Obrien", "Austin Costa",
  "Kelvin Arias", "Cierra Fisher", "Ariel Moreno", "Dereon Fritz", "Ross Richards", "Noe Romero"
];

// return sample: [emoji, long, lat, img, title, name, num]
function getRandomEmojiList(num) {
  var emojis = [];
  for (var i = 1; i <= num + 1; i++) {
    var single = [];
    // emoji
    var emoji = getRandomEmoji(start, end);
    single.push("&#x1F" + emoji);
    // long and lat
    var long = getRandomInRange(minLong, maxLong, 6);
    single.push(long);
    var lat = getRandomInRange(minLat, maxLat, 6);
    single.push(lat);
    // emoji img
    single.push('1f' + emoji + '.png');
    // title
    single.push('TITILE Lorem ipsum dolor sit amet, consectetur adipiscing elit....');
    // name
    single.push(names[getRandomEmoji(0, names.length - 1)]);
    // num
    single.push(i);
    emojis.push(single);
  }
  return emojis;
}



function initMap() {

  var emojis = getRandomEmojiList(100);
  var map = new google.maps.Map(document.getElementById('map'), {

    center: {
      lat: 32.88,
      lng: -117.236
    },
    zoom: 15.4,

    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },

    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },

    scaleControl: true,

    streetViewControl: false,

    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },

    styles: [{
        "featureType": "road",
        "stylers": [{
            "hue": "#5e00ff"
          },
          {
            "saturation": -79
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [{
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
        "stylers": [{
          "lightness": 22
        }]
      },
      {
        "featureType": "landscape",
        "stylers": [{
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
        "stylers": [{
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
        "stylers": [{
            "weight": 1.3
          },
          {
            "lightness": 30
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [{
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
        "stylers": [{
          "saturation": -72
        }]
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

  // Set emoji on to location
  var info = new google.maps.InfoWindow();
  var iconpath = "Asset/emoji/";

  var marker, i;

  for (i = 0; i < emojis.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(emojis[i][1], emojis[i][2]),
      map: map,
      icon: iconpath + emojis[i][3]
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        info.setContent('<h3 style="font-size: 21px;">' + emojis[i][0] + '  ' + emojis[i][4] + '</h3>' +
          '<h4 style="font-size: 14px;"> by ' + emojis[i][5] + ' </h4>' +
          '<h4 style="color: grey; font-size: 12px;">' + getRandomEmoji(2, 80) + ' mins ago </h4>' +
          '<button class = "btn btn-success" onclick="openChat(' + '\'' + emojis[i][5] + '\'' + ')"> <i class="fas fa-comments"></i> Chat </button>');
        info.setOptions({
          maxWidth: 320
        });
        info.open(map, marker);
      }
    })(marker, i));
  }
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
    [600, 644]
  ];
  for (var i = 0; i < emojRange.length; i++) {
    var range = emojRange[i];
    for (var x = range[0]; x < range[1]; x++) {

      newOption = document.createElement('option');
      newOption.value = x;
      newOption.innerHTML = "&#x1F" + x + ";";
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
  var emoji = emojiList.children[0].value;

  // Change emoji value if the select has changed
  $(emojiList).on('change', function() {
    var num = $(this).val();
    emoji = num;
    var title = prompt("What would you like to share?");

    if (title != null) {
      postEmoji(map, emoji, title);
    }

  });

  // Setup the click event listeners: post emoji
  controlUI.addEventListener('click', function() {
    var title = prompt("What would you like to share?");

    if (title != null) {
      postEmoji(map, emoji, title);
    }
    postEmoji(map, emoji, title);
  });
}

function postEmoji(map, emoji, title) {

  infoWindow = new google.maps.InfoWindow;

  var marker;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var iconpath = "Asset/emoji/";

      marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: iconpath + '1f' + emoji + '.png'
      });

      marker.setAnimation(google.maps.Animation.BOUNCE);

      google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
          infoWindow.setContent('<h3 style="font-size: 21px;">' + "&#x1F" + emoji + ' ' + title + '</h3>' +
            '<h4 style="font-size: 14px;"> by You </h4>' +
            '<h4 style="color: grey; font-size: 12px;"> Just Now </h4>'
          );
          infoWindow.open(map, marker);
        }
      })(marker));

      marker.addListener("dblclick", function() {
        if (confirm("Are you sure that you want to delete your post?")) {
          marker.setMap(null);
        }

      });

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



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
