<template>
  <div>
    <v-stage
      ref="stage"
      :config="configKonva"
      @dragstart="handleDragstart"
      @dragend="handleDragend"
      @mousedown="handleStageMouseDown"
      @touchstart="handleStageMouseDown"
    >
      <v-layer>
        <v-rect
          key="neutral"
          ref="neutral"
          name="neutral"
          :config="{
            id: 'neutral',
            x: 0,
            y: 0,
            fill: '#171717',
            width: configKonva.width,
            height: configKonva.height
          }"
        />
        <v-image
          key="bg-image"
          ref="bg-image"
          name="bg-image"
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
          ref="bg"
          name="bg"
          :config="{
            id: 'bg',
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
        <v-transformer ref="transformer-l1" />
      </v-layer>
      <v-layer ref="text">
        <v-text
          key="netflix"
          ref="netflix"
          name="netflix"
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
          @dblclick="editableText"
        />
        <v-text
          key="netflix-original"
          ref="netflix-original"
          name="netflix-original"
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
          ,
          @dblclick="editableText"
        />
        <v-text
          key="head-title"
          ref="head-title"
          name="head-title"
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
          ,
          @dblclick="editableText"
        />
        <v-text
          key="subtitle"
          ref="subtitle"
          name="subtitle"
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
          ,
          @dblclick="editableText"
        />
        <v-text
          key="description"
          ref="description"
          name="description"
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
          ,@transformend="handleTransformEnd"
          @dblclick="editableText"
        />
        <v-text
          ref="actors"
          key="actors"
          name="actors"
          :config="{
            id: 'actor',
            text: 'Starring: Timothée Chalamet, Joel Edgerton, Robert Pattinson',
            x: 65,
            y: 470,
            width: 500,
            draggable: true,
            fill: '#fff',
            fontStyle: 400,
            fontSize: 16,
            fontFamily: 'Helvetica Neue ,Helvetica,Arial,sans-serif',
          }"
          ,
          @dblclick="editableText"
        />
        <v-transformer ref="transformer" />
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
      images: [],
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
    image.src = require('~/assets/images/king.jpg')

    image.onload = () => {
      const ratio = Math.min(this.configKonva.width / image.width, this.configKonva.height / image.height)

      image.width = image.width * ratio
      image.height = image.height * ratio
      this.imageConfig.x = this.configKonva.width - image.width
      // this.imageConfig.y = this.configKonva.height - image.height

      this.bgImage = image
    }

    this.$refs.stage.getStage().container().addEventListener('dragenter', this.eventPreventDefault)
    this.$refs.stage.getStage().container().addEventListener('dragover', this.eventPreventDefault)
    this.$refs.stage.getStage().container().addEventListener('dragleave', this.eventPreventDefault)
    this.$refs.stage.getStage().container().addEventListener('drop', this.eventPreventDefault)

    this.$refs.stage.getStage().container().addEventListener('drop', this.handleDroparea)

    document.getElementById('save-btn').addEventListener('click', this.saveToPng)
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

      const imageURL = URL.createObjectURL(files[0])
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
      const dataURL = this.$refs.stage.getStage().toDataURL({
        pixelRatio: 2
      })
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
    },
    handleTransformEnd (e) {
      // shape is transformed, let us save new attrs back to the node
      // find element in our state

      const rect = this.$refs[this.selectedShapeName]
      // update the state
      rect.x = e.target.x()
      rect.y = e.target.y()
      rect.rotation = e.target.rotation()
      rect.scaleX = e.target.scaleX()
      rect.scaleY = e.target.scaleY()

      // change fill
      // eslint-disable-next-line no-undef
      rect.fill = Konva.Util.getRandomColor()
    },
    handleStageMouseDown (e) {
      // clicked on stage - clear selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = ''
        this.updateTransformer()
        return
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer'
      if (clickedOnTransformer) {
        return
      }

      // find clicked rect by its name
      const name = e.target.id()
      const rect = this.$refs[name]
      if (rect) {
        this.selectedShapeName = name
      } else {
        this.selectedShapeName = ''
      }
      this.updateTransformer()
    },
    updateTransformer () {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode()
      const stage = transformerNode.getStage()
      const { selectedShapeName } = this

      const selectedNode = stage.findOne('.' + selectedShapeName)
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode])
      } else {
        // remove transformer
        transformerNode.nodes([])
      }
      transformerNode.getLayer().batchDraw()
    },
    editableText (e) {
      const textNode = e.target
      textNode.hide()
      const context = this
      context.$refs.transformer.getNode().hide()
      textNode.getLayer().draw()

      const textPosition = textNode.absolutePosition()

      const stageBox = e.target.getStage().container().getBoundingClientRect()

      const areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y
      }

      const textarea = document.createElement('textarea')
      document.body.appendChild(textarea)

      textarea.value = textNode.text()
      textarea.style.position = 'absolute'
      textarea.style.top = areaPosition.y + 'px'
      textarea.style.left = areaPosition.x + 'px'
      textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px'
      textarea.style.height =
            textNode.height() - textNode.padding() * 2 + 5 + 'px'
      textarea.style.fontSize = textNode.fontSize() + 'px'
      textarea.style.border = 'none'
      textarea.style.padding = '0px'
      textarea.style.margin = '0px'
      textarea.style.overflow = 'hidden'
      textarea.style.background = 'none'
      textarea.style.outline = 'none'
      textarea.style.resize = 'none'
      textarea.style.lineHeight = textNode.lineHeight()
      textarea.style.fontFamily = textNode.fontFamily()
      textarea.style.transformOrigin = 'left top'
      textarea.style.textAlign = textNode.align()
      textarea.style.color = textNode.fill()
      const rotation = textNode.rotation()
      let transform = ''
      if (rotation) {
        transform += 'rotateZ(' + rotation + 'deg)'
      }

      let px = 0
      const isFirefox =
            navigator.userAgent.toLowerCase().includes('firefox')
      if (isFirefox) {
        px += 2 + Math.round(textNode.fontSize() / 20)
      }
      transform += 'translateY(-' + px + 'px)'

      textarea.style.transform = transform

      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 3 + 'px'

      textarea.focus()

      function removeTextarea () {
        textarea.parentNode.removeChild(textarea)
        window.removeEventListener('click', handleOutsideClick)
        textNode.show()
        context.$refs.transformer.getNode().show()
        context.$refs.transformer.getNode().forceUpdate()
        textNode.getLayer().draw()
      }

      function setTextareaWidth (newWidth) {
        if (!newWidth) {
          // set width for placeholder
          newWidth = textNode.placeholder.length * textNode.fontSize()
        }
        // some extra fixes on different browsers
        const isSafari = /^((?!chrome|android).)*safari/i.test(
          navigator.userAgent
        )
        const isFirefox =
              navigator.userAgent.toLowerCase().includes('firefox')
        if (isSafari || isFirefox) {
          newWidth = Math.ceil(newWidth)
        }

        const isEdge =
              document.documentMode || /Edge/.test(navigator.userAgent)
        if (isEdge) {
          newWidth += 1
        }
        textarea.style.width = newWidth + 'px'
      }

      textarea.addEventListener('keydown', function (e) {
        // hide on enter
        // but don't hide on shift + enter
        if (e.keyCode === 13 && !e.shiftKey) {
          textNode.text(textarea.value)
          removeTextarea()
        }
        // on esc do not set value back to node
        if (e.keyCode === 27) {
          removeTextarea()
        }
      })

      textarea.addEventListener('keydown', function (e) {
        const scale = textNode.getAbsoluteScale().x
        setTextareaWidth(textNode.width() * scale)
        textarea.style.height = 'auto'
        textarea.style.height =
              textarea.scrollHeight + textNode.fontSize() + 'px'
      })

      function handleOutsideClick (e) {
        if (e.target !== textarea) {
          textNode.text(textarea.value)
          removeTextarea()
        }
      }
      setTimeout(() => {
        window.addEventListener('click', handleOutsideClick)
      })
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
