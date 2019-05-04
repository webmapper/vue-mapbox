<script>
import Vue from "vue";
import withEvents from "../../lib/withEvents";
import withSelfEvents from "./withSelfEvents";

const markerEvents = {
  drag: "drag",
  dragstart: "dragstart",
  dragend: "dragend"
};

const markerDOMEvents = {
  click: "click",
  mouseenter: "mouseenter",
  mouseleave: "mouseleave"
};

const Wrapper = Vue.extend({
  name: "MarkerWrapper",
  render() {
    return null;
  }
});

const WrapperConfig = {
  name: "MarkerWrapper",
  render() {
    return null;
  }
};

export default {
  name: "MapMarker",
  mixins: [withEvents, withSelfEvents],
  components: {
    Wrapper
  },

  inject: ["mapbox", "map"],

  provide() {
    const self = this;
    return {
      get marker() {
        return self.marker;
      }
    };
  },

  props: {
    // mapbox marker options
    offset: {
      type: [Object, Array],
      default: () => [0, 0]
    },
    coordinates: {
      type: Array,
      required: true
    },
    color: {
      type: String
    },
    anchor: {
      type: String,
      default: "center"
    },
    draggable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      initial: true,
      marker: undefined
    };
  },

  watch: {
    // coordinates(lngLat) {
    //   if (this.initial) return;
    //   this.marker.setLngLat(lngLat);
    // },
    draggable(next) {
      if (this.initial) return;
      this.marker.setDraggable(next);
    }
  },

  // created() {
  //   this.wrapper = Vue.extend({
  //     name: "MarkerWrapper",
  //     render(h) {
  //       return h(null);
  //     }
  //   });
  // },

  mounted() {
    const markerOptions = {
      ...this.$props
    };
    if (this.$slots.marker) {
      markerOptions.element = this.$slots.marker[0].elm;
    }
    this.marker = new this.mapbox.Marker(markerOptions);

    if (this.$listeners["update:coordinates"]) {
      this.marker.on("dragend", event => {
        let newCoordinates;
        if (this.coordinates instanceof Array) {
          newCoordinates = [event.target._lngLat.lng, event.target._lngLat.lat];
        } else {
          newCoordinates = event.target._lngLat;
        }
        this.$emit("update:coordinates", newCoordinates);
      });
    }

    const eventNames = Object.keys(markerEvents);
    this.$_bindSelfEvents(eventNames, this.marker);

    this.initial = false;
    this.$_addMarker();
  },

  updated() {
    console.log("UPDATED!");
  },

  beforeUpdate() {
    console.log("BEFORE UPDATE!");
  },

  beforeDestroy() {
    if (this.map !== undefined && this.marker !== undefined) {
      this.marker.remove();
    }
  },

  methods: {
    $_addMarker() {
      this.marker.setLngLat(this.coordinates).addTo(this.map);
      this.$_bindMarkerDOMEvents();
      this.$_emitEvent("added", { marker: this.marker });
    },

    $_emitSelfEvent(event) {
      this.$_emitMapEvent(event, { marker: this.marker });
    },

    $_bindMarkerDOMEvents() {
      Object.keys(this.$listeners).forEach(key => {
        if (Object.values(markerDOMEvents).includes(key)) {
          this.marker._element.addEventListener(key, event => {
            this.$_emitSelfEvent(event);
          });
        }
      });
    },

    remove() {
      this.marker.remove();
      this.$_emitEvent("removed");
    },

    togglePopup() {
      return this.marker.togglePopup();
    }
  },

  render() {
    // console.log("RENDER!");
    const children = this.$scopedSlots.length
      ? this.$scopedSlots.default
      : this.$slots.default;

    return children;
    //
    //     const result = h(
    //       "div",
    //       {
    //         style: {
    //           display: "none"
    //         }
    //       },
    //       children
    //     );
    //     console.log("1: ", this.$vnode, "2: ", result);
    //     return result;
    // return this.$vnode;
    // console.log("CHIDREN", children);
    // // return children;
    // // return children;
    // const self = this;
    // return h(
    //   WrapperConfig,
    //   {
    //     props: self.$props
    //   },
    //   children
    // );
    // if (this.$scopedSlots.default) {
    //   return this.$scopedSlots.default;
    // }
    // if (this.$slots.default) {
    //   return this.$slots.default;
    // }
  }
};
</script>
