<script>
import { useRoute, useRouter } from 'vue-router'
import { h } from 'vue';
export default {
    setup(){
        const route = useRoute()
        const router = useRouter()
        const { params, query } = route
        const { pathMatch } = params

        let path = pathMatch.toString().replace(/,/g,'/')
        router.replace({ path : '/'+path, query})
    },
    render(){
        return h('div')
    }
}
</script>