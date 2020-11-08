<template>
  <div>
    <v-stage
      ref="stage"
      :config="configKonva"
      @dragstart="handleDragstart"
      @dragend="handleDragend"
    >
      <v-layer>
        <v-text key="head-title" :config="{text: '<h1>Titolo</h1>'}" />
      </v-layer>
      <v-layer ref="layer">
        <v-star
          v-for="item in list"
          :key="item.id"
          :config="{
            x: item.x,
            y: item.y,
            rotation: item.rotation,
            id: item.id,
            numPoints: 5,
            innerRadius: 30,
            outerRadius: 50, fill: '#89b717',
            opacity: 0.8,
            draggable: true,
            scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
            scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: dragItemId === item.id ? 15 : 5,
            shadowOffsetY: dragItemId === item.id ? 15 : 5,
            shadowOpacity: 0.6
          }"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
const width = 800
const height = 600
export default {
  ssr: false,
  data () {
    return {
      list: [],
      dragItemId: null,
      configKonva: {
        width,
        height
      }
    }
  },
  mounted () {
    this.configKonva.width = window.innerWidth
    this.configKonva.height = window.innerHeight

    for (let n = 0; n < 30; n++) {
      this.list.push({
        id: Math.round(Math.random() * 10000).toString(),
        x: Math.random() * this.configKonva.width,
        y: Math.random() * this.configKonva.height,
        rotation: Math.random() * 180,
        scale: Math.random()
      })
    }
  },
  methods: {
    downloadURI (uri, name) {
      const link = document.createElement('a')
      link.download = name
      link.href = uri
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    saveToPng () {
      const dataURL = this.$refs.stage.getStage().toDataURL()
      this.downloadURI(dataURL, 'stage.png')
    },
    handleDragstart (e) {
      // save drag element:
      this.dragItemId = e.target.id()
      // move current element to the top:
      const item = this.list.find(i => i.id === this.dragItemId)
      const index = this.list.indexOf(item)
      this.list.splice(index, 1)
      this.list.push(item)
    },
    handleDragend (e) {
      this.dragItemId = null
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
<style scoped lang="scss">
</style>
