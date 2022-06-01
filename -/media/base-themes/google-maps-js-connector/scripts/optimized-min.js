XA.connector.mapsConnector = function(n, t) {
    "use strict";
    var r = {},
        e = [],
        i = [],
        u, o, s, f = [],
        h, c = [],
        a, l = !1;
    return o = function(n) {
        switch (n.mode) {
            case "Roadmap":
                return google.maps.MapTypeId.ROADMAP;
            case "Satellite":
                return google.maps.MapTypeId.SATELLITE;
            case "Hybrid":
                return google.maps.MapTypeId.HYBRID;
            default:
                return google.maps.MapTypeId.ROADMAP
        }
    }, s = function(n, t) {
        var i;
        return i = t.icon === null ? new google.maps.Marker({
            position: new google.maps.LatLng(t.latitude, t.longitude),
            map: e[n],
            title: t.title
        }) : new google.maps.Marker({
            position: new google.maps.LatLng(t.latitude, t.longitude),
            map: e[n],
            title: t.title,
            icon: t.icon
        }), t.latitude === "" && t.longitude === "" && i.setVisible(!1), i
    }, h = function(n, t, r) {
        t.id = r.id;
        i[n] ? i[n].push({
            marker: t,
            type: r.type
        }) : (i[n] = [], i[n].push({
            marker: t,
            type: r.type
        }))
    }, r.loadScript = function(n, i) {
        if (c.push(i), !l) {
            l = !0;
            var r = t.createElement("script"),
                u = "https://maps.googleapis.com/maps/api/js?v=3.exp";
            r.type = "text/javascript";
            u += typeof n != "undefined" && n !== "" ? "&key=" + n + "&v=3.exp&signed_in=false" : "&signed_in=false";
            u += "&libraries=places&callback=XA.connector.mapsConnector.scriptsLoaded";
            r.src = u;
            r.onload = function() {
                console.log("Google loader has been loaded, waiting for maps api")
            };
            t.body.appendChild(r)
        }
    }, r.scriptsLoaded = function() {
        for (var t = c.length, n = 0; n < t; n++) c[n].call();
        l = !1
    }, r.showMap = function(n, r, f) {
        var s, h, c = r.disableMapZoomOnScroll !== "1",
            l = r.disableMapScrolling !== "1";
        f instanceof Array ? (s = {
            zoom: r.zoom,
            scrollwheel: c,
            draggable: l,
            center: new google.maps.LatLng(f[0], f[1]),
            mapTypeId: o(r)
        }, u = new google.maps.Map(t.getElementById(r.canvasId), s)) : (s = {
            scrollwheel: c,
            draggable: l,
            mapTypeId: o(r)
        }, u = new google.maps.Map(t.getElementById(r.canvasId), s), u.fitBounds(f), r.poiCount < 2 && (h = google.maps.event.addListener(u, "idle", function() {
            i.length > 0 && i[n].length < 2 && (u.setZoom(r.zoom), google.maps.event.removeListener(h))
        })));
        h = google.maps.event.addListener(u, "zoom_changed", function() {
            var n = u.getZoom();
            n < 1 && u.setZoom(1)
        });
        e[n] = u
    }, r.renderPoi = function(n, t) {
        var r = s(n, t),
            i = n + "#" + t.id;
        h(n, r, t);
        t.html !== "" && t.html !== null && (f[i] = new google.maps.InfoWindow({
            content: t.html
        }));
        typeof f[i] != "undefined" && function(t, i) {
            google.maps.event.addListener(i, "click", function() {
                for (var r in f) f.hasOwnProperty(r) && f[r].close();
                f[t].open(e[n], i)
            })
        }(i, r)
    }, r.renderDynamicPoi = function(n, t, i) {
        var r = s(n, t);
        h(n, r, t);
        google.maps.event.addListener(r, "click", function() {
            if (typeof i == "function") {
                var o = t.id,
                    s = t.poiTypeId,
                    u = t.poiVariantId;
                if (u == null) return;
                i(o, s, u, function(t) {
                    f[n] && f[n].close();
                    f[n] = new google.maps.InfoWindow({
                        content: t.Html
                    });
                    f[n].open(e[n], r)
                })
            }
        })
    }, r.clearMarkers = function(n) {
        var t, r;
        if (i.hasOwnProperty(n)) {
            for (t = i[n], r = 0; r < t.length; r++) t[r].type === "Dynamic" && t[r].marker.setMap(null);
            i[n] = t.filter(function(n) {
                return n.type === "Static" || n.type === "MyLocation" ? !0 : !1
            })
        }
    }, r.updateMapPosition = function(n) {
        var o = e[n],
            r, u = [],
            f = new google.maps.LatLngBounds,
            t;
        for (i.hasOwnProperty(n) && (u = i[n]), t = 0; t < u.length; t++) r = u[t].marker, f.extend(new google.maps.LatLng(r.position.lat(), r.position.lng()));
        o.fitBounds(f)
    }, r.centerMap = function(n, t, r, u) {
        var h = e[n],
            o = [],
            s, f;
        if (r && h.setCenter(new google.maps.LatLng(t.coordinates[0], t.coordinates[1])), u) {
            for (i.hasOwnProperty(n) && (o = i[n]), f = 0; f < o.length; f++) o[f].marker.setAnimation(null), o[f].marker.id === t.id && (s = o[f].marker, o[f].marker.setMap(null));
            typeof s != "undefined" && (s.setMap(h), s.setAnimation(google.maps.Animation.BOUNCE), a = setTimeout(function() {
                s.setMap(h)
            }, 2e3))
        }
    }, r.getCentralPoint = function(n) {
        for (var t, u = n.length, r = new google.maps.LatLngBounds, i = 0; i < u; i++) t = n[i], t.latitude !== "" && t.longitude !== "" && r.extend(new google.maps.LatLng(t.latitude, t.longitude));
        return r
    }, r.locationAutocomplete = function(n, t, i) {
        var u = new google.maps.places.AutocompleteService,
            r = n.maxResults <= 0 ? 1 : n.maxResults;
        u.getQueryPredictions({
            input: n.text
        }, function(n) {
            var f = [],
                e, u;
            if (n != null && n.length) {
                for (e = n.length >= r ? r : n.length, u = 0; u < e; u++) f.push(_.extend(n[u], {
                    text: n[u].description
                }));
                t(f)
            } else i()
        })
    }, r.addressLookup = function(n, i, r) {
        var f, e;
        n.hasOwnProperty("place_id") ? (f = new google.maps.places.PlacesService(typeof u != "undefined" ? u : new google.maps.Map(t.createElement("div"))), f.getDetails({
            placeId: n.place_id
        }, function(n, t) {
            if (t == google.maps.places.PlacesServiceStatus.OK && typeof n != "undefined" && typeof n.geometry.location != "undefined") {
                i([n.geometry.location.lat(), n.geometry.location.lng()]);
                return
            }
            r()
        })) : (e = {
            address: n.text
        }, f = new google.maps.Geocoder, f.geocode(e, function(n, t) {
            if (t == google.maps.GeocoderStatus.OK && typeof n[0] != "undefined" && typeof n[0].geometry.location != "undefined") {
                i([n[0].geometry.location.lat(), n[0].geometry.location.lng()]);
                return
            }
            r()
        }))
    }, r.updateMyPoiLocation = function(n, t, r) {
        var o = e[n],
            f = [],
            u;
        i.hasOwnProperty(n) && (f = i[n], u = f.filter(function(n) {
            return n.type === "MyLocation" ? !0 : !1
        }), u.length > 0 && (u[0].marker.setPosition(new google.maps.LatLng(t[0], t[1])), u[0].marker.setVisible(!0), this.updateMapPosition(n), typeof r != "undefined" && o.setZoom(r)))
    }, r
}(jQuery, document)