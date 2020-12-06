<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        How to use this tool
      </p>
      <button class="delete" aria-label="close" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <div class="content">
        <h3 color="white">
          Getting Started
        </h3>
        <p>This is an open source tool and it is availale on <a href="https://github.com/Schrodinger-Hat/netflix-show-generator" target="_blank">Github</a>.</p>
        <p>
          On this tool you have a full editable canvas where you can edit content, text position, text dimension, gradient position and change background image.
        </p>
        <p>
          In order to change the element position you can just click and drag anywhere.
          Meanwhile, if yuo want to change the content inside an element you need to double click on it.
        </p>
        <p>
          By double clicking on an element it will show a textarea where you can edit and confirm the changes by clicking elsewhere or by clicking <code>Enter</code>.
        </p>
        <p>
          In order to change the background image you can drag-n-drop any image onto the canvas and it will change the background image.
        </p>
        <p>
          Finally dismiss this modal by clicking on the <code>Got It</code> button. Enjoy.
        </p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-primary" @click="$emit('close')">
        Got it
      </button>
    </footer>
  </div>
</template>

<script>
export default {

}
</script>
