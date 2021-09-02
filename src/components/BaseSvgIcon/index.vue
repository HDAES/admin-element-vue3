<template>
  <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
    name: 'baseSvgIcon',
    props: {
        iconClass: { type: String},
        className: { type: String}
    },
    computed: {
        iconName () {
            return this.iconClass?`#icon-${this.iconClass}` : '#icon'
        },
        svgClass () {
            return this.className? 'svg-icon' + this.className: 'svg-icon'
        }
    }
}
</script>

<style scoped>
.svg-icon{
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>