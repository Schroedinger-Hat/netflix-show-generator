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
            id: 'bg-image',
            draggable: true,
            image: bgImage,
            x: imageConfig.x,
            y: imageConfig.y
          }"
        />
        <v-rect
          key="bg"
          :config="{
            draggable: true,
            x: 0,
            y: 0,
            width: configKonva.width,
            height: configKonva.height,
            fillLinearGradientStartPoint: {
              x: 0,
              y: 0
            },
            fillLinearGradientEndPoint: {
              x: configKonva.width * 90 / 100,
              y: 0
            },
            //fillLinearGradientColorStops: [0,'#171717', 0.15, '#171717fc', 0.2, '#171717f3', 0.25, '#171717e4', 0.30, '#171717d2', 0.95, '#17171700']
            fillLinearGradientColorStops: [0, '#171717', 0.2, '#171717fa', 0.25, '#171717f7', 0.35, '#171717f2', 0.4, '#171717f0', 0.45, '#171717eb', 0.5, '#171717e6', 0.55, '#171717de', 0.6, '#171717d1', 0.65, '#171717bf', 0.7, '#171717a1', 0.75, '#17171773', 0.8, '#17171745', 0.85, '#17171726', 0.9, '#17171714', 0.95, '#17171708', 1, '#17171700']
          }"
        />
      </v-layer>
      <v-layer ref="text">
        <v-text
          key="netflix"
          :config="{
            id: 'netflix',
            draggable: true,
            x: 65,
            y: 235,
            text: 'NETFLIX',
            fontSize: 36,
            fontFamily: 'Helvetica Neue ,Helvetica,Arial,sans-serif',
            fill: '#fff',
            fontStyle: 700,
          }"
        />
        <v-text
          key="netflix-original"
          :config="{
            id: 'netflix-original',
            draggable: true,
            x: 230,
            y: 235,
            text: 'ORIGINALS',
            fontSize: 36,
            fontFamily: 'Helvetica Neue ,Helvetica,Arial,sans-serif',
            fill: '#fff',
            fontStyle: 400,
          }"
        />
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
      bgImage: null,
      dragItemId: null,
      imageConfig: {
        x: 0
      },
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
    // image.src = 'https://occ-0-2940-2582.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZJ7wQ1ajqcgLX7UknDiRfT2dNa1gDal7fQGXJQLEM3gmy0IftW5N9g1Tox4vsNSOcnYnJ-fbw0-ibJYaLJjI4sNg9gs.jpg?r=5f3'
    image.src = require('~/assets/images/casa-de-papel.jpg')

    image.onload = () => {
      const ratio = Math.min(this.configKonva.width / image.width, this.configKonva.height / image.height)

      image.width = image.width * ratio
      image.height = image.height * ratio
      this.imageConfig.x = this.configKonva.width - image.width
      // this.imageConfig.y = this.configKonva.height - image.height

      this.bgImage = image
      image.remove()
    }

    this.$refs.stage.getStage().container().addEventListener('dragenter', this.eventPreventDefault)
    this.$refs.stage.getStage().container().addEventListener('dragover', this.eventPreventDefault)
    this.$refs.stage.getStage().container().addEventListener('dragleave', this.eventPreventDefault)
    this.$refs.stage.getStage().container().addEventListener('drop', this.eventPreventDefault)

    this.$refs.stage.getStage().container().addEventListener('drop', this.handleDroparea)

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
    eventPreventDefault (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    handleDroparea (e) {
      e.preventDefault()
      const files = []
      if (e.dataTransfer.items) {
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (e.dataTransfer.items[i].kind === 'file') {
            files.push(e.dataTransfer.items[i].getAsFile())
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          files.push(e.dataTransfer.files[i])
        }
      }
      console.log(files[0])
      const imageURL = URL.createObjectURL(files[0])
      console.log(imageURL)
      const image = new Image()
      image.src = imageURL

      image.onload = () => {
        const ratio = Math.min(this.configKonva.width / image.width, this.configKonva.height / image.height)

        image.width = image.width * ratio
        image.height = image.height * ratio

        this.imageConfig.x = this.configKonva.width - image.width
        this.imageConfig.y = this.configKonva.height - image.height
        this.bgImage = image
      }
      this.saveToPng()
    },
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
