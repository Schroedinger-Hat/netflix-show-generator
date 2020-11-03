<template>
  <section class="section">
    <client-only placeholder="Loading...">
      <PosterCanvas />
    </client-only>
  </section>
</template>
<script>

export default {
  name: 'HomePage',

  components: {
    PosterCanvas: () => { if (process.client) { return import('~/components/PosterCanvas') } }
  }
}
</script>
