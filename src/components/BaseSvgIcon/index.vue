<template>
    <svg :class="svgClass"  aria-hidden="true">
        <use :href="'#icon-'+iconName"/>
    </svg>
</template>

<script>
    export default {
        name: "Index",
        props:{
            iconName:{
                type: String,
                default: '',
                require: true
            },
            className: {
                type: String,
                default: ""
            }
        },
        setup(){
            //获取当前svg目录下的所有svg文件
            const req = require.context('@/assets/svg',false,/\.svg$/);
            const reqIcon = require.context('@/assets/icons',false,/\.svg$/);
            //解析
            const requireAll = (requireContext) =>{
                return requireContext.keys().map(requireContext);
            }
            requireAll(req)
            requireAll(reqIcon)
            
        },
        computed: {
            svgClass() {
                if (this.className) {
                    return "svg-icon " + this.className;
                } else {
                    return "svg-icon";
                }
            }
        }
    }
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>