<template>
  <div class="analysis">
    <Amount />
    <Trend />
    <Analyze />
  </div>
</template>

<script>
import Amount from './amount.vue'
import Trend from './trend.vue'
import Analyze from './analyze.vue'
export default {
  name: 'analysis',
  components: { Amount, Trend, Analyze }
}
</script>
