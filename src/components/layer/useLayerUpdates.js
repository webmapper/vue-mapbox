import Vue from "vue";

function useLayerUpdates(vm, layerData, map) {
  // const $minZoom = Vue.observable(layerData.minzoom);
  // const $maxZoom = Vue.observable(layerData.maxzoom);
  // const $paint = Vue.observable(layerData.paint);
  // const $layout = Vue.observable(layerData.layout);
  // const $filter = Vue.observable(layerData.filter);

  if (layerData.minzoom) {
    vm.$watch("layer.minzoom", function(next) {
      if (vm.initial) return;
      map.setLayerZoomRange(vm.layerId, next, layerData.maxzoom);
    });
  }

  if (layerData.maxzoom) {
    vm.$watch("layer.maxzoom", function(next) {
      if (vm.initial) return;
      map.setLayerZoomRange(vm.layerId, layerData.minzoom, next);
    });
  }

  if (layerData.paint) {
    vm.$watch(
      "layer.paint",
      function(next) {
        if (vm.initial) return;
        if (next) {
          for (let prop of Object.keys(next)) {
            map.setPaintProperty(vm.layerId, prop, next[prop]);
          }
        }
      },
      { deep: true }
    );
  }

  if (layerData.layout) {
    vm.$watch(
      "layer.layout",
      function(next) {
        if (vm.initial) return;
        if (next) {
          for (let prop of Object.keys(next)) {
            map.setLayoutProperty(vm.layerId, prop, next[prop]);
          }
        }
      },
      { deep: true }
    );
  }

  if (layerData.filter) {
    vm.$watch(
      "layer.filter",
      function(next) {
        if (vm.initial) return;
        map.setFilter(vm.layerId, next);
      },
      { deep: true }
    );
  }
}
