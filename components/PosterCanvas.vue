<template>
  <div>
    <v-stage
      ref="stage"
      :config="configKonva"
      @dragstart="handleDragstart"
      @dragend="handleDragend"
    >
      <v-layer>
        <v-image
          key="image"
          :config="{
            image: image,
          }"
        />
        <v-rect
          key="bg"
          :config="{
            x: 0,
            y: 0,
            width: configKonva.width,
            height: configKonva.height,
            fillLinearGradientStartPoint: {
              x: 0,
              y: 0
            },
            fillLinearGradientEndPoint: {
              x: configKonva.width,
              y: configKonva.height
            },
            fillLinearGradientColorStops: [0,'#333333',0.95, '#18181800']
          }"
        />
      </v-layer>
      <v-layer ref="text">
        <v-text
          key="head-title"
          :config="{
            id: 'head-title',
            draggable: true,
            x: 65,
            y: 295,
            text: 'Il re',
            fontSize: 24,
            fontFamily: 'Helvetica Neue ,Helvetica,Arial,sans-serif',
            fill: '#fff',
            fontStyle: 700,
          }"
        />
        <v-text
          key="subtitle"
          :config="{
            id: 'subtitle',
            draggable: true,
            x: 65,
            y: 340,
            text: '2019   |   VM14   |   2h 20min  |   Drammi',
            fontSize: 14,
            fontFamily: 'Helvetica Neue ,Helvetica,Arial,sans-serif',
            fill: '#a3a3a3',
          }"
        />
        <v-text
          key="description"
          :config="{
            id: 'description',
            draggable: true,
            x: 65,
            y: 375,
            width: 500,
            lineHeight: 1.4,
            text: 'Il ribelle principe Hal sveste i panni di gaudente per quelli di re guerriero, affrontando insidie dentro e fuori le mura del castello nella lotta per l\'Inghilterra.',
            fontSize: 16,
            fontStyle: 400,
            fontFamily: 'Helvetica Neue ,Helvetica,Arial,sans-serif',
            fill: '#fff'
          }"
        />
        <v-text
          key="actors"
          :config="{
            id: 'actor',
            text: 'Con: Timothée Chalamet, Joel Edgerton, Robert Pattinson',
            x: 65,
            y: 470,
            width: 500,
            draggable: true,
            fill: '#fff',
            fontStyle: 400,
            fontSize: 16,
            fontFamily: 'Helvetica Neue ,Helvetica,Arial,sans-serif',
          }"
        />
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
      image: null,
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

    const image = new Image()
    image.src = 'https://occ-0-2940-2582.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZJ7wQ1ajqcgLX7UknDiRfT2dNa1gDal7fQGXJQLEM3gmy0IftW5N9g1Tox4vsNSOcnYnJ-fbw0-ibJYaLJjI4sNg9gs.jpg?r=5f3'
    image.width = this.configKonva.width
    image.height = this.configKonva.height

    image.onload = () => {
      this.image = image
    }

    for (let n = 0; n < 5; n++) {
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
      if (this.dragItemId.match(/\d/) !== -1) {
        return false
      }

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
