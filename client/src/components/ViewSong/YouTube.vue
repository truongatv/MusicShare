<template>
  <panel :title="song.title">
    <youtube :video-id="song.youtubeId" player-width="500" player-height="330"></youtube>
  </panel>
</template>

<script>
export default {
  props: [
    'song'
  ]
}
</script>

<style scoped>
</style>
